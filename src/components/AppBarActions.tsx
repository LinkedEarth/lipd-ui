import React from 'react';
import { Box, IconButton, Button, Divider, Tooltip } from '@mui/material';
import { SaveIcon, SaveAsIcon, SyncIcon, UndoIcon, RedoIcon } from './CustomIcons';
import { useLiPDStore } from '../store';

export interface AppBarActionHandlers {
  onNew?: () => void;
  onOpen?: () => void;
  onSave?: () => void;
  onSaveAs?: () => void;
  onSync?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

export interface AppBarActionsProps {
  /**
   * Custom action handlers. If not provided, uses default store actions
   */
  actionHandlers?: AppBarActionHandlers;
  
  /**
   * Which actions to show. If not provided, shows all relevant actions based on environment
   */
  visibleActions?: {
    new?: boolean;
    open?: boolean;
    save?: boolean;
    saveAs?: boolean;
    sync?: boolean;
    undo?: boolean;
    redo?: boolean;
  };
  
  /**
   * Whether to show action labels (default: false, icons only)
   */
  showLabels?: boolean;
  
  /**
   * Size of the action buttons
   */
  size?: 'small' | 'medium';
}

const AppBarActions: React.FC<AppBarActionsProps> = ({ 
  actionHandlers = {}, 
  visibleActions = {},
  showLabels = false,
  size = 'small'
}) => {
  const { 
    saveDataset, 
    saveDatasetAs, 
    syncDataset, 
    undo, 
    redo, 
    isSaving, 
    isSyncing, 
    canUndo, 
    canRedo, 
    isRemote 
  } = useLiPDStore(state => ({
    saveDataset: state.saveDataset,
    saveDatasetAs: state.saveDatasetAs,
    syncDataset: state.syncDataset,
    undo: state.undo,
    redo: state.redo,
    isSaving: state.isSaving,
    isSyncing: state.isSyncing,
    canUndo: state.canUndo,
    canRedo: state.canRedo,
    isRemote: state.isRemote
  }));

  // Default visibility - show traditional VS Code extension actions
  const defaultVisibility = {
    new: false,
    open: false,
    save: true,
    saveAs: true,
    sync: true,
    undo: true,
    redo: true
  };

  const visibility = { ...defaultVisibility, ...visibleActions };

  // Use custom handlers or fall back to store actions
  const handlers = {
    onNew: actionHandlers.onNew,
    onOpen: actionHandlers.onOpen,
    onSave: actionHandlers.onSave || saveDataset,
    onSaveAs: actionHandlers.onSaveAs || saveDatasetAs,
    onSync: actionHandlers.onSync || syncDataset,
    onUndo: actionHandlers.onUndo || undo,
    onRedo: actionHandlers.onRedo || redo,
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* File operations */}
      {(visibility.new || visibility.open) && (
        <>
          <Box sx={{ display: 'flex', mr: 2 }}>
            {visibility.new && handlers.onNew && (
              <Tooltip title="New Dataset">
                {showLabels ? (
                  <Button 
                    onClick={handlers.onNew}
                    size={size}
                    variant="outlined"
                    sx={{ mr: 0.5 }}
                  >
                    New
                  </Button>
                ) : (
                  <IconButton
                    onClick={handlers.onNew}
                    size={size}
                    sx={{ mr: 0.5 }}
                  >
                    📄
                  </IconButton>
                )}
              </Tooltip>
            )}
            
            {visibility.open && handlers.onOpen && (
              <Tooltip title="Open Dataset">
                {showLabels ? (
                  <Button 
                    onClick={handlers.onOpen}
                    size={size}
                    variant="outlined"
                  >
                    Open
                  </Button>
                ) : (
                  <IconButton
                    onClick={handlers.onOpen}
                    size={size}
                  >
                    📁
                  </IconButton>
                )}
              </Tooltip>
            )}
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        </>
      )}

      {/* Edit actions */}
      {(visibility.undo || visibility.redo) && (
        <>
          <Box sx={{ display: 'flex', mr: 2 }}>
            {visibility.undo && (
              <Tooltip title="Undo (VS Code Cmd+Z / Ctrl+Z)">
                <span>
                  <IconButton 
                    onClick={handlers.onUndo} 
                    disabled={!canUndo || isSaving}
                    size={size}
                    aria-label="Undo"
                    sx={{ mr: 0.5 }}
                  >
                    <UndoIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            
            {visibility.redo && (
              <Tooltip title="Redo (VS Code Cmd+Shift+Z / Ctrl+Y)">
                <span>
                  <IconButton 
                    onClick={handlers.onRedo} 
                    disabled={!canRedo || isSaving}
                    size={size}
                    aria-label="Redo"
                  >
                    <RedoIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        </>
      )}
      
      {/* Save actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
        {visibility.save && (
          <Tooltip title="Save (VS Code Cmd+S / Ctrl+S)">
            <IconButton 
              onClick={handlers.onSave} 
              disabled={isSaving}
              size={size}
              aria-label="Save"
              sx={{ mr: 1 }}
            >
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        
        {visibility.saveAs && (
          <Tooltip title="Save As (VS Code Cmd+Shift+S / Ctrl+Shift+S)">
            <IconButton 
              onClick={handlers.onSaveAs} 
              disabled={isSaving}
              size={size}
              aria-label="Save As"
              sx={{ mr: 1 }}
            >
              <SaveAsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {visibility.sync && (
          <Tooltip title="Sync to GraphDB">
            <IconButton 
              onClick={handlers.onSync} 
              disabled={isSyncing}
              size={size}
              aria-label="Sync to GraphDB"
              sx={{ mr: 1 }}
            >
              <SyncIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default AppBarActions; 