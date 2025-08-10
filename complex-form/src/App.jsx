import { FormProvider } from "react-hook-form";
import { CreateLayout } from "./components/layouts/create-layout.jsx";
import { CreateProjectForm } from "./components/create-form.jsx";
import { useNavigate } from 'react-router-dom';
import { useProjectForm } from "./hooks/useProjectForm.jsx";
import axios from "axios";
import "./App.css";
import "./index.css";

export const App = () => {
  const navigate = useNavigate();
  const methods = useProjectForm();

  const onSave = async (data) => {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, value]) =>
        value !== "" && 
        value !== null && 
        value !== undefined && 
        !(Array.isArray(value) && value.length === 0)
      )
    );
    await axios.post('http://localhost:3001/api/projects', payload);
    navigate('/');
    console.log("Submitting:", payload);
  };

  return (
    <CreateLayout>
      <FormProvider {...methods}>
        <CreateProjectForm onSubmit={methods.handleSubmit(onSave)} onCancel={() => navigate('/')} />
      </FormProvider>
    </CreateLayout>
  );
};

