import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const checkIfUserIsLogedIn = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.userRole) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated as an admin
  const isLogedIn = checkIfUserIsLogedIn();
  return isLogedIn ? <Component {...rest} /> : <Navigate to="/user-not-found" replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
