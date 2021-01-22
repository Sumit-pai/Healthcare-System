import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom'
import * as actionCreators from '../../actions/PolicyActions'

class UpdateSpecficPolicy extends Component {

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
    

    update() {
        let validation = {
            email: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            policyNumber: new RegExp(/^[A-Z\d]{14}$/),
            coverage: new RegExp(/^[a-zA-Z]+$/)
        }

        let policy = {
            emailId: this.props.match.params.emailId,
            policyNumber: this.policyNumber.current.value,
            maximumAmount: this.maximumAmount.current.value,
            diseaseCovered: this.coverage.current.value
        }

        if(validation.email.test(policy.emailId)) {

            this.setState({
                emailError: ''
            })

            if(validation.policyNumber.test(policy.policyNumber)) {
                this.setState({
                    policyNumberError: ''
                })

                if(policy.maximumAmount <= 0) {
                    this.setState({
                        maximumAmountError: 'Amount should be greater than 0'
                    })
                } else {
                    if(validation.coverage.test(policy.diseaseCovered)) {
                        this.setState({
                            coverageError: ''
                        })
                        this.props.onUpdatePolicy(policy.emailId, policy)
                        console.log(policy)
                    } else {
                        this.setState({
                            coverageError: 'Only alphabets allowed'
                        })
                    }
                }

            } else {
                this.setState({
                    policyNumberError: 'Invalid format of policy number'
                })
            }
        } else {
            this.setState({
                emailError: 'Invalid EmailId format'
            })
        }
    }

    
    

    render() {
        return (
            <div>
                <h1 className="text-center">Update Policy</h1>
                <div className="policy-input container shadow-lg p-4 pt-3 w-75 bg-white text-dark border border-secondary rounded">
                    <form>
                        <div className="mb-3 policy-details-input">
                            <label forname="patientEmail" style={{marginTop: '10px'}} className="form-label">Patient Email</label>
                            <input value={this.props.match.params.emailId} className="form-control" type="email" id="patientEmail" placeholder="Patient Email" readOnly />
                        </div>

                        <div style={{color: 'red'}}>{this.state.emailError}</div>

                        <div className="mb-3 policy-details-input">
                            <label forname="policyNumber" className="form-label">New Policy Number</label>
                            <input ref={this.policyNumber} className="form-control" type="text" id="policyNumber" placeholder="Policy Number"/>
                        </div>

                        <div style={{color: 'red'}}>{this.state.policyNumberError}</div>

                        <div className="mb-3 policy-details-input">
                            <label forname="maximumAmount" className="form-label">Maximum Amount</label>
                            <input ref={this.maximumAmount} className="form-control" type="number" id="maximumAmount" placeholder="Maximum Amount"/>
                        </div>

                        <div style={{color: 'red'}}>{this.state.maximumAmountError}</div>

							{ /* <div className="mb-3 policy-details-input">
                            <label forname="coverage" className="form-label">Coverage</label>
                            <input ref={this.coverage} className="form-control" type="text" id="coverage" placeholder="Coverage"/>
							</div>*/ }
							
						<div className="form-group">
                            <label forname="coverage" className="form-label" style={{marginLeft:"127px"}}>Coverage</label>
                            <select ref={this.coverage} style={{width: '77%'}} className="form-control policy-details-input" name="coverage" >
                                <option value="--Select--">--Select--</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Gynocologist">Gynocologist</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Pediatrecian">Pediatrecian</option>
                            </select>
                        </div>
                        <div className="col-sm-12 mt-3 text-center">
                            <button onClick={this.update.bind(this)} type="button" className="btn btn-primary button">Update</button>
                            <Link to='/policy/list'><button type="button" className="btn btn-danger"  style={{marginLeft:'20px'}}>Back</button></Link>
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
    return {
       onUpdatePolicy: (emailId, newPolicy) => {
           dispatch(actionCreators.updatePolicy(emailId, newPolicy))
       },
       onClearState: () => {
           dispatch(actionCreators.clearState())
       }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateSpecficPolicy))