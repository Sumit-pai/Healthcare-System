import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/FinanceActions'
import { Link } from 'react-router-dom';

class AddFinance extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.treatmentId = React.createRef();
        this.registrationFee = React.createRef();
        this.medicalFee = React.createRef();
        this.policyNumber = React.createRef();
        this.state = {
            emailError: '',
            medicalFeeError: '',
            registrationFeeError: ''
        }
    }
    addFinance(event) {
        console.log(' Email: ' + this.email.current.value);
        console.log('TreatmentId: ' + this.treatmentId.current.value);
        console.log('RegistrationFee: ' + this.registrationFee.current.value);
        console.log('MedicalFee: ' + this.medicalFee.current.value);
        console.log('PolicyNumber: ' + this.policyNumber.current.value);


        let validation = {
            email: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        }
        let input = {
            email: this.email.current.value,
            treatmentId: this.treatmentId.current.value,
            registrationFee: this.registrationFee.current.value,
            medicalFee: this.medicalFee.current.value,
            policyNumber: this.policyNumber.current.value,

        };
        if (!(input.email === "")) {
            if (validation.email.test(input.email)) {

                this.setState({
                    emailError: ''
                })

            } else {
                this.setState({
                    emailError: 'Invalid Email Format'
                })
            }
        }
        else {
            this.setState({
                emailError: 'Email cannot be Empty'
            })
        }
        if (!(input.medicalFee === "")) {
            if (input.medicalFee < 0) {

                this.setState({
                    medicalFeeError: 'Medical Fee cannot be Negative'
                })

            }
            // else {
            //     this.props.onAddFinance(input);
            // }
        } else {
            this.setState({
                medicalFeeError: 'Medical Fee can not be empty'
            })

        }
        if (!(input.registrationFee === "")) {
            if (input.registrationFee < 0) {

                this.setState({
                    registrationFeeError: 'Registration Fee cannot be Negative'
                })

            }
            else {
                this.props.onAddFinance(input);
            }
        } else {
            this.setState({
                registrationFeeError: 'Registration Fee can not be empty'
            })

        }

        
        // this.props.onAddFinance(input);
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Add Finance</h3>
                            <div className='card-body'>
                                <div className='form-group'>
                                    <div className='mb3'>
                                        
                                        <div className="mb-3">
                                            <div class={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                                                {this.props.message}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                           <div className="col-sm-4"> <label forname="exampleFormControlInput1" className="form-label">PatientEmail:</label></div>
                                           <div className="col-sm-8"> <input type="email" ref={this.email} className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" /></div>
                                        </div>
                                        <div style={{ color: 'red' }}>{this.state.emailError}</div>
                                        
                                        <div className="row mt-3">
                                        <div className="col-sm-4"> <label forname="exampleFormControlInput2" className="form-label">TreatmentId:</label></div>
                                        <div className="col-sm-8">  <input type="number" ref={this.treatmentId} className="form-control" value={this.props.id} id="exampleFormControlInput2" placeholder="Enter TreatmentId" readOnly /></div>
                                        </div>
                                        <div className="row mt-3">
                                        <div className="col-sm-4"><label forname="exampleFormControlInput3" className="form-label">RegistrationFee:</label></div>
                                        <div className="col-sm-8">   <input type="number" ref={this.registrationFee} className="form-control" id="exampleFormControlInput3" placeholder="Enter RegistrationFee" /></div>
                                        </div>
                                        <div style={{ color: 'red' }}>{this.state.registrationFeeError}</div>
                                        <div className="row mt-3">
                                        <div className="col-sm-4">  <label forname="exampleFormControlInput4" className="form-label">MedicalFee:</label></div>
                                        <div className="col-sm-8">   <input type="number" ref={this.medicalFee} className="form-control" id="exampleFormControlInput4" placeholder="Enter MedicalFee" /></div>
                                        </div>
                                        <div style={{ color: 'red' }}>{this.state.medicalFeeError}</div>
                                        <div className="row mt-3">
                                        <div className="col-sm-4">   <label forname="exampleFormControlInput6" className="form-label">PolicyNumber:</label></div>
                                        <div className="col-sm-8">   <input type="text" ref={this.policyNumber} className="form-control" id="exampleFormControlInput6" placeholder="Enter PolicyNumber" /></div>
                                        </div>
                                        
                                        <div className="col-sm-12 mt-3 text-center">
                                        <button type="button" onClick={this.addFinance.bind(this)} className="btn btn-primary" style={{alignSelf:'center'}}>AddFinance</button>
                                        
                                                <Link to='/treatment'><button type="button" className="btn btn-danger"  style={{marginLeft:'20px'}}>Back</button></Link>
                
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state,ownProps) => {
    return {
        message: state.finance.message,
        id: ownProps.match.params.id
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddFinance: (payload) => dispatch(actions.addFinance(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddFinance);