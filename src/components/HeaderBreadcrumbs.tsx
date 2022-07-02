import { ReactNode } from 'react';
import { Box, Typography, Link, SxProps, Theme } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
//
import { BreadcrumbsLink } from '~/models';

// ----------------------------------------------------------------------

interface HeaderBreadcrumbsProps {
  links: BreadcrumbsLink[];
  action?: ReactNode;
  heading: string;
  moreLink?: string;
  sx?: SxProps<Theme>;

  [key: string]: any;
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = '',
  sx,
  ...other
}: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
          {moreLink}
        </Link>
      </Box>
    </Box>
  );
}
