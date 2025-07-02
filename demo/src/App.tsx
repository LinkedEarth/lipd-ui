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
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  LiPDApp, 
  useLiPDStore, 
  RouterProvider 
} from '@linkedearth/lipd-ui';

import { LiPD } from 'lipdjs';
import { Logger, LogLevel } from 'lipdjs';

// Enable debug-level logging to see all CSV lookup details
const logger = Logger.getInstance();
logger.setLogLevel(LogLevel.DEBUG);

import JSZip from 'jszip';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [graphDialogOpen, setGraphDialogOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [graphInput, setGraphInput] = useState('');
  
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

  const handleLoadFromUrl = async () => {
    if (!urlInput) return;
    try {
      const lipd = new LiPD();
      await lipd.load(urlInput);
      const loaded = await lipd.getDatasets();
      if (loaded.length > 0) {
        setDataset(loaded[0]);
      }
      setUrlDialogOpen(false);
      setUrlInput('');
    } catch (err) {
      console.error('Failed to load LiPD URL', err);
    }
  };

  const handleLoadFromGraph = async () => {
    if (!graphInput) return;
    try {
      const lipd = new LiPD();
      // Default endpoint – adjust if needed
      lipd.setEndpoint('https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic');
      await lipd.loadRemoteDatasets(graphInput);
      const loaded = await lipd.getDatasets();
      if (loaded.length > 0) {
        setDataset(loaded[0]);
      }
      setGraphDialogOpen(false);
      setGraphInput('');
    } catch (err) {
      console.error('Failed to load LiPD from GraphDB', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            LiPD UI Library Demo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip 
              label={isReadonly ? 'Read-Only Mode' : 'Edit Mode'} 
              color={isReadonly ? 'secondary' : 'primary'} 
              variant="outlined" 
            />
            <FormControlLabel
              control={
                <Switch
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
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
              }
              label="Dark Mode"
            />
            <Button
              component="label"
              variant="outlined"
              size="small"
            >
              Load LiPD
              <input
                type="file"
                hidden
                accept=".lpd"
                onChange={handleUploadLIPD}
              />
            </Button>
            <Button variant="outlined" size="small" onClick={() => setUrlDialogOpen(true)}>
              Load from URL
            </Button>
            <Button variant="outlined" size="small" onClick={() => setGraphDialogOpen(true)}>
              Load from GraphDB
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={async () => {
                if (!dataset) return;
                try {
                  const lipdMod = await import('lipdjs');
                  const lipd = new lipdMod.LiPD();
                  lipd.loadDatasets([dataset]);
                  // Use browser-safe creator (assumes lipdjs >= 0.2.7)
                  const dsName = dataset.getName?.() || 'dataset';
                  const blob: Blob = await (lipd as any).createLipdBrowser(dsName);
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
              Download LiPD
            </Button>
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
                    <Typography variant="body1">Load a LiPD file, enter a URL, or fetch from GraphDB to get started.</Typography>
                    <Box sx={{display:'flex',gap:2}}>
                      <Button component="label" variant="contained">
                        Choose File
                        <input type="file" hidden accept=".lpd" onChange={handleUploadLIPD} />
                      </Button>
                      <Button variant="contained" onClick={()=>setUrlDialogOpen(true)}>From URL</Button>
                      <Button variant="contained" onClick={()=>setGraphDialogOpen(true)}>From GraphDB</Button>
                    </Box>
                  </Box>
                )}
              </RouterProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* URL Dialog */}
      <Dialog open={urlDialogOpen} onClose={()=>setUrlDialogOpen(false)}>
        <DialogTitle>Load LiPD from URL</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="URL" fullWidth value={urlInput} onChange={e=>setUrlInput(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setUrlDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLoadFromUrl} variant="contained">Load</Button>
        </DialogActions>
      </Dialog>

      {/* GraphDB Dialog */}
      <Dialog open={graphDialogOpen} onClose={()=>setGraphDialogOpen(false)}>
        <DialogTitle>Load LiPD from GraphDB</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Dataset Name" fullWidth value={graphInput} onChange={e=>setGraphInput(e.target.value)} helperText="Enter dataset name, e.g., Ocn-MadangLagoonPapuaNewGuinea.Kuhnert.2001" />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setGraphDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLoadFromGraph} variant="contained">Load</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default App; 