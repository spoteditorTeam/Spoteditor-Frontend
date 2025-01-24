import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 레이아웃 컴포넌트
    children: [
      {
        path: '',
        //   element: <Home />,
      },
    ],
  },
]);

export default router;
