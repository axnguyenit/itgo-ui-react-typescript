import { useEffect, useState } from 'react';
// @mui
import { Box, CardHeader } from '@mui/material';
// router
import { createSearchParams, useNavigate } from 'react-router-dom';
// components
import Image from '~/components/Image';
import LoadingScreen from '~/components/LoadingScreen';
// api
import { technologyApi } from '~/api';
import { ListParams, Technology } from '~/models';
//
import { PATH_HOME } from '~/routes/paths';
import { cloudinary } from '~/utils';

// ----------------------------------------------------------------------

export default function HomePopularTech() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [technologyList, setTechnologyList] = useState<Technology[]>([]);

  useEffect(() => {
    const getTechnologies = async () => {
      const params: ListParams = {
        page: 1,
        limit: 8,
      };
      setIsLoading(true);
      try {
        const { results } = await technologyApi.getAll(params);
        setTechnologyList(results);
      } catch (error) {}
      setIsLoading(false);
    };

    getTechnologies();
  }, []);

  const handleClick = (tag: string) => {
    navigate({
      pathname: PATH_HOME.courses.root,
      search: createSearchParams({ category: tag }).toString(),
    });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Box sx={{ textAlign: 'center' }}>
      {technologyList.length > 0 && (
        <Box>
          <CardHeader
            title="Popular Technologies"
            subheader="Most popular technologies right now"
            sx={{
              '& .MuiCardHeader-title': {
                fontSize: 28,
              },
              mb: 5,
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {technologyList.length > 0 &&
              technologyList.map((technology) => (
                <Box
                  key={technology.id}
                  sx={{
                    pt: '60%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.7 },
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                  }}
                  onClick={() => handleClick(technology?.tag)}
                >
                  <Image
                    src={cloudinary.w500(technology?.image)}
                    sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
