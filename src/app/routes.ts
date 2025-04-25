import { AppRoute } from "src/libs/route.model";

//#region Auth Routes
// Auth routes are used for authentication related pages like login, register, etc.
export class AuthRoutes {
    static readonly root: AppRoute = {
        path: 'auth',
        url: '/auth',
    };

    static readonly login: AppRoute = {
        path: 'login',
        url: '/auth/login',
        name: 'Login',
    };

    static readonly register: AppRoute = {
        path: 'register',
        url: '/auth/register',
        name: 'Register',
    };

    static readonly resetPassword: AppRoute = {
        path: 'reset-password',
        url: '/auth/reset-password',
        name: 'Forgot Password',
    };
}
//#endregion

//#region Public Routes
// Public routes are used for pages that are accessible to all users without authentication.
export class PublicAppRoutes {
    static readonly root: AppRoute = {
        path: '',
        url: '/',
    };

    static readonly Auth = AuthRoutes;
}
//#endregion

//#region Secured Routes
// Secured routes are used for pages that require authentication and authorization.
export class HomeRoutes {
    static readonly root: AppRoute = {
        path: 'home',
        url: '/app/home',
        name: 'Home',
    };
}
//endregion

//#region Secured Routes
// Secured routes are used for pages that require authentication and authorization.
export class SecuredAppRoutes {
    static readonly root: AppRoute = {
        path: 'app',
        url: '/app',
        name: 'Home',
    };

    static readonly Home = HomeRoutes;
}
//endregion
