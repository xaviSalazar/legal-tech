import {  useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// //
// import Blog from './pages/Blog';
// import User from './pages/User';
import Login from './pages/Login';
// import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import MainLayout from './pages/MainLayout'
import SocialForm from './sections/auth/register/RegisterSocialForm'
import TalentPage from './pages/TalentPage'
import ClientPage from './pages/ClientPage';
import Account from './pages/Account';
import Templates from './pages/Templates';
// import DashboardApp from './pages/DashboardApp';


// -------import { HelmetProvider } from 'react-helmet-async';---------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // {
    //   path: '/dashboard',
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: 'app', element: <DashboardApp /> },
    //     { path: 'user', element: <User /> },
    //     { path: 'products', element: <Products /> },
    //     { path: 'blog', element: <Blog /> },
    //   ],
    // },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <MainLayout />,
    },
    {
      path: 'register-social-form',
      element: <SocialForm />
    },
    {
      path: 'abogado-page',
      element: <TalentPage />,
      children: [
        { path: 'account', element: <Account /> },
        // { path: 'user', element: <User /> },
        { path: 'clientes', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'cliente-page',
      element: <ClientPage />,
      children: [
        { path: 'documentos', element: <Templates/> },
        { path: 'account',element: <Account /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: '/', element: <Navigate to="/dashboard/app" /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}
