// // app/ProtectedRoute.js
// import { useNavigation } from 'next-navigation';
// import { useUser } from './UserContext';

// const ProtectedRoute = ({ children }) => {
//   const navigation = useNavigation();
//   const { user } = useUser();

//   if (!user) {
//     navigation.navigate('/');
//     return null;
//   }

//   return children;
// };

// export default ProtectedRoute;