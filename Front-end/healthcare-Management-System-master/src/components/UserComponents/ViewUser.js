import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions'

class ViewUser extends Component {

    constructor(props) {
        super(props);
        console.log('In constructor', props)
    }

    componentDidMount() {
        console.log('Initialization code goes here..');
        if (!this.props.users) {
            return (<p>Nothing to show</p>)
        }
        this.props.onFetchUsers();
    }

    delete(id) {
        console.log('Delete code goes here..');
        if (!this.props.users) {
            return (<p>Nothing to show</p>)
        }
        this.props.onDeleteUser(id);
    }

    update(id) {
        this.props.history.push(`/update-user/${id}`);
    }

    add() {
        this.props.history.push(`/add-user/`);
    }

    view(id) {
        this.props.history.push(`/user-detail/${id}`);
    }

    render() {

        console.log("In render " + this.props.users)
        if (!this.props.users) {
            return (<p>Nothing to show</p>)
        }

        let userList =  this.props.users.map((user, i) => {
            if(user){
            return (
                <tr key={i}>
                    <th scope="row">{i + 1}</th>

                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.age}</td>
                    <td>{user.contactNumber}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>

                    <td><button className="btn btn-primary btn-sm" onClick={this.view.bind(this, user.userId)}> USER DETAILS </button></td>
                    <td><button className="btn btn-danger btn-sm" onClick={this.delete.bind(this, user.userId)}>DELETE</button></td>
                    <td><button className="btn btn-info btn-sm" onClick={this.update.bind(this, user.userId)}>UPDATE</button></td>

                </tr>
            )}
        })

        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <h1 className="mx-auto text-center" >List Of Users</h1>
                <button className="btn btn-outline-primary btn-sm" style={{ marginLeft: "980px" }} onClick={this.add.bind(this)}> REGISTER HERE </button>
                <div className="container pt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr style={{backgroundColor:'lightgrey'}}>
                                <th scope="col">#</th>

                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Age</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Address</th>
                                <th scope="col">Role</th>
                                <th scope="col">User</th>
                                <th scope="col">DELETE</th>
                                <th scope="col">UPDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("In mapstate ")

    return {
        message: state.user.message,
        users: state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUsers: () => {
            console.log('debug info')
            return dispatch(actions.fetchUsers())
        },
        onDeleteUser: (id) => dispatch(actions.deleteUser(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewUser)