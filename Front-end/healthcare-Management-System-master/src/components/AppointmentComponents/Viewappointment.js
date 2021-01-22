import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom"; 
  import { connect } from 'react-redux';
import * as actions from '../../actions/AppointmentActions'
class ViewAppointment extends Component {
    constructor(props) {
        super(props);
        console.log('In constructor', props)
       
    }
    componentDidMount() {
        console.log('Initialization code goes here..');
        this.props.onFetchAppointments();
        

    }
    
    delete(id){
        console.log('delete appointment with id: ' + id)
      this.props.onDeleteAppointment(id);
    }
    
    render() {
        if(!this.props.appointments){
            return (<p>Nothing to show</p>)
        }
        let appointmentList = this.props.appointments.map((appointment, i)=> {
            return (
                    <tr key={i}>
                    <th scope="row">{i+1}</th>
                    {/* <td> <Link to={'/getById/'+ appointment.appointmentId}>{appointment.appointmentId}</Link></td> */}
                    <td>{appointment.patientId}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.timings}</td>
                    <td>{appointment.createdTime}</td>
                    {/* <td>{appointment.updatedTime}</td> */}
                    <td>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, appointment.appointmentId)}> Delete </button> 
                        {(localStorage.getItem("role")==="Doctor") &&<Link to={'/treatment/'+appointment.appointmentId}><button className="btn btn-primary" style={{marginLeft: '10px'}}> Start Treatment </button></Link>}
                        </td>
                    </tr>
            )
        })
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
            <div className="container">
                <h2 className="text-center">Appointment Details</h2>
                <div className="row">
                <div className="mb-3">
                    <div class={(this.props.message === '')? '' : 'alert alert-success'} role="alert">
                        {this.props.message}
                    </div>
                </div>
                
            <table className="table table-striped">
            <thead>
                <tr style={{backgroundColor:'lightgrey'}}>
                <th scope="col">#</th>
                {/* <th scope="col">AppointmentId</th> */}
                <th scope="col">PatientId</th>
                <th scope="col">DoctorName</th>
                <th scope="col">Timings</th>
                <th scope="col">Date Of Appointment</th>
                {/* <th scope="col">UpdatedAT</th> */}
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointmentList}
            </tbody>
            </table>
            
        </div>
        </div>
        </div>
        )
    }
}
const mapStateToProps = (state,ownProps) => {
    return {
        message: state.appointment.message,
        appointments: state.appointment.appointments,
        history:ownProps.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAppointments: () => {
            console.log('debug info')
           return dispatch(actions.fetchAppointments())
        },
        onDeleteAppointment: (id) => dispatch(actions.deleteAppointment(id)),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewAppointment);