import * as actionCreators from '../actions/PatientRegistrationAction'
// 2. create reducer

const initialState = {
    message: '',
    patients: []
}


const reducer = function(state = initialState,  action){
     switch(action.type){
        case actionCreators.ADD_PATIENT:
            console.log('add  data from here', action.payload);
            let newMessage =  action.payload.message;
            let newPatients = [...state.patients, action.payload.patient]
            // newEmployees.push(action.payload)
            return {
                patients: newPatients,
                message: newMessage
            }

        case actionCreators.FETCH_PATIENTS:
             console.log('fetch data from here');
             let freshPatients = [...action.payload]
             console.log(freshPatients)
             return {
                 patients: freshPatients,
                 message: ''
            }
        case actionCreators.DELETE_PATIENT:
                console.log('in reducer delete method');
                // let newMessage1 =  action.payload.text;
                // let freshEmployees = [...action.payload]

                return {
                    message: '',
                    patients: action.payload
                }
        case actionCreators.GET_PATIENT:
            console.log('in reducer get method');
            console.log(action.payload)
            return{
                message: '',
                patients:action.payload
            }
        case actionCreators.UPDATE_PATIENT:
            console.log(' in reducer edit method');
            console.log(action.payload)
            return{
                message: action.payload.message,
                patients: state.patients
            }
        case actionCreators.REGISTERED_PATIENTS:
            console.log("in reducer registered method");
            let freshpatients = [...action.payload]
            console.log(freshpatients)
            return{
                message: '',
                patients: action.payload
            }
        default:
            return state;
    }

}

export default reducer;