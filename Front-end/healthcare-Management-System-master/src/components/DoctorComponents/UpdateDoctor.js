import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/DoctorActions'

export class UpdateDoctor extends Component {

    constructor(props) {
        super(props);
        this.specialization = React.createRef();
        this.qualification = React.createRef();
        this.experience = React.createRef();
        this.inTime = React.createRef();
        this.outTime = React.createRef();
    }

    componentDidMount() {
        console.log('search before edit...')
        if (!this.props.doctors) {
            return (<p>Nothing to show</p>)
        }
        this.props.onViewDoctorDetails(this.props.match.params.id)
    }

    updateDoctor(event) {
            console.log('Specialization: ' + this.specialization.current.value);
            console.log('Qualification: ' + this.qualification.current.value);
            console.log('Experience: ' + this.experience.current.value);
            console.log('intime: ' + this.inTime.current.value);
            console.log('outtime: ' + this.outTime.current.value);

        event.preventDefault();

        let input = {
            specialization: this.specialization.current.value, qualification: this.qualification.current.value, experience: this.experience.current.value,
            inTime : this.inTime.current.value,outTime : this.outTime.current.value
        };
        this.props.onEditDoctorDetails(this.props.match.params.id, input);

        
    }

    cancel() {
        this.props.history.push(`/doctor/view/`);
    }


    render() {
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <h1 className="mx-auto text-center" >Update</h1>
                <div className="mb-3">
                    <div className={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                        {this.props.message}
                    </div>
                </div>

                <form>
                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label text-center">Specialization</label>
                        </div>
                        <div className="col-sm-8">
                            <select className="form-select" id="floatingSelect" ref={this.specialization} placeholder="Select your Specialization">
                                <option>Surgeon</option>
                                <option>Cardiologist</option>
                                <option>Gynocologist</option>
                                <option>Genereal Physician	</option>
                                <option>Pediatrecian</option>
                            </select>
                            
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">Qualification</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" ref={this.qualification} placeholder="Enter your Qualification" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">Experience </label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" ref={this.experience} className="form-control" placeholder="Enter your years of experience" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">In Time</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="time" ref={this.inTime} className="form-control" placeholder="Enter your in time" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">Out Time</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="time" ref={this.outTime} className="form-control" placeholder="Enter your out time" />
                        </div>
                    </div>

                    <div className="col-sm-12 mt-3 text-center">
                        <button onClick={this.updateDoctor.bind(this)} type="button" className="btn btn-primary">UPDATE</button>
                        <button onClick={this.cancel.bind(this)} type="button" className="btn btn-danger" style={{ marginLeft: "10px" }}>CANCEL</button>
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.doctor.message,
        patients: state.doctor.doctors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditDoctorDetails: (id, payload) => dispatch(actions.editDoctorDetails(id, payload)),
        onViewDoctorDetails: (id) => dispatch(actions.viewDoctorDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoctor)
