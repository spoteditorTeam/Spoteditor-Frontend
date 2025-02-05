import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import Search from './pages/search';
import Profile from './pages/profile';

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
      {
        path: 'profile/:userId',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
