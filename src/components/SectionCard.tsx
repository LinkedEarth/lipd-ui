import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface SectionCardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  dense?: boolean;
}

/**
 * SectionCard – modern replacement for legacy Fieldset.
 * Provides an outlined Paper with a header row (title + optional action)
 * and content area with configurable padding.
 */
const SectionCard: React.FC<SectionCardProps> = ({ title, action, children, dense = false }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        my: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: (theme) => theme.palette.action.hover,
          px: 1.5,
          py: 0.75,
        }}
      >
        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {action && <Box>{action}</Box>}
      </Box>

      {/* Content */}
      <Box sx={{ px: dense ? 1 : 2, py: dense ? 0.5 : 1.5 }}>{children}</Box>
    </Paper>
  );
};

export default SectionCard; 