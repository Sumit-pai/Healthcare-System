import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as actions from '../../actions/PatientRegistrationAction'
import {
    Link
} from "react-router-dom";

const initialState = {
    bloodGroupErr: '',
    medicationErr: '',
    policyNumberErr: '',
    allergyErr: ''
}

class AddPatient extends Component {

    state = initialState;

    constructor(props) {
        super(props);
        this.bloodGroup = React.createRef();
        this.medications = React.createRef();
        this.policyNumber = React.createRef();
        this.allergies = React.createRef();
        
       
    }
    

    formValidation() {

        const bloodGroupReg = new RegExp("(A|a|b|ab|o|B|AB|O)[+-]")
        if (this.bloodGroup.current.value.length === 0 || !bloodGroupReg.test(this.bloodGroup.current.value)) {
            this.setState({ bloodGroupErr: "Blood group must be int the given format , i.e a+, b+" })
            return false;
        }
        const medicationsReg = new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*")
        if (this.medications.current.value.length === 0 || !medicationsReg.test(this.medications.current.value)) {
            this.setState({ medicationErr: " Please enter the NO if you do not have medication" })
            return false;
        }
        if (this.allergies.current.value.length === 0 || !medicationsReg.test(this.allergies.current.value)) {
            this.setState({ allergyErr: " Please enter the NO if you do not have allergies" })
            return false;
        }
        if (this.policyNumber.current.value.length === 0 || !medicationsReg.test(this.policyNumber.current.value)) {
            this.setState({ policyNumberErr: " Please enter your policy number" })
            return false;
        }
        return true;
    }

    addPatient(event) {
        // sending a post request

        console.log('A name was submitted: ' + this.bloodGroup.current.value);
        console.log('A salary was submitted: ' + this.medications.current.value);
        console.log('A salary was submitted: ' + this.policyNumber.current.value);
        console.log('A salary was submitted: ' + this.allergies.current.value);
        
        const valid = this.formValidation()
        if (valid) {
            let input = { bloodGroup: this.bloodGroup.current.value, medication: this.medications.current.value, policyNumber: this.policyNumber.current.value, allergies: this.allergies.current.value, user: this.props.location.userObject };
            console.log(input)
            this.props.onAddPatient(input);
            this.props.history.push(`/login`);
            
        }
        event.preventDefault();
    }

    cancel() {
        this.props.history.push(`/`);
    }
    
    render() {
        
        return (
            <div>
                <h1 className="mx-auto text-center" >Hospital Management</h1>
                <div className="container shadow-lg p-4 pt-3 w-75 bg-white text-dark border border-secondary rounded">
                    <div className="mb-3">
                        <div className={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                            {this.props.message}
                        </div>
                    </div>
                    <form>
                        <div class="row mt-3">
                            <div className="col-sm-4" >
                                <label for="exampleFormControlInput1" className="form-label text-center">Blood Group</label>
                            </div>
                            <div  className="col-sm-8">
                                <input type="text" ref={this.bloodGroup} className="form-control  bg-light text-dark" id="exampleFormControlInput2" placeholder="Enter Blood Group" />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.bloodGroupErr}</div>
                        </div>
                        <div class="row mt-3">
                            <div  className="col-sm-4">
                                <label for="exampleFormControlInput1" class="form-label">Medications</label>
                            </div>
                            <div  className="col-sm-8">
                                <textarea class="form-control" ref={this.medications} id="exampleFormControlTextarea1" rows="3" placeholder="Enter NO if you do not have any medications"></textarea>
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.medicationErr}</div>
                        </div>
                        <div class="row mt-3">
                            <div  className="col-sm-4">
                                <label for="exampleFormControlInput1" class="form-label">Symptoms</label>
                            </div>
                            <div  className="col-sm-8">
                                <textarea ref={this.policyNumber} class="form-control" id="exampleFormControlInput2" placeholder="Enter symptoms" />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.policyNumberErr}</div>
                        </div>
                        <div class="row mt-3">
                            <div  className="col-sm-4">
                                <label for="exampleFormControlTextarea1" class="form-label">Allergies</label>
                            </div>
                            <div  className="col-sm-8">
                                <textarea class="form-control" ref={this.allergies} id="exampleFormControlTextarea1" rows="3" placeholder="Enter NO if you do not have any allergies"></textarea>
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.allergyErr}</div>
                        </div>
                        <div class="col-sm-12 mt-3 text-center">
                            <button onClick={this.addPatient.bind(this)} type="button" class="btn btn-primary">REGISTER</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.cancel.bind(this)}> BACK</button>

                        </div>
                    </form>
                </div>
                <div className="container shadow-lg bg-white border border-secondary w-50 rounded text-center mt-4 p-4">
                    If registered please<Link className="nav-item nav-link px-3 d-inline" to="/login">Login</Link> here
                   </div>

            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.patientregistration.message,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddPatient: (payload) => dispatch(actions.addPatient(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(withRouter(AddPatient));