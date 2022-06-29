import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
// routes
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_PAGE } from '~/routes/paths';
// components
import Page from '~/components/Page';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import { RoadmapSchemaForm } from '~/sections/@dashboard/roadmaps';
// api
import { roadmapApi } from '~/api';
import { RoadmapType } from '~/models';

function RoadmapCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const [formData, setFormData] = useState<RoadmapType>();

  useEffect(() => {
    const getRoadmap = async () => {
      if (!isEdit || !id) return;
      try {
        const { roadmap } = await roadmapApi.get(id);
        setFormData(roadmap);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
    };

    isEdit ? getRoadmap() : setFormData(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id]);

  return (
    <Page title={!isEdit ? 'New roadmap' : 'Edit roadmap'}>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'New roadmap' : 'Edit roadmap'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Roadmaps', href: PATH_DASHBOARD.roadmaps.root },
            { name: !isEdit ? 'New roadmap' : 'Edit roadmap' },
          ]}
        />

        {(formData || !isEdit) && <RoadmapSchemaForm isEdit={isEdit} formData={formData as RoadmapType} />}
      </Container>
    </Page>
  );
}

export default RoadmapCreate;
