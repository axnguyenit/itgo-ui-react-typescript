import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MuiForm5 as Form } from '@rjsf/material-ui';
//
import UploadButton from './UploadButton';
import { roadmapApi } from '~/api';
import { PATH_DASHBOARD } from '~/routes/paths';

// ----------------------------------------------------------------------

const uiSchema = {
  description: {
    'ui:widget': 'textarea',
  },
  technologies: {
    items: {
      description: {
        'ui:widget': 'textarea',
      },
      image: {
        'ui:widget': UploadButton,
      },
    },
  },
};

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Roadmap name' },
    slogan: { type: 'string', title: 'Slogan' },
    description: { type: 'string', title: 'Description' },
    technologies: {
      type: 'array',
      title: 'Technologies',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          technology: { type: 'string', title: 'Technology name' },
          description: { type: 'string', title: 'Description' },
          image: { type: 'string' },
          tag: { type: 'string', title: 'Tag' },
        },
      },
    },
  },
};

const defaultValue = {
  name: '',
  slogan: '',
  description: '',
  technologies: [
    {
      technology: '',
      description: '',
      tag: '',
      image: '',
    },
  ],
};

function validate(formData, errors) {
  if (!formData.name) errors.name?.addError('Roadmap name is required');
  if (!formData.slogan) errors.slogan?.addError('Slogan is required');
  if (!formData.description)
    errors.description?.addError('Description is required');
  if (formData.technologies.length > 0) {
    formData.technologies.forEach((technology, index) => {
      if (!technology.technology)
        errors.technologies[index].technology?.addError(
          'Technology name is required',
        );
      if (!technology.description)
        errors.technologies[index].description?.addError(
          'Description is required',
        );
      if (!technology.tag)
        errors.technologies[index].tag?.addError('Tag is required');
      if (!technology.image)
        errors.technologies[index].image?.addError('Image is required');
    });
  } else {
    errors.technologies?.addError('Technologies must be at least 1 item');
  }

  return errors;
}

// ----------------------------------------------------------------------

export default function RoadmapSchemaForm({ formData, isEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(defaultValue);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async ({ formData }) => {
    setIsSubmitting(true);

    try {
      if (isEdit) {
        formData.id = currentFormData._id;
        await roadmapApi.update(formData);
      } else {
        await roadmapApi.add(formData);
      }
      enqueueSnackbar(isEdit ? 'Update success!' : 'Create success!');
      navigate(PATH_DASHBOARD.roadmaps.root);
    } catch (error) {}
    setIsSubmitting(false);
  };

  useEffect(() => {
    setCurrentFormData(formData);
  }, [formData]);

  const handleChange = (data) => {
    if (data.formData.technologies.length > 0) {
      data.formData.technologies.forEach((technology, index) => {
        if (Object.keys(technology).length === 0)
          data.formData.technologies[index] = defaultValue.technologies[0];
      });
    }
    setCurrentFormData(data.formData);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Form
        // liveValidate
        schema={schema}
        uiSchema={uiSchema}
        formData={currentFormData}
        validate={validate}
        showErrorList={false}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isEdit ? 'Save Changes' : 'Create Roadmap'}
        </LoadingButton>
      </Form>
    </Card>
  );
}
