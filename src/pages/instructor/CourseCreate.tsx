import {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
// @mui
import {Container} from '@mui/material';
// routes
import {PATH_INSTRUCTOR, PATH_PAGE} from '~/routes/paths';
// components
import Page from '~/components/Page';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import CourseNewForm from '~/sections/instructor/CourseNewForm';
// api
import {courseApi} from '~/api';
import {Course} from '~/models';

// ----------------------------------------------------------------------

export default function CourseCreate() {
  const [course, setCourse] = useState<Course>();
  const {pathname} = useLocation();
  const {id} = useParams();
  const isEdit = pathname.includes('edit');
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      if (!isEdit) return;
      if (!id) return;
      try {
        const { course } = await courseApi.get(id);
        setCourse(course);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
    };

    isEdit ? getCourse() : setCourse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id]);

  return (
    <Page title={!isEdit ? 'Create a new course' : 'Edit course'}>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new course' : 'Edit course'}
          links={[
            {name: 'Instructor', href: PATH_INSTRUCTOR.root},
            {
              name: 'Courses',
              href: PATH_INSTRUCTOR.courses.root,
            },
            {name: !isEdit ? 'New course' : 'Edit course'},
          ]}
        />
        {(course || !isEdit) && (
          <CourseNewForm isEdit={isEdit} currentCourse={course as Course} />
        )}
      </Container>
    </Page>
  );
}
