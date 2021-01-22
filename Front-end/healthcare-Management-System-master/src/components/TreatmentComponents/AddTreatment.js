import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/TreatmentActions'
import './error.css'
import { Link } from 'react-router-dom'

class AddTreatment extends Component {
    constructor(props) {
        super(props)
        this.addTreatment = this.addTreatment.bind(this);

        this.appointmentId = React.createRef();
        this.disease = React.createRef();
        this.medicine = React.createRef();
        this.detailDescription = React.createRef();
        this.consultancyFees = React.createRef();

        this.state = {
            result: '',
            errors: {
                appointmentId: '',
                disease: '',
                medicine: '',
                consultancyFees: ''

            }
        };
    }

    componentDidUpdate() {
        if (this.props.message && (this.props.message !== this.state.result)) {
            this.setState({
                result: this.props.message
            })
        }
    }

    handleChange = (event) => {
        
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'appointmentId':
                errors.appointmentId =
                    value < 1
                        ? 'Appointment ID can not be Null!'
                        : '';
                break;
            case 'disease':
                errors.disease =
                    value.length < 1
                        ? 'Disease can not be Empty!'
                        : '';
                break;
            case 'medicine':
                errors.medicine =
                    value.length < 1
                        ? 'Medicine can not be Empty!'
                        : '';
                break;

            case 'consultancyFees':
                errors.consultancyFees =
                    value < 1
                        ? 'Consultancy Fees must be Greater that Zero'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value })
        event.preventDefault();
    };
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        if (valid) {
            console.log(this.appointmentId.current.value)
            if (this.appointmentId.current.value === "") {
                this.setState({
                    errors: { appointmentId: 'This is required field', disease: '', medicine: '', consultancyFees: '' }
                })
                return false;
            }
            if (this.disease.current.value === "") {
                this.setState({
                    errors: { appointmentId: '', disease: 'This is required field', medicine: '', consultancyFees: '' }
                })
                return false;
            }
            if (this.medicine.current.value === "") {
                this.setState({
                    errors: { appointmentId: '', disease: '', medicine: 'This is required field', consultancyFees: '' }
                })
                return false;
            }
            if (this.consultancyFees.current.value === "") {
                this.setState({
                    errors: { appointmentId: '', disease: '', medicine: '', consultancyFees: 'This is required field' }
                })
                return false;
            }
            return valid;
        }
        else {
            return valid;
        }
    }
    addTreatment(event) {
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {
            let input = {
                "appointmentId": this.appointmentId.current.value,
                "disease": this.disease.current.value,
                "medicine": this.medicine.current.value,
                "detailDescription": this.detailDescription.current.value,
                "consultancyFees": this.consultancyFees.current.value
            }
            this.props.onAddTreatment(input);
        } else {
            alert('Please fill all the * field')
        }


    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="card col-md-6 offset-md-3 offset-md-3" >
                    <div className="card-header"><h1 className="text-center"><strong>ADD Treatment</strong></h1></div>
                    <div className="card-body text-dark">
                        <form>
                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <label forname="exampleFormControlInput1" className="form-label"><strong>Appointment ID<span style={{ color: 'red' }}>*</span></strong></label>
                                </div>
                                <div className="col-sm-8">
                                <input type="number" name="appointmentId" onChange={this.handleChange} ref={this.appointmentId} className="form-control" id="exampleFormControlInput1" value={this.props.id} placeholder="Enter Appointment Id" readOnly />
                                {errors.appointmentId.length > 0 && <span className='error'>{errors.appointmentId}</span>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <label forname="exampleFormControlInput2" className="form-label"><strong>Disease<span style={{ color: 'red' }}>*</span></strong></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="disease" onChange={this.handleChange} ref={this.disease} className="form-control" id="exampleFormControlInput2" placeholder="Enter Disease" />
                                    {errors.disease.length > 0 && <span className='error'>{errors.disease}</span>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <label forname="exampleFormControlInput3" className="form-label"><strong>Medicine<span style={{ color: 'red' }}>*</span></strong></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="medicine" onChange={this.handleChange} ref={this.medicine} className="form-control" id="exampleFormControlInput3" placeholder="Enter Medicine" />
                                    {errors.medicine.length > 0 && <span className='error'>{errors.medicine}</span>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <label forname="exampleFormControlInput4" className="form-label"><strong>Detail Description</strong></label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea ref={this.detailDescription} className="form-control" id="exampleFormControlInput4" placeholder="Enter Detail Description" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <label forname="exampleFormControlInput5" className="form-label"><strong>Consultancy Fees<span style={{ color: 'red' }}>*</span></strong></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="number" name="consultancyFees" onChange={this.handleChange} ref={this.consultancyFees} className="form-control" id="exampleFormControlInput5" placeholder="Enter Consultancy Fees" />
                                    {errors.consultancyFees.length > 0 && <span className='error'>{errors.consultancyFees}</span>}
                                </div>
                            </div>
                            <div className="col-sm-12 mt-3 text-center">
                                <button type="button" onClick={this.addTreatment} className="btn btn-primary">Add Treatment</button>
                                <Link to='/appointment/view'><button type="button" className="btn btn-danger" style={{marginLeft:"10px"}}>Back</button></Link>
                            </div>
                            <div className="mb-3" style={{ marginTop: "10px" }}>
                                <div className={(this.state.result === '') ? '' : ((this.props.flag === true) ? 'alert alert-success' : 'alert alert-danger')} role="alert" >
                                    {this.state.result}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.treatment.message,
        flag: state.treatment.flag,
        id: ownProps.match.params.id
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddTreatment: (payload) => dispatch(actions.addTreatment(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddTreatment);