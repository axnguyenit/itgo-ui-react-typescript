import { ReactNode } from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFSelectProps {
  name: string;
  children: ReactNode;

  [key: string]: any;
}

export default function RHFSelect({
  name,
  children,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
