import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions'



class AddUser extends Component {

    constructor(props) {
        super(props);
        this.Name = React.createRef();
        this.Gender = React.createRef();
        this.Email = React.createRef();
        this.Password = React.createRef();
        this.Age = React.createRef();
        this.ContactNumber = React.createRef();
        this.Address = React.createRef();
        this.Role = React.createRef();
        this.state={
            nameError: "",
            emailError: "",
            passwordError: "",
            ageError: "",
            contactError: "",
            addressError: ""
        }
    }

    validate = () => {

        if (this.Name.current.value === "") {
            this.setState({ nameError: "Name cannot be empty" });
            return false;
        } else{
            this.setState({ nameError: "" });
        }
        
        if (typeof this.Email.current.value !== "undefined") {
            var pattern = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
            console.log("email value= "+!pattern.test(this.Email.current.value))
            if (!pattern.test(this.Email.current.value)) {
                this.setState({ emailError: "Please enter valid email address." });
                return false;
            }
        } else{
            this.setState({ emailError: "" });
        }
        
        if(this.Password.current.value !== ""){
            var pattern1 = new RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.{7,})/);  
            console.log("password value= "+!pattern1.test(this.Password.current.value))
            if(!pattern1.test(this.Password.current.value)){
                this.setState({ passwordError: "Please enter valid Password." });
                return false;
            }
        }
        else if (this.Password.current.value === "") {
            this.setState({ passwordError: "Password cannot be empty" });
            return false;
        }else{
            this.setState({ passwordError: "" });
        }
        
        if (this.Address.current.value === "") {
            this.setState({ addressError: "Address cannot be empty" });
            return false;
        }else{
            this.setState({ addressError: "" });
        }

        if(this.ContactNumber.current.value.length !== 10){   
            this.setState({contactError: "Please enter valid phone number."});         
            return false;                             
        }else{
            this.setState({ contactError: "" });
        }

        if(this.Age.current.value.length > 2||this.Age.current.value.length < 1||this.Age.current.value===0){   
            this.setState({ageError: "Please enter valid age."});         
            return false;                             
          }else{
            this.setState({ ageError: "" });
          }

        return true;
    }


    addUser(event) {
        event.preventDefault();
        const isValid = this.validate();
        // console.log(isValid)
        if (isValid) {
            console.log('A name was submitted: ' + this.Name.current.value);
            console.log('A gender was submitted: ' + this.Gender.current.value);
            console.log('A email was submitted: ' + this.Email.current.value);
            console.log('A password was submitted: ' + this.Password.current.value);
            console.log('A age was submitted: ' + this.Age.current.value);
            console.log('A contact was submitted: ' + this.ContactNumber.current.value);
            console.log('A address was submitted: ' + this.Address.current.value);
            console.log('A role was submitted: ' + this.Role.current.value);

            let input = {
                name: this.Name.current.value, gender: this.Gender.current.value, email: this.Email.current.value, password: this.Password.current.value,
                age: this.Age.current.value, contactNumber: this.ContactNumber.current.value, address: this.Address.current.value, role: this.Role.current.value
            };
            // this.props.onAddUser(input);
            
            // console.log(JSON.stringify(input))
            
            // let userString = JSON.stringify(input)

            if(input.role === 'Patient') {
                console.log('patient reg')
                this.props.history.push({
                    pathname: '/patientregistration',
                    userObject: input
                })
            } else if(input.role === 'Doctor') {
                console.log('doctor reg')
                this.props.history.push({
                pathname:`/doctorregistration/`,
                userObject: input
                })
            } else {
                this.props.onAddUser(input)
                this.props.history.push('/login')
            }

        }
        else {
            alert('Invalid Input')

        }
        
        

    }

    cancel() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <h1 className="mx-auto text-center " >Registration</h1>
                

                {/* <form> */}
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
                        <div className="col-sm-4">
                            <label className="form-label">Email ID </label>
                        </div>
                        <div className="col-sm-8">
                            <input type="email" ref={this.Email} className="form-control" placeholder="Enter your Email Id" />
                        </div>
                    </div>
                    {this.state.emailError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.emailError} </div>) : null}

                    <div className="row mt-3">
                        <div className="col-sm-4 float-left">
                            <label className="form-label">Password</label>
                        </div>
                        <div className="col-sm-8  ">
                            <input type="password" className="form-control" ref={this.Password} rows="3" placeholder="Password should have atleast one alphabet, one digit and atleast 7 characters" />
                            {/* <label htmlFor="floatingSelect">Password should have at least one alphabet, one digit and atleast 7 characters</label> */}
                        </div>
                    </div>
                    {this.state.passwordError ? (<div style={{ fontSize: "14px", color: "red" }}> {this.state.passwordError} </div>) : null}


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

                    <div className="row mt-3">
                        <div className="col-sm-4">
                            <label className="form-label">Role </label>
                        </div>
                        <div className="col-sm-8 form-floating">
                            <select className="form-select" id="floatingSelect" ref={this.Role} placeholder="Select your Role">
                                <option>Patient</option>
                                <option>Doctor</option>
                                <option>Admin</option>
                            </select>
                            <label htmlFor="floatingSelect">Select your Role</label>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-3 text-center">
                        <button onClick={this.addUser.bind(this)} type="button" className="btn btn-primary">NEXT</button>
                        <button type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.cancel.bind(this)}> Back</button>

                    </div>
                {/* </form> */}
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.user.message,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddUser: (payload) => dispatch(actions.addUser(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddUser);

