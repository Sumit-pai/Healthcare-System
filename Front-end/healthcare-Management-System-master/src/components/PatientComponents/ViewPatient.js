import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/PatientRegistrationAction';
import { Button, Card, Accordion, Row, Col, Container } from 'react-bootstrap';


class ViewPatient extends Component {

    constructor(props) {
        super(props);
        console.log('In constructor', props)
        this.date = React.createRef();

    }

    componentDidMount() {
        console.log('Initialization code goes here..');
        this.props.onFetchPatients();
    }

    delete(id) {
        console.log('Delete code goes here..');
        this.props.onDeletePatient(id);
    }

    search(event) {
        console.log("Search by dates....")
        let input = this.date.current.value
        console.log(input)
        this.props.onSearchByDates(input)
        event.preventDefault();
    }
    resetFilter(){
        
            this.props.onFetchPatients();
        
    }

    render() {
        console.log(this.props.patients)
        
        let patientList = this.props && this.props.patients.length > 0 ? Object.values(this.props.patients).map((patient, i) => {
            if (patient) {
                return (
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{patient.user.name}</td>
                        <td>{patient.bloodGroup}</td>
                        <td>{patient.medication}</td>
                        <td>{patient.policyNumber}</td>
                        <td>{patient.allergies}</td>
                        <td><Link class="btn btn-info btn-sm" to={'/patient/view/' + patient.patientId}>View User Details</Link></td>
                        {/* <td><button class="btn btn-danger btn-sm" onClick={this.delete.bind(this, patient.patientId)}>DELETE</button></td> */}
                        <td><Link class="btn btn-info btn-sm" to={'/patient/update/' + patient.patientId}>Update</Link></td>
                    </tr>
                )
            }
        }) : (<div> NO PATIENTS FOUND</div>)

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
                                            <Card  style={{width : "25%"}}>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Date</h6>
                                                    </div>
                                                    <div>
                                                    <input class="form-control" type="date" ref={this.date} id="example-date-input" />                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                    <button class="btn btn-outline-primary btn-sm inline" onClick={this.search.bind(this)}>Search</button>
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
                    <div className="mb-3">
                        <div class={(this.props.message === '') ? '' : 'alert alert-success '} role="alert">
                            {this.props.message}
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr style={{backgroundColor:'lightgrey'}}>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">BloodGroup</th>
                                <th scope="col">Medication</th>
                                <th scope="col">Symptoms</th>
                                <th scope="col">Allergies</th>
                                <th scope="col">User</th>
                                {/* <th scope="col">DELETE</th> */}
                                <th scope="col">UPDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log()
    return {
        message: state.patientregistration.message,
        patients: state.patientregistration.patients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPatients: () => {
            console.log('debug info')
            return dispatch(actions.fetchPatients())
        },
        onDeletePatient: (id) => dispatch(actions.deletePatient(id)),
        onSearchByDates: (payload) => dispatch(actions.searchByDate(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewPatient)