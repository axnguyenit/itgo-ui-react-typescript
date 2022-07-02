import { forwardRef, ReactNode } from 'react';
// @mui
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

interface PageProps {
  children: ReactNode;
  title?: string;
  meta?: ReactNode;

  [key: string]: any;
}

const Page = forwardRef(
  ({ children, title = '', meta, ...other }: PageProps, ref) => (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{`${title} | ITGO`}</title>
        {meta}
      </Helmet>
      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  ),
);

export default Page;
