import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import AddPolicy from './AddPolicy'
import SearchPolicyByPolicyNumber from './SearchPolicyByPolicyNumber'
import UpdateSpecficPolicy from './UpdateSpecficPolicy'
import ViewPolicies from './ViewPolicies'

export default class PolicyRouter extends Component {


    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg bg-dark">
                    {/* <div className="container-fluid"> */}
                    <div style={{ marginLeft: '20px', color: 'white', fontSize: '25px' }} className="navbar-brand">HMS</div>
                    <div className="collapse navbar-collapse navbar" id="navbarNav">
                        <ul className="navbar-nav ">

                            <li className="nav-item">
                                <Link style={{ color: 'aqua' }} className="nav-link" to="/policy/" >Add Policy</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{ color: 'aqua' }} className="nav-link" to="/policy/search">Search By Policy Number</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{ color: 'aqua' }} className="nav-link" to="/policy/list">Policies List</Link>
                            </li>
                        </ul>
                    </div>
                    {/* </div> */}
                </nav>
                <Switch>
                    {/* <Route exact path="/" component={ViewPolicies} /> */}
                    <Route exact path="/policy/list">
                        <ViewPolicies role="admin" emailId="kumar@gmail.com"></ViewPolicies>
                    </Route>
                    <Route exact path="/policy/" component={AddPolicy} />
                    <Route exact path="/policy/update/:emailId" component={UpdateSpecficPolicy} />
                    <Route exact path="/policy/search" component={SearchPolicyByPolicyNumber} />
                    {/* <Route exact path="/details/:policyNumber" component={PolicyDetails} /> */}
                </Switch>
            </Router>
        )
    }
}
