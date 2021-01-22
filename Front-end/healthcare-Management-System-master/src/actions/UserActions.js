import axios from 'axios';

export const ADD_USER = 'ADD_USER'
export const FETCH_USERS = 'FETCH_USERS'
export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

const baseUrl = 'http://localhost:8080/user'

const saveUser = (payload) => {
    return {
        type: ADD_USER,
        payload
    };
}

export const addUser = (payload) => {

    return dispatch => {
        axios.post(baseUrl, payload)
            .then(function (response) {
                console.log(response.data);
                dispatch(saveUser({ message: 'Successfully added user!! ' + response.data.userId, user: payload }))
            })
            .catch(function (error) {
                console.log(error);
                dispatch(saveUser({ message: 'Unable to  add User!!' }))
            });
    }
}

const findUser = (payload) => {
    return {
        type: FETCH_USERS,
        payload

    };
}

export const fetchUsers = () => {
    return dispatch => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                dispatch(findUser(res))
            });
    }
}


const getUser = (payload) => {
    return {
        type: GET_USER,
        payload
    };
}

export const viewUserDetails = (id) => {
    return dispatch => {
        console.log('view details')
        axios.get(baseUrl + '/' + id)
            .then(res => { console.log(res); dispatch(getUser(res.data)) });
    }
}

const updateUser = (payload) => {
    return {
        type: UPDATE_USER,
        payload
    };
}
export const editUserDetails = (id, payload) => {
    console.log(payload)
    return dispatch => {
        console.log('update in actions')
        axios.put(baseUrl + '/' + id, payload)
            .then(res => { dispatch(updateUser({ message: 'Successfully Updated!!', User: payload })) });
    }
}

const removeUser = (payload) => {
    return {
        type: DELETE_USER,
        payload
    };
}


export const deleteUser = (id) => {
    return dispatch => {
        console.log('axios delete...')
        axios.delete(baseUrl + '/' + id)
            .then(res => {
                console.log('After http response', res)
                dispatch(removeUser(res.data))
            });
    }
}











// export const REGISTERED_USERS='REGISTERED_USERS'



// const findUsers = (payload) =>{
//     return{
//         type:REGISTERED_USERS,
//         payload
//     };
// }
// export const viewUserByDate = (from,to) =>{
//     console.log("viewUserByDate in action accessd");
//     return dispatch =>{
//         axios.get(baseUrl+"/bydates?fromdate="+from+"&todate="+to)
//         .then(res=>dispatch(findUsers(res.data)));
//     }
// }