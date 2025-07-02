import React, { useRef, useState, useEffect } from 'react';
import { 
    TextField, Typography, Link, Box
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { formVariant } from '../utils/utils';

// TextField component with proper hook usage
export const FormTextField = React.memo(({ 
    label, 
    defaultValue, 
    type, 
    multiline, 
    rows, 
    onBlur,
    disabled = false
}: { 
    label: string;
    defaultValue: string | number;
    type?: string;
    multiline?: boolean;
    rows?: number;
    onBlur: (value: string) => void;
    disabled?: boolean;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // Use local state for immediate UI rendering
    const [value, setValue] = useState(defaultValue?.toString() || '');
    // Track the last value we sent to parent to prevent duplicate updates
    const lastUpdateRef = useRef(defaultValue?.toString() || '');
    
    // Update local state when defaultValue prop changes (like during undo)
    useEffect(() => {
        setValue(defaultValue?.toString() || '');
        // Also update our tracking ref when props change
        lastUpdateRef.current = defaultValue?.toString() || '';
    }, [defaultValue]);
    
    const handleUpdate = (newValue: string) => {
        // Only notify parent if value has changed AND we haven't already sent this update
        if (newValue !== defaultValue?.toString() && newValue !== lastUpdateRef.current) {
            // Store the value we're about to send to prevent duplicates
            lastUpdateRef.current = newValue;
            onBlur(newValue);
        }
    };
    
    if (disabled) {
        if (value === undefined || value === null || value.toString().trim() === '') return null;
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    py: 0.5,
                    columnGap: 1,
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexBasis: { xs: '35%', sm: '25%', md: '20%' }, flexShrink: 0, fontWeight: 500 }}
                >
                    {label}
                </Typography>
                <Box sx={{ flex: 1 }}>
                    {typeof value === 'string' && value.match(/^https?:\/\//) ? (
                        <Link href={value} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: '1rem' }}>
                            {value}
                        </Link>
                    ) : (
                        <Typography component="span" variant="body1">
                            {value}
                        </Typography>
                    )}
                </Box>
            </Box>
        );
    }

    return (
        <FormControl variant={formVariant} sx={{ mt: 1,width: '100%' }}>
            <TextField
                inputRef={inputRef}
                label={label}
                value={value}
                variant={formVariant}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                onBlur={() => {
                    if (inputRef.current) {
                        handleUpdate(inputRef.current.value);
                    }
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' && inputRef.current) {
                        handleUpdate(inputRef.current.value);
                        inputRef.current.blur();
                    }
                }}
                fullWidth
                size="small"
                margin="dense"
                type={type}
                multiline={multiline}
                rows={rows}
                sx={{ width: '100%' }}
            />
        </FormControl>
    );
});