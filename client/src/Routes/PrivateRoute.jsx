import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const checkIfUserIsAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.userRole === 'admin' || user.userRole === 'hr' || user.userRole === 'employee') {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated as an admin
  const isAdmin = checkIfUserIsAdmin();
  return isAdmin ? <Component {...rest} /> : <Navigate to="/" replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
