import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './list-page.module.css';

export const ListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleTasks = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Projects</h1>
        <Link to="/create" className={styles.createButton}>
          Create New Project
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <>
              <tr key={project.id} className={styles.projectRow}>
                <td>{project.projectTitle}</td>
                <td>{project.projectAuthor}</td>
                <td>{project.projectPriority}</td>
                <td>{project.projectStatus}</td>
                <td>{project.projectBudget ? `$${project.projectBudget}` : '-'}</td>
                <td>
                  <button 
                    onClick={() => toggleTasks(project.id)} 
                    className={styles.toggleButton}
                  >
                    {project.tasks?.length || 0} tasks
                  </button>
                </td>
                <td className={styles.editButton}>
                  <Link 
                    to={`/edit/${project.id}`} 
                    className={styles.link}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              {expandedProject === project.id && (
                <tr className={styles.taskRow}>
                  <td colSpan="7">
                    <div className={styles.tasksContainer}>
                      <h4>Project Tasks:</h4>
                      {project.tasks?.length > 0 ? (
                        <ul className={styles.tasksList}>
                          {project.tasks.map((task, index) => (
                            <li key={index} className={styles.taskItem}>
                              <div className={styles.taskLine}>
                                <span className={styles.taskName}>{task.name}</span>
                                <span className={styles.taskStatus}>{task.status}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No tasks for this project</p>
                      )}
                    </div>
                  </td>
                </tr> 
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};