import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/PolicyActions'


class AddPolicy extends Component {

    constructor(props) {
        super(props)
    
        this.emailId = React.createRef()
        this.policyNumber = React.createRef()
        this.maximumAmount = React.createRef()
        this.coverage = React.createRef()

        this.state = {
            policyNumberError: '',
            maximumAmountError: '',
            coverageError: '',
            emailError: ''
        }
    }
    

    componentDidMount() {
        this.props.onClearState()
    }
    


    
    
    

    add(event) {
        event.preventDefault()

        let validation = {
            email: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            policyNumber: new RegExp(/^[A-Z\d]{14}$/),
            coverage: new RegExp(/^[a-zA-Z\s]+$/)
        }

        let policy = {
            emailId: this.emailId.current.value,
            policyNumber: this.policyNumber.current.value,
            maximumAmount: this.maximumAmount.current.value,
            diseaseCovered: this.coverage.current.value
        }
        
        if(!(policy.emailId === "")) {

            if(validation.email.test(policy.emailId)) {

                this.setState({
                    emailError: ''
                })
                if(!(policy.policyNumber === "")) {
                    if(validation.policyNumber.test(policy.policyNumber)) {
                        this.setState({
                            policyNumberError: ''
                        })
                        if(!(policy.maximumAmount === "")){
                            if(policy.maximumAmount <= 0) {
                                this.setState({
                                    maximumAmountError: 'Amount should be greater than 0'
                                })
                            } else {
                                this.setState({
                                    maximumAmountError: ''
                                })
                                if(!(policy.diseaseCovered === "")){
                                    if(validation.coverage.test(policy.diseaseCovered)) {
                                        this.setState({
                                            coverageError: ''
                                        })
                                        this.props.onAddPolicy(policy)
                                        console.log(policy)
                                    } else {
                                        this.setState({
                                            coverageError: 'Please select coverage'
                                        })
                                    }
                                } else {
                                    this.setState({
                                        coverageError: 'Coverage can not be empty'
                                    })
                                }
                            }
                        } else {
                            this.setState({
                                maximumAmountError: 'Amount can not be empty'
                            })
                        }

                    } else {
                        this.setState({
                            policyNumberError: 'Invalid format of policy number'
                        })
                    }
                } else {
                    this.setState({
                        policyNumberError: 'Policy Number can not be empty'
                    })
                }
            } 
            
            else {
                this.setState({
                    emailError: 'Invalid email format'
                })
            }
        } else {
            this.setState({
                emailError: 'Email can not be empty'
            })
        }
    }

    cancel() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div>
                <div className="policy-input container shadow-lg p-4 pt-3 w-75 bg-white text-dark border border-secondary rounded">
                <h1 className="text-center" style={{ margin: '20px' }}>Add policy</h1>
                    <form>
                        <div className=" row mt-3 policy-details-input">
                           <div className="col-sm-4"> <label forname="patientId" style={{marginTop: '10px'}} className="form-label">Patient Email</label> </div>
                            <div className="col-sm-8"><input ref={this.emailId} className="form-control" type="email" id="patientId" placeholder="Patient Email" /> </div>
                        </div>

                        <div style={{color: 'red'}}>{this.state.emailError}</div>

                        <div className="row mt-3 policy-details-input">
                        <div className="col-sm-4"> <label forname="policyNumber" className="form-label">Policy Number</label></div>
                        <div className="col-sm-8">   <input ref={this.policyNumber} className="form-control" type="text" id="policyNumber" placeholder="Policy Number"/></div>
                        </div>

                        <div style={{color: 'red'}}>{this.state.policyNumberError}</div>

                        <div className="row mt-3 policy-details-input">
                        <div className="col-sm-4"> <label forname="maximumAmount" className="form-label">Maximum Amount</label></div>
                        <div className="col-sm-8">   <input ref={this.maximumAmount} className="form-control" type="number" id="maximumAmount" placeholder="Maximum Amount"/></div>
                        </div>

                        <div style={{color: 'red'}}>{this.state.maximumAmountError}</div>

                        

                        <div className="row mt-3 policy-details-input">
                        <div className="col-sm-4"> <label forname="coverage" className="form-label">Coverage</label></div>
                        <div className="col-sm-8">   <select ref={this.coverage} className="form-control" name="coverage" >
                                <option value="--Select--">--Select--</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Gynocologist">Gynocologist</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Pediatrecian">Pediatrecian</option>
                            </select></div>
                        </div>

                        <div style={{color: 'red'}}>{this.state.coverageError}</div>
                        <div className="col-sm-12 mt-3 text-center">
                        <button onClick={this.add.bind(this)} type="button" className="btn btn-primary button">Add</button>
                        <button onClick={this.cancel.bind(this)} type="button" className="btn btn-danger" style={{ marginLeft: "10px" }}>CANCEL</button>
                        </div>
                    </form>
                    <h3>{this.props.message}</h3>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.policy.message,
        policyList: state.policy.policyList
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onAddPolicy: (policy) => {
            dispatch(actionCreators.addPolicy(policy))
        },
        onClearState: () => {
            dispatch(actionCreators.clearState())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicy)