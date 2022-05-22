import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box } from '@mui/material';

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
      <Helmet>
        <title>{`${title} | ITGO`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
