import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/FinanceActions'

class UpdateFinance extends Component {

    constructor(props) {
        super(props);
       // this.state = {message: ''}
        this.financeId = React.createRef();
        // this.patientId = React.createRef();
        this.email=React.createRef();
        this.treatmentId = React.createRef();
        this.registrationFee = React.createRef();
        this.medicalFee = React.createRef();
       // this.total = React.createRef();
        this.policyNumber = React.createRef();
        this.createdTime = React.createRef();
        this.updatedTime = React.createRef();
    }
    updateFinance(event) {
    
        console.log('A patientId was submitted: ' + this.financeId.current.value);
        console.log('A patientId was submitted: ' + this.email.current.value);
        console.log('A TreatmentId was submitted: ' + this.treatmentId.current.value);
        console.log('A RegistrationFee was submitted: ' + this.registrationFee.current.value);
        console.log('A MedicalFee was submitted: ' + this.medicalFee.current.value);
       // console.log('A Total was submitted: ' + this.total.current.value);
        console.log('A PolicyNumber was submitted: ' + this.policyNumber.current.value);
        // console.log('A Createdtime was submitted: ' + this.createdTime.current.value);
        // console.log('A Updatedtime was submitted: ' + this.updatedTime.current.value);

        let input = {
            financeId: this.financeId.current.value,
            email: this.email.current.value,
             treatmentId: this.treatmentId.current.value,
              registrationFee: this.registrationFee.current.value, 
              medicalFee: this.medicalFee.current.value, 
            //  total: this.total.current.value, 
              policyNumber: this.policyNumber.current.value, 
            //   createdTime: this.createdTime.current.value, 
            //   updatedTime: this.updatedTime.current.value
             };
        this.props.onUpdateFinance(input,this.props.paramsId);
        event.preventDefault();
    //     fetch('http://localhost:8080/api/v1/healthcaresystem/add', {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(input)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({ message: data.text })
    //         });
    //    event.preventDefault();

    // }
    }
    render() {
        return (
            <div>
                <div className='container'>
                <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h3 className='text-center'>Update Finance</h3>
                <div className='card-body'>
                <form>  </form>
                <div className='form-group'>
                <div className='mb3'>
                <p>{this.props.finances}</p>
                <div className="mb-3">
                <div class={(this.props.message === '')? '' : 'alert alert-success'} role="alert">
                    {this.props.message}
                </div>
                </div>
                <div className="mb-3">
                    <label forname="exampleFormControlInput1" className="form-label">Finance Id</label>
                    <input type="number" value={this.props.paramsId} ref={this.financeId} className="form-control" id="exampleFormControlInput1" placeholder="Enter FinanceId" readOnly />
                </div> 
                <div className="mb-3">
                    <label forname="exampleFormControlInput2" className="form-label">Patient Email:</label>
                    <input type="string" ref={this.email} className="form-control" id="exampleFormControlInput2" placeholder="Enter Patient Email" />
                </div>
                <div className="mb-3">
                    <label forname="exampleFormControlInput3" className="form-label">TreatmentId:</label>
                    <input type="number" ref={this.treatmentId} className="form-control" id="exampleFormControlInput3" placeholder="Enter TreatmentId" />
                </div>
                <div className="mb-3">
                    <label forname="exampleFormControlInput4" className="form-label">RegistrationFee:</label>
                    <input type="number" ref={this.registrationFee} className="form-control" id="exampleFormControlInput4" placeholder="Enter RegistrationFee" />
                </div>
                <div className="mb-3">
                    <label forname="exampleFormControlInput5" className="form-label">MedicalFee:</label>
                    <input type="number" ref={this.medicalFee} className="form-control" id="exampleFormControlInput5" placeholder="Enter MedicalFee" />
                </div>
                {/* <div className="mb-3">
                    <label forname="exampleFormControlInput5" className="form-label">Finance Id</label>
                    <input type="number" value={this.props.paramsId} ref={this.financeId} className="form-control" id="exampleFormControlInput5" placeholder="Enter FinanceId" />
                </div>  */}
                <div className="mb-3">
                    <label forname="exampleFormControlInput6" className="form-label">PolicyNumber:</label>
                    <input type="text" ref={this.policyNumber} className="form-control" id="exampleFormControlInput6" placeholder="Enter PolicyNumber" />
                </div>
                {/* <div className="mb-3">
                    <label forname="exampleFormControlInput7" className="form-label">CreatedDate:</label>
                    <input type="date" ref={this.createdTime} className="form-control" id="exampleFormControlInput7" placeholder="Enter Created Date" />
                </div>
                <div className="mb-3">
                    <label forname="exampleFormControlInput8" className="form-label">UpdatedDate:</label>
                    <input type="date" ref={this.updatedTime} className="form-control" id="exampleFormControlInput8" placeholder="Enter Updated Date" />
                </div> */}
                <button type="button" onClick={this.updateFinance.bind(this)} className="btn btn-secondary">UPDATE</button>
               
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
          
        )
    }
}
const mapStateToProps = (state,ownProps) => {
    console.log(ownProps);
    return {
        message: state.finance.message,
        paramsId:ownProps.match.params.id
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onUpdateFinance: (payload,id) => dispatch(actions.updateFinance(payload,id))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(UpdateFinance);
