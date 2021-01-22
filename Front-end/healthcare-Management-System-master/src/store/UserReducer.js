import * as actionCreators from '../actions/UserActions'

const initialState = {
    message: '',
    users: []
}


const UserReducer = function (state = initialState, action) {
    switch (action.type) {
        case actionCreators.ADD_USER:
            console.log('add data from here', action.payload);
            let newMessage = action.payload.message;
            let newUsers = [...state.users, action.payload.user]
            return {
                users: newUsers,
                message: newMessage
            }

        case actionCreators.FETCH_USERS:
            console.log('fetch data from here');
            let freshUsers = [...action.payload]
            console.log(freshUsers)
            return {
                users: freshUsers,
                message: state.message
            }

        case actionCreators.DELETE_USER:
                console.log('in reducer delete method');

                return {
                    message: state.message,
                    users: action.payload
                }

        case actionCreators.GET_USER:
            console.log('in reducer get method');
            console.log(action.payload)
            return{
                message: state.message,
                users:action.payload
            }
            
        case actionCreators.UPDATE_USER:
            console.log(' in reducer edit method');
            console.log(action.payload)
            
            return{
                message: action.payload.message
            }

        // case actionCreators.REGISTERED_USERS:
        //     console.log("in reducer registered method");
        //     console.log(action.payload)
        //     return{
        //         message: state.message,
        //         users: action.payload.users
        //     }
        default:
            return state;
    }

}

export default UserReducer;