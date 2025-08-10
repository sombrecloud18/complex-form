import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationObject } from '../validation.js';

export const useProjectForm = (id = null) => {
  return useForm({
    resolver: yupResolver(validationObject),
    defaultValues: {
      id: id ? parseInt(id) : null,
      projectTitle: "",
      projectDescription: "",
      projectAuthor: "",
      projectBudget: null,
      projectPriority: "Low",
      projectStatus: "Planned",
      tasks: []
    }
  });
};