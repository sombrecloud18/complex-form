import { Controller, useFieldArray } from "react-hook-form";
import styles from './create-form.module.css';

export const CreateProjectForm = ({ onCancel, control, onSubmit, isEdit = false }) => {
  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ];

  const statusOptions = [
    { value: "Planned", label: "Planned" },
    { value: "In progress", label: "In progress" },
    { value: "Completed", label: "Completed" },
    { value: "Skipped", label: "Skipped" }
  ];

  const taskStatusOptions = [
    { value: "Todo", label: "Todo" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" }
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks"
  });

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      {isEdit && (
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
      )}
      <h2 className={styles.formTitle}>{isEdit ? "Edit Project" : "Add Project"}</h2>
      <div className={styles.formGrid}>
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Project name*</label>
            <Controller
              name="projectTitle"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input 
                    type="text"
                    {...field}
                    className={`${styles.input} ${error ? styles.errorInput : ''}`}
                    placeholder="Project name"
                    maxLength={50}
                  />
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>

          <div className={`${styles.formGroup} ${styles['formGroup-with-textarea']}`}>
            <label className={styles.label}>Project Description</label>
            <Controller
              name="projectDescription"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <textarea
                    {...field}
                    className={`${styles.textarea} ${error ? styles.errorInput : ''}`}
                    placeholder="Project Description"
                    maxLength={200}
                  />
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Author*</label>
            <Controller
              name="projectAuthor"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    {...field}
                    className={`${styles.input} ${error ? styles.errorInput : ''}`}
                    placeholder="Author"
                  />
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Budget</label>
            <Controller
              name="projectBudget"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="number"
                    {...field}
                    className={`${styles.input} ${error ? styles.errorInput : ''}`}
                    placeholder="Budget"
                  />
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Priority*</label>
            <Controller
              name="projectPriority"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <select {...field} className={`${styles.select} ${error ? styles.errorInput : ''}`}>
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status*</label>
            <Controller
              name="projectStatus"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <select {...field} className={`${styles.select} ${error ? styles.errorInput : ''}`}>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {error && <span className={styles.errorText}>{error.message}</span>}
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.tasksSection}>
        <h3>Tasks</h3>
        {fields.map((item, index) => (
          <div key={item.id} className={styles.taskItem}>
            <div className={styles.taskInputs}>
              <Controller
                name={`tasks.${index}.name`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <input
                      {...field}
                      className={`${styles.input} ${error ? styles.errorInput : ''}`}
                      placeholder="Task name"
                    />
                    {error && <span className={styles.errorText}>{error.message}</span>}
                  </>
                )}
              />
              <Controller
                name={`tasks.${index}.status`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <select {...field} className={`${styles.select} ${error ? styles.errorInput : ''}`}>
                      {taskStatusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {error && <span className={styles.errorText}>{error.message}</span>}
                  </>
                )}
              />
            </div>
            <button 
              type="button" 
              onClick={() => remove(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => append({ name: '', status: 'Todo' })}
          className={styles.addButton}
        >
          Add Task
        </button>
      </div>

      <div className={styles.buttons}>
        <button 
          type="button" 
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {isEdit ? "Update" : "Add"} project
        </button>
      </div>
    </form>
  );
};