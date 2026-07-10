import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import '@/styles/app.css';
import '@/styles/global.css';

export function App() {
  return (
    <div className="app">
      <div className="app__frame">
        <main className="app__content">
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}
