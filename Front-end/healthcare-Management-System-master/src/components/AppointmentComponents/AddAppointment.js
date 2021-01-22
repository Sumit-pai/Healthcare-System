import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/AppointmentActions'

class AddAppointment extends Component {

    constructor(props) {
        super(props);
        // this.state = {message: ''}
        this.patientId = React.createRef();
        this.doctorId = React.createRef();
        this.doctorName = React.createRef();
        this.timings = React.createRef();
        this.specialization = React.createRef();
        this.state = {
            DoctorList: []
        }

    }
    addAppointment(event) {
        console.log('A patientId was submitted: ' + this.patientId.current.value);
        console.log('A doctorId was submitted: ' + this.doctorName.current.value);
        console.log('A timings was submsitted: ' + this.timings.current.value);

        let input = {
            patientId: this.patientId.current.value,
            doctorName: this.doctorName.current.value,
            timings: this.timings.current.value,

        };
        this.props.onAddAppointment(input);
        event.preventDefault();

    }
    search() {
        let specialization = this.specialization.current.value
        console.log(specialization)
        axios.get('http://localhost:8080/api/v1/doctor/doctorbyspecialization?specialization=' + specialization)
            .then((response) => {
                this.setState({
                    DoctorList: response.data
                })
            })

    }




    render() {
        let list = this.state.DoctorList.map((doctor, index) => {
            return (
                <option value={doctor.user.name}>{doctor.user.name}</option>
            )
        })
        return (
            <div >
                <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Add Appointment</h3>
                            <div className='card-body'>
                                <div className='form-group'>
                                    <div className='mb3'>
                                        <p>{this.props.appointments}</p>
                                        <div className="row mt-3">
                                            <div class={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                                                {this.props.message}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-sm-4"> <label forname="exampleFormControlInput1" className="form-label">PatientId:</label></div>
                                            <div className="col-sm-8">   <input type="number" ref={this.patientId} className="form-control" id="exampleFormControlInput1" value={localStorage.getItem("id")} placeholder="Enter PatientId" readOnly /></div>
                                        </div>
                                        {/* <div className="mb-3">
                                            <label forname="exampleFormControlInput2" className="form-label">DoctorId:</label>
                                            <input type="number" ref={this.doctorId} className="form-control" id="exampleFormControlInput2" placeholder="Enter DoctorId" />
                                        </div> */}
                                        <div className="row mt-3">
                                            <div className="col-sm-4"><label forname="exampleFormControlInput1" className="form-label">Doctor Name:</label><br /></div>
                                            <div className="col-sm-8 form-floating" style={{ display: "inline-block" }} >
                                                <select className="form-select" id="floatingSelect" ref={this.specialization} placeholder="Select your Specialization">
                                                    <option value="Surgeon">Surgeon</option>
                                                    <option value="Cardiologist">Cardiologist</option>
                                                    <option value="Gynocologist">Gynocologist</option>
                                                    <option value="Genereal Physician">Genereal Physician	</option>
                                                    <option value="Pediatrecian">Pediatrecian</option>

                                                </select>
                                                <label htmlFor="floatingSelect">Select Specialization</label>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-1">   <button type="button" onClick={this.search.bind(this)} className="btn btn-primary">Submit</button></div>
                                        </div>
                                        <div className="row mt-3">
                                        <div className="col-sm-4"></div>
                                            <div className="col-sm-8">
                                                <select ref={this.doctorName} style={{ width: "50%" }}>
                                                    {list}
                                                </select>
                                            </div>
                                        </div>


                                        
                                        <div className="row mt-3">
                                            <div className="col-sm-4"> <label forname="exampleFormControlInput3" className="form-label">Timings:</label></div>
                                            <div className="col-sm-8"><input type="time" ref={this.timings} className="form-control" id="exampleFormControlInput3" placeholder="Enter Timings" /></div>
                                        </div>
                                        <br/>
                                        <div className="col-sm-12 mt-3 text-center">
                                        <button type="button" onClick={this.addAppointment.bind(this)} className="btn btn-primary">AddAppointment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.appointment.message,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddAppointment: (payload) => dispatch(actions.addAppointment(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddAppointment);