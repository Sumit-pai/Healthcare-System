import axios from 'axios';

export const ADD_PATIENT = 'ADD_PATIENT'
export const FETCH_PATIENTS = 'FETCH_PATIENTS'
export const DELETE_PATIENT = 'DELETE_PATIENT'
export const GET_PATIENT = 'GET_PATIENT'
export const UPDATE_PATIENT ='UPDATE_PATIENT'
export const REGISTERED_PATIENTS='REGISTERED_PATIENTS'



const baseUrl = 'http://localhost:8080/patient'

const savePatient = (payload) => {
    return {
        type: ADD_PATIENT,
        payload
    };
}

export const addPatient = (payload) => {

    return dispatch => {
        axios.post(baseUrl, payload)
          .then(function (response) {
            console.log(response.data);
            dispatch(savePatient({message: 'Successfully added patient!!', patient: payload}))
          })
          .catch(function (error) {
            console.log(error);
            dispatch(savePatient({message: 'Unable to  add patient!!'}))
          });
    }

}


const findPatient = (payload) => {
   // console.log(payload)
    return {
        type: FETCH_PATIENTS,
        payload

    };
}

export const fetchPatients = () => {
    return dispatch => {
        fetch(baseUrl)
        //axios(baseUrl)
            .then(res => res.json())
            .then(res =>{ console.log("action ....",res); dispatch(findPatient(res))})
            .catch(function (error) {
                console.log(error);
                dispatch(savePatient({message: 'Unable to  fetch patient!!'}))
              });
    }
}

const removePatient = (payload) => {
    return {
        type: DELETE_PATIENT,
        payload
    };
}


export const deletePatient = (id) => {
    return dispatch => {
        // fetch(baseUrl)
        console.log('axios delete...')
        axios.delete(baseUrl + '/'+id)
            // .then(res => res.json())
            .then(res =>{
                console.log('After http response',  res)
                dispatch(removePatient(res.data))
            })
            .catch(function (error) {
                console.log(error);
                dispatch(savePatient({message: 'Unable to  delete patient!!'}))
              });
    }
}

const getPatient =(payload) => {
    return {
        type: GET_PATIENT,
        payload
    };
}

export const viewPatientDetails =(id) =>{
    return dispatch => {
        console.log('view details')
        axios.get(baseUrl+'/'+id)
        .then(res =>{console.log(res); dispatch(getPatient(res.data))})
        .catch(function (error) {
            console.log(error);
            dispatch(savePatient({message: 'Unable to  view patient details!!'}))
          });
    }
}

const updatePatient =(payload) =>{
    return {
        type: UPDATE_PATIENT,
        payload
    };
}
export const editPatientDetails =(id,payload) =>{
    console.log(payload)
    return dispatch =>{
        console.log('update in actions')
        axios.put(baseUrl+'/'+id, payload)
        .then(res => {dispatch(updatePatient({message: 'Successfully Updated!!', patient: payload}))})
        .catch(function (error) {
            console.log(error);
            dispatch(savePatient({message: 'Unable to edit details!!'}))
          });
    }
}

const findPatients = (payload) =>{
    return{
        type:REGISTERED_PATIENTS,
        payload
    };
}
export const searchByDate = (payload) =>{
    console.log("viewPatientByDate in action accessd");
    return dispatch =>{
        axios.get(baseUrl+"/bydates?date="+payload)
        .then(res=>{console.log(res);dispatch(findPatients(res.data))})
        .catch(function (error) {
            console.log(error);
            dispatch(findPatients({message: 'Unable to  search patient!!'}))
          });
    }
}