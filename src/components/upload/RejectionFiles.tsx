import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
// utils
import { fData } from '~/utils';

// ----------------------------------------------------------------------

interface RejectionFilesProps {
  fileRejections: Array<any>;
}

export default function RejectionFiles({
  fileRejections,
}: RejectionFilesProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>

            {errors.map(
              (error: {
                code: Key | null | undefined;
                message:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
              }) => (
                <Typography key={error.code} variant="caption" component="p">
                  - {error.message}
                </Typography>
              ),
            )}
          </Box>
        );
      })}
    </Paper>
  );
}
