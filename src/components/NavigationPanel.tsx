import React from 'react';
import { Box, CircularProgress, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Dataset } from 'lipdjs';
import { useLiPDStore } from '../store';

// Close icon component
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const NavigationPanel: React.FC = () => {
    const { dataset, expandedNodes, setExpandedNodes, setSelectedNode, setNavPanelOpen } = useLiPDStore((state: any) => ({
        dataset: state.dataset,
        expandedNodes: state.expandedNodes,
        setExpandedNodes: state.setExpandedNodes,
        setSelectedNode: state.setSelectedNode,
        setNavPanelOpen: state.setNavPanelOpen
    }));
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    if (!dataset) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    let workingDataset = dataset;
    if (!(workingDataset instanceof Dataset)) {
        workingDataset = Dataset.fromDictionary(workingDataset);
    }

    const handleNodeToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpandedNodes(new Set(nodeIds));
    };

    const handleNodeSelect = (
        event: React.SyntheticEvent<Element, Event>,
        itemIds: string | string[]
    ) => {
        if (Array.isArray(itemIds)) {
            setSelectedNode(itemIds[0] || '');
        } else {
            setSelectedNode(itemIds);
        }
    };

    const renderPaleoDataTree = () => {
        return (
            <TreeItem itemId="dataset.paleoData" label="PaleoData">
                {workingDataset.getPaleoData()?.map((paleoData, paleoIndex) => {
                    const paleoNodeId = `dataset.paleoData.${paleoIndex}`;
                    return (
                        <TreeItem key={paleoNodeId} itemId={paleoNodeId} label={paleoData.getName() || `PaleoData ${paleoIndex + 1}`}>
                            {paleoData.getMeasurementTables()?.map((table, tableIndex) => {
                                const tableNodeId = `dataset.paleoData.${paleoIndex}.measurementTables.${tableIndex}`;
                                return (
                                    <TreeItem 
                                        key={tableNodeId} 
                                        itemId={tableNodeId} 
                                        label={table.getFileName() || `Table ${tableIndex + 1}`}
                                    />
                                );
                            })}
                        </TreeItem>
                    );
                })}
            </TreeItem>
        );
    };

    const renderChronDataTree = () => {
        return (
            <TreeItem itemId="dataset.chronData" label="ChronData">
                {workingDataset.getChronData()?.map((chronData, chronIndex) => {
                    const chronNodeId = `dataset.chronData.${chronIndex}`;
                    return (
                        <TreeItem key={chronNodeId} itemId={chronNodeId} label={`ChronData ${chronIndex + 1}`}>
                            {chronData.getMeasurementTables()?.map((table, tableIndex) => {
                                const tableNodeId = `dataset.chronData.${chronIndex}.measurementTables.${tableIndex}`;
                                return (
                                    <TreeItem 
                                        key={tableNodeId} 
                                        itemId={tableNodeId} 
                                        label={table.getFileName() || `Table ${tableIndex + 1}`}
                                    />
                                );
                            })}
                        </TreeItem>
                    );
                })}
            </TreeItem>
        );
    };

    const renderPublicationsTree = () => {
        return (
            <TreeItem itemId="dataset.publications" label="Publications">
                {workingDataset.getPublications()?.map((publication, index) => {
                    const pubNodeId = `dataset.publications.${index}`;
                    return (
                        <TreeItem 
                            key={pubNodeId} 
                            itemId={pubNodeId} 
                            label={publication.getTitle() || `Publication ${index + 1}`}
                        />
                    );
                })}
            </TreeItem>
        );
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Mobile close button */}
            {isMobile && (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    p: 1, 
                    borderBottom: 1, 
                    borderColor: 'divider' 
                }}>
                    <IconButton
                        size="small"
                        onClick={() => setNavPanelOpen(false)}
                        aria-label="Close navigation"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
            
            <Box sx={{ p: 1, flex: 1, overflow: 'hidden' }}>
                <SimpleTreeView
                aria-label="dataset navigation"
                expandedItems={Array.from(expandedNodes)}
                onExpandedItemsChange={handleNodeToggle}
                onSelectedItemsChange={handleNodeSelect}
                sx={{
                    height: '100%',
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: 'auto',
                    '& .MuiTreeItem-content': {
                        py: 0.2,
                    },
                    '& .MuiTreeItem-label': {
                        fontSize: '0.75rem',
                    },
                }}
            >
                <TreeItem itemId="dataset" label="Dataset">
                    <TreeItem itemId="dataset.location" label="Location" />
                    {renderPaleoDataTree()}
                    {renderChronDataTree()}
                    {renderPublicationsTree()}
                    <TreeItem itemId="dataset.changeLogs" label="ChangeLogs" />
                </TreeItem>
            </SimpleTreeView>
            </Box>
        </Box>
    );
}; 