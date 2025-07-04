import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  Description as FileIcon,
  Cloud as CloudIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';
import { 
  LiPDActions, 
  useLiPDStore, 
  type RemoteOptions 
} from '@linkedearth/lipd-ui';
import { Dataset } from 'lipdjs';
import RemoteDialog from './RemoteDialog';

const BrowserAppBarActions: React.FC = () => {
  const [openAnchorEl, setOpenAnchorEl] = useState<null | HTMLElement>(null);
  const [saveAnchorEl, setSaveAnchorEl] = useState<null | HTMLElement>(null);
  const [remoteDialogOpen, setRemoteDialogOpen] = useState(false);
  const [remoteDialogMode, setRemoteDialogMode] = useState<'open' | 'save'>('open');
  
  const { dataset, setDataset, setIsLoading, setLoadingMessage } = useLiPDStore(state => ({
    dataset: state.dataset,
    setDataset: state.setDataset,
    setIsLoading: state.setIsLoading,
    setLoadingMessage: state.setLoadingMessage
  }));

  // Initialize LiPD actions with progress handlers that update store state
  const lipdActions = new LiPDActions({
    onProgress: (message) => {
      console.log(message);
      setLoadingMessage(message);
    },
    onError: (error) => {
      console.error(error);
      // Don't automatically clear loading state here - let the specific handlers do it
    },
    onSuccess: (message) => {
      console.log(message);
      // Don't automatically clear loading state here - let the specific handlers do it
    }
  });

  // Handle New
  const handleNew = async () => {
    try {
      setIsLoading(true);
      const newDataset = await lipdActions.createNewLiPD();
      setDataset(newDataset);
      setIsLoading(false); // Clear loading state after successful dataset creation
    } catch (error) {
      console.error('Failed to create new dataset:', error);
      setIsLoading(false);
    }
  };

  // Handle Open Local
  const handleOpenLocal = () => {
    setOpenAnchorEl(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.lpd';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setIsLoading(true);
          const loadedDataset = await lipdActions.openLocalLiPD(file);
          setDataset(loadedDataset);
          setIsLoading(false); // Clear loading state after successful file load
        } catch (error) {
          console.error('Failed to open local file:', error);
          setIsLoading(false);
        }
      }
    };
    input.click();
  };

  // Handle Open Remote
  const handleOpenRemote = () => {
    setOpenAnchorEl(null);
    setRemoteDialogMode('open');
    setRemoteDialogOpen(true);
  };

  // Handle Save Local
  const handleSaveLocal = async () => {
    setSaveAnchorEl(null);
    if (!dataset) return;
    
    try {
      await lipdActions.downloadLiPD(dataset);
    } catch (error) {
      console.error('Failed to save local file:', error);
    }
  };

  // Handle Save Remote
  const handleSaveRemote = () => {
    setSaveAnchorEl(null);
    setRemoteDialogMode('save');
    setRemoteDialogOpen(true);
  };

  // Handle Remote Dialog Confirm
  const handleRemoteConfirm = async (options: RemoteOptions, datasetName?: string) => {
    try {
      setIsLoading(true);
      if (remoteDialogMode === 'open' && datasetName) {
        const loadedDataset = await lipdActions.openRemoteLiPD(datasetName, options);
        setDataset(loadedDataset);
        setIsLoading(false); // Clear loading state after successful remote load
      } else if (remoteDialogMode === 'save' && dataset) {
        await lipdActions.saveRemoteLiPD(dataset, options);
        setIsLoading(false); // Clear loading state after successful remote save
      }
    } catch (error) {
      console.error('Remote operation failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* New Button */}
      <Button
        variant="outlined"
        size="small"
        onClick={handleNew}
        startIcon={<FileIcon />}
      >
        New
      </Button>

      {/* Open Button with Dropdown */}
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setOpenAnchorEl(e.currentTarget)}
        endIcon={<ArrowDownIcon />}
        startIcon={<CloudDownloadIcon />}
      >
        Open
      </Button>
      
      <Menu
        anchorEl={openAnchorEl}
        open={Boolean(openAnchorEl)}
        onClose={() => setOpenAnchorEl(null)}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenLocal}>
          <ListItemIcon>
            <FileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Local File" secondary="Upload .lpd file" />
        </MenuItem>
        <MenuItem onClick={handleOpenRemote}>
          <ListItemIcon>
            <CloudIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remote (GraphDB)" secondary="Load from endpoint" />
        </MenuItem>
      </Menu>

      {/* Save Button with Dropdown */}
      <Button
        variant="outlined"
        size="small"
        disabled={!dataset}
        onClick={(e) => setSaveAnchorEl(e.currentTarget)}
        endIcon={<ArrowDownIcon />}
        startIcon={<CloudUploadIcon />}
      >
        Save
      </Button>
      
      <Menu
        anchorEl={saveAnchorEl}
        open={Boolean(saveAnchorEl)}
        onClose={() => setSaveAnchorEl(null)}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSaveLocal}>
          <ListItemIcon>
            <FileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Local Download" secondary="Download .lpd file" />
        </MenuItem>
        <MenuItem onClick={handleSaveRemote}>
          <ListItemIcon>
            <CloudIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remote (GraphDB)" secondary="Upload to endpoint" />
        </MenuItem>
      </Menu>

      {/* Remote Dialog */}
      <RemoteDialog
        open={remoteDialogOpen}
        onClose={() => setRemoteDialogOpen(false)}
        onConfirm={handleRemoteConfirm}
        mode={remoteDialogMode}
      />
    </Box>
  );
};

export default BrowserAppBarActions; 