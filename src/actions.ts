import { Dataset, LiPD } from 'lipdjs';

export interface LiPDActionOptions {
  // For browser environments
  onProgress?: (message: string) => void;
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
  
  // For environments that need message passing (like extensions)
  postMessage?: (message: any) => void;
}

export interface RemoteOptions {
  endpoint: string;
  username?: string;
  password?: string;
}

/**
 * Sanitize dataset name for consistent URI generation (matches lipdjs internal logic)
 */
export function sanitizeDatasetName(name: string): string {
  return encodeURIComponent(name.replace(/[^a-zA-Z0-9\-\.]/g, '_'));
}

/**
 * Core LiPD action functions that can be used by different clients
 */
export class LiPDActions {
  private options: LiPDActionOptions;

  constructor(options: LiPDActionOptions = {}) {
    this.options = options;
  }

  /**
   * Create a new empty LiPD dataset
   */
  async createNewLiPD(): Promise<Dataset> {
    try {
      this.options.onProgress?.('Creating new dataset...');
      
      const emptyDataset = new Dataset();
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const year = new Date().getFullYear();
      const datasetName = `Unnamed-Site.Author.${year}`;
      const datasetId = `DS${timestamp}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      emptyDataset.setName(datasetName);
      emptyDataset.setDatasetId(datasetId);
      
      this.options.onSuccess?.('New dataset created successfully');
      return emptyDataset;
    } catch (error) {
      const errorMsg = `Failed to create new dataset: ${error}`;
      this.options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Load LiPD dataset from a local file (browser only)
   */
  async openLocalLiPD(file: File): Promise<Dataset> {
    try {
      this.options.onProgress?.('Loading LiPD file...');
      
      const lipd = new LiPD();
      await lipd.loadFromFile(file);
      const loadedDatasets = await lipd.getDatasets();
      
      if (loadedDatasets.length === 0) {
        throw new Error('No datasets found in the LiPD file');
      }
      
      const dataset = loadedDatasets[0];
      
      // Ensure the dataset name is set properly with sanitization
      const rawName = dataset.getName?.() || 'dataset';
      const sanitizedName = sanitizeDatasetName(rawName);
      dataset.setName(sanitizedName);
      
      this.options.onSuccess?.('LiPD file loaded successfully');
      return dataset;
    } catch (error) {
      const errorMsg = `Failed to load LiPD file: ${error}`;
      this.options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Load LiPD dataset from a remote GraphDB endpoint
   */
  async openRemoteLiPD(datasetName: string, remoteOptions: RemoteOptions): Promise<Dataset> {
    try {
      this.options.onProgress?.('Loading dataset from GraphDB...');
      
      // Sanitize the dataset name for consistent lookups
      const sanitizedName = sanitizeDatasetName(datasetName);
      
      const lipd = new LiPD();
      lipd.setEndpoint(remoteOptions.endpoint);
      
      if (remoteOptions.username && remoteOptions.password) {
        lipd.setAuth({ 
          username: remoteOptions.username, 
          password: remoteOptions.password 
        });
      }
      
      await lipd.loadRemoteDatasets([sanitizedName]);
      const loadedDatasets = await lipd.getDatasets();
      
      if (loadedDatasets.length === 0) {
        throw new Error(`Dataset "${datasetName}" not found in GraphDB`);
      }
      
      const dataset = loadedDatasets[0];
      
      // Ensure the dataset name is set to the sanitized version
      dataset.setName(sanitizedName);
      
      this.options.onSuccess?.('Dataset loaded from GraphDB successfully');
      return dataset;
    } catch (error) {
      const errorMsg = `Failed to load dataset from GraphDB: ${error}`;
      this.options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Download LiPD dataset as file (browser only)
   */
  async downloadLiPD(dataset: Dataset, filename?: string): Promise<void> {
    try {
      this.options.onProgress?.('Preparing download...');
      
      // Ensure the dataset name is sanitized
      const rawName = dataset.getName?.() || 'dataset';
      const sanitizedName = sanitizeDatasetName(rawName);
      dataset.setName(sanitizedName);
      
      const lipd = new LiPD();
      lipd.loadDatasets([dataset]);
      
      const blob: Blob = await (lipd as any).createLipdBrowser(sanitizedName);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `${sanitizedName}.lpd`;
      link.click();
      URL.revokeObjectURL(url);
      
      this.options.onSuccess?.('Dataset downloaded successfully');
    } catch (error) {
      const errorMsg = `Failed to download LiPD file: ${error}`;
      this.options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Save LiPD dataset to file system (extension environments only)
   */
  async saveLiPD(): Promise<void> {
    if (this.options.postMessage) {
      this.options.onProgress?.('Saving dataset...');
      this.options.postMessage({ type: 'save' });
    } else {
      throw new Error('Save to file system is only available in extension environments');
    }
  }

  /**
   * Save LiPD dataset as new file (extension environments only)
   */
  async saveAsLiPD(): Promise<void> {
    if (this.options.postMessage) {
      this.options.onProgress?.('Saving dataset as...');
      this.options.postMessage({ type: 'saveAs' });
    } else {
      throw new Error('Save As is only available in extension environments');
    }
  }

  /**
   * Save LiPD dataset to remote GraphDB endpoint
   */
  async saveRemoteLiPD(dataset: Dataset, remoteOptions: RemoteOptions): Promise<void> {
    try {
      this.options.onProgress?.('Uploading dataset to GraphDB...');
      
      // Ensure the dataset name is sanitized
      const rawName = dataset.getName?.() || 'dataset';
      const sanitizedName = sanitizeDatasetName(rawName);
      dataset.setName(sanitizedName);
      
      const lipd = new LiPD();
      lipd.setEndpoint(remoteOptions.endpoint);
      
      if (remoteOptions.username && remoteOptions.password) {
        lipd.setAuth({ 
          username: remoteOptions.username, 
          password: remoteOptions.password 
        });
      }
      
      lipd.loadDatasets([dataset]);
      await lipd.updateRemoteDatasets([sanitizedName]);
      
      this.options.onSuccess?.('Dataset uploaded to GraphDB successfully');
    } catch (error) {
      const errorMsg = `Failed to upload dataset to GraphDB: ${error}`;
      this.options.onError?.(errorMsg);
      throw new Error(errorMsg);
    }
  }
} 