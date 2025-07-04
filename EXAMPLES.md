# LiPD UI Examples

This document provides complete implementation examples for using LiPD UI in different environments.

## Browser Environment

Complete browser application with file operations and GraphDB support:

```tsx
// App.tsx
import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import {
  LiPDApp,
  useLiPDStore,
  setLiPDStoreCallbacks,
  RouterProvider,
  RemoteDialog,
  LiPDActions
} from '@linkedearth/lipd-ui';

// Browser environment doesn't need store callbacks - handles actions directly
setLiPDStoreCallbacks({});

const BrowserAppBarActions = () => {
  const { dataset, setDataset } = useLiPDStore();
  const [openAnchor, setOpenAnchor] = useState<null | HTMLElement>(null);
  const [saveAnchor, setSaveAnchor] = useState<null | HTMLElement>(null);
  const [remoteDialogOpen, setRemoteDialogOpen] = useState(false);
  const [remoteMode, setRemoteMode] = useState<'open' | 'save'>('open');

  const actions = new LiPDActions({
    onProgress: (msg) => console.log(msg),
    onError: (err) => console.error(err),
    onSuccess: (msg) => console.log(msg)
  });

  const handleNew = async () => {
    const newDataset = await actions.createNewLiPD();
    setDataset(newDataset);
  };

  const handleOpenLocal = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.lpd';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const dataset = await actions.openLocalLiPD(file);
        setDataset(dataset);
      }
    };
    input.click();
  };

  const handleDownload = async () => {
    if (dataset) {
      await actions.downloadLiPD(dataset);
    }
  };

  const handleRemoteAction = async (datasetName: string, endpoint: string, username?: string, password?: string) => {
    const remoteOptions = { endpoint, username, password };
    
    if (remoteMode === 'open') {
      const dataset = await actions.openRemoteLiPD(datasetName, remoteOptions);
      setDataset(dataset);
    } else if (dataset) {
      await actions.saveRemoteLiPD(dataset, remoteOptions);
    }
    
    setRemoteDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button variant="contained" onClick={handleNew}>
        New
      </Button>
      
      <Button
        variant="outlined"
        onClick={(e) => setOpenAnchor(e.currentTarget)}
      >
        Open
      </Button>
      <Menu
        anchorEl={openAnchor}
        open={Boolean(openAnchor)}
        onClose={() => setOpenAnchor(null)}
      >
        <MenuItem onClick={() => { handleOpenLocal(); setOpenAnchor(null); }}>
          Local File
        </MenuItem>
        <MenuItem onClick={() => { 
          setRemoteMode('open'); 
          setRemoteDialogOpen(true); 
          setOpenAnchor(null); 
        }}>
          Remote (GraphDB)
        </MenuItem>
      </Menu>

      <Button
        variant="outlined"
        onClick={(e) => setSaveAnchor(e.currentTarget)}
        disabled={!dataset}
      >
        Save
      </Button>
      <Menu
        anchorEl={saveAnchor}
        open={Boolean(saveAnchor)}
        onClose={() => setSaveAnchor(null)}
      >
        <MenuItem onClick={() => { handleDownload(); setSaveAnchor(null); }}>
          Local Download
        </MenuItem>
        <MenuItem onClick={() => { 
          setRemoteMode('save'); 
          setRemoteDialogOpen(true); 
          setSaveAnchor(null); 
        }}>
          Remote (GraphDB)
        </MenuItem>
      </Menu>

      <RemoteDialog
        open={remoteDialogOpen}
        mode={remoteMode}
        onClose={() => setRemoteDialogOpen(false)}
        onSubmit={handleRemoteAction}
        defaultEndpoint="https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDverse"
      />
    </Box>
  );
};

const App = () => {
  const { dataset } = useLiPDStore();
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LiPD Editor
          </Typography>
          <BrowserAppBarActions />
        </Toolbar>
      </AppBar>
      
      <RouterProvider>
        {dataset ? <LiPDApp /> : <div>No dataset loaded</div>}
      </RouterProvider>
    </ThemeProvider>
  );
};

export default App;
```

## VS Code Extension

VS Code extension webview implementation:

