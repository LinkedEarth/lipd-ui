# Changelog

All notable changes to this project will be documented in this file.

## [0.5.1] - 2025-01-04

### 🐛 Bug Fixes
- **Error Notifications**: Fixed missing error notifications in demo application
- **User Feedback**: Added comprehensive error and success notifications for all file operations
- **TypeScript Errors**: Resolved type errors in error handling callbacks
- **Loading States**: Improved loading state management with proper error cleanup

### ✨ Enhancements
- **Notification System**: Added Snackbar notifications for better user experience
- **Error Messages**: More descriptive error messages with operation context
- **Success Feedback**: Success notifications for all successful operations
- **Demo UX**: Enhanced demo with visual feedback for all user actions

### 📦 Technical
- Added `setSuccess` method to store for success notifications
- Improved error handling in `BrowserAppBarActions` component
- Better TypeScript typing for error callbacks
- Consistent notification display across all environments

---

## [0.5.0] - 2025-01-04

### 🚀 Major Features
- **Environment-Agnostic Architecture**: Complete separation of VS Code dependencies from core library
- **Flexible AppBarActions**: Configurable toolbar actions that adapt to different environments
- **Enhanced GraphDB Integration**: Full CORS support for authenticated save/load operations
- **Improved Loading Experience**: Comprehensive loading indicators across all environments

### ✨ New Features
- **LiPDActions Class**: Unified action system for file operations across all environments
- **Callback System**: `setLiPDStoreCallbacks()` for environment-specific integrations
- **Dataset Name Sanitization**: Automatic sanitization using lipdjs internal logic
- **Remote Dialog Enhancements**: Graph existence checking with visual feedback
- **Buffer Polyfill**: Browser compatibility for Node.js dependencies

### 🔧 Improvements
- **VS Code Extension**: Async dataset loading with immediate loading screens
- **Browser Demo**: Complete file operations with GraphDB connectivity
- **Type Safety**: Enhanced TypeScript support with proper exports
- **Build System**: Optimized for multiple target environments

### 🐛 Bug Fixes
- **CORS Issues**: Resolved all cross-origin request blocking
- **Loading States**: Fixed missing loading indicators in all environments
- **Dataset URIs**: Consistent graph URI generation across save/load operations
- **Character Encoding**: Proper handling of special characters in dataset names
- **Component Exports**: Fixed export/import issues across components

### 🔄 Breaking Changes
- **AppBarActions Configuration**: Apps now need to configure `headerProps` for `LiPDApp`
- **Store Callbacks**: Extensions must implement `setLiPDStoreCallbacks()` for functionality
- **VS Code Integration**: Extensions need to use new callback-based architecture

### 📦 Dependencies
- Added `buffer` polyfill for browser compatibility
- Updated GraphDB CORS headers for compression support
- Enhanced Vite configuration for Node.js polyfills

### 🗂️ Examples
- Updated browser implementation examples
- Added VS Code extension integration examples  
- Comprehensive environment setup documentation

---

## [0.4.0] - 2024-07-02

### Added
- Full visual refresh: modern header, navigation panel, SectionCard container, compact DataTable grid
- Read-only mode improvements: aligned label/value pairs, enum chips, hyperlink lists with bullets
- Responsive layout tweaks across LiPDApp and demo
- Comprehensive `.gitignore` to avoid committing `node_modules` and build artefacts

### Changed
- Switched legacy `<fieldset>` containers to new `SectionCard` component
- Reduced tree navigation font size and spacing, added dynamic labels for PaleoData/ChronData, Calibration, and Interpretation items
- DataGrid now mimics spreadsheet look with dense rows and bold uppercase headers

### Fixed
- Correct labels for Interpretation, Calibration, PaleoData, ChronData lists
- Consistent font sizes across components, especially in read-only views

### Build
- Bumped version to 0.4.0

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