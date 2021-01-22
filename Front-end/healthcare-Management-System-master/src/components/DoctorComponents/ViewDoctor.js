
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/DoctorActions';
import { withRouter } from 'react-router';
import { Button, Card, Accordion, Row, Col, Container } from 'react-bootstrap';


class ViewDoctor extends Component {

    constructor(props) {
        super(props);
        console.log('In constructor', props)
        this.date = React.createRef();
        this.specialization = React.createRef();
    }

    componentDidMount() {

        this.props.onFetchDoctors();
    }

    update(id) {
        this.props.history.push(`/doctor/update/${id}`);
    }

    checkbyDate() {
        // this.props.history.push(`/doctorbydate/${this.date.current.value}`);
        this.props.onGetdoctorbydate(this.date.current.value);
    }
    checkBySpec() {
       
        this.props.onGetdoctorbyspecialization(this.specialization.current.value);
        
    }

    view(id) {
        this.props.history.push(`/doctor/view/${id}`);
    }

    resetFilter() {

        this.props.onFetchDoctors();

    }
    render() {

        console.log(this.props.doctors)
        if (!this.props.doctors) {
            
            return (<p>Nothing to show</p>)
        }

        var doctorList = this.props && Object.values(this.props.doctors).length>0 ? Object.values(this.props.doctors).map((doctor, i) => {
            
            if(doctor.user){
                
            return (
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{doctor.user.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.qualification}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.inTime}</td>
                    <td>{doctor.outTime}</td>

                    <td><button className="btn btn-primary btn-sm" onClick={this.view.bind(this, doctor.doctorId)}> DOCTOR DETAILS </button></td>
                    <td><button className="btn btn-info btn-sm" onClick={this.update.bind(this, doctor.doctorId)}>UPDATE</button></td>

                </tr>
            )}
            
        }) :(<div>NO DOCTORS FOUND</div>)
        
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="primary-sm" eventKey="0">
                                <h5>Filter</h5>
                            </Accordion.Toggle>
                            <Button variant="primary-sm" style={{ margin: "10px" }} onClick={this.resetFilter.bind(this)}><h5>Remove</h5></Button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container fluid>
                                    <Row>
                                        <Col >
                                            <Card >
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Date</h6>
                                                    </div>
                                                    <div>
                                                        <input type="date" ref={this.date} className="form-control" placeholder="Enter Date" />
                                                    </div>
                                                    <div style={{ marginTop: "10px" }}>
                                                        <button className="btn btn-primary btn-sm" onClick={this.checkbyDate.bind(this)}> SEARCH BY DATE </button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col >
                                            <Card >
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Specialization</h6>
                                                    </div>
                                                    <div>
                                                        <select className="form-select" id="floatingSelect" ref={this.specialization} placeholder="Select your Specialization">
                                                            <option>Surgeon</option>
                                                            <option>Cardiologist</option>
                                                            <option>Gynocologist</option>
                                                            <option>Genereal Physician	</option>
                                                            <option>Pediatrecian</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ marginTop: "10px" }}>
                                                        <button className="btn btn-primary btn-sm" onClick={this.checkBySpec.bind(this)}> SEARCH BY SPECIALIZATION</button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <div className="container pt-3">
                    {/* <div className="mb-3">
                        <div className={(this.props.message === '') ? '' : 'alert alert-warning alert-dismissible fade show '} role="alert">
                            {this.props.message}
                        </div>
                    </div> */}
                    <table className="table table-striped">
                        <thead>
                            <tr style={{backgroundColor:'lightgrey'}}>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Qualification</th>
                                <th scope="col">Experience</th>
                                <th scope="col">INTIME</th>
                                <th scope="col">OUTTIME</th>
                                <th scope="col">VIEW DETAIL</th>
                                <th scope="col">UPDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("In mapstate ")

    return {
        message: state.doctor.message,
        doctors: state.doctor.doctors,
        date:ownProps.match.params.date
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchDoctors: () => {
            console.log('debug info')
            return dispatch(actions.fetchDoctors())
        },
        onGetdoctorbydate: (date) => {
            console.log('debug info')
            return dispatch(actions.getdoctorbydate(date))
        },
        onGetdoctorbyspecialization: (specialization) => {
            console.log('debug info')
            return dispatch(actions.getdoctorbyspecialization(specialization))
}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewDoctor))