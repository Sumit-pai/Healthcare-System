import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/PolicyActions'
import PolicyDetails from './PolicyDetails'



class SearchPolicyByPolicyNumber extends Component {

    constructor(props) {
        super(props)

        this.policyNumber = React.createRef()

        this.state = {
            policyNumberError: ''
        }
    }

    componentDidMount() {
        this.props.onClearState()
    }


    search() {
        let policyNumber = this.policyNumber.current.value

        if (!(policyNumber === "")) {
            if ((new RegExp(/^[A-Z\d]{14}$/)).test(policyNumber)) {
                this.setState({
                    policyNumberError: ''
                })
                this.props.onGetPolicyByPolicyNumber(policyNumber)
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

    cancel() {
        this.props.history.push(`/`);
    }

    render() {

        return (
            <div>
            <div className="container shadow-lg p-4 pt-3 w-75 bg-white text-dark border border-secondary rounded">
                <h1 className="text-center" style={{ margin: '20px' }}>Search by Policy Number</h1>

                <div className="row mt-3 search-input">
                    <div className="col-sm-4">  <label forname="patientId" className="form-label">Policy Number</label></div>
                    <div className="col-sm-8">   <input ref={this.policyNumber} className="form-control" type="text" placeholder="Policy Number" /></div>
                </div>
                <div style={{ color: 'red' }}>{this.state.policyNumberError}</div>
                <div className="col-sm-12 mt-3 text-center">
                    <button style={{ margin: '20px' }} onClick={this.search.bind(this)} className="btn btn-primary">Search</button>
                    <button onClick={this.cancel.bind(this)} type="button" className="btn btn-danger" style={{ marginLeft: "10px" }}>CANCEL</button>
                </div>
                <hr style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }} />
                {(this.props.policyList.length === 1) ? (<PolicyDetails details={
                    (this.props.policyList.length === 1) ? this.props.policyList : {}
                }></PolicyDetails>) : (<h3>{this.props.message}</h3>)
                }
                
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
        onGetPolicyByPolicyNumber: (policyNumber) => {
            dispatch(actionCreators.getByPolicyNumber(policyNumber))
        },
        onClearState: () => {
            dispatch(actionCreators.clearState())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPolicyByPolicyNumber)