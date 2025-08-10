import axios from 'axios';

const API_URL = 'http://localhost:3001/api/projects';

export const fetchProjects = () => axios.get(API_URL);
export const fetchProject = (id) => axios.get(`${API_URL}/${id}`);
export const createProject = (data) => axios.post(API_URL, data);
export const updateProject = (id, data) => axios.patch(`${API_URL}/${id}`, data);