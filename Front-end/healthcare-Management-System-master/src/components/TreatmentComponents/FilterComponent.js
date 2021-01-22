import React, { Component } from 'react';
import { Button, Card, Accordion, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/TreatmentActions'

class FilterComponent extends Component {
    constructor(props) {
        super(props)
        this.doctorId = React.createRef();
        this.date = React.createRef();
        this.patientId = React.createRef();
        this.toDate = React.createRef();
        this.fromDate = React.createRef();
        this.treatmentId = React.createRef();

        this.byDoctorId = this.byDoctorId.bind(this);
        this.byTreatmentId = this.byTreatmentId.bind(this);
        this.byDate = this.byDate.bind(this);
        this.byDates = this.byDates.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.byPatientId = this.byPatientId.bind(this);    
    }
    
    
    byDoctorId(){
        this.props.onFetchTreatmentsByDoctorId(this.doctorId.current.value)
    }
    byTreatmentId(){
        this.props.onFetchTreatmentById(this.treatmentId.current.value)
    }
    resetFilter(){
        if(localStorage.getItem('role')==='Admin'){
            this.props.onFetchTreatments();
        }
        else if(localStorage.getItem('role')==='Doctor'){
            this.props.onFetchTreatmentsByDoctorId(localStorage.getItem('id'));
        }
        else{
            this.props.onFetchTreatmentsByPatientId(localStorage.getItem('id'));
        }
    }
    byDate(){
        this.props.onFetchTreatmentsByDate(this.date.current.value)
    }
    byDates(){
        let input = {"fDate": this.fromDate.current.value,"tDate": this.toDate.current.value}
        console.log(input)
        this.props.onFetchTreatmentsByDates(input)
    }
    byPatientId(){
        this.props.onFetchTreatmentsByPatientId(this.patientId.current.value)
    }
    render() {
        return (
            <div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="primary-sm" eventKey="0">
                                <h5>Filter</h5>
                            </Accordion.Toggle>
                            <Button variant="primary-sm" style={{margin: "10px"}} onClick={this.resetFilter}><h5>Remove</h5></Button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container fluid>
                                    <Row>
                                        <Col >
                                            <Card>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Treatment Id</h6>
                                                    </div>
                                                    <div>
                                                        <input type="number" ref={this.treatmentId} placeholder="Enter Treatment Id"></input>
                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                        <Button variant="primary" onClick={this.byTreatmentId}>Submit</Button>
                                                    </div>
                                                
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        {localStorage.getItem('role')==='Admin' && <Col >
                                            <Card>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Doctor Id</h6>
                                                    </div>
                                                    <div>
                                                        <input type="number" ref={this.doctorId} placeholder="Enter Doctor Id"></input>
                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                        <Button variant="primary" onClick={this.byDoctorId}>Submit</Button>
                                                    </div>
                                                
                                                </Card.Body>
                                            </Card>
                                        </Col>}
                                        {localStorage.getItem('role')==='Admin' &&<Col >
                                            <Card>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Patient Id</h6>
                                                    </div>
                                                    <div>
                                                        <input type="number" ref={this.patientId} placeholder="Enter Patient Id"></input>
                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                        <Button variant="primary" onClick={this.byPatientId}>Submit</Button>
                                                    </div>
                                                
                                                </Card.Body>
                                            </Card>
                                        </Col>}
                                        
                                        <Col >
                                            <Card>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Date</h6>
                                                    </div>
                                                    <div>
                                                        <input type="date" ref={this.date}></input>
                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                        <Button variant="primary" onClick={this.byDate}>Submit</Button>
                                                    </div>
                                                
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col >
                                            <Card>
                                                <Card.Body>
                                                    <div>
                                                        <h6>Search by Dates</h6>
                                                    </div>
                                                    <div>
                                                        From
                                                    </div>
                                                    <div>
                                                        <input type="date" ref={this.fromDate}></input>
                                                    </div>
                                                    <div>
                                                        To
                                                    </div>
                                                    <div>
                                                        <input type="date" ref={this.toDate} ></input>
                                                    </div>
                                                    <div style={{marginTop:"10px"}}>
                                                        <Button variant="primary" onClick={this.byDates}>Submit</Button>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.treatment.message,
        treatments: state.treatment.treatments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchTreatments: () => {
            return dispatch(actions.fetchTreatments())
            },
        onFetchTreatmentsByDoctorId: (id) => {
        return dispatch(actions.fetchByDoctorId(id))
        },
        onFetchTreatmentsByPatientId: (id) =>{
            return dispatch(actions.fetchByPatientId(id))
        },

        onFetchTreatmentsByDate: (date) => {
            return dispatch(actions.fetchByDate(date))
            },
        onFetchTreatmentsByDates: (input) => {
            return dispatch(actions.fetchByDates(input))
            },
        onFetchTreatmentById: (id) => {
            return dispatch(actions.fetchById(id))
        },
        onResetFilter: () =>{
            return dispatch(actions.fetchTreatments())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);