import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import { CreateProjectForm } from '../../components/create-form.jsx';
import { CreateLayout } from '../../layouts/create-layout.jsx';
import { fetchProject, updateProject } from '../../api/api.js';
import { useProjectForm } from '../../hooks/useProjectForm.jsx';

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const methods = useProjectForm(id);
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchProject(id);
        
        if (!response.data) {
          throw new Error('Project not found');
        }
        
        const projectData = response.data;
        
        reset({
          id: projectData.id, 
          projectTitle: projectData.projectTitle || "",
          projectDescription: projectData.projectDescription || "",
          projectAuthor: projectData.projectAuthor || "",
          projectBudget: projectData.projectBudget || null,
          projectPriority: projectData.projectPriority || "Low",
          projectStatus: projectData.projectStatus || "Planned",
          tasks: projectData.tasks || []
        });
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
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
      
      await updateProject(id, payload);
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