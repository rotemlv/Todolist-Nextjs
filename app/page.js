// app/page.js
import { UserProvider } from './UserContext';
// import dynamic from 'next/dynamic';
import ClientPage from './components/ClientPage';
import {Register} from './Register';
//const ClientPage = dynamic(() => import('./ClientPage'), { ssr: false });


function Page() {
  return (
    <UserProvider>
      <ClientPage />
    </UserProvider>
  );
}

export default Page;