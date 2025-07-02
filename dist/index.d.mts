import { SynonymEntry, Publication, DataTable, PaleoData, ChronData, Person, Variable, Funding, ChangeLog, Change, Compilation, Dataset } from 'lipdjs';
import * as zustand from 'zustand';
import React from 'react';

interface Schema {
    fields?: Record<string, SchemaField>;
    enum?: Record<string, SynonymEntry>;
    class?: any;
    label?: {
        primary?: Function;
        secondary?: Function;
    };
}
interface SchemaField {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'enum';
    hidden?: boolean;
    label?: string;
    multiline?: boolean;
    rows?: number;
    items?: SchemaField;
    schema?: Schema;
}
declare const archiveTypeSchema: Schema;
declare const proxySchema: Schema;
declare const proxyGeneralSchema: Schema;
declare const interpretationVariableSchema: Schema;
declare const seasonalitySchema: Schema;
declare const seasonalityGeneralSchema: Schema;
declare const seasonalityOriginalSchema: Schema;
declare const paleoUnitSchema: Schema;
declare const paleoVariableSchema: Schema;
declare const locationSchema: Schema;
declare const personSchema: Schema;
declare const publicationSchema: Schema;
declare const changeLogEntrySchema: Schema;
declare const changeLogSchema: Schema;
declare const fundingSchema: Schema;
declare const interpretationSchema: Schema;
declare const calibrationSchema: Schema;
declare const resolutionSchema: Schema;
declare const compilationSchema: Schema;
declare const variableSchema: Schema;
declare const dataTableSchema: Schema;
declare const modelSchema: Schema;
declare const dataSchema: Schema;
declare const datasetSchema: Schema;
declare const getSchemaForPath: (path: string) => Schema | SchemaField | null;

declare const getPublicationAuthorsLabel: (publication: Publication) => string;
declare const getPublicationTitleLabel: (publication: Publication) => string;
declare const getPublicationFullLabel: (publication: Publication) => string;
declare const getDataTableLabel: (dataTable: DataTable) => string;
declare const getDataTableVariablesLabel: (dataTable: DataTable) => string;
declare const getMeasurementTablesLabel: (data: PaleoData | ChronData) => string;
declare const getModeledByLabel: (data: PaleoData | ChronData) => string;
declare const getDataDetailsLabel: (data: PaleoData | ChronData) => string;
declare const getPersonNameLabel: (person: Person) => string;
declare const getVariableNameLabel: (variable: Variable) => string;
declare const getVariableDescriptionLabel: (variable: Variable) => string;
declare const getVariableUnitsLabel: (variable: Variable) => string;
declare const getFundingLabel: (funding: Funding) => string;
declare const getFundingGrantsLabel: (funding: Funding) => string;
declare const getChangeLogLabel: (changeLog: ChangeLog) => string;
declare const getChangeLogCuratorLabel: (changeLog: ChangeLog) => string;
declare const getChangeLogEntryLabel: (changeLogEntry: Change) => string;
declare const getCompilationNameLabel: (compilation: Compilation) => string;

type ThemeMode = 'light' | 'dark' | 'high-contrast';
interface AppState {
    dataset: Dataset | null;
    isLoading: boolean;
    isSaving: boolean;
    isSyncing: boolean;
    isRemote: boolean;
    datasetName: string;
    loadingMessage?: string;
    syncProgress?: number;
    canUndo: boolean;
    canRedo: boolean;
    selectedNode: string | null;
    expandedNodes: Set<string>;
    rightPanelOpen: boolean;
    selectedTab: number;
    themeMode: ThemeMode;
    validationErrors: Record<string, any>;
    validationWarnings: Record<string, any>;
    notification: {
        type: string;
        message: string;
    } | null;
    readonly?: boolean;
    syncConfirmDialogOpen: boolean;
    [key: string]: any;
}

declare const useLiPDStore: zustand.UseBoundStore<zustand.StoreApi<AppState>>;

declare const AppBarActions: React.FC;

declare const AppBarBreadcrumbs: React.FC;

interface IconProps {
    fontSize?: 'small' | 'medium' | 'large';
    sx?: any;
    style?: React.CSSProperties;
}
declare const ArrowBackIcon: React.FC<IconProps>;
declare const NavigateNextIcon: React.FC<IconProps>;
declare const HomeIcon: React.FC<IconProps>;
declare const SaveIcon: React.FC<IconProps>;
declare const SaveAsIcon: React.FC<IconProps>;
declare const UndoIcon: React.FC<IconProps>;
declare const RedoIcon: React.FC<IconProps>;
declare const SyncIcon: React.FC<IconProps>;
declare const AddIcon: React.FC<IconProps>;
declare const EditIcon: React.FC<IconProps>;
declare const DeleteIcon: React.FC<IconProps>;
declare const ExpandMoreIcon: React.FC<IconProps>;
declare const ChevronRightIcon: React.FC<IconProps>;
declare const DescriptionIcon: React.FC<IconProps>;
declare const TableChartIcon: React.FC<IconProps>;
declare const FolderIcon: React.FC<IconProps>;
declare const ArticleIcon: React.FC<IconProps>;
declare const TableRowsIcon: React.FC<IconProps>;
declare const CheckIcon: React.FC<IconProps>;
declare const FileUploadIcon: React.FC<IconProps>;
declare const FileDownloadIcon: React.FC<IconProps>;

interface ChronDataTreeProps {
    dataset: Dataset;
}
declare const ChronDataTree: React.FC<ChronDataTreeProps>;

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
declare const ConfirmDialog: React.FC<ConfirmDialogProps>;

interface RouteParams {
    dataType?: string;
    index?: number;
    tableIndex?: number;
    varIndex?: number;
    interpretationIndex?: number;
    calibrationIndex?: number;
    compilationIndex?: number;
    publicationIndex?: number;
    fundingIndex?: number;
    modelIndex?: number;
    tableType?: string;
    changeLogIndex?: number;
    changeLogEntryIndex?: number;
    personIndex?: number;
    authorIndex?: number;
    investigatorIndex?: number;
}
interface RouterContextType {
    currentPath: string;
    navigateTo: (path: string) => void;
    goBack: () => void;
    breadcrumbs: {
        label: string;
        path: string;
    }[];
    canGoBack: boolean;
}
interface EditorProps {
    dataset: Dataset;
    path: string;
    title?: string;
    params?: RouteParams;
    onUpdate: (path: string, updatedObject: any) => void;
    schema?: Schema;
    fieldSchema?: SchemaField;
    columns?: number;
    dense?: boolean;
    useFieldset?: boolean;
    readonly?: boolean;
}
declare const RouterProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const useRouter: () => RouterContextType;
declare const Router: React.FC;

declare const DataTableEditor: React.FC<EditorProps>;

declare const DefaultEditor: React.FC<EditorProps>;

declare const DefaultEnumEditor: React.FC<EditorProps>;

declare const DefaultListEditor: React.FC<EditorProps>;

declare const EditorPanel: React.FC;

declare const Fieldset: ({ children, dense }: {
    children: React.ReactNode;
    dense?: boolean;
}) => React.JSX.Element;

declare const FormTextField: React.MemoExoticComponent<({ label, defaultValue, type, multiline, rows, onBlur, disabled }: {
    label: string;
    defaultValue: string | number;
    type?: string;
    multiline?: boolean;
    rows?: number;
    onBlur: (value: string) => void;
    disabled?: boolean;
}) => React.JSX.Element>;

interface ListViewProps {
    title: string;
    items: Array<any>;
    schema: Schema;
    onAdd?: () => void;
    onEdit: (index: number) => void;
    onDelete?: (index: number) => void;
    addButtonText: string;
    pathPrefix?: string;
    dense?: boolean;
    useFieldset?: boolean;
    fieldSchema?: SchemaField;
    readonly?: boolean;
}
declare const ListView: React.FC<ListViewProps>;

declare const NavigationPanel: React.FC;

interface PaleoDataTreeProps {
    dataset: Dataset;
}
declare const PaleoDataTree: React.FC<PaleoDataTreeProps>;

interface PublicationsTreeProps {
    dataset: Dataset;
}
declare const PublicationsTree: React.FC<PublicationsTreeProps>;

/**
 * Component that displays a progress bar when syncing to GraphDB
 */
declare const SyncProgressBar: React.FC;

interface TreeItemProps {
    node: any;
    label: string;
    nodeId: string;
    hasChildren: boolean;
    level?: number;
}
declare const TreeItem: React.FC<TreeItemProps>;

declare const LiPDApp: React.FC;

export { AddIcon, AppBarActions, AppBarBreadcrumbs, ArrowBackIcon, ArticleIcon, CheckIcon, ChevronRightIcon, ChronDataTree, ConfirmDialog, DataTableEditor, DefaultEditor, DefaultEnumEditor, DefaultListEditor, DeleteIcon, DescriptionIcon, EditIcon, EditorPanel, EditorProps, ExpandMoreIcon, Fieldset, FileDownloadIcon, FileUploadIcon, FolderIcon, FormTextField, HomeIcon, LiPDApp, ListView, NavigateNextIcon, NavigationPanel, PaleoDataTree, PublicationsTree, RedoIcon, RouteParams, Router, RouterProvider, SaveAsIcon, SaveIcon, Schema, SchemaField, SyncIcon, SyncProgressBar, TableChartIcon, TableRowsIcon, TreeItem, UndoIcon, archiveTypeSchema, calibrationSchema, changeLogEntrySchema, changeLogSchema, compilationSchema, dataSchema, dataTableSchema, datasetSchema, fundingSchema, getChangeLogCuratorLabel, getChangeLogEntryLabel, getChangeLogLabel, getCompilationNameLabel, getDataDetailsLabel, getDataTableLabel, getDataTableVariablesLabel, getFundingGrantsLabel, getFundingLabel, getMeasurementTablesLabel, getModeledByLabel, getPersonNameLabel, getPublicationAuthorsLabel, getPublicationFullLabel, getPublicationTitleLabel, getSchemaForPath, getVariableDescriptionLabel, getVariableNameLabel, getVariableUnitsLabel, interpretationSchema, interpretationVariableSchema, locationSchema, modelSchema, paleoUnitSchema, paleoVariableSchema, personSchema, proxyGeneralSchema, proxySchema, publicationSchema, resolutionSchema, seasonalityGeneralSchema, seasonalityOriginalSchema, seasonalitySchema, useLiPDStore, useRouter, variableSchema };
