// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import * as actions from '../../actions/DoctorActions'

// class ViewByDate extends Component {

//     constructor(props) {
//         super(props);
//         console.log('In constructor', props)
//     }

//     componentDidMount() {
//         console.log('Initialization code goes here..');
//         this.props.onGetdoctorbydate(this.props.date);
//     }
//     view(id) {
//         this.props.history.push(`/doctorbyid/${id}`);
//     }

//     render() {

//         console.log("In render " + this.props.doctors)
//         // if (!this.props.doctors) {
//         //     return (<p>Nothing to show</p>)
//         // }

//         let DoctorList = this.props.doctors.map((doctor, i) => {
//             return (
//                 <tr key={i}>
//                     <th scope="row">{i + 1}</th>
//                     <td>{doctor.user.name}</td>
//                     <td>{doctor.specialization}</td>
//                     <td>{doctor.qualification}</td>
//                     <td>{doctor.experience}</td>

//                     <td><button className="btn btn-primary btn-sm" onClick={this.view.bind(this, doctor.doctorId)}> DOCTOR DETAILS </button></td>

//                 </tr>
//             )
//         })

//         return (
//             <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
//                 <h1 className="mx-auto text-center" > DOCTORS BY DATE </h1>
//                 <div className="container pt-3">
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Name</th>
//                                 <th scope="col">Specialization</th>
//                                 <th scope="col">Qualification</th>
//                                 <th scope="col">Experience</th>
//                                 <th scope="col">VIEW DETAIL</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {DoctorList}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state,ownProps) => {
//                     console.log("In mapstate ")

//     return {
//                     message: state.doctor.message,
//                     doctors: state.doctor.doctors,
//                     date:ownProps.match.params.date
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//                     onGetdoctorbydate: (date) => {
//                     console.log('debug info')
//             return dispatch(actions.getdoctorbydate(date))
//         }
//     }
// }


// export default connect(mapStateToProps,mapDispatchToProps) (ViewByDate)