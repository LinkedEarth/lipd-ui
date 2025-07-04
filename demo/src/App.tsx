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
  Box,
  CircularProgress
} from '@mui/material';
import { 
  LiPDApp, 
  useLiPDStore, 
  setLiPDStoreCallbacks,
  RouterProvider,
  SyncProgressBar 
} from '@linkedearth/lipd-ui';

import { Logger, LogLevel } from 'lipdjs';
import BrowserAppBarActions from './BrowserAppBarActions';

// Enable debug-level logging to see all CSV lookup details
const logger = Logger.getInstance();
logger.setLogLevel(LogLevel.DEBUG);

// Set up empty callbacks for browser environment
// Browser uses the custom BrowserAppBarActions instead of store callbacks
setLiPDStoreCallbacks({});

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  
  const { 
    setThemeMode, 
    setReadonly,
    dataset,
    isLoading,
    loadingMessage 
  } = useLiPDStore(state => ({
    setThemeMode: state.setThemeMode,
    setReadonly: state.setReadonly,
    dataset: state.dataset,
    isLoading: state.isLoading,
    loadingMessage: state.loadingMessage
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            LiPD Editor
          </Typography>
          
          {/* File operations */}
          <BrowserAppBarActions />

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
                {isLoading ? (
                  <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',textAlign:'center',gap:2, p:4}}>
                    <CircularProgress size={40} />
                    <Typography variant="h5">Loading dataset...</Typography>
                    {loadingMessage && (
                      <Typography variant="body2" color="text.secondary">
                        {loadingMessage}
                      </Typography>
                    )}
                  </Box>
                ) : dataset ? (
                  <LiPDApp 
                    headerProps={{ showAppBarActions: false }}
                  />
                ) : (
                  <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',textAlign:'center',gap:2, p:4}}>
                    <Typography variant="h5">No dataset loaded</Typography>
                    <Typography variant="body1">Use the "New" or "Open" buttons in the toolbar to get started.</Typography>
                  </Box>
                )}
              </RouterProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Sync Progress Bar - shown when syncing */}
      <SyncProgressBar />
    </ThemeProvider>
  );
};

export default App; 