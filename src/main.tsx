import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/AppRoutes.tsx'
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <div>
      <Toaster></Toaster>
    </div>
  </StrictMode>,
)
