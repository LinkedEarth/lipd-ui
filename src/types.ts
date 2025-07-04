import { Dataset } from "lipdjs";

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export interface AppState {
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
  navPanelOpen: boolean;
  selectedTab: number;
  themeMode: ThemeMode;
  validationErrors: Record<string, any>;
  validationWarnings: Record<string, any>;
  notification: { type: string; message: string } | null;
  readonly?: boolean;
  syncConfirmDialogOpen: boolean;
  // actions same as original but optional for generic usage
  [key: string]: any;
  toggleRightPanel: () => void;
  toggleNavPanel: () => void;
  setNavPanelOpen: (open: boolean) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
}

export interface Model {
  getName(): string | null;
  getDescription(): string | null;
  getCode(): string | null;
  getEnsembleTables(): any[];
  getSummaryTables(): any[];
  getDistributionTables(): any[];
  setName(name: string): void;
  setDescription(description: string): void;
  setCode(code: string): void;
  setEnsembleTables(tables: any[]): void;
  setSummaryTables(tables: any[]): void;
  setDistributionTables(tables: any[]): void;
} 