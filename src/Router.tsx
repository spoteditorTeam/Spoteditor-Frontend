import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import Search from './pages/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);

export default router;
