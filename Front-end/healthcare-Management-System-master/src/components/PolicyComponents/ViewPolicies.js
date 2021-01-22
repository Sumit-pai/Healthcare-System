import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as actionCreators from '../../actions/PolicyActions'

class ViewPolicies extends Component {

    componentDidMount() {
        
        this.props.onGetAllPolicies()
    }
    
    delete(emailId) {
        if(window.confirm("Are you sure you want to delete ?")) {
            this.props.onDeletePolicy(emailId)
        }
    }

    handleChange(event) {
        console.log(event.target.value)
    }

    render() {

        
        let policyList = this.props.policyList.map((policy, index) => {

            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{policy.emailId}</td>
                    <td>{policy.policyNumber}</td>
                    {/* <td>{policy.maximumAmount}</td>
                    <td>{policy.diseaseCovered}</td> */}
                    <td><button style={{marginRight: '20px'}} onClick={this.delete.bind(this, policy.emailId)}>DELETE</button><Link to={'/policy/update/' + policy.emailId}><button>UPDATE</button></Link></td> 
                    {/* <td><button onClick={this.delete.bind(this, policy.emailId)}>DELETE</button> <button onClick={this.forceUpdate.bind(this, policy.emailId)}>UPDATE</button></td>  */}

                </tr>
            )
        })

        return (
            <div>
                <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <h1 className="policy-list-heading">List of Policies</h1>
                <div className="policy-list">
                    <table className="table table-info" style={{ fontSize: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{backgroundColor: '#C2C2C2'}}>#</th>
                                <th style={{backgroundColor: '#C2C2C2'}}>Patient Email</th>
                                <th style={{backgroundColor: '#C2C2C2'}}>Policy Number</th>
                                {/* <th>Maximum Amount Claimable</th>
                                <th>Coverage for</th> */}
                                <th style={{backgroundColor: '#C2C2C2'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policyList}
                        </tbody>
                    </table>
                </div>
                {/* <hr style={{marginLeft: 'auto', marginRight: 'auto', width: '85%'}}/> */}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.policy.message,
        policyList: state.policy.policyList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllPolicies: () => {
            dispatch(actionCreators.getAllPolicies())
        },
        onDeletePolicy: (emailId) => {
            dispatch(actionCreators.deletePolicy(emailId))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewPolicies))