import React from 'react';
import { Box } from '@mui/material';
import { NavigationPanel } from './NavigationPanel';
import { Router } from '../router';
import Header from './Header';
import ConfirmDialog from './ConfirmDialog';
import { useLiPDStore } from '../store';

export const LiPDApp: React.FC = () => {
  const { 
    syncConfirmDialogOpen, 
    setSyncConfirmDialogOpen, 
    confirmSync 
  } = useLiPDStore(state => ({
    syncConfirmDialogOpen: state.syncConfirmDialogOpen,
    setSyncConfirmDialogOpen: state.setSyncConfirmDialogOpen,
    confirmSync: state.confirmSync
  }));

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
        <Box
          sx={{
            width: { xs: 220, md: 260 },
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
        >
          <NavigationPanel />
        </Box>

        {/* Right panel - Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
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