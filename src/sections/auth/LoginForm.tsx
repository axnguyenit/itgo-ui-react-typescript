import { useState } from 'react';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// router
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import { FormProvider, RHFTextField } from '~/components/hook-form';
// hooks
import { useAuth } from '~/hooks';
// api
import { userApi } from '~/api';
import { Login } from '~/models';
// paths
import { PATH_AUTH } from '~/routes/paths';
// utils
import { handleError, setSession } from '~/utils';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues: Login = {
    email: '',
    password: '',
    // remember: true,
  };

  const methods = useForm<Login>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: Login) => {
    try {
      const { accessToken, refreshToken, user } = await userApi.login(data);

      if (!user.emailVerified) navigate(PATH_AUTH.verify, { replace: true });
      if (user.emailVerified) {
        setSession(accessToken, refreshToken);
        // getCartApi();
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
          },
        });
      }

      reset();
    } catch (error) {
      const err = handleError(error);

      setError('email', {
        type: 'validate',
        message: err.errors[0].msg,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.email && (
          <Alert severity='error'>{errors.email.message}</Alert>
        )}

        <RHFTextField name='email' label='Email address' />

        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ my: 2 }}
      >
        {/* <RHFCheckbox name='remember' label='Remember me' /> */}
        <Link
          component={RouterLink}
          variant='subtitle2'
          to={PATH_AUTH.forgotPassword}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
