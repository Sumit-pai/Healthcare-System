import axios from 'axios';

export const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
export const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS'
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT'
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'
export const FIND_APPOINTMENT = 'FIND_APPOINTMENT'
export const FILTER_APPOINTMENT = 'FILTER_APPOINTMENT'







const baseUrl = 'http://localhost:8080/api/v1/appointment/'

const saveAppointment = (payload) => {
    return {
        type: ADD_APPOINTMENT,
        payload
    };
}

export const addAppointment = (payload) => {
    return dispatch => {
        axios.post(baseUrl, payload)
          .then(function (response) {
            console.log(response);
            dispatch(saveAppointment({message: 'Successfully added Appointment!!', appointment: payload}))
          })
          .catch(function (error) {
            console.log(error);
            dispatch(saveAppointment({message: 'Unable to  add appointment!!'}))
          });
    }

}


const findAppointment = (payload) => {
    return {
        type: FETCH_APPOINTMENTS,
        payload

    };
}

export const fetchAppointments = () => {
    return dispatch => {
        //fetch(baseUrl)
         axios(baseUrl)
           // .then(res => res.json())
            .then(res => dispatch(findAppointment(res.data)));
    }
}


const removeAppointment = (payload) => {
    return {
        type: DELETE_APPOINTMENT,
        payload
    };
}


export const deleteAppointment = (id) => {
    return dispatch => {
        console.log('axios delete...')
        axios.delete(baseUrl + id)
            .then(res =>{
                console.log('After http response',  res.data)
                dispatch(removeAppointment(res.data))
            }  );
        }
   }
   const findAppointment1=(payload)=>{
    return{
        type:FIND_APPOINTMENT,
        payload
    };
}
export const findAppointments=(appointmentId)=>{
    return dispatch=>{
        axios(baseUrl+'getById/'+ appointmentId)
        .then(res=>
            {
                console.log(res.data);
                dispatch(findAppointment1(res.data))
            })
    }
}