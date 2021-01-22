import * as actionCreators from '../actions/AppointmentActions'

const initialState = {
    message: '',
    appointments: [
        
    ]
}


const reducer = function(state = initialState,  action){
    switch(action.type){
        case actionCreators.ADD_APPOINTMENT:
            console.log('add  data from here', action.payload);
            let newMessage =  action.payload.message;
            let newAppointments = [...state.appointments, action.payload.appointment]
            // newEmployees.push(action.payload)
            return {
                appointments: newAppointments,
                message: newMessage
            }

        case actionCreators.FETCH_APPOINTMENTS:
            console.log('fetch data from here');
            let freshAppointments = [...action.payload]
            return {
                appointments: freshAppointments,
                message: state.message
            }
        case actionCreators.DELETE_APPOINTMENT:
                console.log('in reducer delete method');
                return {
                    message: action.payload.text,
                    appointments: action.payload.appointments
                }
        case actionCreators.FIND_APPOINTMENT:
                console.log('Fetch data from here');
                let Appointments1= {...action.payload}
                console.log(Appointments1);
                    return {
                        appointments: Appointments1,
                        //  message: newMessages
                    }     
        default:
            return state;
       
        }

}

export default reducer;