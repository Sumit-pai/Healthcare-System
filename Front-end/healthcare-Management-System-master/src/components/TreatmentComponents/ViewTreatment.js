import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/TreatmentActions'


class ViewTreatment extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        this.props.onFetchTreatment(this.props.id)
        
    }
    render() {
        if(!this.props.treatment){
            return(<h3 style={{textAlign: 'center', color: 'red'}}>{this.props.message}</h3>)
        }
        return (
            <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center"><strong>Treatment Details</strong></h1></div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Treatment Id</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.treatmentId}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Appointment Id</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.appointmentId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Disease</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.disease}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Medicine</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.medicine}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Detail Description</h5>
                            <div className="card">
                                <textarea defaultValue={this.props.treatment.detailDescription} readOnly/ >
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Created Date</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.createdAt}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Last Modified Date</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.updatedAt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Consultancy Fees</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }}>{this.props.treatment.consultancyFees}</p>
                            </div>
                        </div>
                        <div className="col px-md-5"></div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <div className="col px-md-5">
                                <h5>Download Report</h5>
                                <a href={"http://localhost:8080/api/v1/treatments/report/"+this.props.treatment.treatmentId} target="_blank" rel="noopener noreferrer" download="download" ><button type="button" >Download</button></a>
                                
                            <div className="mb-3" style={{ marginTop: "10px" }}>
                                <div className={(this.props.message === '') ? '' : ((this.props.flag === true) ? 'alert alert-success' : 'alert alert-danger')} role="alert" >
                                    {this.props.message}
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/treatment'><button type="button" className="btn btn-danger" style={{marginBottom:"10px"}}>Back</button></Link>
                    </div>
                </div>

            </div>

        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        treatment: state.treatment.treatment,
        message: state.treatment.message,
        flag: state.treatment.flag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchTreatment: (id) => {
            return dispatch(actions.fetchTreatment(id))
        },
        // onGetReport: (id, payload) => {
        //     return dispatch(actions.getReport(id, payload))
        // }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTreatment);