import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage'
import AddUser from './components/UserComponents/AddUser'
import UpdateUser from './components/UserComponents/UpdateUser'
import UserDetail from './components/UserComponents/UserDetails'
import Login from './components/LoginComponents/Login'
import Logout from './components/LoginComponents/Logout'
import Header from './components/Header'
import AddPatient from './components/PatientComponents/AddPatient'
import ViewPatient from './components/PatientComponents/ViewPatient'
import UpdatePatient from './components/PatientComponents/EditPatientDetails'
import PatientDetail from './components/PatientComponents/ViewPatientDetails'
import AddDoctor from './components/DoctorComponents/AddDoctor'
import ViewDoctor from './components/DoctorComponents/ViewDoctor'
import UpdateDoctor from './components/DoctorComponents/UpdateDoctor'
import DoctorDetail from './components/DoctorComponents/DoctorDetail'
import ViewByDate from './components/DoctorComponents/ViewByDate'
import ViewBySpecialization from './components/DoctorComponents/ViewBySpecialization'
import AddPolicy from './components/PolicyComponents/AddPolicy'
import SearchPolicyByPolicyNumber from './components/PolicyComponents/SearchPolicyByPolicyNumber'
import ViewPolicies from './components/PolicyComponents/ViewPolicies'
import UpdateSpecficPolicy from './components/PolicyComponents/UpdateSpecficPolicy'
import ViewFinance from './components/FinanceComponents/ViewFinance'
import AddFinance from './components/FinanceComponents/AddFinance'
import UpdateFinance from './components/FinanceComponents/UpdateFinance'
import FindFinanceById from './components/FinanceComponents/FindFinanceById'
import AddAppointment from './components/AppointmentComponents/AddAppointment'
import ViewAppointment from './components/AppointmentComponents/Viewappointment'
import TreatmentList from './components/TreatmentComponents/TreatmentList'
import AddTreatment from './components/TreatmentComponents/AddTreatment'
import UpdateTreatment from './components/TreatmentComponents/UpdateTreatment'
import ViewTreatment from './components/TreatmentComponents/ViewTreatment'
import Footer from './components/FinanceComponents/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={AddUser} />
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/patientregistration" component={AddPatient} />
        <Route exact path="/doctorregistration" component={AddDoctor} />
        <Route exact path="/loggedin" component={HomePage} />
        <Route exact path="/policy" component={AddPolicy} />
        <Route exact path="/policy/search" component={SearchPolicyByPolicyNumber} />
        <Route exact path="/policy/list" component={ViewPolicies} />
        <Route exact path="/policy/update/:emailId" component={UpdateSpecficPolicy} />
        <Route exact path="/finance/view" component={ViewFinance}/>        
        <Route exact path="/finance/add/:id" component={AddFinance}/>       
        <Route exact path="/finance/update/:id" component={UpdateFinance}/>       
        <Route exact path="/finance/getById/:financeId" component={FindFinanceById}/>
        <Route exact path="/appointment/add" component={AddAppointment}/>
        <Route exact path="/appointment/view" component={ViewAppointment}/>
        <Route exact path="/treatment" component={TreatmentList} />
        <Route exact path="/treatment/:id" component={AddTreatment} />
        <Route exact path="/updatetreatment/:id" component={UpdateTreatment} />
        <Route exact path="/viewtreatment/:id" component={ViewTreatment} />

        <Route exact path="/updateuser/:id" component={UpdateUser} />
        <Route exact path="/viewuser/:id" component={UserDetail} />
        <Route exact path="/doctor/view" component={ViewDoctor} />
        <Route exact path="/doctor/view/:id" component={DoctorDetail} />
        <Route exact path="/doctor/update/:id" component={UpdateDoctor} />
        <Route exact path="/doctorbydate/:date" component={ViewByDate} />
        <Route exact path="/doctorbyspecialization/:specialization" component={ViewBySpecialization} />
        <Route exact path="/patient/view" component={ViewPatient} />
        <Route exact path="/patient/view/:id" component={PatientDetail} />
        <Route exact path="/patient/update/:id" component={UpdatePatient} />
        
      </Switch>
      <Footer></Footer>
      </div>
    </Router>

  );
}

export default App;
