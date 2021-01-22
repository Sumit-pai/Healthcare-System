import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/TreatmentActions'
import { Link } from 'react-router-dom';


class UpdateTreatment extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef();
    }

    componentDidMount() {

        this.props.onFetchTreatment(this.props.id)
        
    }

    handleSubmit() {
        let formData = new FormData();
        formData.append('report', this.fileInput.current.files[0])
        this.props.onAddReport(this.props.treatment.treatmentId, formData)
        
    }
    render() {
        if(!this.props.treatment){
            return(<h3 style={{textAlign: 'center', color: 'red'}}>{this.props.message}</h3>)
        }
        return (
            <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center">
                        <strong>Treatment Details</strong></h1>
                    </div>
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
                                <textarea defaultValue={this.props.treatment.detailDescription} readOnly />
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
                </div>

                <div className="card" style={{ marginTop: "10px", marginBottom: "50px" }}>
                    <div className="card-header"><h4 className="text-center"><strong>Update Report</strong></h4></div>
                    <form >
                        
                            <h5 style={{marginLeft: "10px"}}>Upload file:</h5>
                            <input type="file" name="report" ref={this.fileInput} style={{ marginLeft: "10px", marginTop: "10px" }}/>
                        
                        <br />
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "20px" }}>Upload</button>
                    </form>

                    <div className="mb-3" style={{ marginTop: "10px" }}>
                        <div className={(this.props.message === '') ? '' : ((this.props.flag === true) ? 'alert alert-success' : 'alert alert-danger')} role="alert" >
                            {this.props.message}
                        </div>
                    </div>
                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/treatment'><button type="button" className="btn btn-danger" style={{marginLeft:"10px",marginBottom:"25px"}}>Back</button></Link>
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
        onAddReport: (id, payload) => {
            return dispatch(actions.addReport(id, payload))
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTreatment);