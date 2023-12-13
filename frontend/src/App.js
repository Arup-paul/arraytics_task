import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import AuthUser from "./Components/AuthUser";
import Layout from "./Components/Layout";
import GuestLayout from "./Components/GuestLayout";


function App() {
   const {getToken} = AuthUser();

   if(getToken()){
       return  <Layout />
   }

    return <GuestLayout />


}

export default App;
