import React from "react";
import { Box } from "@mui/material";


export const Fieldset = ({ children, dense = false }: { children: React.ReactNode; dense?: boolean }) => (
    <Box 
        component="fieldset" 
        sx={{ 
      border: 1,
            borderColor: 'divider',
      borderRadius: 2,
      bgcolor: 'background.paper',
      px: dense ? 0 : 2,
      py: dense ? 0 : 1,
      mt: 2,
      boxShadow: (theme) => (theme.palette.mode === 'light' ? '0 1px 2px rgba(0,0,0,0.05)' : '0 1px 2px rgba(0,0,0,0.3)'),
            '& legend': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
                color: 'text.secondary',
                fontSize: '0.75rem',
        fontWeight: 500,
        px: 0.5,
                '& .MuiButton-root': {
                    fontSize: '0.75rem',
                    borderRadius: 1,
          color: 'text.primary',
          ml: 1,
                    '&:hover': {
            bgcolor: 'action.hover',
          },
                },
                '& .MuiSvgIcon-root': {
          fontSize: '0.9rem',
        },
      },
        }}
    >
        {children}
    </Box>
);