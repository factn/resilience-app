import HomePage from '../page/Home';
import LoginPage from '../page/Login';

// A simple way to scale routes without cluttering the App or Router
// If a component requires auth it will be considered a PrivateRoute
// Else it will be publically accessible
export default [
  {
    path: '/',
    key: 'HOME_VIEW',
    exact: true,
    requiresAuth: false,
    component: HomePage
  },
  {
    path: '/login',
    key: 'LOGIN_VIEW',
    exact: true,
    requiresAuth: false,
    component: LoginPage
  }
];
