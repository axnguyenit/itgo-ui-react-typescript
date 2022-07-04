import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { isBefore } from 'date-fns';
import merge from 'lodash/merge';
// form
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// router
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import {
  Box,
  Button,
  DialogActions,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import { ColorSinglePicker } from '~/components/color-utils';
import { FormProvider, RHFSelect, RHFTextField } from '~/components/hook-form';
// hooks
import { useAuth } from '~/hooks';
// api
import { courseApi, eventApi } from '~/api';
import { CalendarArg, Course, Event } from '~/models';
//
import { PATH_PAGE } from '~/routes/paths';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#FCA524', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event: Event, range: CalendarArg): Event => {
  const _event: Event = {
    title: event?.title || '',
    description: event?.description || '',
    courseId: (event?.course as string) || '',
    meetingNumber: event?.meetingNumber || '',
    passwordMeeting: event?.passwordMeeting || '',
    textColor: event?.textColor || '#FCA524',
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

interface CalendarFormProps {
  event: Event | undefined;
  range: any;
  onCancel: () => void;
  onGetEvents: () => void;
}

export default function CalendarForm({
  event,
  range,
  onCancel,
  onGetEvents,
}: CalendarFormProps) {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isCreating = !event;

  const EventSchema = Yup.object().shape({
    title: Yup.string()
      .max(255)
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    description: Yup.string().max(5000).required('Description is required'),
    courseId: Yup.string().required('Course is required'),
    meetingNumber: Yup.string().required('Zoom meeting number is required'),
    passwordMeeting: Yup.string()
      .required('Password meeting is required')
      .min(6, 'Password meeting must be at least 6 characters'),
  });

  const methods = useForm<Event>({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event as Event, range),
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: Event) => {
    try {
      if (event) {
        data.id = event.id;
        await eventApi.update(data);
        enqueueSnackbar('Update success!');
      } else {
        await eventApi.add(data);
        enqueueSnackbar('Create success!');
      }
      onGetEvents();
      onCancel();
      reset();
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (!event) return;
    try {
      onCancel();
      await eventApi.remove(event.id as string);
      onGetEvents();
      enqueueSnackbar('Delete success!');
    } catch (error) {}
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const params = {
          _instructor: user?.id,
        };
        const { courses } = await courseApi.getAll(params);
        setCourseList(courses);
        setValue('courseId', courses[0]?.id);
      } catch (error) {
        navigate(PATH_PAGE.page500);
      }
    };

    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="Title" />
        <RHFTextField name="description" label="Description" multiline rows={4} />
        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack sx={{ mb: 3, mr: { md: 1 } }}>
              <RHFTextField name="meetingNumber" label="Zoom meeting number" />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack sx={{ ml: { md: 1 } }}>
              <RHFTextField name="passwordMeeting" label="Password meeting" />
            </Stack>
          </Grid>
        </Grid>
        <RHFSelect name="courseId" label="Course" InputLabelProps={{ shrink: true }}>
          {!!courseList.length &&
            courseList.map((course) => (
              <option key={course?.id} value={course?.id}>
                {course?.name}
              </option>
            ))}
        </RHFSelect>
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="Start date"
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="End date"
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && 'End date must be later than start date'}
                />
              )}
            />
          )}
        />

        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <ColorSinglePicker
              value={field.value}
              onChange={field.onChange}
              colors={COLOR_OPTIONS}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {event?.id ? 'Update' : 'Add'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
