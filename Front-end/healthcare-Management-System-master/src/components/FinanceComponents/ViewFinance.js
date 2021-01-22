import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/FinanceActions'
class ViewFinance extends Component {
    constructor(props) {
        super(props);
        console.log('In constructor', props)
        //this.state = { finance: [] };
    }
    componentDidMount() {
        console.log('Initialization code goes here..');
        this.props.onFetchFinances();
        // fetch('http://localhost:8080/api/v1/healthcaresystem/')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         this.setState({finance: data })
        //     });

    }
    // delete(id){
    //     fetch('http://localhost:8080/api/v1/healthcaresystem/deleteuser/' + id, {
    //     method: 'DELETE', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    //     })
    //     .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({message: "deleted"})
    //         });
    //     }
    delete(id) {
        console.log('delete finance with id: ' + id)
        this.props.onDeleteFinance(id);
    }
    update(id) {
        console.log('update finance with id: ' + id)
        this.props.history.push(`/update/${id}`)
    }
    
    render() {
        let financeList = Object.values(this.props.finances).map((finance, i) => {
            return (
                
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    
                    <td>{finance.email}</td>
                    <td>{finance.registrationFee}</td>
                    <td>{finance.medicalFee}</td>
                    <td>{finance.total}</td>
                    <td>{finance.policyNumber}</td>
                    <td>{finance.createdTime}</td>
                    {/* <td>{finance.updatedTime}</td> */}
                    <td> <Link to={'/finance/getById/' + finance.financeId}>Bill Details</Link></td>
                    {/* <td><button className="btn btn-danger" onClick={this.delete.bind(this, finance.financeId)}> Delete </button> </td>
                    <td><button className="btn btn-secondary" onClick={this.update.bind(this, finance.financeId)}> Update </button> </td> */}
                </tr>
            )
        })
        return (
            <div className="container shadow-lg p-4 pt-3 bg-white text-dark border border-secondary rounded">
            <div className="container">
                <h2 className="text-center">Finance Details</h2>
                <div className="row">
                <div className="mb-3">
                    <div class={(this.props.message === '') ? '' : 'alert alert-success'} role="alert">
                        {this.props.message}
                    </div>
                </div>
                {/* <div className="mb-3">
                <input type="search"  onChange={this.handleChange.bind(this)}className="form-control" placeholder="Search by Date"/>
                    {this.props.message}
                </div> */}
                <table className="table table-stripped">

                    <thead>
                        <tr style={{backgroundColor:'lightgrey'}}>
                            <th scope="col">#</th>
                            {/* <th scope="col">FinanceId</th> */}
                            <th scope="col">Patient Email</th>
                            {/* <th scope="col">TreatmentId</th> */}
                            <th scope="col">RegistrationFee</th>
                            <th scope="col">MedicalFee</th>
                            <th scope="col">Total</th>
                            <th scope="col">PolicyNumber</th>
                            <th scope="col">Billing Date</th>
                            {/* <th scope="col">UpdatedAT</th> */}
                    
                             <th scope="col">Bill Details</th>
                             {/* <th scope="col">Actions</th>
                            <th scope="col">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {financeList}
                    </tbody>
                </table>
                <div className="nav justify-content-start">
                    {/* <button className ='mr-5'onClick={() => history.push('/Products')} type="button" className="btn btn-dark">Update</button> */}
                    {/* <Link className="nav-link " to="/update/id">UPDATE USER</Link> */}
                </div>
            </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        message: state.finance.message,
        finances: state.finance.finances,
        history: ownProps.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFinances: () => {
            console.log('debug info')
            return dispatch(actions.fetchFinances())
        },
        onDeleteFinance: (id) => dispatch(actions.deleteFinance(id)),
        // onFilterFinance: (createdTime) => dispatch(actions.filterFinance(createdTime))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewFinance);