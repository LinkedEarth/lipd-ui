import React from 'react';
import { Box, Divider } from '@mui/material';
import { NavigationPanel } from './NavigationPanel';
import { Router } from '../router';
import AppBarBreadcrumbs from './AppBarBreadcrumbs';
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
    <div>
        <Box sx={{ px: 2, py: 1 }}>
            <AppBarBreadcrumbs />
        </Box>
        <Divider />    
        <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Left panel - Navigation */}
        <Box sx={{ 
            width: 300, 
            flexShrink: 0, 
            borderRight: 1, 
            borderColor: 'divider',
            overflow: 'auto'
        }}>
            <NavigationPanel />
        </Box>
        
        {/* Right panel - Content */}
        <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 2
        }}>
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
    </div>
  );
}; 