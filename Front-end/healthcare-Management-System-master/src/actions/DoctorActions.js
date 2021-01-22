import axios from 'axios';

export const ADD_DOCTOR = 'ADD_DOCTOR'
export const FETCH_DOCTOR = 'FETCH_DOCTOR'
export const GET_DOCTOR = 'GET_DOCTOR'
export const UPDATE_DOCTOR = 'UPDATE_DOCTOR'
export const DELETE_DOCTOR = 'DELETE_DOCTOR'
export const GET_DOCTOR_BY_FILTER='GET_DOCTOR_BY_FILTER'


const baseUrl = 'http://localhost:8080/api/v1/doctor/'

const saveDoctor = (payload) => {
    return {
        type: ADD_DOCTOR,
        payload
    };
}

export const addDoctor = (payload) => {

    return dispatch => {
        axios.post(baseUrl+"adddoctor", payload)
            .then(function (response) {
                console.log(response.data);
                dispatch(saveDoctor({ message: 'Successfully added Doctor!!' + response.data.doctorId, doctor: payload }))
            })
            .catch(function (error) {
                console.log(error);
                dispatch(saveDoctor({ message: 'Unable to  add Doctor!!' }))
            });
    }
}

const getAllDoctors = (payload) => {
    return {
        type: FETCH_DOCTOR,
        payload

    };
}

export const fetchDoctors = () => {
    return dispatch => {
        fetch(baseUrl+"getAll")

            .then(res => res.json())
            .then(res => {
                console.log(res);
                dispatch(getAllDoctors(res))
            });
    }
}


const getDoctor = (payload) => {
    return {
        type: GET_DOCTOR,
        payload
    };
}

export const viewDoctorDetails = (id) => {
    return dispatch => {
        console.log('view details')
        axios.get(baseUrl + 'getone/' + id)
            .then(res => { console.log(res); dispatch(getDoctor(res.data)) });
    }
}

const updateDoctor = (payload) => {
    return {
        type: UPDATE_DOCTOR,
        payload
    };
}
export const editDoctorDetails = (id, payload) => {
    console.log(payload)
    return dispatch => {
        console.log('update in actions')
        axios.patch(baseUrl + '/updatedoctor/' + id, payload)
            .then(res => { dispatch(updateDoctor({ message: 'Successfully Updated!!', Doctor: payload })) });
    }
}

const removeDoctor = (payload) => {
    return {
        type: DELETE_DOCTOR,
        payload
    };
}


export const deleteDoctor = (id) => {
    return dispatch => {
        console.log('axios delete...')
        axios.delete(baseUrl + '/' + id)
            .then(res => {
                console.log('After http response', res)
                dispatch(removeDoctor(res.data))
            });
    }
}

const getbydate =(payload) => {
    return{
        type: GET_DOCTOR_BY_FILTER,
        payload
    }; 
}
export const getdoctorbydate= (date) => {
    return dispatch => {
        axios.get(baseUrl + 'doctorbydate/?date='+date)
        .then(res => {
            dispatch(getbydate({doctors:res.data,message:''}))})
        .catch(function (error) {
            console.log(error);
            dispatch(getbydate({doctors:[],message: 'Unable to  search patient!!'}))
            });
        
        }
    }
const getbyspecialization =(payload) => {
    return{
        type: GET_DOCTOR_BY_FILTER,
        payload
    }; 
}
export const getdoctorbyspecialization= (specialization) => {
    return dispatch => {
        axios.get(baseUrl + '/doctorbyspecialization?specialization='+specialization)
        .then(res => {
            dispatch(getbyspecialization({doctors:res.data,message:''}))})
        .catch(function (error) {
            dispatch(getbyspecialization({doctors:[],message: 'Unable to  search patient!!'}))
            });
      
}
}

