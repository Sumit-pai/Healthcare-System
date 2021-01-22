import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/DoctorActions'



class AddDoctor extends Component {

    constructor(props) {
        super(props);
        this.specialization = React.createRef();
        this.qualification = React.createRef();
        this.experience = React.createRef();
        this.inTime = React.createRef();
        this.outTime = React.createRef();
        this.state  = {
            qualificationError: "",
            experienceError: ""  ,
            inTimeError:"",
            outTimeError:""
        }
    }

    validate = () => {

        if (this.qualification.current.value === "") {
            this.setState({ qualificationError: "Qualification cannot be empty" });
            return false;
        } else{
            this.setState({ qualificationError: "" });
        }
        if (this.experience.current.value === "") {
            this.setState({ experienceError: "Experience cannot be empty" });
            return false;
        } else{
            this.setState({ experienceError: "" });
        }
        if (this.inTime.current.value === "") {
            this.setState({ inTimeError: "In-Time cannot be empty" });
            return false;
        } else{
            this.setState({ inTimeError: "" });
        }
        if (this.outTime.current.value === "") {
            this.setState({ outTimeError: "Out-Time cannot be empty" });
            return false;
        } else{
            this.setState({ outTimeError: "" });
        }
        return true
        }

    addDoctor(event) {
            const isValid=this.validate();
            if(isValid){
                console.log('Specialization: ' + this.specialization.current.value);
                console.log('Qualification: ' + this.qualification.current.value);
                console.log('Experience: ' + this.experience.current.value);
                console.log('Intime: ' + this.inTime.current.value);
                console.log('Outtime: ' + this.outTime.current.value);

                let input = {
                    specialization: this.specialization.current.value, 
                    qualification: this.qualification.current.value, 
                    experience: this.experience.current.value,
                    inTime : this.inTime.current.value,
                    outTime : this.outTime.current.value,
                    user: this.props.location.userObject
                };
                this.props.onAddDoctor(input);
                this.props.history.push(`/login`);
            }
            else{
                alert('Invalid Input')
            }
        event.preventDefault();

    }

    cancel() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <h1 className="mx-auto text-center " >Registration</h1>
                

                <form>
                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label text-center">Specialization</label>
                        </div>
                        <div className="col-sm-8 form-floating">
                            <select className="form-select" id="floatingSelect" ref={this.specialization} placeholder="Select your Specialization">
                                <option>Surgeon</option>
                                <option>Cardiologist</option>
                                <option>Gynocologist</option>
                                <option>Genereal Physician	</option>
                                <option>Pediatrecian</option>
                            </select>
                            <label htmlFor="floatingSelect">Select Specialization</label>
                        </div>
                    </div>
                    {/* {this.state.specializationError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.specializationError} </div>) : null} */}

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
                            <label className="form-label">Experience</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="number" ref={this.experience} className="form-control" placeholder="Enter your years of experience" />
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
                        <button onClick={this.addDoctor.bind(this)} type="button" className="btn btn-primary">REGISTER</button>
                        <button type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.cancel.bind(this)}> BACK</button>

                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.doctor.message,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddDoctor: (payload) => dispatch(actions.addDoctor(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddDoctor);