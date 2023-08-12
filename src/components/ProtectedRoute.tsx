import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    redirectTo: string;
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           isAuthenticated,
                                                           redirectTo,
                                                           component: Component,
                                                           ...rest
                                                       }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
            }
        />
    );
};

export default ProtectedRoute;
