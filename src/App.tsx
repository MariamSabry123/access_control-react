//import { Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";


import OrganizationPage from "./Pages/OrganizationPage";
import OrganizationSheetPage from "./Pages/OrganizationSheetPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SummeryReport from "./Pages/AccessControl/SummeryReport";
import Details from "./Pages/AccessControl/Details";
import UserDetails from "./Pages/UserDetails";
function App() {
  return (
  <>
  <Routes>
    <Route path="/"element={<LoginPage/>}/>
   
    <Route path="/organization"element={<OrganizationPage/>}/>
    <Route path="/organization-sheet"element={<OrganizationSheetPage/>}/>
    <Route path="/user-details"element={<UserDetails/>}/>

    <Route path="/summary-report" element={<SummeryReport/>}/>
    <Route path="/details/:id" element={<Details/>}/>
    <Route/>
    <Route/>
  </Routes>
  </>
  );
}

export default App;
