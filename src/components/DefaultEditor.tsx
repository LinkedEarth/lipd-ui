import React from 'react';
import { 
    Grid, 
    Box, 
    Typography,
} from '@mui/material';
import { Schema, SchemaField } from '../schemas';

import { Location } from 'lipdjs';
import LocationEditor from './LocationEditor';
import { getValueFromPath } from '../utils/utils';
import { EditorProps } from '../router';
import { DefaultListEditor } from './DefaultListEditor';
import { DefaultEnumEditor } from './DefaultEnumEditor';
import { FormTextField } from './FormTextField';
import SectionCard from './SectionCard';


export const DefaultEditor: React.FC<EditorProps> = ({ 
    dataset, 
    path, 
    params, 
    onUpdate, 
    schema, 
    columns = 1, 
    dense = true, 
    title = '',
    fieldSchema = {type: 'object'} as SchemaField,
    useFieldset = false,
    readonly = false
}) => {
    // console.log("Invoked Default Editor for path:", path)

    const renderField = () => {
        const parts = path.split('.');
        const fieldName = parts[parts.length - 1];

        // Skip internal fields
        if (fieldName.startsWith('_')) return null;
        
        // Get the value from the dataset using the current path
        const value = getValueFromPath(dataset, path);
        // console.log('renderField:', fieldName, path, value);

        if (fieldSchema.type === 'enum') {
            return (
                <DefaultEnumEditor
                    dataset={dataset}
                    path={path}
                    params={params}
                    onUpdate={onUpdate}
                    schema={schema}
                    fieldSchema={fieldSchema}
                    readonly={readonly}
                />
            )
        }

        if (fieldSchema.type === 'string' || fieldSchema.type === 'number') {
            return (
                <FormTextField 
                    key={path}
                    label={fieldSchema.label || fieldName}
                    defaultValue={value || ''}
                    type={fieldSchema.type}
                    multiline={fieldSchema.multiline}
                    rows={fieldSchema.rows}
                    onBlur={(newValue) => onUpdate(path, newValue)}
                    disabled={readonly}
                />
            );
        }

        if (fieldSchema.type === 'object') {
            // console.log('renderObject:', fieldName, path, value);
            const content = (
                <>
                <Box sx={{p: dense? 0 : 1}}>
                    {fieldName === 'location' && (
                        <LocationEditor
                            dataset={dataset}
                            path={path}
                            params={params}
                            onUpdate={onUpdate}
                            title={title}
                            readonly={readonly}
                        />
                    )}                     
                    {Object.entries(schema?.fields || {}).map(([fieldName, subSchema]) => {
                        if (subSchema.hidden) return null;
                        return (
                            <DefaultEditor
                                key={`${path}.${fieldName}`}
                                dataset={dataset}
                                path={`${path}.${fieldName}`}
                                params={params}
                                onUpdate={onUpdate}
                                schema={subSchema.schema as Schema}
                                columns={columns}
                                dense={false}
                                fieldSchema={subSchema as SchemaField}
                                useFieldset={true}
                                readonly={readonly}
                            />
                        )
                    })}                   
                </Box>
                </>
            );
            
            return useFieldset ? (
                readonly ? (
                    <Box sx={{ mt: dense ? 0.5 : 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {title || fieldSchema.label || fieldName}
                        </Typography>
                        {content}
                    </Box>
                ) : (
                    <SectionCard dense={dense} title={title || fieldSchema.label || fieldName}>
                    {content}
                    </SectionCard>
                )
            ) : content;
        }

        if (fieldSchema.type === 'array' && fieldSchema.items) {
            return (
                <DefaultListEditor
                    dataset={dataset}
                    fieldSchema={fieldSchema}
                    schema={fieldSchema.items.schema as Schema}
                    title={fieldSchema.label || fieldName}
                    onUpdate={onUpdate}
                    path={path}
                    dense={true}
                    readonly={readonly}
                />
            )
        }
        return null;
    };

    // Call appropriate editor based on type
    return renderField();
};