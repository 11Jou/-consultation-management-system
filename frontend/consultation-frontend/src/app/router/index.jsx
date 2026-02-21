import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../components/Layout/Layout'
import ErrorPage from '../pages/404'

const Login = lazy(() => import("../pages/index.jsx"));

const Loading = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  )

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
  ])

export default function AppRouter() {
    return (
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    )
  }
