import * as actionCreators from '../actions/LoginActions'
const initialState = {
    message: '',
    auth: false,
    role:'',
    id:0,
    userId:0
}

const loginReducer = function(state = initialState,  action){
    switch(action.type){
       case actionCreators.SIGN_IN:
            console.log("Login reducer accessed", action.payload)
            console.log(action.payload.message)
            console.log(action.payload.auth)
            let newMessage =  action.payload.message;
            if(!(newMessage === 'Invalid Credentials')){
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('id', action.payload.id)
            localStorage.setItem('userid', action.payload.userId)
            localStorage.setItem("role",action.payload.role)
            }
            return{
                message: newMessage,
                auth:  action.payload.auth,
                id: action.payload.id,
                role: action.payload.role,
                userId: action.payload.userId
            }
        case actionCreators.SIGN_OUT:
            console.log("logout reduce method accessed", action.payload)
            localStorage.clear()

            return{
                message:'',
                auth:  action.payload.auth,
                id: action.payload.id,
                role: action.payload.role,
                userId:action.payload.userId
            }
       default:
           return state;


    }
}
export default loginReducer;