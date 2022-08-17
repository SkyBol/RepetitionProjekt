import { Navigate, Routes } from 'react-router-dom';
import { isAuthorized } from '../service/AccountManagement';

function ProtectedPages({children} : {children : JSX.Element[] | JSX.Element}) {
    if (isAuthorized()) {
        return <Routes>children</Routes>;
    } else {
        return <Navigate to={ '/login' } />
    }
}

export default ProtectedPages;