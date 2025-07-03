import React from 'react';

interface IconProps {
  fontSize?: 'small' | 'medium' | 'large';
  sx?: any;
  style?: React.CSSProperties;
}

const getIconSize = (fontSize: string = 'medium') => {
  switch (fontSize) {
    case 'small': return '16px';
    case 'large': return '20px';
    default: return '18px';
  }
};

export const ArrowBackIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
    </svg>
  );
};

export const NavigateNextIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
};

export const HomeIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export const SaveIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </svg>
  );
};

export const SaveAsIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
        <path d="M12 3L12 16"/>
        <path d="M7 11L12 16L17 11"/>
        <path d="M4 18L4 20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22L18 22C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20L20 18" />
    </svg>
  );
};

export const UndoIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </svg>
  );
};

export const RedoIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 15.5c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 15h9V6l-3.6 4.6z" />
    </svg>
  );
};

export const SyncIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
    </svg>
  );
};

export const AddIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
};

export const EditIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
};

export const DeleteIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
};

export const ExpandMoreIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
};

export const ChevronRightIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
};

export const DescriptionIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
};

export const TableChartIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
    </svg>
  );
};

export const FolderIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
    </svg>
  );
};

export const ArticleIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
};

export const TableRowsIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M21 8c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1zM4 13h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm16 2H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
  );
};

export const CheckIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
};

export const FileUploadIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7l-4-4-4 4h3v4h2v-4h3z" />
    </svg>
  );
};

export const FileDownloadIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  );
};

export const MenuIcon: React.FC<IconProps> = ({ fontSize = 'medium', sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}
      {...props}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}; 