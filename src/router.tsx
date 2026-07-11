import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/AppLayout';
import {
  CollectionStubScreen,
  InventoryScreen,
  SettingsScreen,
  SplashScreen,
  StoryScreen,
  WorldScreen,
} from '@/screens';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <SplashScreen />,
      },
      {
        path: '/world',
        element: <WorldScreen />,
      },
      {
        path: '/story/:projectId/:storyId',
        element: <StoryScreen />,
      },
      {
        path: '/collection-stub',
        element: <CollectionStubScreen />,
      },
      {
        path: '/inventory',
        element: <InventoryScreen />,
      },
      {
        path: '/settings',
        element: <SettingsScreen />,
      },
    ],
  },
]);
