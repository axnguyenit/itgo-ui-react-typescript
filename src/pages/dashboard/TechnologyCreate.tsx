import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
// routes
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_PAGE } from '~/routes/paths';
// components
import Page from '~/components/Page';
import LoadingScreen from '~/components/LoadingScreen';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import { TechnologyNewForm } from '~/sections/@dashboard/technologies';
// api
import technologyApi from '~/api/technologyApi';
import { Technology } from '~/models';

function TechnologyCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technology, setTechnology] = useState<Technology>();

  useEffect(() => {
    const getTechnology = async () => {
      if (!isEdit || !id) return;
      setIsLoading(true);
      try {
        const technology = await technologyApi.get(id);
        setTechnology(technology);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
      setIsLoading(false);
    };

    isEdit ? getTechnology() : setTechnology(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, id]);

  return (
    <Page title={!isEdit ? 'New technology' : 'Edit technology'}>
      {isLoading && <LoadingScreen />}
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'New technology' : 'Edit technology'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Technologies', href: PATH_DASHBOARD.technologies.root },
            { name: !isEdit ? 'New technology' : 'Edit technology' },
          ]}
        />

        {(technology || !isEdit) && (
          <TechnologyNewForm
            isEdit={isEdit}
            currentTechnology={technology as Technology}
          />
        )}
      </Container>
    </Page>
  );
}

export default TechnologyCreate;
