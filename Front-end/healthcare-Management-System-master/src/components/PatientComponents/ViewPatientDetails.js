import {
    withRouter
  } from "react-router-dom";

import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/PatientRegistrationAction'
import { Link } from 'react-router-dom';

class ViewPatientDetails extends Component {
    
    componentDidMount(){
    
        this.props.onViewPatientDetails(this.props.match.params.id);
    }
    
    cancel(){
        this.props.history.push(`/patient/view`);
    }
    render() {
        console.log(this.props.patients)
        if(!this.props.patients || this.props.patients.length<=0 || !this.props.patients.user){
            return(
                <p>Nothing to show</p>
            )
        }
        return (

            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                
                <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center"><strong>Medical Details</strong></h1></div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Name</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.patients.user.name}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Blood Group</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.patients.bloodGroup}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Medications</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.patients.medication}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Allergies</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.patients.allergies}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Symptoms</h5>
                            <div className="card">
                                <textarea defaultValue={this.props.patients.policyNumber} readOnly/ >
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/patient/view'><button type="button" className="btn btn-danger"  style={{marginBottom:'20px'}}>Back</button></Link>
                    </div>

                    
                </div>

            </div>
            </div>

            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.patientregistration.message,
        patients: state.patientregistration.patients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewPatientDetails: (id) => dispatch(actions.viewPatientDetails(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPatientDetails));