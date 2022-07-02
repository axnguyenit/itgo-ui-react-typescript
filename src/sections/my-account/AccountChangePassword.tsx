import { useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Card, IconButton, InputAdornment, Stack } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import { FormProvider, RHFTextField } from '~/components/hook-form';
// api
import { userApi } from '~/api';
import { ChangePassword } from '~/models';
// utils
import { handleError } from '~/utils';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: Yup.string()
      .required('Confirm new password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Confirm password not match'),
  });

  const defaultValues: ChangePassword = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<ChangePassword>({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: ChangePassword) => {
    try {
      await userApi.changePassword(data);
      enqueueSnackbar('Update success!');
      reset();
    } catch (error) {
      const err = handleError(error);

      setError('oldPassword', {
        type: 'validate',
        message: err.errors[0].msg,
      });
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {!!errors.oldPassword && (
            <Alert severity="error">{errors.oldPassword.message}</Alert>
          )}
          <RHFTextField
            name="oldPassword"
            label="Old Password"
            type={showOldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="newPassword"
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmNewPassword"
            label="Confirm New Password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showConfirmNewPassword
                          ? 'eva:eye-fill'
                          : 'eva:eye-off-fill'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
