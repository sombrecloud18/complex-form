import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateLayout } from "./layouts/create-layout.jsx";
import { CreateProjectForm } from "./components/create-form.jsx";
import { validationObject } from "./validation.js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./App.css";
import "./index.css";

export const App = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationObject),
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      projectAuthor: "",
      projectBudget: null,
      projectPriority: "Low",
      projectStatus: "Planned",
    }
  });

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

