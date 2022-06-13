import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { userApi } from '~/api';
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
} from '~/components/hook-form';
import { useAuth } from '~/hooks';
import { User } from '~/models';
import cloudinary from '~/utils/cloudinary';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const defaultValues: Partial<User> = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar: user?.avatar ? cloudinary.w300(user?.avatar) : '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    region: user?.region || '',
  };

  const methods = useForm<Partial<User>>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: Partial<User>) => {
    try {
      data.id = user._id;
      await userApi.update(data);
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setValue('avatar', reader.result as string);
        reader.onerror = (error) => console.error(error);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 9.125, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name='avatar'
              accept='image/*'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant='caption'
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <RHFTextField name='firstName' label='First name' />
              <RHFTextField name='lastName' label='Last name' />
              <RHFTextField name='email' label='Email Address' />
              <RHFTextField name='phoneNumber' label='Phone Number' />
              <RHFTextField name='address' label='Address' />
              <RHFTextField name='region' label='Region' />
            </Box>

            <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
