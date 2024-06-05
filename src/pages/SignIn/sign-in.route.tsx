import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { SignInPage } from './sign-in-page.ui';

export const signInRoutePageRoute: RouteObject = {
  index: true,
  element: createElement(SignInPage),
};
