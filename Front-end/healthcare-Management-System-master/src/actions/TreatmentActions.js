import axios from 'axios';

export const ADD_TREATMENTS = 'ADD_TREATMENTS'
export const FETCH_TREATMENTS = 'FETCH_TREATMENTS'
export const FETCH_TREATMENTBYID = 'FETCH_TREATMENTBYID'
export const ADD_REPORT = 'ADD_REPORT'
export const FETCH_TREATMENT_BY_ID = "FETCH_TREATMENT_BY_ID"
export const GOTO_PREVIOUS_STATE = "GOTO_PREVIOUS_STATE"
export const FETCH_BYDATE = "FETCH_BYDATE"
export const FETCH_BYDATES = "FETCH_BYDATES"
export const FETCH_BY_ID = "FETCH_BY_ID"



const baseUrl = 'http://localhost:8080/api/v1/treatments'

const saveTreatment = (payload) => {
    return {
        type: ADD_TREATMENTS,
        payload
    };
}

export const addTreatment = (payload) => {

   return dispatch => {
        axios.post(baseUrl, payload)
          .then(response =>{
            dispatch(saveTreatment({message: response.data,flag:true}))
          })
          .catch(error => {
            dispatch(saveTreatment({message: error.response.data,flag:false}))
          });
    }

}


const findTreatments = (payload) => {
    return {
        type: FETCH_TREATMENTS,
        payload
    };
}

export const fetchTreatments = () => {
    return dispatch => {
        
        axios(baseUrl)
            .then(response => dispatch(findTreatments(response.data)));
    }
}

const findTreatment = (payload) => {
    return {
        type: FETCH_TREATMENTBYID,
        payload
    };   
}

export const fetchTreatment = (id) => {
    return dispatch => {
        
        axios(baseUrl+'/'+id)
        .then(response => dispatch(findTreatment({treatment:response.data,message: '',flag:true})))
        .catch(error => dispatch(findTreatment({message: error.response.data,flag:false})));
    }
}

const tempAddReport = (payload) => {
    return {
        type: ADD_REPORT,
        payload
    };   
}

export const addReport = (id,payload) => {
    return dispatch => {
        
        axios.patch(baseUrl+'/report/'+id,payload)
            .then(response => dispatch(tempAddReport({message: response.data,flag:true})))
            .catch(error => {
                dispatch(tempAddReport({message: error.response.data,flag:false}))
              });
    }
}

const findByDoctorId = (payload) => {
    return {
        type: FETCH_TREATMENT_BY_ID,
        payload
    };
}

export const fetchByDoctorId = (id) => {
    return dispatch => {
        
        axios(baseUrl+'/bydoctor/'+id)
            .then(response => dispatch(findByDoctorId({treatments:response.data,message: '',flag:true})))
            .catch(error => {
                dispatch(findByDoctorId({treatments:[],message: error.response.data,flag:false}))
              });
    }
}

const findByPatientId = (payload) => {
    return {
        type: FETCH_TREATMENT_BY_ID,
        payload
    };
}

export const fetchByPatientId = (id) => {
    return dispatch => {
        
        axios(baseUrl+'/bypatient/'+id)
            .then(response => dispatch(findByPatientId({treatments:response.data,message: '',flag:true})))
            .catch(error => {
                dispatch(findByPatientId({treatments:[],message: error.response.data,flag:false}))
              });
    }
}


export const fetchByDate = (payload)=>{
    return {
        type: FETCH_BYDATE,
        payload
    };
}

export const fetchByDates = (payload)=>{
    return {
        type: FETCH_BYDATES,
        payload
    };
}

export const findById = (payload)=>{
    return {
        type: FETCH_BY_ID,
        payload
    };
}

export const fetchById = (id) => {
    return dispatch => {
        
        axios(baseUrl+'/'+id)
            .then(response => dispatch(findById({treatment:response.data,message: '',flag:true})))
            .catch(error => dispatch(findById({message: error.response.data,flag:false})));
    }
}