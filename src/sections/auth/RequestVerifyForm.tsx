// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { userApi } from '~/api';
import { Email } from '~/models';
import { useState } from 'react';
import { handleError } from '~/utils';

// ----------------------------------------------------------------------

interface RequestVerifyFormProps {
  onSent: () => void;
  onGetEmail: (value: string) => void;
}

export default function RequestVerifyForm({
  onSent,
  onGetEmail,
}: RequestVerifyFormProps) {
  const [error, setError] = useState<string>('');

  const RequestVerifySchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const defaultValues: Email = {
    email: '',
  };

  const methods = useForm<Email>({
    resolver: yupResolver(RequestVerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: Email) => {
    try {
      await userApi.requestVerifyEmail(data);
      onSent();
      onGetEmail(data.email);
    } catch (error) {
      const err = handleError(error);
      setError(err.errors[0].msg);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!error && <Alert severity="error">{error}</Alert>}
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
