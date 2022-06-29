import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack } from '@mui/material';
import Image from '~/components/Image';
import cloudinary from '~/utils/cloudinary';
import Iconify from '~/components/Iconify';

// ----------------------------------------------------------------------

const Input = styled('input')({
  display: 'none',
});

// ----------------------------------------------------------------------

interface UploadButtonProps {
  onChange?: (value: string) => void;
  required?: boolean;
  value: string;
}

export default function UploadButton({ onChange, required = false, value }: UploadButtonProps) {
  const selectFileEl = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');

  const handleSelectFile = () => {
    selectFileEl.current?.click();
  };

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event?.target.files as FileList;
    const file = files[0];

    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onChange && onChange(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.onerror = (error) => {};
  };
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Box>
        {preview && (
          <Image
            src={preview.startsWith('data:') ? preview : cloudinary.w300(preview)}
            ratio='16/9'
            sx={{ width: 250, borderRadius: 1 }}
          />
        )}
      </Box>
      <Input
        ref={selectFileEl}
        accept='image/*'
        id='icon-button-file'
        type='file'
        onChange={handleChange}
        required={required}
      />
      <IconButton color='primary' aria-label='upload picture' component='span' onClick={handleSelectFile}>
        {/* <PhotoCamera /> */}
        <Iconify icon='bxs:camera' />
      </IconButton>
    </Stack>
  );
}
