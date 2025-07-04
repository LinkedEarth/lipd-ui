import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import {
    ExpandMoreIcon,
    ChevronRightIcon,
    FolderIcon,
    DescriptionIcon,
    ArticleIcon,
    TableChartIcon,
    TableRowsIcon
} from './CustomIcons';
import { useLiPDStore } from '../store';
import { AppState } from '../types';

interface TreeItemProps {
    node: any;
    label: string;
    nodeId: string;
    hasChildren: boolean;
    level?: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ 
    node, 
    label, 
    nodeId, 
    hasChildren, 
    level = 0 
}) => {
    const { expandedNodes, selectedNode, setSelectedNode, toggleExpandNode } = useLiPDStore((state: AppState) => ({
        expandedNodes: state.expandedNodes,
        selectedNode: state.selectedNode,
        setSelectedNode: state.setSelectedNode,
        toggleExpandNode: state.toggleExpandNode
    }));

    const isExpanded = expandedNodes.has(nodeId);
    const isSelected = selectedNode === nodeId;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // console.log('TreeItem clicked:', nodeId);
        setSelectedNode(nodeId);
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleExpandNode(nodeId);
    };

    const getIcon = () => {
        const parts = nodeId.split('.');

        if (parts[0] === 'dataset') {
            return <DescriptionIcon />;
        }

        if (parts[0] === 'paleoData') {
            if (parts.length >= 3 && parts[2] === 'measurementTables') {
                return <TableChartIcon />;
            }
            return <FolderIcon />;
        }

        if (parts[0] === 'publications') {
            return <ArticleIcon />;
        }

        if (parts[0] === 'chronData') {
            return <TableRowsIcon />;
        }

        return <DescriptionIcon />;
    };

    // Convert label to string, handling object cases
    const safeLabel = typeof label === 'object' && label !== null ? 
        JSON.stringify(label) : 
        String(label || '');

    return (
        <ListItem
            button
            onClick={handleClick}
            selected={isSelected}
            sx={{
                pl: level * 2 + 1,
                borderLeft: isSelected ? '2px solid' : 'none',
                borderColor: 'primary.main',
                bgcolor: isSelected ? 'action.selected' : 'inherit'
            }}
        >
            {hasChildren && (
                <ListItemIcon onClick={handleToggle} sx={{ minWidth: 24 }}>
                    {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
            )}
            {!hasChildren && (
                <ListItemIcon sx={{ minWidth: 24 }}>
                    {getIcon()}
                </ListItemIcon>
            )}
            <ListItemText primary={safeLabel} />
        </ListItem>
    );
};

export default TreeItem; 