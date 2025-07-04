import React from 'react';
import { Box, Paper, Typography, Grid, TextField, IconButton, Button, Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dataset, Variable } from 'lipdjs';
import { useLiPDStore } from '../store';
import { AddIcon, FileUploadIcon, FileDownloadIcon, DeleteIcon } from './CustomIcons';
import ListView from './ListView';
import { variableSchema } from '../schemas';
import { formVariant, getValueFromPath } from '../utils/utils';
import { EditorProps, useRouter } from '../router';
import { FormTextField } from './FormTextField';

export const DataTableEditor: React.FC<EditorProps> = ({ path, params, onUpdate, title = '', readonly = false }) => {
    const dataset = useLiPDStore((state: any) => state.dataset);
    const { navigateTo } = useRouter();
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [csvDialogOpen, setCsvDialogOpen] = React.useState(false);
    const [csvContent, setCsvContent] = React.useState('');
    
    const { selectedNode, setSelectedNode } = useLiPDStore(state => ({
        selectedNode: state.selectedNode,
        setSelectedNode: state.setSelectedNode
    }));

    const table = getValueFromPath(dataset, path) as any;
    const columns = table.getVariables() || [];
    const dataList = table.getDataList() || { data: [], metadata: [] };

    const rows = (dataList.data || []).length > 0 ? 
        (dataList.data[0] || []).map((_: any, colIndex: number) => 
            (dataList.data || []).map((row: any[]) => row[colIndex] || '')
        ) : 
        [];

    const metadata = dataList.metadata || [];
    const variables = table.getVariables() || [];

    const handleAddRow = () => {
        // Create a new empty row with appropriate number of columns
        const newRow = Array(columns.length).fill('');
        
        // Add the new row to the data
        const updatedRows = [...rows, newRow];
        
        // Update the table with the new data
        table.setDataList({ 
            data: updatedRows, 
            metadata: metadata 
        });
        
        onUpdate(path, table);
    };

    const handleDeleteRow = (rowIndex: number) => {
        // Create a copy of the rows and remove the specified row
        const updatedRows = [...rows];
        updatedRows.splice(rowIndex, 1);
        
        // Update the table with the modified data
        table.setDataList({ 
            data: updatedRows, 
            metadata: metadata 
        });
        
        onUpdate(path, table);
    };

    const handleAddVariable = () => {
        const newVariable = new Variable();
        const updatedVariables = [...variables, newVariable];
        table.setVariables(updatedVariables);
        onUpdate(path, table);
        // Navigate to the new variable
        const newIndex = variables.length;
        setSelectedNode(`${selectedNode}.variables.${newIndex}`);
    };

    const handleEditVariable = (index: number) => {
        setSelectedNode(`${selectedNode}.variables.${index}`);
    };

    const handleDeleteVariable = (index: number) => {
        const updatedVariables = [...variables];
        updatedVariables.splice(index, 1);
        table.setVariables(updatedVariables);
        onUpdate(path, table);
    };

    const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvText = e.target?.result as string;
            const lines = csvText.split('\n');
            const headers = lines[0].split(',').map(header => header.trim());
            
            // Create variables for new columns if they don't exist
            const existingVariables = table.getVariables() || [];
            const existingVariableNames: string[] = existingVariables.map((v: Variable) => v.getName());
            
            headers.forEach((header: string) => {
                if (!existingVariableNames.includes(header)) {
                    const newVariable = new Variable();
                    newVariable.setName(header);
                    existingVariables.push(newVariable);
                }
            });
            table.setVariables(existingVariables);
            
            // Parse the data as a list of lists
            const newData: any[][] = [];
            
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const values = lines[i].split(',').map(value => value.trim());
                newData.push(values);
            }
            let metadata = table.getDataList().metadata
            table.setDataList({ data: newData, metadata: metadata });
            onUpdate(path, table);
        };
        reader.readAsText(file);
    };

    const handleExportCSV = () => {
        const headers = columns.map((column: Variable) => column.getName());
        let csvContent = headers.join(',') + '\n';
        
        // Convert rows to CSV
        rows.forEach((rowData: any[]) => {
            csvContent += rowData.join(',') + '\n';
        });
        
        setCsvContent(csvContent);
        setCsvDialogOpen(true);
    };

    const gridColumns: GridColDef[] = [
        ...columns.map((column: Variable, colIndex: number) => ({
            field: colIndex.toString(),
            headerName: column.getName(),
            flex: 1,
            minWidth: 150,
            editable: !readonly,
            align: 'left',
            headerAlign: 'left',
            renderHeader: () => (
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        const variablePath = `${selectedNode}.variables.${colIndex}`;
                        navigateTo(variablePath);
                    }}
                    sx={{
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main'
                        }
                    }}
                >
                    {column.getName() || `Variable ${colIndex + 1}`}
                </Link>
            )
        })),
        ...(readonly ? [] : [{
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Box>
                    <IconButton 
                        size="small" 
                        edge="end"
                        aria-label="delete"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation(); // Prevent the row click
                            handleDeleteRow(params.row.rowIndex);
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            ),
        }])
    ];

    // Create grid rows from the list data
    const gridRows = rows.map((rowData: any[], rowIndex: number) => {
        const row: any = { 
            id: rowIndex,
            rowIndex: rowIndex // Store the actual row index for operations
        };
        
        // Add each column value to the row
        columns.forEach((column: Variable, colIndex: number) => {
            row[colIndex.toString()] = rowData[colIndex] || '';
        });
        
        return row;
    });

    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{title}</Typography>
                {!readonly && <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                        size="small"
                        component="label"
                    >
                        Import CSV
                        <input
                            type="file"
                            hidden
                            accept=".csv"
                            onChange={handleImportCSV}
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadIcon />}
                        size="small"
                        onClick={handleExportCSV}
                    >
                        Export CSV
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon sx={{fontSize: 18}}/>}
                        size="small"
                        onClick={handleAddRow}
                    >
                        Add Row
                    </Button>
                </Box>}
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <FormTextField
                        key={`${path}.fileName`}
                        label="File Name"
                        defaultValue={table.getFileName() || ''}
                        onBlur={(value) => {
                            table.setFileName(value);
                            onUpdate(path, table);
                        }}
                        disabled={readonly}
                    />
                </Box>
                <FormTextField
                    key={`${path}.missingValue`}
                    label="Missing Value"
                    defaultValue={table.getMissingValue() || ''}
                    onBlur={(value) => {
                        table.setMissingValue(value);
                        onUpdate(path, table);
                    }}
                    disabled={readonly}
                />
            </Box>

            <Box sx={{ height: 500, width: '100%', mb: 2 }}>
                <DataGrid
                    rows={gridRows}
                    columns={gridColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: rowsPerPage,
                                page: page,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    onPaginationModelChange={(params) => {
                        setPage(params.page);
                        setRowsPerPage(params.pageSize);
                    }}
                    processRowUpdate={(newRow, oldRow) => {
                        // Update the cell value in the data structure
                        const rowIndex = newRow.rowIndex;
                        const updatedRows = [...rows];
                        
                        // Find which column was changed and update the corresponding cell
                        columns.forEach((column: Variable, colIndex: number) => {
                            const fieldKey = colIndex.toString();
                            if (newRow[fieldKey] !== oldRow[fieldKey]) {
                                // Ensure the row exists and has enough columns
                                if (!updatedRows[rowIndex]) {
                                    updatedRows[rowIndex] = Array(columns.length).fill('');
                                }
                                updatedRows[rowIndex][colIndex] = newRow[fieldKey];
                            }
                        });
                        
                        // Update the table with the new data
                        table.setDataList({ 
                            data: updatedRows, 
                            metadata: metadata 
                        });
                        
                        onUpdate(path, table);
                        return newRow;
                    }}
                    onProcessRowUpdateError={(error) => {
                        console.error('Error updating row:', error);
                    }}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    rowHeight={32}
                    columnHeaderHeight={38}
                    sx={{
                        fontFamily: 'monospace',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
                            fontWeight: 700,
                            borderBottom: 1,
                            borderColor: 'divider',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            overflow: 'visible',
                        },
                        '& .MuiDataGrid-cell': {
                            borderRight: '1px solid',
                            borderColor: 'divider',
                            fontSize: '0.75rem',
                            py: 0,
                        },
                        '& .MuiDataGrid-row': {
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            maxHeight: 32,
                        },
                        '& .MuiDataGrid-virtualScrollerRenderZone': {
                            '& .MuiDataGrid-row:last-of-type': {
                                borderBottom: 0,
                            },
                        },
                    }}
                />
            </Box>

            <ListView
                title="Variables"
                schema={variableSchema}
                items={variables}
                onAdd={readonly ? undefined : handleAddVariable}
                onEdit={handleEditVariable}
                onDelete={readonly ? undefined : handleDeleteVariable}
                addButtonText="Add Variable"
                pathPrefix={`${selectedNode}.variables`}
                readonly={readonly}
            />

            <Dialog 
                open={csvDialogOpen} 
                onClose={() => setCsvDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>CSV Data for {table.getFileName() || 'data'}.csv</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        fullWidth
                        value={csvContent}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                            style: { 
                                fontFamily: 'monospace',
                                whiteSpace: 'pre',
                                overflowX: 'auto'
                            }
                        }}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCsvDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};