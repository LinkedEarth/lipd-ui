# LiPD UI

A flexible React component library for editing LiPD (Linked Paleo Data) datasets in any environment.

## Features

- **Environment Agnostic**: Works in browsers, VS Code extensions, Electron apps, and more
- **Flexible Actions**: Core LiPD operations that can be customized per environment
- **Rich Editing**: Tree-based navigation with form-based editing
- **Remote Support**: GraphDB connectivity for collaborative workflows
- **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
npm install @linkedearth/lipd-ui
```

## Core Actions

The `LiPDActions` class provides all essential LiPD operations:

```typescript
import { LiPDActions, RemoteOptions } from '@linkedearth/lipd-ui';

// Create action handler with callbacks
const actions = new LiPDActions({
  onProgress: (msg) => console.log(msg),
  onError: (err) => console.error(err),
  onSuccess: (msg) => console.log(msg),
  
  // For extension environments that need message passing
  postMessage: (msg) => extensionAPI.postMessage(msg)
});

// Core operations
const dataset = await actions.createNewLiPD();
const loaded = await actions.openLocalLiPD(file);
const remote = await actions.openRemoteLiPD('dataset-name', {
  endpoint: 'https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDverse',
  username: 'user',
  password: 'pass'
});

// Save operations
await actions.downloadLiPD(dataset, 'filename.lpd'); // Browser
await actions.saveLiPD(); // Extension environments
await actions.saveRemoteLiPD(dataset, remoteOptions);
```

## Flexible AppBarActions

Configure the toolbar for your environment:

```typescript
import { AppBarActions } from '@linkedearth/lipd-ui';

// Browser environment with custom actions
const BrowserActions = () => (
  <AppBarActions
    actionHandlers={{
      onNew: () => actions.createNewLiPD(),
      onOpen: (file) => actions.openLocalLiPD(file),
      onSave: () => actions.downloadLiPD(dataset)
    }}
    visibleActions={['new', 'open', 'save']}
    showLabels={true}
  />
);

// Extension environment with traditional actions
const ExtensionActions = () => (
  <AppBarActions
    // Uses store actions by default - connects to extension via callbacks
    visibleActions={['save', 'saveAs', 'sync', 'undo', 'redo']}
    showLabels={false}
    size="small"
  />
);
```

## Environment Setup

### Browser Applications

```typescript
import React from 'react';
import { 
  LiPDApp, 
  useLiPDStore, 
  setLiPDStoreCallbacks,
  RouterProvider 
} from '@linkedearth/lipd-ui';

// Browser doesn't need store callbacks - uses custom components
setLiPDStoreCallbacks({});

const App = () => {
  const { dataset } = useLiPDStore();
  
  return (
    <RouterProvider>
      {dataset ? <LiPDApp /> : <div>No dataset loaded</div>}
    </RouterProvider>
  );
};
```

### VS Code Extensions

```typescript
import { setLiPDStoreCallbacks, useLiPDStore } from '@linkedearth/lipd-ui';

// Set up VS Code specific callbacks
setLiPDStoreCallbacks({
  onUndo: () => vscode.postMessage({ type: 'executeCommand', command: 'lipd-vscode.undo' }),
  onRedo: () => vscode.postMessage({ type: 'executeCommand', command: 'lipd-vscode.redo' }),
  onSave: () => vscode.postMessage({ type: 'save' }),
  onSaveAs: () => vscode.postMessage({ type: 'executeCommand', command: 'workbench.action.files.saveAs' }),
  onSync: () => vscode.postMessage({ type: 'sync' }),
  onDatasetUpdated: (dataset) => vscode.postMessage({ type: 'datasetUpdated', data: dataset }),
  onReady: () => vscode.postMessage({ type: 'ready' })
});
```

### Custom Environments

```typescript
import { setLiPDStoreCallbacks } from '@linkedearth/lipd-ui';

// Custom implementation
setLiPDStoreCallbacks({
  onSave: () => myApp.saveFile(),
  onDatasetUpdated: (dataset) => myApp.handleDatasetChange(dataset),
  // ... other callbacks as needed
});
```

## Remote Dialog

For GraphDB operations:

```typescript
import { RemoteDialog } from '@linkedearth/lipd-ui';

const MyComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleRemoteAction = (datasetName, endpoint, username, password) => {
    // Your remote operation logic
  };
  
  return (
    <RemoteDialog
      open={dialogOpen}
      mode="open" // or "save"
      onClose={() => setDialogOpen(false)}
      onSubmit={handleRemoteAction}
      defaultEndpoint="https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDverse"
    />
  );
};
```

## TypeScript Support

```typescript
import type { 
  AppState, 
  LiPDActionOptions, 
  RemoteOptions,
  LiPDStoreCallbacks,
  AppBarActionHandlers 
} from '@linkedearth/lipd-ui';
```

## Component Exports

All components are available as named exports:

```typescript
import { 
  // Main components
  LiPDApp,
  AppBarActions,
  NavigationPanel,
  EditorPanel,
  
  // Specialized components
  RemoteDialog,
  ConfirmDialog,
  SyncProgressBar,
  
  // Tree components
  ChronDataTree,
  PaleoDataTree,
  PublicationsTree,
  
  // Form components
  DefaultEditor,
  DataTableEditor,
  LocationEditor,
  
  // Store and actions
  useLiPDStore,
  setLiPDStoreCallbacks,
  LiPDActions,
  RouterProvider
} from '@linkedearth/lipd-ui';
```

## Architecture

The library uses a flexible callback system that allows different environments to provide their own implementations:

- **Browser**: Uses file APIs and blob downloads
- **VS Code**: Uses postMessage communication with extension backend  
- **Electron**: Can use either approach depending on context
- **Custom**: Implement your own callbacks for any environment

This design keeps the core UI logic environment-agnostic while enabling deep integration with host applications.

## Examples

See [EXAMPLES.md](./EXAMPLES.md) for complete implementation examples across different environments. 