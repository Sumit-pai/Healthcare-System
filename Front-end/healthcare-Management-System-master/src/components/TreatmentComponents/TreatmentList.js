import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/TreatmentActions'
import FilterComponent from './FilterComponent';

class TreatmentList extends Component {

    componentDidMount() {
        
        if(localStorage.getItem('role')==='Admin'){
            console.log(this.props)
        this.props.onFetchTreatments();
        }
        else if(localStorage.getItem('role')==='Doctor'){
            this.props.onFetchTreatmentsByDoctorId(localStorage.getItem('id'));
        }
        else{
            this.props.onFetchTreatmentsByPatientId(localStorage.getItem('id'));
        }     
    }
    
    render() {
        console.log(this.props.treatments)
        if(!this.props.treatments){
            return (<p>Nothing to show</p>)
        }
        
        let treatmentList = this.props && this.props.treatments.length > 0 && this.props.treatments[0] ? Object.values(this.props.treatments).map((treatment, i)=> {
            
            if(treatment){
            return (
                    <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{treatment.doctorName}</td>
                    <td>{treatment.patientName}</td>
                    <td>{treatment.disease}</td>
                    <td>{treatment.medicine}</td>
                    <td>{new Intl.DateTimeFormat('en-IN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(treatment.createdAt))}</td>
                    <td>
                    <Link to={"/updatetreatment/"+treatment.treatmentId}><button  className="btn btn-info">Update</button></Link>
                    <Link to={"/viewtreatment/"+treatment.treatmentId}><button  className="btn btn-info" style={{marginLeft:'10px'}}>View</button></Link>
                    { localStorage.getItem('role')==='Admin' && <Link to={"/finance/add/"+treatment.treatmentId}><button  className="btn btn-info" style={{marginLeft:'10px'}}>Make Bill</button></Link>}
                    </td>
                    </tr>
            )}
        }): (<div> NO TREATMENTS FOUND</div>)
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
            <div className="container">
                <FilterComponent></FilterComponent> 
                <br/>
                <h2 className="text-center" >Treatment List</h2>

                <div className = "row">
                <table className="table table-striped">
                <thead>
                    <tr style={{backgroundColor:'lightgrey'}}>
                    <th scope="col">#</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Disease</th>
                    <th scope="col">Medicine</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {treatmentList}
                </tbody>
                </table>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.treatment.message,
        treatments: state.treatment.treatments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchTreatments: () => {
        return dispatch(actions.fetchTreatments())
        },
        onFetchTreatmentsByDoctorId: (id) => {
        return dispatch(actions.fetchByDoctorId(id))
        },
        onFetchTreatmentsByPatientId: (id) =>{
            return dispatch(actions.fetchByPatientId(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentList);