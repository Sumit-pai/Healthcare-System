import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/FinanceActions'
import { Link } from 'react-router-dom'

 class FindFinanceById extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             finances:[]
        }
    }
    componentDidMount(){
        console.log(this.props.finances)
        this.props.onFindFinances(this.props.financeId);
    }

    cancel(){
        this.props.history.push(`/finance/view`);
    }

    render() {
        console.log(this.props.finances.financeId)
        return (
            
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                
                <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center"><strong>Billing Details</strong></h1></div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Email ID</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.email}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Treatment ID</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.treatmentId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Registration Fee</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.registrationFee}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Medical Fee</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.medicalFee}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>    
                        <div className="col px-md-5">
                            <h5>Policy Number</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.policyNumber}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Total Fees</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.finances.total}</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/finance/view'><button type="button" className="btn btn-danger"  style={{marginBottom:'20px'}}>Back</button></Link>
                    </div>

                    
                </div>

            </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state,ownProps) => {
    console.log(state);
    return {
       // message: state.message,
        finances:state.finance.finances,
        financeId:ownProps.match.params.financeId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       onFindFinances:(financeId)=>{
           console.log('debug info')
           return dispatch(actions.findFinances(financeId));
       }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FindFinanceById);