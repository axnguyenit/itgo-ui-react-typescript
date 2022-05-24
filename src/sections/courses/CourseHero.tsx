// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// components
import { MotionContainer, TextAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

interface RootStyleProps {
  src: string;
}

const RootStyle = styled('div')<RootStyleProps>(({ theme, src }) => ({
  backgroundSize: 'cover',
  backgroundImage: `url(${window.location.origin}/assets/images/overlay.svg),
  url(${src})`,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 250,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: '50%',
    transform: 'translateY(50%)',
  },
}));

// ----------------------------------------------------------------------

interface CourseHeroProps {
  label: string;
  src: string;
}

export default function CourseHero({ label, src }: CourseHeroProps) {
  return (
    <RootStyle src={src}>
      <Container
        component={MotionContainer}
        sx={{ position: 'relative', height: '100%' }}
      >
        <ContentStyle spacing={5}>
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            {label &&
              label
                .split(' ')
                .map((e: string, index: number) => (
                  <TextAnimate key={index} text={e} sx={{ mr: 2 }} />
                ))}
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
