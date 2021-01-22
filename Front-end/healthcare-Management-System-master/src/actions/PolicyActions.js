import axios from 'axios'


export const ADD_POLICY = 'ADD_POLICY'
export const LIST_POLICIES = 'LIST_POLICIES'
export const UPDATE_POLICY = 'UPDATE_POLICY'
export const DELETE_POLICY = 'DELETE_POLICY'
export const GET_BY_POLICY_NUMBER = 'GET_BY_POLICY_NUMBER'
export const CLEAR_STATE = 'CLEAR_STATE'
export const FILTER_BY_EMAIL = 'FILTER'


const BASE_URL = 'http://localhost:8080/policies/'

//Add policy action
const addPolicyAction = (data) => {
    return {
        type: ADD_POLICY,
        data
    }
}

//Add policy function
export const addPolicy = (policy) => {
    return (dispatch) => {
        axios.post(BASE_URL, policy)
            .then((response) => {
                dispatch(addPolicyAction(response.data))
            })
            .catch(err => console.log(err))
            
    }
}

//view all policies action
const getAllPoliciesAction = (data) => {
    return {
        type: LIST_POLICIES,
        data
    }
}

//view all policies function
export const getAllPolicies = () => {
    return (dispatch) => {
        axios.get(BASE_URL)
            .then((response) => {
                dispatch(getAllPoliciesAction(response.data))
            })
            .catch(err => console.log(err))

        
    }
}

//update policy action
const updatePolicyAction = (data) => {
    return {
        type: UPDATE_POLICY,
        data
    }
}

//update policy function
export const updatePolicy = (emailId, policy) => {
    return (dispatch) => {
        axios.put(BASE_URL + emailId, policy)
            .then((response) => {
                dispatch(updatePolicyAction(response.data))
            })
            .catch((err) => console.error(err))
    }
}

//delete policy action
const deletePolicyAction = (data) => {
    return {
        type: DELETE_POLICY,
        data
    }
}

//delete policy function
export const deletePolicy = (patientId) => {
    return (dispatch) => {
        axios.delete(BASE_URL + patientId)
            .then((response) => {
                dispatch(deletePolicyAction(response.data))
            })
            .catch((err) => console.error(err))
    }
}

//get by policy number action
const getByPolicyNumberAction = (data) => {
    return {
        type: GET_BY_POLICY_NUMBER,
        data
    }
}

//get by policy number function
export const getByPolicyNumber = (policyNumber) => {
    return dispatch => {
        axios.get(BASE_URL + 'search?policyNumber=' + policyNumber)
            .then((response) => {
                dispatch(getByPolicyNumberAction(response.data))
            })
    }
}

//clear state action
const clearStateAction = () => {
    return {
        type: CLEAR_STATE,
    }
}

//clear state function
export const clearState = () => {
    return dispatch => {
        dispatch(clearStateAction())
    }
}


