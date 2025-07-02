import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import AppBarBreadcrumbs from './AppBarBreadcrumbs';
// import AppBarActions from './AppBarActions';

/**
 * Header component – provides a minimal, professional application bar
 * with breadcrumbs and action icons.
 */
const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* Reduced height for a sleeker appearance */}
      <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}>
        {/* Breadcrumb navigation fills remaining space */}
        <AppBarBreadcrumbs />

        {/* You can re-enable action icons by adding <AppBarActions /> here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 