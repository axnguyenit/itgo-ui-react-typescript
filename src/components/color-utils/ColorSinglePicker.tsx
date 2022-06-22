import { Box, Radio, RadioGroup, SxProps, Theme } from '@mui/material';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface ColorSinglePickerProps {
  colors: string[];

  [key: string]: any;
}

export default function ColorSinglePicker({
  colors,
  ...other
}: ColorSinglePickerProps) {
  return (
    <RadioGroup row {...other}>
      {colors.map((color) => {
        const isWhite = color === '#FFFFFF' || color === 'white';

        return (
          <Radio
            key={color}
            value={color}
            color='default'
            icon={
              <IconColor
                sx={{
                  ...(isWhite && {
                    border: (theme: Theme) =>
                      `solid 1px ${theme.palette.divider}`,
                  }),
                }}
              />
            }
            checkedIcon={
              <IconColor
                sx={{
                  transform: 'scale(1.4)',
                  '&:before': {
                    opacity: 0.48,
                    width: '100%',
                    content: "''",
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute',
                    boxShadow: '4px 4px 8px 0 currentColor',
                  },
                  '& svg': { width: 12, height: 12, color: 'common.white' },
                  ...(isWhite && {
                    border: (theme: Theme) =>
                      `solid 1px ${theme.palette.divider}`,
                    boxShadow: (theme: Theme) =>
                      `4px 4px 8px 0 ${theme.palette.grey[500_24]}`,
                    '& svg': { width: 12, height: 12, color: 'common.black' },
                  }),
                }}
              />
            }
            sx={{
              color,
              '&:hover': { opacity: 0.72 },
            }}
          />
        );
      })}
    </RadioGroup>
  );
}

// ----------------------------------------------------------------------

interface IconColorProps {
  sx: SxProps<Theme>;
}

function IconColor({ sx }: IconColorProps) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        ...sx,
      }}
    >
      <Iconify icon={'eva:checkmark-fill'} />
    </Box>
  );
}
