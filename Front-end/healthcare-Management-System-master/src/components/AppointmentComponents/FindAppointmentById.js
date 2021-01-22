import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/AppointmentActions'

 class FindAppointmentById extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appointments:[]
        }
    }
    componentDidMount(){
        console.log(this.props.appointments)
        this.props.onFindAppointments(this.props.appointmentId);
    }
    render() {
        console.log(this.props.appointments.appointmentId)
        return (
            
            <div>
                <div className='container'>
                    <div className='row'>
                        <h3 className='text-center'> Appointment Details</h3>
                        <div className='card-body'>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        
                                        <th>PatientId</th>
                                        <th>DoctorId</th>
                                        <th>Timings</th>
                                        {/* <th>Date of Appointment</th> */}
                                        {/* <th >UpdatedDate</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={this.props.appointments.appointmentId}>
                                        <td>{this.props.appointments.patientId}</td>
                                        <td>{this.props.appointments.doctorId}</td>
                                        <td>{this.props.appointments.timings}</td>
                                        <td>{this.props.appointments.createdTime}</td>
                                        {/* <td>{this.props.appointments.updatedTime}</td> */}
                                    </tr>
                                </tbody>
                            </table>
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
       appointments:state.appointment.appointments,
        appointmentId:ownProps.match.params.appointmentId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       onFindAppointments:(appointmentId)=>{
           console.log('debug info')
           return dispatch(actions.findAppointments(appointmentId));
       }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FindAppointmentById);