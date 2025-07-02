import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Dataset } from 'lipdjs';
import { useLiPDStore } from '../store';

export const NavigationPanel: React.FC = () => {
    const { dataset, expandedNodes, setExpandedNodes, setSelectedNode } = useLiPDStore((state: any) => ({
        dataset: state.dataset,
        expandedNodes: state.expandedNodes,
        setExpandedNodes: state.setExpandedNodes,
        setSelectedNode: state.setSelectedNode
    }));
    
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
        <Box sx={{ p: 1, height: '100%' }}>
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
    );
}; 