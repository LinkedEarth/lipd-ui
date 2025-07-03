import React from 'react';
import { Box } from '@mui/material';
import { NavigationPanel } from './NavigationPanel';
import { Router } from '../router';
import Header from './Header';
import ConfirmDialog from './ConfirmDialog';
import { useLiPDStore } from '../store';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const LiPDApp: React.FC = () => {
  const { 
    syncConfirmDialogOpen, 
    setSyncConfirmDialogOpen, 
    confirmSync,
    navPanelOpen,
    setNavPanelOpen
  } = useLiPDStore(state => ({
    syncConfirmDialogOpen: state.syncConfirmDialogOpen,
    setSyncConfirmDialogOpen: state.setSyncConfirmDialogOpen,
    confirmSync: state.confirmSync,
    navPanelOpen: state.navPanelOpen,
    setNavPanelOpen: state.setNavPanelOpen
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-close nav on mobile when first loaded or when switching to mobile
  React.useEffect(() => {
    if (isMobile) {
      setNavPanelOpen(false);
    }
  }, [isMobile, setNavPanelOpen]);

  const handleSyncConfirm = () => {
    confirmSync();
  };

  const handleSyncCancel = () => {
    setSyncConfirmDialogOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top application bar */}
      <Header />

      {/* Main area */}
      <Box sx={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
        {/* Left panel - Navigation */}
        {navPanelOpen && (
          <Box
            sx={{
              width: { xs: 280, md: 320 },
              flexShrink: 0,
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflow: 'auto',
              ...(isMobile && {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                zIndex: 1200,
                boxShadow: 2,
              }),
            }}
          >
            <NavigationPanel />
          </Box>
        )}

        {/* Overlay backdrop for mobile */}
        {isMobile && navPanelOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1100,
            }}
            onClick={() => setNavPanelOpen(false)}
          />
        )}

        {/* Right panel - Content */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 3,
          }}
        >
          <Router />
        </Box>
      </Box>

      {/* Sync Confirmation Dialog */}
      <ConfirmDialog
        open={syncConfirmDialogOpen}
        title="Sync to GraphDB"
        message="Are you sure you want to sync this dataset to GraphDB? This action will update the remote database and requires authentication credentials."
        onConfirm={handleSyncConfirm}
        onCancel={handleSyncCancel}
      />
    </Box>
  );
}; 