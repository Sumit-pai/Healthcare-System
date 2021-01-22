import * as actionCreators from '../actions/DoctorActions'

const initialState = {
    message: '',
    doctors: []
}


const UserReducer = function (state = initialState, action) {
    switch (action.type) {
        case actionCreators.ADD_DOCTOR:
            console.log('add data from here', action.payload);
            let newMessage = action.payload.message;
            let newDoctors= [...state.doctors, action.payload.doctor]
            return {
                doctors: newDoctors,
                message: newMessage
            }

        case actionCreators.FETCH_DOCTOR:
            console.log('fetch data from here');
            let freshDoctors = [...action.payload]
            console.log(freshDoctors)
            return {
                doctors: freshDoctors,
                message: state.message
            }

        case actionCreators.GET_DOCTOR:
            console.log('in reducer get method');
            console.log(action.payload)
            return{
                message: state.message,
                doctors:action.payload
            }
            
        case actionCreators.UPDATE_DOCTOR:
            console.log(' in reducer edit method');
            console.log(action.payload)
            return{
                message: action.payload.message,
                doctors: state.doctors
            }

        case actionCreators.GET_DOCTOR_BY_FILTER:
            console.log(' in reducer edit method');
            console.log(action.payload)
            return{
                message: action.payload.message,
                doctors: action.payload.doctors
            }
        
        default:
            return state;
    }

}

export default UserReducer;