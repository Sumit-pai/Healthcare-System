import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreators from '../../actions/PolicyActions'
import { withRouter } from 'react-router-dom'

class PolicyDetails extends Component {
    


    render() {
        let policyList = this.props.details
        console.log(policyList)
        if(policyList.length !== 1) {
            return <div></div>
        }
        return (
            <div>
                <div>
                    <h1 className="policy-details-heading" >Details for Policy Number: {policyList[0].policyNumber}</h1>
                    {/* <div className="card detailed-policy">
                            <div className="card-body"> */}
                                <table className="detailed-policy-info" style={{fontSize: '20px'}}>
                                    <thead>
                                        <tr>
                                            <td><strong>Patient Email</strong></td>
                                            <td>{policyList[0].emailId}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Policy number</strong></td>
                                            <td>{policyList[0].policyNumber}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Maximum Amount Claimable</strong></td>
                                            <td>{policyList[0].maximumAmount}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Coverage</strong></td>
                                            <td>{policyList[0].diseaseCovered}</td>
                                        </tr>
                                    </thead>
                                </table>                                
                            </div>
                            <Link to={'/policy/update/' + policyList[0].emailId}> <button className="btn btn-primary">Update</button> </Link>
                            
                        {/* </div>
                    </div> */}
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
        onGetPolicyByPolicyNumber: (policyNumber) => {
            dispatch(actionCreators.getByPolicyNumber(policyNumber))
        },
        onDeletePolicy: (patientId) => {
            dispatch(actionCreators.deletePolicy(patientId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PolicyDetails))