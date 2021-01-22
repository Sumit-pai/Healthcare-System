import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

class UserDetail extends Component {

    componentDidMount() {
        console.log("View User details");
        if (!this.props.users) {
            return (<p>Nothing to show</p>)
        }
        console.log(this.props.match.params.id)
        this.props.onViewUserDetails(this.props.match.params.id);
    }

    cancel(){
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <div className="container">
                <div className="card" >
                    <div className="card-header"><h1 className="text-center"><strong>Personal Details</strong></h1></div>
                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Name</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.users.name}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Gender</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.users.gender}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Email ID</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.users.email}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Age</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly >{this.props.users.age}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Address</h5>
                            <div className="card">
                                <textarea defaultValue={this.props.users.address} readOnly/ >
                            </div>
                        </div>
                    </div>

                    <div className="row mx-md-n5" style={{ marginTop: "10px" }}>
                        <div className="col px-md-5">
                            <h5>Contact Number</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly>{this.props.users.contactNumber}</p>
                            </div>
                        </div>
                        <div className="col px-md-5">
                            <h5>Role</h5>
                            <div className="card">
                                <p className="fs-6" style={{ marginLeft: "10px" }} readOnly>{this.props.users.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-3 text-center">
                        <Link to='/'><button type="button" className="btn btn-danger"  style={{marginBottom:'20px'}}>Back</button></Link>
                    </div>

                    
                </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.user.message,
        users: state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewUserDetails: (id) => dispatch(actions.viewUserDetails(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail))
