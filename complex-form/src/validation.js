import * as yup from 'yup';

export const validationObject = yup.object().shape({
  projectTitle: yup.string().required('Enter your project name').max(50, 'Max 50 characters'),
  projectAuthor: yup.string().required('Enter author'),
  projectPriority: yup.string().required('Select the priority'),
  projectStatus: yup.string().required('Select your status'),
  projectDescription: yup.string().max(200, 'Max 200 characters'),
  projectBudget: yup.number().min(0, 'Cannot be negative').nullable()
    .transform((value, originalValue) => 
      originalValue === "" ? null : value 
    ),
  tasks: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Enter task name'),
      status: yup.string().required('Enter task status')
    })
  )
})