```tsx
// webview/App.tsx
import React, { useEffect } from 'react';
import {
  LiPDApp,
  useLiPDStore,
  setLiPDStoreCallbacks,
  RouterProvider,
  AppBarActions
} from '@linkedearth/lipd-ui';
import { vsCodeAPI } from './vscode';

// Set up VS Code specific store callbacks
setLiPDStoreCallbacks({
  onUndo: () => vsCodeAPI.postMessage({ 
    type: 'executeCommand', 
    command: 'lipd-vscode.undo' 
  }),
  onRedo: () => vsCodeAPI.postMessage({ 
    type: 'executeCommand', 
    command: 'lipd-vscode.redo' 
  }),
  onSave: () => vsCodeAPI.postMessage({ type: 'save' }),
  onSaveAs: () => vsCodeAPI.postMessage({ 
    type: 'executeCommand', 
    command: 'workbench.action.files.saveAs' 
  }),
  onSync: () => vsCodeAPI.postMessage({ type: 'sync' }),
  onDatasetUpdated: (dataset) => vsCodeAPI.postMessage({ 
    type: 'datasetUpdated', 
    data: dataset 
  }),
  onReady: () => vsCodeAPI.postMessage({ type: 'ready' })
});

const App = () => {
  const { dataset, setDataset, initialize } = useLiPDStore();

  useEffect(() => {
    // Initialize and send ready message to extension
    initialize();

    // Handle messages from VS Code
    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      
      switch (type) {
        case 'init':
          if (data) {
            const dataset = Dataset.fromDictionary(data);
            setDataset(dataset);
          }
          break;
        // ... other message handlers
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <RouterProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
          <AppBarActions 
            visibleActions={['save', 'saveAs', 'sync', 'undo', 'redo']}
            showLabels={false}
            size="small"
          />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {dataset ? <LiPDApp /> : <div>Loading...</div>}
        </div>
      </div>
    </RouterProvider>
  );
};

export default App;
```

## Electron Application

Electron main process and renderer integration:

```tsx
// renderer/App.tsx
import React from 'react';
import {
  LiPDApp,
  useLiPDStore,
  setLiPDStoreCallbacks,
  RouterProvider,
  AppBarActions
} from '@linkedearth/lipd-ui';

// Set up Electron specific callbacks
setLiPDStoreCallbacks({
  onSave: () => window.electronAPI?.saveFile(),
  onSaveAs: () => window.electronAPI?.saveFileAs(),
  onUndo: () => window.electronAPI?.undo(),
  onRedo: () => window.electronAPI?.redo(),
  onDatasetUpdated: (dataset) => window.electronAPI?.datasetChanged(dataset)
});

const ElectronAppBarActions = () => {
  const { dataset } = useLiPDStore();
  
  return (
    <AppBarActions
      visibleActions={['save', 'saveAs', 'undo', 'redo']}
      actionHandlers={{
        onNew: () => window.electronAPI?.newFile(),
        onOpen: () => window.electronAPI?.openFile()
      }}
    />
  );
};

const App = () => {
  const { dataset } = useLiPDStore();

  return (
    <RouterProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
          <ElectronAppBarActions />
        </div>
        <div style={{ flex: 1 }}>
          {dataset ? <LiPDApp /> : <div>No file open</div>}
        </div>
      </div>
    </RouterProvider>
  );
};

export default App;
```

## React Native / Mobile

Mobile application with touch-optimized interface:

```tsx
// MobileApp.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useLiPDStore,
  setLiPDStoreCallbacks,
  NavigationPanel,
  EditorPanel
} from '@linkedearth/lipd-ui';

// Set up mobile-specific callbacks
setLiPDStoreCallbacks({
  onSave: () => mobileStorage.saveDataset(),
  onDatasetUpdated: (dataset) => mobileStorage.updateDataset(dataset)
});

const MobileAppBarActions = () => {
  // Mobile-specific action buttons
  return (
    <View style={styles.actionBar}>
      {/* Custom mobile UI */}
    </View>
  );
};

const MobileApp = () => {
  const { dataset } = useLiPDStore();
  const [activePanel, setActivePanel] = useState<'nav' | 'editor'>('nav');

  return (
    <View style={styles.container}>
      <MobileAppBarActions />
      
      {dataset ? (
        <View style={styles.content}>
          {activePanel === 'nav' ? (
            <NavigationPanel 
              onNodeSelect={() => setActivePanel('editor')}
            />
          ) : (
            <EditorPanel 
              onBack={() => setActivePanel('nav')}
            />
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          {/* Empty state UI */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  actionBar: { height: 56, backgroundColor: '#f5f5f5' },
  content: { flex: 1 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default MobileApp;
```

