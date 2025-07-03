import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Switch, 
  FormControlLabel,
  Button,
  Box
} from '@mui/material';
import { 
  LiPDApp, 
  useLiPDStore, 
  RouterProvider 
} from '@linkedearth/lipd-ui';

import { LiPD, Dataset } from 'lipdjs';
import { Logger, LogLevel } from 'lipdjs';

// Enable debug-level logging to see all CSV lookup details
const logger = Logger.getInstance();
logger.setLogLevel(LogLevel.DEBUG);

import JSZip from 'jszip';

// Simple menu icon component for demo
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  
  const { 
    setDataset, 
    setThemeMode, 
    setReadonly,
    dataset 
  } = useLiPDStore(state => ({
    setDataset: state.setDataset,
    setThemeMode: state.setThemeMode,
    setReadonly: state.setReadonly,
    dataset: state.dataset
  }));

  // Create theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  // Update theme mode
  React.useEffect(() => {
    setThemeMode(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, setThemeMode]);

  // Update readonly mode
  React.useEffect(() => {
    setReadonly(isReadonly);
  }, [isReadonly, setReadonly]);

  const handleUploadLIPD: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      const lipd = new LiPD();
      await lipd.loadFromFile(files[0]);
      const loadedDatasets = await lipd.getDatasets();
      console.log(loadedDatasets);
      if (loadedDatasets.length > 0) {
        setDataset(loadedDatasets[0]);
      }
    } catch (err) {
      console.error('Failed to load LiPD file', err);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            LiPD Editor
          </Typography>
          
          {/* File operations */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => {
              try {
                // Create a new empty dataset with LiPD naming convention
                const emptyDataset = new Dataset();
                const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                const datasetName = `Unnamed-Site.Author.${new Date().getFullYear()}`;
                emptyDataset.setName(datasetName);
                emptyDataset.setDatasetId(`DS${timestamp}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
                setDataset(emptyDataset);
              } catch (err) {
                console.error('Failed to create new dataset', err);
              }
            }}>
              New
            </Button>
            <Button
              component="label"
              variant="outlined"
              size="small"
            >
              Open
              <input
                type="file"
                hidden
                accept=".lpd"
                onChange={handleUploadLIPD}
              />
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={!dataset}
              onClick={async () => {
                if (!dataset) return;
                try {
                  // Fix the internal ID to follow LiPD convention: http://linked.earth/lipd/[dsname]
                  const datasetName = dataset.getName?.() || 'dataset';
                  const correctInternalId = `http://linked.earth/lipd/${datasetName}`;
                  
                  // Set the correct internal ID
                  (dataset as any)._id = correctInternalId;
                  
                  const lipd = new LiPD();
                  lipd.loadDatasets([dataset]);
                  
                  const blob: Blob = await (lipd as any).createLipdBrowser(datasetName);
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${dataset.getName?.() || 'dataset'}.lpd`;
                  link.click();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error('Failed to export LiPD file', err);
                }
              }}
            >
              Save
            </Button>
          </Box>

          {/* Settings toggles - compact */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5, 
            ml: 2,
            '& .MuiFormControlLabel-root': {
              mr: 0.5,
            },
            '& .MuiFormControlLabel-label': {
              fontSize: '0.75rem',
              display: { xs: 'none', sm: 'block' }
            }
          }}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isReadonly}
                  onChange={(e) => setIsReadonly(e.target.checked)}
                  color="secondary"
                />
              }
              label="Read-Only"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
              }
              label="Dark"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 2, height: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ flex: 1, minHeight: 0 }}>
            <Paper variant="outlined" sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <RouterProvider>
                {dataset ? (
                  <LiPDApp />
                ) : (
                  <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',textAlign:'center',gap:2, p:4}}>
                    <Typography variant="h5">No dataset loaded</Typography>
                    <Typography variant="body1">Click "Open" in the toolbar or choose a file below to get started.</Typography>
                    <Button component="label" variant="contained">
                      Choose LiPD File
                      <input type="file" hidden accept=".lpd" onChange={handleUploadLIPD} />
                    </Button>
                  </Box>
                )}
              </RouterProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>


    </ThemeProvider>
  );
};

export default App; 