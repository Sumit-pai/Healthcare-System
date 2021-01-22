import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions'

export class UpdateUser extends Component {

    constructor(props) {
        super(props);

        this.Name = React.createRef();
        this.Gender = React.createRef();
        this.Age = React.createRef();
        this.ContactNumber = React.createRef();
        this.Address = React.createRef();
        this.state = {
            nameError: "",
            ageError: "",
            contactError: "",
            addressError: ""
        }
    }

    componentDidMount() {
        console.log('search before edit...')
        if (!this.props.users) {
            return (<p>Nothing to show</p>)
        }
        this.props.onViewUserDetails(this.props.match.params.id)
    }

    validate = () => {

        if (this.Name.current.value === "") {
            this.setState({ nameError: "Name cannot be empty" });
            return false;
        } else{
            this.setState({ nameError: "" });
        }
        
        

        if(this.Age.current.value.length > 2||this.Age.current.value.length < 1||this.Age.current.value==="0"){   
            this.setState({ageError: "Please enter valid age."});         
            return false;                             
          }else{
            this.setState({ ageError: "" });
          }
               
        if(this.ContactNumber.current.value.length !== 10){   
            this.setState({contactError: "Please enter valid phone number."});         
            return false;                             
        }else{
            this.setState({ contactError: "" });
        }

        if (this.Address.current.value === "") {
            this.setState({ addressError: "Address cannot be empty" });
            return false;
        }else{
            this.setState({ addressError: "" });
        }

        return true;
    }

    updateUser(event) {
        const isValid = this.validate();
        console.log(isValid)
        if (isValid) {
        console.log('A name was submitted: ' + this.Name.current.value);
        console.log('A gender was submitted: ' + this.Gender.current.value);
        console.log('A age was submitted: ' + this.Age.current.value);
        console.log('A contact was submitted: ' + this.ContactNumber.current.value);
        console.log('A address was submitted: ' + this.Address.current.value);

        let input = {
            name: this.Name.current.value,
            gender: this.Gender.current.value,
            
            age: this.Age.current.value,
            contactNumber: this.ContactNumber.current.value, 
            address: this.Address.current.value,
        };
        this.props.onEditUserDetails(this.props.match.params.id, input);
        

    }
    else {
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
                <h1 className="mx-auto text-center" >Update</h1>
                <div className="mb-3">
                    <div className={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                        {this.props.message}
                    </div>
                </div>

                <form>
                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label text-center">Name</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" ref={this.Name} className="form-control  bg-light text-dark" placeholder="Enter your Name" />
                        </div>
                    </div>
                    {this.state.nameError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.nameError} </div>) : null}

                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">Gender </label>
                        </div>
                        <div className="col-sm-8 form-floating">
                            <select className="form-select" id="floatingSelect" ref={this.Gender} placeholder="Enter your Gender">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label htmlFor="floatingSelect">Enter your Gender</label>
                        </div>
                    </div>
                    
                    <div className="row mt-3">
                        <div className="col-sm-4 float-left">
                            <label className="form-label">Age</label>
                        </div>
                        <div className="col-sm-8 ">
                            <input type="number" ref={this.Age} className="form-control" placeholder="Enter your Age" />
                        </div>
                    </div>
                    {this.state.ageError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.ageError} </div>) : null}

                    <div className="row mt-3">
                        <div className="col-sm-4 float-left">
                            <label className="form-label">Contact Number</label>
                        </div>
                        <div className="col-sm-8 ">
                            <input type="number" ref={this.ContactNumber} className="form-control" placeholder="Enter your Contact no." />
                        </div>
                    </div>
                    {this.state.contactError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.contactError} </div>) : null}

                    <div className="row mt-3">
                        <div className="col-sm-4 float-left">
                            <label className="form-label">Address</label>
                        </div>
                        <div className="col-sm-8 ">
                            <textarea className="form-control" ref={this.Address} rows="3" placeholder="Enter your Address"></textarea>
                        </div>
                    </div>
                    {this.state.addressError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.addressError} </div>) : null}


                    <div className="col-sm-12 mt-3 text-center">
                        <button onClick={this.updateUser.bind(this)} type="button" className="btn btn-primary">SAVE</button>
                        <button onClick={this.cancel.bind(this)} type="button" className="btn btn-danger" style={{ marginLeft: "10px" }}>CANCEL</button>
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.user.message,
        patients: state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditUserDetails: (id, payload) => dispatch(actions.editUserDetails(id, payload)),
        onViewUserDetails: (id) => dispatch(actions.viewUserDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
