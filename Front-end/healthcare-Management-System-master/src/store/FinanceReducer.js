import * as actionCreators from '../actions/FinanceActions'

const initialState = {
    message: '',
    finances: [
        
    ]
}


const reducer = function(state = initialState,  action){
    switch(action.type){
        case actionCreators.ADD_FINANCE:
            console.log('add  data from here', action.payload);
            let newMessage =  action.payload.message;
            let newFinances = [...state.finances, action.payload.finance]
            // newEmployees.push(action.payload)
            return {
                finances: newFinances,
                message: newMessage
            }

        case actionCreators.FETCH_FINANCES:
            console.log('fetch data from here');
            let freshFinances = [...action.payload]
            return {
                finances: freshFinances,
                message: state.message
            }
        case actionCreators.DELETE_FINANCE:
                console.log('in reducer delete method');
                return {
                    message: action.payload.text,
                    finances: action.payload.finances
                }     
         case actionCreators.UPDATE_FINANCE:
                    console.log('add  data from here', action.payload);
                    let newMessages=  action.payload.message;
                    // let newFinances1 = [...state.finances, action.payload.finance]
                    // newEmployees.push(action.payload)
                    return {
                        // finances: newFinances1,
                        message: newMessages
                    }
            case actionCreators.FIND_FINANCE:
                        console.log('Fetch data from here');
                        let financess= {...action.payload}
                        console.log(financess);
                        return {
                            finances: financess,
                            // message: newMessages
                        }
            default:
                return state;
                
        }

}

export default reducer;