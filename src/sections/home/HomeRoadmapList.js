// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Grid, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import roadmapApi from '../../api/roadmapApi';
import { PATH_HOME } from 'src/routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: theme.spacing(2, 2, 2, 3),
	cursor: 'pointer',
	textDecoration: 'none',
	'&:hover': { backgroundColor: theme.palette.background.neutral },
}));

// ----------------------------------------------------------------------

export default function HomeRoadmapList() {
	const [roadmapList, setRoadmapList] = useState([]);

	useEffect(() => {
		const getAllRoadmaps = async () => {
			const params = {
				_page: 1,
				_limit: 8,
			};
			try {
				const response = await roadmapApi.getAll(params);
				setRoadmapList(response.data.roadmaps);
			} catch (error) {
				console.error(error);
			}
		};

		getAllRoadmaps();
	}, []);

	return (
		<Box>
			{roadmapList.length > 0 && (
				<Box>
					<Box sx={{ textAlign: 'center', mb: 5 }}>
						<CardHeader
							title="Roadmaps"
							subheader="Foot in the door, you should focus on one roadmap"
							sx={{
								'& .MuiCardHeader-action': {
									alignSelf: 'center',
								},
								'& .MuiCardHeader-title': {
									fontSize: 28,
								},
							}}
						/>
					</Box>

					<Grid container spacing={3}>
						{roadmapList.length > 0 &&
							roadmapList.map((roadmap) => (
								<Grid item xs={12} sm={6} md={4}>
									<RootStyle
										to={`${PATH_HOME.roadmaps.root}/${roadmap._id}`}
										component={RouterLink}
									>
										<Box>
											<Typography variant="h4">{roadmap.name}</Typography>
											<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
												{roadmap.slogan} in {new Date().getFullYear()}
											</Typography>
										</Box>
									</RootStyle>
								</Grid>
							))}
					</Grid>
				</Box>
			)}
		</Box>
	);
}
