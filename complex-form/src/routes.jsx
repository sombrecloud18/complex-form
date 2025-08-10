import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ListPage } from './pages/ListPage/list-page.jsx';
import { EditPage } from './pages/EditPage/edit-page.jsx';

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