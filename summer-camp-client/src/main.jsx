import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <div className=" mx-auto bg-slate-100">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </QueryClientProvider>
  </HelmetProvider>
</AuthProvider>
  </React.StrictMode>,
)
