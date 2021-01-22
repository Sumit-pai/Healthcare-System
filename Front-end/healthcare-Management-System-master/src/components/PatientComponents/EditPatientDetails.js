import React, { Component } from 'react';
import { withRouter } from 'react-router' 
import { connect } from 'react-redux';
import * as actions from '../../actions/PatientRegistrationAction'

const initialState={
    bloodGroupErr:'',
    medicationErr:'',
    policyNumberErr:'',
    allergyErr:''
}
class EditPatientDetails extends Component {
    state=initialState;


    constructor(props) {
        super(props);
        
        this.bloodGroup = React.createRef();
        this.medications = React.createRef();
        this.policyNumber = React.createRef();
        this.allergies = React.createRef();

    }

    componentDidMount(){
        console.log('search before edit...')
        this.props.onViewPatientDetails(this.props.match.params.id)
    }

    formValidation(){
        
        let name=this.bloodGroup.current.value;
        const bloodGroupReg= new RegExp("(A|a|b|ab|o|B|AB|O)[+-]")
        if(name.length === 0 || !bloodGroupReg.test(name)){
            this.setState({bloodGroupErr : "Blood group must be int the given format , i.e a+, b+"})
            return false;
        }
        const medicationsReg= new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*")
        if(this.medications.current.value.length === 0 || !medicationsReg.test(this.medications.current.value)){
            this.setState({medicationErr: " Please enter the NO if you do not have medication"})
            return false;
        }
        if(this.allergies.current.value.length === 0 || !medicationsReg.test(this.allergies.current.value)){
            this.setState({allergyErr: " Please enter the NO if you do not have allergies"})
            return false;
        }
        if(this.policyNumber.current.value.length === 0 || !medicationsReg.test(this.policyNumber.current.value)){
            this.setState({policyNumberErr: " Please enter your policy number"})
            return false;
        }
        return true;
    }

    updatePatient(event) {
       
        console.log('A name was submitted: ' + this.bloodGroup.current.value);
        console.log('A salary was submitted: ' + this.medications.current.value);
        console.log('A salary was submitted: ' + this.policyNumber.current.value);
        console.log('A salary was submitted: ' + this.allergies.current.value);
        event.preventDefault();
        this.setState(initialState)
        const valid=this.formValidation()
        if(valid){
       let input = {bloodGroup: this.bloodGroup.current.value, medication: this.medications.current.value, policyNumber: this.policyNumber.current.value, allergies: this.allergies.current.value, user: null };
       this.props.onEditPatientDetails(this.props.match.params.id, input); 
       this.setState(initialState)
        }
    }

    cancel() {
        this.props.history.push(`/patient/view`);
    }
    
    render() {
        
        return (
           <div>
                <div className="container shadow-lg p-4 pt-3 w-50 bg-white text-dark border border-secondary rounded">
                <div classNameName="mb-3">
                <div className={(this.props.message === '')? '' : 'alert alert-success'} role="alert">
                    {this.props.message}
                </div>
                </div>
               <form>
               
                   <div class="row mt-3">
                       <div className="col-sm-4"><label for="exampleFormControlInput2" className="form-label">Blood Group</label></div>
                       <div className="col-sm-8"><input type="text" ref={this.bloodGroup} className="form-control" id="exampleFormControlInput2" placeholder="Enter Blood Group" defaultValue={this.props.patients.bloodGroup}/></div>
                       <div style={{ fontSize:12, color:"red"}}>{this.state.bloodGroupErr}</div>
                   </div>
                   <div class="row mt-3">
                       <div className="col-sm-4">
                            <label for="exampleFormControlInput3" className="form-label">Medications</label>
                       </div>
                       <div className="col-sm-8">
                            <textarea className="form-control" ref={this.medications} id="exampleFormControlTextarea1" rows="3" placeholder="Enter NO if you do not have any medications" defValue={this.props.patients.medication}></textarea>
                       </div>
                       <div style={{ fontSize:12, color:"red"}}>{this.state.medicationErr}</div>
                   </div>
                   <div class="row mt-3">
                       <div className="col-sm-4"><label for="exampleFormControlInput4" className="form-label">Symptoms</label></div>
                       <div className="col-sm-8"> <textarea ref={this.policyNumber} className="form-control" id="exampleFormControlInput3" placeholder="Enter symptoms" defValue={this.props.patients.policyNumber} /></div>
                       <div style={{ fontSize:12, color:"red"}}>{this.state.policyNumberErr}</div>
                   </div>
                   <div class="row mt-3">
                       <div className="col-sm-4"> <label for="exampleFormControlTextarea5" className="form-label">Allergies</label></div>
                       <div className="col-sm-8"><textarea className="form-control" ref={this.allergies} id="exampleFormControlTextarea1" rows="3" placeholder="Enter NO if you do not have any allergies" defValue={this.props.patients.allergies}></textarea></div>
                       <div style={{ fontSize:12, color:"red"}}>{this.state.allergyErr}</div>
                   </div>
                   <div class="col-sm-12 mt-3 text-center">
                       
                       <button onClick={this.updatePatient.bind(this)} type="button" className="btn btn-primary">SAVE</button>
                       <button onClick={this.cancel.bind(this)} type="button" className="btn btn-danger" style={{ marginLeft: "10px" }}>CANCEL</button>
 
                   </div>
               </form>
               </div>
            </div>    


        )
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.patientregistration.message,
        patients: state.patientregistration.patients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditPatientDetails: (id, payload) => dispatch(actions.editPatientDetails(id, payload)),
        onViewPatientDetails: (id) => dispatch(actions.viewPatientDetails(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPatientDetails));