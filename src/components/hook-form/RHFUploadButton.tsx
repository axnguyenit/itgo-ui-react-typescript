import { ChangeEvent, useRef } from 'react';
// @mui
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// form
import { Controller, useFormContext } from 'react-hook-form';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface RHFUploadButtonProps {
  name: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RHFUploadButton({
  name,
  label,
  onChange,
  ...other
}: RHFUploadButtonProps) {
  const { control } = useFormContext();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    textFieldRef.current?.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <FormHelperText error sx={{ mx: 2 }}>
              {error?.message}
            </FormHelperText>

            <Typography variant="subtitle2" noWrap sx={{ width: 100 }}>
              {field.value?.name}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              startIcon={
                <Iconify icon="fa-solid:file-upload" width={20} height={20} />
              }
              onClick={handleClick}
            >
              {label}
            </Button>
            <TextField
              inputRef={textFieldRef}
              fullWidth
              error={!!error}
              helperText={error?.message}
              type="file"
              sx={{ display: 'none' }}
              onChange={onChange}
              {...other}
            />
          </Box>
        </Stack>
      )}
    />
  );
}
