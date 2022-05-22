import Slider from 'react-slick';
import { LegacyRef, useEffect, useRef, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Avatar,
  CardHeader,
  Typography,
  Box,
  Divider,
  Rating,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// utils
// components
import { CarouselArrows } from '@/components/carousel';
import { PATH_INSTRUCTOR } from '@/routes/paths';
import { cloudinary, cssStyles } from '@/utils';
import Image from '@/components/Image';
import { User } from '@/models';
import { userApi } from '@/api';
import SvgIconStyle from '@/components/SvgIconStyle';

// ----------------------------------------------------------------------

export default function HomeInstructorList() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [instructorList, setInstructorList] = useState<Partial<User>[]>([]);

  const getAllInstructors = async () => {
    const params = {
      _page: 1,
      _limit: 8,
    };
    try {
      const response = await userApi.getAllInstructors(params);

      setInstructorList(response.instructors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    // carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {instructorList.length > 0 && (
        <Box>
          <CardHeader
            title='Instructors'
            subheader='Top 8 experienced Instructors'
            sx={{
              '& .MuiCardHeader-action': {
                alignSelf: 'center',
              },
              '& .MuiCardHeader-title': {
                fontSize: 28,
              },
              mb: 2,
            }}
          />

          <Box sx={{ position: 'relative' }}>
            <CarouselArrows
              filled
              customIcon={'ic:round-keyboard-arrow-right'}
              onNext={handleNext}
              onPrevious={handlePrevious}
              sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
            >
              <Slider ref={carouselRef} {...settings}>
                {instructorList.length > 0 &&
                  instructorList.map((instructor) => (
                    <InstructorCard
                      key={instructor._id}
                      instructor={instructor}
                    />
                  ))}
              </Slider>
            </CarouselArrows>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({
    blur: 2,
    color: theme.palette.primary.dark,
  }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

interface InstructorCardProps {
  instructor: Partial<User>;
}

function InstructorCard({ instructor }: InstructorCardProps) {
  const { _id, firstName, lastName, avatar, position } = instructor;

  return (
    <Card sx={{ textAlign: 'center', my: 3, mx: 1.5 }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src='/assets/icons/shape-avatar.svg'
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={firstName}
          src={cloudinary.w100(avatar)}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cloudinary.w300(avatar)} alt={firstName} ratio='16/9' />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Link
          to={`${PATH_INSTRUCTOR.root}/${_id}`}
          //
          color='inherit'
          component={RouterLink}
        >
          <Typography variant='subtitle2' noWrap>
            {firstName} {lastName}
          </Typography>
        </Link>
        <Typography variant='body2' sx={{ color: 'text.secondary', my: 1.5 }}>
          {position ? position : '#'}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', marginBottom: 1 }} />
      <Rating size='small' value={4.5} precision={0.1} readOnly />
    </Card>
  );
}
