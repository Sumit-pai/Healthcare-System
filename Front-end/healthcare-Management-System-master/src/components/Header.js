import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
    Nav,
    NavDropdown,
    Navbar,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../actions/LoginActions';



class Header extends Component {
    

    signOut() {
        // sending a post request
        let userId = localStorage.getItem('userid')
        console.log(userId)
        this.props.onLogout(userId)
        console.log(this.props.auth)
        
            
            this.props.history.push('/')
        
    }
    

    render() {

        let role = localStorage.getItem('role')
        if (role === 'Admin') {
            return (
                // <Router>
                <div>
                    <Navbar style={{ background: '#353535' }} sticky="top" expand="lg">
                        <Navbar.Brand href="/" style={{ margin: '5px', marginLeft: '30px', marginRight: '100px', fontSize: '35px', color: 'white' }}>Healthcare System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Doctor">

                                        <NavDropdown.Item>
                                            <Link to="/doctor/view">view</Link>
                                        </NavDropdown.Item>


                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Patient">

                                        <NavDropdown.Item>
                                            <Link to="/patient/view">view</Link>
                                        </NavDropdown.Item>


                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Appointments">

                                        <NavDropdown.Item>
                                            <Link to="/appointment/view">view</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Treatments">
                                        <NavDropdown.Item>
                                            <Link to="/treatment">View</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link >

                                    <NavDropdown title="Policy Service" style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }}>

                                        <NavDropdown.Item className="Item">
                                            <Link to="/policy/">Add Policy</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to="/policy/search">Search By Policy Number</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/policy/list"> View All Policies</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>



                                <Nav.Link >
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Finance Service" >
                                        
                                        <NavDropdown.Item>
                                            <Link to="/finance/view">View</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="profile">
                                        
                                        <NavDropdown.Item>
                                            <Link to={"/viewuser/"+localStorage.getItem("userid")}>View Personal Details</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to={"/updateuser/"+localStorage.getItem("userid")}>Edit Personal Details</Link>                                           
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link onClick = {this.signOut.bind(this)} >Logout</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>
                                

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>

                </div>


            )
        } else if (role === 'Patient') {
            return (

                <div>
                    <Navbar style={{ background: '#353535' }} sticky="top" expand="lg">
                        <Navbar.Brand href="/" style={{ margin: '5px', marginLeft: '30px', marginRight: '100px', fontSize: '35px', color: 'white' }}>Healthcare System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Appointments">
                                        <NavDropdown.Item>
                                            <Link to="/appointment/add">Add</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/appointment/view">view</Link>
                                        </NavDropdown.Item>
                                        

                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Treatments">
                                        <NavDropdown.Item>
                                            <Link to="/treatment">View</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link >

                                    <NavDropdown title="Policy Service" style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} >

                                        <NavDropdown.Item className="Item">
                                            <Link to="/policy/">Add Policy</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to="/policy/search">Search By Policy Number</Link>
                                        </NavDropdown.Item>


                                    </NavDropdown>
                                </Nav.Link>



                                <Nav.Link  >
                                    <NavDropdown title="Finance Service" style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }}>

                                        <NavDropdown.Item>
                                            <Link to="/finance/view">View</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="profile">
                                        
                                        <NavDropdown.Item>
                                            <Link to={"/viewuser/"+localStorage.getItem("userid")}>View Personal Details</Link>
                                        </NavDropdown.Item>
                                        
                                        <NavDropdown.Item>
                                            <Link to={"/updateuser/"+localStorage.getItem("userid")}>Edit Personal Details</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to={"/patient/view/"+localStorage.getItem("id")}>View Medical Details</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to={"/patient/update/"+localStorage.getItem("id")}>Edit Medical Details</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link onClick = {this.signOut.bind(this)} >Logout</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>
                                
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>


            )
        }
        else if (role === 'Doctor') {
            return (

                <div>
                    <Navbar style={{ background: '#353535' }} sticky="top" expand="lg">
                        <Navbar.Brand href="/" style={{ margin: '5px', marginLeft: '30px', marginRight: '100px', fontSize: '35px', color: 'white' }}>Healthcare System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Appointments">

                                        <NavDropdown.Item>
                                            <Link to="/appointment/view">view</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="Treatments">
                                        <NavDropdown.Item>
                                            <Link to="/treatment">View</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Link>

                                <Nav.Link>
                                    <NavDropdown style={{ fontSize: '20px', background: 'white', borderRadius: '10px' }} title="profile">
                                        <NavDropdown.Item>
                                            <Link to={"/viewuser/"+localStorage.getItem("userid")}>View Personal Details</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to={"/updateuser/"+localStorage.getItem("userid")}>Edit Personal Details</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <Link to={"/doctor/view/"+localStorage.getItem("id")}>View Professional Details</Link>
                                        </NavDropdown.Item>
                                        
                                        <NavDropdown.Item>
                                            <Link to={"/doctor/update/"+localStorage.getItem("id")}>Edit Professional Details</Link>
                                        </NavDropdown.Item>
                                        
                                        <NavDropdown.Item>
                                            <Link onClick = {this.signOut.bind(this)} >Logout</Link>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </Nav.Link>
                                

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>


            )
        }
        else {
            return (
                <Navbar style={{ background: '#353535' }} sticky="top" expand="lg">
                    <Nav className="container-fluid">

                        <Nav.Item>
                            <Navbar.Brand href="/login" style={{ margin: '5px', marginLeft: '30px', marginRight: '100px', fontSize: '35px', color: 'white' }}>Healthcare System</Navbar.Brand>
                        </Nav.Item>


                        <Nav>

                            <li><Nav.Link> <Link to="/login"><Button variant="primary">Login</Button></Link> </Nav.Link></li>

                            <li><Nav.Link><Link to="/signup"><Button variant="primary">Sign up</Button></Link></Nav.Link></li>


                        </Nav>
                    </Nav>

                </Navbar>
            )
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        
        auth: state.login.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (id) => dispatch(actions.logout(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header))