import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateLayout } from "./layouts/create-layout.jsx";
import { CreateProjectForm } from "./components/create-form.jsx";
import { validationObject } from "./validation.js";
import "./App.css";
import "./index.css";

export const App = () => {
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

  const onSave = (data) => {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, value]) =>
        value !== "" && 
        value !== null && 
        value !== undefined && 
        !(Array.isArray(value) && value.length === 0)
      )
    );
    console.log("Submitting:", payload);
  };

  return (
    <CreateLayout>
      <FormProvider {...methods}>
        <CreateProjectForm onSubmit={methods.handleSubmit(onSave)} />
      </FormProvider>
    </CreateLayout>
  );
};