## Custom Environment

Example of a completely custom integration:

```tsx
// CustomApp.tsx
import React from 'react';
import {
  LiPDApp,
  useLiPDStore,
  setLiPDStoreCallbacks,
  RouterProvider,
  LiPDActions
} from '@linkedearth/lipd-ui';

// Custom service for your application
class CustomLiPDService {
  async saveToCloud(dataset: Dataset) {
    // Your cloud save logic
  }
  
  async loadFromCloud(id: string) {
    // Your cloud load logic
  }
  
  async exportToPDF(dataset: Dataset) {
    // Your export logic
  }
}

const customService = new CustomLiPDService();

// Set up custom callbacks
setLiPDStoreCallbacks({
  onSave: () => {
    const dataset = useLiPDStore.getState().dataset;
    if (dataset) customService.saveToCloud(dataset);
  },
  onDatasetUpdated: (dataset) => {
    // Auto-save to cloud
    customService.saveToCloud(dataset);
  }
});

const CustomActions = () => {
  const { dataset, setDataset } = useLiPDStore();
  
  const actions = new LiPDActions({
    onProgress: (msg) => showToast(msg),
    onError: (err) => showError(err),
    onSuccess: (msg) => showSuccess(msg)
  });

  return (
    <div className="custom-toolbar">
      <button onClick={() => actions.createNewLiPD().then(setDataset)}>
        New Dataset
      </button>
      <button onClick={() => customService.loadFromCloud('id').then(setDataset)}>
        Load from Cloud
      </button>
      <button onClick={() => customService.exportToPDF(dataset!)} disabled={!dataset}>
        Export PDF
      </button>
    </div>
  );
};

const CustomApp = () => {
  const { dataset } = useLiPDStore();

  return (
    <div className="custom-app">
      <CustomActions />
      <RouterProvider>
        {dataset ? <LiPDApp /> : <div>No dataset loaded</div>}
      </RouterProvider>
    </div>
  );
};

export default CustomApp;
```

## Migration from v0.4.0

If you're upgrading from version 0.4.0, here are the key changes:

### Store Callbacks

**Before (v0.4.0):**
```tsx
// Store had built-in VS Code integration
import { useLiPDStore } from '@linkedearth/lipd-ui';
// Store automatically used VS Code API
```

**After (v0.5.0):**
```tsx
// Environment-agnostic with callbacks
import { useLiPDStore, setLiPDStoreCallbacks } from '@linkedearth/lipd-ui';

// Set up environment-specific callbacks
setLiPDStoreCallbacks({
  onSave: () => yourSaveFunction(),
  onDatasetUpdated: (dataset) => yourUpdateFunction(dataset)
});
```

### AppBarActions Configuration

**Before (v0.4.0):**
```tsx
// Fixed VS Code-style actions
<AppBarActions />
```

**After (v0.5.0):**
```tsx
// Configurable actions
<AppBarActions
  visibleActions={['save', 'undo', 'redo']}
  actionHandlers={{
    onSave: customSaveHandler
  }}
/>
```

### LiPDActions Class

**New in v0.5.0:**
```tsx
// Centralized action handling
const actions = new LiPDActions({
  onProgress: showProgress,
  onError: showError,
  postMessage: vsCodeAPI.postMessage // For extensions
});
```

## Key Benefits

1. **Environment Independence**: Same UI code works in browser, VS Code, Electron, mobile
2. **Flexible Integration**: Customize behavior without modifying library code  
3. **Consistent API**: Same actions and components across all environments
4. **TypeScript Support**: Full type safety and IntelliSense
5. **Backward Compatibility**: Existing VS Code extension continues to work

## Best Practices

1. **Set callbacks early**: Call `setLiPDStoreCallbacks()` before rendering components
2. **Use LiPDActions**: Centralize file operations through the actions class
3. **Handle errors gracefully**: Always provide error callbacks for user feedback
4. **Customize UI**: Use `visibleActions` and `actionHandlers` to match your environment
5. **Type safety**: Import and use TypeScript interfaces for better development experience

## Support

For issues or questions about specific environments:
- Browser: Check the demo implementation
- VS Code: Refer to the lipd-vscode-extension repository  
- Custom: Use these examples as starting points 