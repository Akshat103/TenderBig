import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const checkIfUserIsAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user){
    return false;
  }
  else if (user && user.userRole === 'admin' || user.userRole === 'hr' || user.userRole === 'employee' || user.userRole === 'franchise') {
    return true;
  } else {
    return false;
  }
};

const AdminRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated as an admin
  const isAdmin = checkIfUserIsAdmin();
  return isAdmin ? <Component {...rest} /> : <Navigate to="/" replace />;
};

AdminRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default AdminRoute;
