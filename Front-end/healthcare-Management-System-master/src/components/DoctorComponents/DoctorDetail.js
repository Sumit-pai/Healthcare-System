import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/DoctorActions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class DoctorDetail extends Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.onViewDoctorDetails(this.props.match.params.id);
    }

    cancel(){
        this.props.history.push(`/doctor/view/`);
    }

    render() {
        if(!this.props.doctors || !this.props.doctors.user){
            return(<p>Not Found</p>)
        }
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center"><strong>Professional Details</strong></h1></div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Name</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.user.name}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Specialization</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.specialization}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Qualification</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.qualification}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Experience</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.experience}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>    
                        <div className="col px-md-5">
                            <h5>Intime</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.inTime}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Outtime</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.doctors.outTime}</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/doctor/view'><button type="button" className="btn btn-danger"  style={{marginBottom:'20px'}}>Back</button></Link>
                    </div>

                    
                </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.doctor.message,
        doctors: state.doctor.doctors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewDoctorDetails: (id) => dispatch(actions.viewDoctorDetails(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail))
