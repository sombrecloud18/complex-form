import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProjectForm } from '../../components/create-form.jsx';
import { validationObject } from '../../validation.js';
import { CreateLayout } from '../../layouts/create-layout.jsx';

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const methods = useForm({
    resolver: yupResolver(validationObject),
    defaultValues: {
      id: parseInt(id),
      projectTitle: "",
      projectDescription: "",
      projectAuthor: "",
      projectBudget: null,
      projectPriority: "Low",
      projectStatus: "Planned",
      tasks: []
    }
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`http://localhost:3001/api/projects/${id}`);
        
        if (!response.data) {
          throw new Error('Project not found');
        }
        
        const projectData = response.data;
        
        const formData = {
          id: projectData.id, 
          projectTitle: projectData.projectTitle || "",
          projectDescription: projectData.projectDescription || "",
          projectAuthor: projectData.projectAuthor || "",
          projectBudget: projectData.projectBudget || null,
          projectPriority: projectData.projectPriority || "Low",
          projectStatus: projectData.projectStatus || "Planned",
          tasks: projectData.tasks || []
        };
        
        reset(formData);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, reset]);

  const onSave = async (data) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => 
          (value !== "" && 
          value !== null && 
          value !== undefined && 
          !(Array.isArray(value) && value.length === 0)) ||
          key === 'id'
        )
      );
      
      await axios.patch(`http://localhost:3001/api/projects/${id}`, payload);
      alert('Project updated successfully!');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CreateLayout>
      <FormProvider {...methods}>
        <CreateProjectForm 
          onSubmit={handleSubmit(onSave)} 
          isEdit={true}
          onCancel={() => navigate('/')}
        />
      </FormProvider>
    </CreateLayout>
  );
};