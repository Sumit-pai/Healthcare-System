import axios from 'axios';

export const ADD_FINANCE = 'ADD_FINANCE'
export const FETCH_FINANCES = 'FETCH_FINANCES'
export const DELETE_FINANCE = 'DELETE_FINANCE'
export const UPDATE_FINANCE = 'UPDATE_FINANCE'
export const FIND_FINANCE = 'FIND_FINANCE'
export const FILTER_FINANCE = 'FILTER_FINANCE'




const baseUrl = 'http://localhost:8080/api/v1/healthcaresystem/'

const saveFinance = (payload) => {
    return {
        type: ADD_FINANCE,
        payload
    };
}

export const addFinance = (payload) => {
    return dispatch => {
        axios.post(baseUrl, payload)
          .then(function (response) {
            console.log(response);
            dispatch(saveFinance({message: 'Successfully added Finance!!', finance: payload}))
          })
          .catch(function (error) {
            console.log(error);
            dispatch(saveFinance({message: 'Unable to  add finance!!'}))
          });
    }

}
const updatedFinance = (payload) => {
         return {
             type: UPDATE_FINANCE,
             payload
         };
     }
export const updateFinance = (payload,id) => {
    return dispatch => {
        axios.put('http://localhost:8080/api/v1/healthcaresystem/update/' +id,payload)
          .then(function (response) {
            console.log(id);
            dispatch(updatedFinance({message: 'Successfully updated Finance!!'}))
          })
          .catch(function (error) {
            console.log(error);
            dispatch(updatedFinance({message: 'Unable to update finance!!'}))
          });
    }

}


const findFinance = (payload) => {
    return {
        type: FETCH_FINANCES,
        payload

    };
}

export const fetchFinances = () => {
    return dispatch => {
        //fetch(baseUrl)
         axios(baseUrl)
           // .then(res => res.json())
            .then(res => dispatch(findFinance(res.data)));
    }
}


const removeFinance = (payload) => {
    return {
        type: DELETE_FINANCE,
        payload
    };
}


export const deleteFinance = (id) => {
    return dispatch => {
        console.log('axios delete...')
        axios.delete('http://localhost:8080/api/v1/healthcaresystem/' + id)
            .then(res =>{
                console.log('After http response',  res.data)
                dispatch(removeFinance(res.data))
            }  );
        }
   }
const findFinance1=(payload)=>{
    return{
        type:FIND_FINANCE,
        payload
    };
}
export const findFinances=(financeId)=>{
    console.log("finance.....")
    return dispatch=>{
        axios('http://localhost:8080/api/v1/healthcaresystem/getById/'+ financeId)
        .then(res=>
            {
                console.log(res.data);
                dispatch(findFinance1(res.data))
            })
    }
}
// export const filterFinance=(payload)=>{

//     return{
//         type:FILTER_FINANCE,
//         payload
//     }
// }