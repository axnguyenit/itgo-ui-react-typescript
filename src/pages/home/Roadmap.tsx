import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
// components
import Image from '~/components/Image';
import Page from '~/components/Page';
import { SkeletonRoadmap } from '~/components/skeleton';
// api
import { roadmapApi } from '~/api';
// paths
import { PATH_PAGE, PATH_HOME } from '~/routes/paths';
// utils
import { cloudinary } from '~/utils';
import { RoadmapDetail, RoadmapTechnology } from '~/models';

// ----------------------------------------------------------------------

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState<RoadmapDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getRoadmap = async () => {
      setIsLoading(true);
      if (!id) return;
      try {
        const roadmap = await roadmapApi.get(id);
        setRoadmap(roadmap);
      } catch (error) {
        navigate(PATH_PAGE.page404);
      }
      setIsLoading(false);
    };

    getRoadmap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClick = (tag: string) => {
    navigate({
      pathname: PATH_HOME.courses.root,
      search: createSearchParams({ category: tag }).toString(),
    });
  };

  return (
    <Page>
      <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {roadmap?.name}
          </Typography>
          <Typography variant="body1">{roadmap?.description}</Typography>
        </Box>
        <Stack spacing={4}>
          {!isLoading ? (
            !!roadmap?.technologies.length &&
            roadmap.technologies?.map((technology, index) => (
              <RoadmapItem
                key={index}
                no={index + 1}
                technology={technology}
                onClick={handleClick}
              />
            ))
          ) : (
            <SkeletonRoadmap />
          )}
        </Stack>
      </Container>
    </Page>
  );
}

interface RoadmapItemProps {
  technology: RoadmapTechnology;
  onClick: (tag: string) => void;
  no: number;
}

function RoadmapItem({ technology, onClick, no }: RoadmapItemProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">{`${no}. ${technology?.technology}`}</Typography>
      <Typography variant="body1">{technology?.description}</Typography>

      <Card>
        <Stack
          spacing={2}
          sx={{ p: { xs: 2, md: 4 } }}
          direction="row"
          alignItems="center"
        >
          <Image
            alt="name"
            src={cloudinary.w300(technology?.image)}
            sx={{
              width: { xs: 200, md: 300 },
              height: { xs: 120, md: 170 },
              borderRadius: 1,
            }}
          />
          <Box>
            <Typography variant="h4">Related Courses</Typography>
            <Button
              onClick={() => onClick(technology?.tag)}
              variant="contained"
              sx={{ mt: 1 }}
            >
              Learn now
            </Button>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}
