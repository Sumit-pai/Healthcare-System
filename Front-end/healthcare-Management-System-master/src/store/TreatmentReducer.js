import * as actionCreators from '../actions/TreatmentActions'


const initialState = {
    message: '',
    flag: null,
    treatments: [],
    treatment:{}
}


const reducer = function(state = initialState,  action){
    switch(action.type){

        case actionCreators.ADD_TREATMENTS:
            let newMessage =  action.payload.message;
            return {
                message: newMessage,
                flag: action.payload.flag
            }

        case actionCreators.FETCH_TREATMENTS:
            return {
                treatments: action.payload,
                message: state.message
            }

        case actionCreators.FETCH_TREATMENTBYID:
            return {
                treatment: action.payload.treatment,
                message: action.payload.message,
                flag : action.payload.flag
            }

        case actionCreators.ADD_REPORT:
            return {
                message: action.payload.message,
                flag: action.payload.flag,
                treatment: state.treatment
            }
        case actionCreators.FETCH_TREATMENT_BY_ID:
            return {
                treatments: action.payload.treatments,
                message: action.payload.message,
                flag: action.payload.flag
            }
        
        case actionCreators.FETCH_BYDATE:
            let treatmentlist = [...state.treatments]
            let newTreatments = treatmentlist.filter((treatment)=> {
                let inputDate = new Date(action.payload)
                let currentDate = new Date(treatment.createdAt)
                inputDate.setHours(0,0,0)
                currentDate.setHours(0,0,0)
                return +currentDate === +inputDate
                })
            return{
                treatments: newTreatments
            }

        case actionCreators.FETCH_BYDATES:
            let list = [...state.treatments]
            let freshTreatments = list.filter((treatment)=> {
            let fromDate = new Date(action.payload.fDate)
            let toDate = new Date(action.payload.tDate)
            let date = new Date(treatment.createdAt)
            fromDate.setHours(0,0,0)
            toDate.setHours(0,0,0)
            date.setHours(0,0,0)
            return ((+date >= +fromDate)&&(+date <= +toDate))
            })
            return{
                treatments: freshTreatments
            }
        
        case actionCreators.FETCH_BY_ID:
            let newList = [action.payload.treatment]
            return {
                treatments: newList,
                message: action.payload.message,
                flag : action.payload.flag
            }

        default:
            return state;
    }

}

export default reducer;