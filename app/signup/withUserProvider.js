// app/withUserProvider.js
import { UserProvider } from '../UserContext';

const withUserProvider = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    );
  };

  return WrappedComponent;
};

export default withUserProvider;