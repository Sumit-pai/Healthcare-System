import { combineReducers } from 'redux'
import policyreducer from './PolicyReducer'
import financereducer from './FinanceReducer'
import appointmentreducer from './AppointmentReducer'
import userreducer from './UserReducer'
import loginreducer from './LoginReducer'
import patientregistrationreducer from './PatientRegistrationReducer'
import doctorreducer from './DoctorReducer'
import treatmentreducer from './TreatmentReducer'

export default combineReducers({
    policy: policyreducer,
    finance: financereducer,
    appointment: appointmentreducer,
    user: userreducer,
    login: loginreducer,
    patientregistration: patientregistrationreducer,
    doctor: doctorreducer,
    treatment: treatmentreducer
})