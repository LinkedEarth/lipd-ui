import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import AppBarBreadcrumbs from './AppBarBreadcrumbs';
import AppBarActions, { AppBarActionsProps } from './AppBarActions';
import { MenuIcon } from './CustomIcons';
import { useLiPDStore } from '../store';

export interface HeaderProps {
  /**
   * Props to pass to the AppBarActions component
   */
  appBarActionsProps?: AppBarActionsProps;
  
  /**
   * Whether to show the AppBarActions component at all
   */
  showAppBarActions?: boolean;
}

/**
 * Header component – provides a minimal, professional application bar
 * with breadcrumbs and action icons.
 */
const Header: React.FC<HeaderProps> = ({ 
  appBarActionsProps = {}, 
  showAppBarActions = true 
}) => {
  const toggleNavPanel = useLiPDStore(state => state.toggleNavPanel);

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* Reduced height for a sleeker appearance */}
      <Toolbar variant="dense" sx={{ minHeight: 48, px: 2 }}>
        {/* Menu toggle for navigation panel */}
        <IconButton
          size="small"
          onClick={toggleNavPanel}
          sx={{ mr: 1 }}
          aria-label="Toggle navigation"
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        {/* Breadcrumb navigation fills remaining space */}
        <AppBarBreadcrumbs />

        {/* Action icons */}
        {showAppBarActions && <AppBarActions {...appBarActionsProps} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 