import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import {
  Stack,
  Container,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
// components
import Page from '@/components/Page';
// sections
import { CourseList, CourseHero } from '@/sections/courses';
// api
import { courseApi } from '@/api';
import EmptyContent from '@/components/EmptyContent';
import { Course, ListParams, PaginationParams } from '@/models';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const LIMIT_COURSE = 8;

const TAGS_OPTION: string[] = [
  'All',
  'JavaScript',
  'TypeScript',
  'HTML, CSS',
  'NodeJS',
  'NestJS',
  'ExpressJS',
  'Python',
  'ReactJS',
  'NextJS',
  'Front End',
  'Back End',
  'Kotlin',
  'Java',
  'Android',
  'C',
  'C++',
  '.NET',
  'PHP',
  'Laravel',
  'Angular',
];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationParams>({
    _limit: LIMIT_COURSE,
    _page: 1,
    _totalRows: 1,
  });
  const [category, setCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const _category = searchParams.get('category');
    const _page = searchParams.get('page');
    setPage(Number(_page) || 1);

    if (_category) {
      const newCategory = TAGS_OPTION.find((option) =>
        option.toLocaleLowerCase().includes(_category.toLocaleLowerCase())
      );
      setCategory(newCategory as string);
    }

    const getAllCourses = async () => {
      setIsLoading(true);
      const params: ListParams = {
        _page: Number(_page) || 1,
        _limit: LIMIT_COURSE,
        _tags: _category && _category !== 'All' ? _category : '',
      };

      try {
        const { courses, pagination } = await courseApi.getAll(params);
        setCourses(courses);
        pagination && setPagination(pagination);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getAllCourses();
  }, [searchParams]);

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;

    setCategory(value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      category: value,
    });
  };

  const handleChangePage = (value: number) => {
    setPage(value);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: value.toString(),
    });
  };

  return (
    <Page title='Courses'>
      <RootStyle>
        <CourseHero
          label='Courses'
          src={`${window.location.origin}/assets/images/courses-hero.jpg`}
        />
        <Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
          <Stack
            spacing={2}
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            sx={{ mb: 4 }}
          >
            <FormControl sx={{ width: { xs: '50%', md: '25%' } }}>
              <InputLabel>Category</InputLabel>
              <Select
                size='small'
                value={category}
                label='Category'
                onChange={handleChangeCategory}
              >
                {TAGS_OPTION.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <CourseList courses={courses} loading={isLoading} />

          {!courses.length && !isLoading && (
            <EmptyContent title='No matching courses' />
          )}
          {pagination._totalRows > LIMIT_COURSE && (
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{ my: 3 }}
            >
              <Pagination
                count={Math.ceil(pagination._totalRows / LIMIT_COURSE)}
                defaultPage={page}
                onChange={(event, value) => handleChangePage(value)}
                color='primary'
                variant='outlined'
                shape='rounded'
              />
            </Stack>
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
