import { ReactNode } from 'react';
import ReactQuill from 'react-quill';
// @mui
import { styled } from '@mui/material/styles';
import { Box, SxProps, Theme } from '@mui/material';
//
import EditorToolbar, { formats, redoChange, undoChange } from './EditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

interface EditorProps {
  id?: string;
  value: string;
  onChange: () => void;
  error: boolean;
  helperText: ReactNode;
  sx?: SxProps<Theme>;

  [key: string]: any;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} />
        <ReactQuill
          modules={modules}
          value={value}
          onChange={onChange}
          formats={formats}
          placeholder='Write something awesome...'
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
