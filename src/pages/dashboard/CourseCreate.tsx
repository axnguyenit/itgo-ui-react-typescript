import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '~/routes/paths';
// components
import Page from '~/components/Page';
import LoadingScreen from '~/components/LoadingScreen';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import CourseNewForm from '~/sections/@dashboard/courses/CourseNewForm';
// api
import { courseApi } from '~/api';
import { Course } from '~/models';

// ----------------------------------------------------------------------

export default function CourseCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCourse = async () => {
      if (!isEdit || !id) return;
      setIsLoading(true);
      try {
        const { course } = await courseApi.get(id);
        setCourse(course);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
      setIsLoading(false);
    };

    isEdit ? getCourse() : setCourse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id]);

  return (
    <Page title={!isEdit ? 'New course' : 'Edit course'}>
      {isLoading && <LoadingScreen />}
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'New course' : 'Edit course'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Courses',
              href: PATH_DASHBOARD.courses.root,
            },
            { name: !isEdit ? 'New course' : 'Edit course' },
          ]}
        />
        {(course || !isEdit) && (
          <CourseNewForm isEdit={isEdit} currentCourse={course} />
        )}
      </Container>
    </Page>
  );
}
