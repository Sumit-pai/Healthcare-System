import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/LoginActions'
import {
    Link
  } from "react-router-dom";

class login extends Component {

    constructor(props) {
        super(props);
        this.emailId = React.createRef();
        this.password = React.createRef();
    }

    login(event) {
        // sending a post request
        
        console.log('A email was submitted: ' + this.emailId.current.value);
        console.log('A password was submitted: ' + this.password.current.value);
        

        let input = { emailId: this.emailId.current.value, password: this.password.current.value };
        this.props.onLogin(input)
        
        event.preventDefault();
        // fetch('http://localhost:8080/login', {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(input)
        // })
        //     .then(response => {
        //         if (response.status === 200) { }
        //         this.setState({ message: "Successfully logged in" })
        //         response.json()
        //     })
        //     .then(data => {
        //         console.log(data) 
        //     });
    }

    componentDidUpdate() {
        console.log(this.props.auth)
        if (this.props.auth) {
            this.props.history.push('/loggedin')
        }
    }
    render() {
        return (
            <div className="h-100">
                <h1 className="mx-auto text-center" >Healthcare Management</h1>
                <div className="container shadow-lg p-4  border border-secondary w-50 rounded">
                <div className="mb-3">
                    <div className={(this.props.message === '') ? '' : 'alert alert-success alert-dismissible fade show'} role="alert">
                        {this.props.message}
                    </div>
                </div>
                <form >
                    <div class="row mt-3">
                        <div class="col-sm-4">
                            <label for="exampleFormControlInput1" className="form-label text-center">Email-Id</label>
                        </div>
                        <div class="col-sm-8">
                            <input type="text" ref={this.emailId} className="form-control" id="exampleFormControlInput2" placeholder="Enter email id" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-4">
                            <label for="exampleFormControlInput1" class="form-label">Password</label>
                        </div>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" ref={this.password} id="exampleFormControlTextarea1" rows="3" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div class="col-sm-12 mt-3 text-center">

                        <button onClick={this.login.bind(this)} type="button" class="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
                <div className="container shadow-lg bg-white border border-secondary w-50 rounded text-center mt-4 p-4">
                        Don't have an account?<Link className="nav-item nav-link px-3 d-inline" to="/signup">register</Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.login.message,
        auth: state.login.auth,
        id: state.login.id,
        role: state.login.role,
        userId: state.login.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (payload) => dispatch(actions.login(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(login)