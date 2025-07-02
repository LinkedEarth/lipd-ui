# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2024-07-02

### Added
- **Sync Confirmation Dialog**: Added confirmation dialog before syncing to GraphDB
  - Users are now prompted to confirm sync operations before they proceed
  - Dialog includes warning about authentication requirements
  - Users can cancel sync operations before they start
  - Implements user-friendly confirmation workflow for database updates

### Changed
- Modified `syncDataset()` function to show confirmation dialog instead of immediately syncing
- Updated `AppState` interface to include `syncConfirmDialogOpen` state
- Enhanced sync workflow with better user control and safety

### Technical Details
- Added `setSyncConfirmDialogOpen()` and `confirmSync()` functions to store
- Integrated `ConfirmDialog` component into `LiPDApp` 
- Updated VS Code extension to use new confirmation functionality
- Maintained backward compatibility with existing sync progress indicators

### Security
- Improved user awareness of authentication requirements for GraphDB sync operations
- Added safety mechanism to prevent accidental data uploads

## [0.2.0] - Previous Release
- Initial implementation of LiPD UI component library
- Basic sync functionality
- Navigation and editor panels 