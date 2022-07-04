import React from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  CardHeader,
  Link,
  Stack,
  Typography,
} from '@mui/material';
// components
import Image from '~/components/Image';
import MyAvatar from '~/components/MyAvatar';
import Iconify from '~/components/Iconify';
// redux
import { addToCart } from '~/redux/slices/cart';
// hooks
import { useAppDispatch, useAppSelector, useAuth } from '~/hooks';
// paths
import { PATH_AUTH } from '~/routes/paths';
// utils
import { fCurrency, cloudinary, fDate, handleError } from '~/utils';
import { CartData, Course } from '~/models';

// ----------------------------------------------------------------------

interface CourseDetailsSummaryProps {
  course: Course;
}

export default function CourseDetailsSummary({
  course,
}: CourseDetailsSummaryProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddCart = async (course: Course) => {
    const isExisted = cart.find((cartItem) => cartItem.course?.id === course.id);

    if (!isExisted && course.id) {
      try {
        const data: CartData = {
          total: cart.length + 1,
          courseId: course.id,
        };
        await dispatch(addToCart({ data, course })).unwrap();
        enqueueSnackbar('Add to cart successfully');
      } catch (error) {
        const err = handleError(error);
        isAuthenticated
          ? enqueueSnackbar(err?.errors[0]?.msg, { variant: 'warning' })
          : navigate(PATH_AUTH.login);
      }
    } else {
      enqueueSnackbar('This course already exists in your cart', {
        variant: 'info',
      });
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{course?.name}</Typography>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: 'block', color: 'text.secondary' }}
          >
            {fDate(course?.createdAt as Date)}
          </Typography>
        }
        action={
          <Stack direction="row" spacing={2} sx={{ mr: 1 }}>
            <Typography variant="h4">
              <Box
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                {course?.priceSale && fCurrency(course?.price)}
              </Box>
              &nbsp; {fCurrency(course?.priceSale || course?.price)}
            </Typography>

            <Button
              startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
              variant="contained"
              onClick={() => handleAddCart(course)}
            >
              Add to cart
            </Button>
          </Stack>
        }
        sx={{
          '&.MuiCardHeader-root': {
            p: 0,
          },
        }}
      />

      <Image
        alt="post media"
        src={cloudinary.w1200(course?.cover)}
        ratio="21/9"
        sx={{ borderRadius: 1 }}
      />
    </Stack>
  );
}
