import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import Search from './pages/search';
import Profile from './pages/profile';
import SavedSpaces from './pages/profile/saved-spaces';
import SavedLogs from './pages/profile/saved-logs';
import MyLogs from './pages/profile/my-logs';

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
        children: [
          {
            path: 'my-logs',
            element: <MyLogs />,
          },
          {
            path: 'saved-logs',
            element: <SavedLogs />,
          },
          {
            path: 'saved-spaces',
            element: <SavedSpaces />,
          },
        ],
      },
    ],
  },
]);

export default router;
