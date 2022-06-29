import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Autocomplete as MUIAutocomplete, Chip, TextField } from '@mui/material';

const TAGS_OPTION = [
	'Front End',
	'JavaScript',
	'TypeScript',
	'HTML, CSS',
	'NodeJS',
	'ExpressJS',
	'Python',
	'ReactJS',
	'Back End',
];

Autocomplete.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.array.isRequired,
};

function Autocomplete({ onChange, value }) {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');

	if (!isEdit)
		return (
			<MUIAutocomplete
				multiple
				freeSolo
				onChange={(event, newValue) => onChange(newValue.toString())}
				options={TAGS_OPTION.map((option) => option)}
				defaultValue={[]}
				renderTags={(value, getTagProps) =>
					value.map((option, index) => (
						<Chip label={option} {...getTagProps({ index })} size="small" />
					))
				}
				renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
			/>
		);

	if (!value?.length) return <></>;

	return (
		<MUIAutocomplete
			multiple
			freeSolo
			onChange={(event, newValue) => onChange(newValue.toString())}
			options={TAGS_OPTION.map((option) => option)}
			defaultValue={value}
			renderTags={(value, getTagProps) =>
				value.map((option, index) => (
					<Chip label={option} {...getTagProps({ index })} size="small" />
				))
			}
			renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
		/>
	);
}

export default Autocomplete;
