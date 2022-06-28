import { Box, Dialog, Paper, SxProps, Theme } from '@mui/material';
import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';
import { VariantType } from '~/models';
import { varFade } from './variants';

// ----------------------------------------------------------------------

interface DialogAnimateProps {
  children: ReactNode;
  onClose?: () => void;
  open: boolean;
  sx?: SxProps<Theme>;
  variants?: VariantType;
}

export default function DialogAnimate({
  open = false,
  variants = {},
  onClose = () => {},
  children,
  sx,
  ...other
}: DialogAnimateProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth='xs'
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...(variants ||
                varFade({
                  distance: 120,
                  durationIn: 0.32,
                  durationOut: 0.24,
                  easeIn: 'easeInOut',
                }).inUp)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                onClick={onClose}
                sx={{ width: '100%', height: '100%', position: 'fixed' }}
              />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
