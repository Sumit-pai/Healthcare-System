import * as actionCreators from '../actions/PolicyActions'

const initialState = {
    message: '',
    policyList: []
}

const reducer = function(state = initialState, action)  {

    switch(action.type) {
        case actionCreators.ADD_POLICY:
            let messageAfterAddition = action.data.message
            let listAfterAddition = action.data.policies
            return {
                message: messageAfterAddition,
                policyList: listAfterAddition
            }

        case actionCreators.DELETE_POLICY:
            let messageAfterDeletion = action.data.message
            let listAfterDeletion = action.data.policies
            return {
                message: messageAfterDeletion,
                policyList: listAfterDeletion
            }

        case actionCreators.UPDATE_POLICY:
            let messageAfterUpdation = action.data.message
            let listAfterUpdation = action.data.policies
            return {
                message: messageAfterUpdation,
                policyList: listAfterUpdation
            }

        case actionCreators.LIST_POLICIES:
            let listOfPolicies = action.data.policies
            
            return {
                policyList: listOfPolicies
            }


        case actionCreators.GET_BY_POLICY_NUMBER:
            let policyForGetByPolicyNumber = action.data.policies
            let messageForGetByPolicyNumber = action.data.message
            return {
                message: messageForGetByPolicyNumber,
                policyList: policyForGetByPolicyNumber
            }

        case actionCreators.CLEAR_STATE:
            return {
                message: '',
                policyList: []
            }

        default: return state
    }
}
export default reducer;