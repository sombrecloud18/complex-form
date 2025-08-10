import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ListPage } from './pages/list-page/list-page.jsx'
import { EditPage } from './pages/edit-page/edit-page.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "/create",
    element: <App />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
]);