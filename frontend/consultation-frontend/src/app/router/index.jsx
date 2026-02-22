import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../components/Layout/Layout'
import ErrorPage from '../pages/404'
import ProtectedRoute from './ProtectedRoute'

const Login = lazy(() => import("../pages/index.jsx"));
const Patients = lazy(() => import("../pages/dashboard/patients"));
const Consultations = lazy(() => import("../pages/dashboard/consultations"));
const CreatePatient = lazy(() => import("../pages/dashboard/patients/create"));
const CreateConsultation = lazy(() => import("../pages/dashboard/consultations/create"));
const ConsultationDetail = lazy(() => import("../pages/dashboard/consultations/[id]"));

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
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/dashboard/patients",
              element: <Patients />,
            },
            {
              path: "/dashboard/consultations",
              element: <Consultations />,
            },
            {
              path: "/dashboard/patients/create",
              element: <CreatePatient />,
            },
            {
              path: "/dashboard/consultations/create",
              element: <CreateConsultation />,
            },
            {
              path: "/dashboard/consultations/:id",
              element: <ConsultationDetail />,
            },
          ],
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
