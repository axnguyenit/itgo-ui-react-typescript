import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Typography, Stack, Container } from '@mui/material';
// routes
// components
import Logo from '@/components/Logo';
import SocialsButton from '@/components/SocialsButton';
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'ITGO',
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'itgo@gmail.com', href: '#' },
      { name: 'Son Tra, Da Nang, Vietnam', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Container sx={{ mt: 10 }}>
        <Grid
          container
          spacing={0}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item sx={{ mb: 3, width: 'auto' }}>
            <Logo
              sx={{ mx: { xs: 'auto', md: 'inherit', width: 90, height: 90 } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias aut, repellat ipsum facere voluptate dicta obcaecati
              deserunt nobis suscipit eaque?
            </Typography>

            <Stack
              direction='row'
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent='space-between'
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component='p' variant='overline'>
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color='inherit'
                      variant='body2'
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component='p'
              variant='body2'
              sx={{
                mt: 5,
                pb: 5,
                fontSize: 13,
                textAlign: 'center',
              }}
            >
              COPYRIGHT © {new Date().getFullYear()}. All rights reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
