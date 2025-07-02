// Copied generic store from webview (unchanged)
import React from 'react';
import { create } from 'zustand';
import { Dataset } from 'lipdjs';
import { AppState, ThemeMode } from './types';
import { getVSCodeAPI } from './vscode';
import { getSchemaForPath } from './schemas';

const vscode = getVSCodeAPI();

export const useLiPDStore = create<AppState>((set, get) => ({
  dataset: null,
  isLoading: false,
  isSaving: false,
  isSyncing: false,
  isRemote: false,
  datasetName: '',
  syncProgress: 0,
  canUndo: false,
  canRedo: false,
  selectedNode: null,
  expandedNodes: new Set(['dataset']),
  rightPanelOpen: true,
  selectedTab: 0,
  themeMode: 'light',
  validationErrors: {},
  validationWarnings: {},
  notification: null,
  readonly: false,
  syncConfirmDialogOpen: false,
  initialize: () => {},
  setIsLoading: (v:boolean)=>set({isLoading:v}),
  setLoadingMessage:(m:string)=>set({loadingMessage:m}),
  setThemeMode:(mode:ThemeMode)=>set({themeMode:mode}),
  setDataset:(d)=>set({dataset:d,selectedNode:'dataset'}),
  setDatasetSilently:(d)=>set({dataset:d}),
  undo:()=>vscode.postMessage?.({type:'executeCommand',command:'lipd-vscode.undo'}),
  redo:()=>vscode.postMessage?.({type:'executeCommand',command:'lipd-vscode.redo'}),
  setUndoRedoState:(u:boolean,r:boolean)=>set({canUndo:u,canRedo:r}),
  setSelectedNode:(n)=>set({selectedNode:n}),
  toggleExpandNode:(id)=>{
    const s=get().expandedNodes;const ns=new Set(s);ns.has(id)?ns.delete(id):ns.add(id);set({expandedNodes:ns});},
  setError:(e)=>set({validationErrors:{error:e},notification:{type:'error',message:e}}),
  setSaveComplete:(s,err)=>set({isSaving:false,notification:s?{type:'success',message:'Dataset saved successfully'}:{type:'error',message:err||'Failed to save dataset'}}),
  setSyncComplete:(s,err)=>set({isSyncing:false,syncProgress:0,notification:s?{type:'success',message:'Dataset synced'}:{type:'error',message:err||'Failed to sync'}}),
  setValidationResults:(res)=>set({validationErrors:res.errors||{},validationWarnings:res.warnings||{}}),
  saveDataset:()=>{set({isSaving:true});vscode.postMessage?.({type:'save'});return Promise.resolve();},
  saveDatasetAs:()=>{set({isSaving:true});vscode.postMessage?.({type:'executeCommand',command:'workbench.action.files.saveAs'});return Promise.resolve();},
  syncDataset:()=>{
    // Show confirmation dialog instead of immediately syncing
    set({syncConfirmDialogOpen:true});
    return Promise.resolve();
  },
  setSyncConfirmDialogOpen:(open:boolean)=>set({syncConfirmDialogOpen:open}),
  confirmSync:()=>{
    // Close dialog and start sync
    set({syncConfirmDialogOpen:false,isSyncing:true});
    // Post message to VS Code to handle the actual sync
    vscode.postMessage?.({type:'sync'});
    return Promise.resolve();
  },
  toggleRightPanel:()=>set({rightPanelOpen:!get().rightPanelOpen}),
  setSelectedTab:(t)=>set({selectedTab:t}),
  updateDataset: (field, value) => {
    const original = get().dataset as Dataset | null;
    if (!original) return;
    // Work on the original instance so we keep methods, then create a shallow clone that preserves the prototype
    const dataset = original;
    
    const updateNestedProperty = (obj: any, path: string | string[], value: any): any => {
      if (typeof path === 'string') {
        // Handle dot notation paths
        const parts = path.split('.');
        const lastKey = parts.pop() as string;
        if (parts.length > 0 && parts[0] === 'dataset') {
          parts.shift();
        }

        let current = obj;
        
        // Traverse the path
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!current[part]) {
            // Get the schema for this path
            const pathToHere = ['dataset', ...parts.slice(0, i+1)].join('.');
            const schema = getSchemaForPath(pathToHere);
            
            // If we have a schema, create a proper instance
            if (schema) {
              // For arrays, create an empty array since we're accessing an index
              if (parts[i+1] && !isNaN(Number(parts[i+1]))) {
                current[part] = [];
              } else if ('class' in schema && schema.class) {
                // For objects with a class, instantiate the class
                current[part] = new schema.class();
              } else if ('type' in schema && schema.type === 'array' && 'items' in schema && schema.items) {
                // For arrays with item schema, create an empty array
                current[part] = [];
              } else {
                // Fallback to empty object
                current[part] = {};
              }
            } else {
              // Fallback to empty object if no schema found
              current[part] = {};
            }
          }
          current = current[part];
        }
        
        // Try to use setter if available
        current[lastKey] = value
      } else if (Array.isArray(path) && path.length === 1) {
        // If it's an array with just one string element
        obj[path[0]] = value;
      } else {
        console.error('Invalid path format', path);
      }
      return obj;
    };

    updateNestedProperty(dataset, field, value);

    // Create a new object that shares the same prototype to trigger Zustand update while preserving class methods
    const cloned = Object.assign(Object.create(Object.getPrototypeOf(dataset)), dataset);
    set({ dataset: cloned });

    vscode.postMessage({
      type: 'datasetUpdated',
      data: cloned
    });
  },
  setExpandedNodes:(nodes)=>set({expandedNodes:nodes}),
  setIsRemote:(b)=>set({isRemote:b}),
  setDatasetName:(n)=>set({datasetName:n}),
  setReadonly:(readonly:boolean)=>set({readonly})
})); 