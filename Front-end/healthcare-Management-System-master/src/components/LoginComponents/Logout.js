import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";

class Logout extends Component {
    
    render() {
        return (
            <div className="container shadow-lg p-4 bg-white border border-secondary rounded">
                <h1 className="mx-auto text-center" >Successfully signed out</h1>

                <div></div>
                <Link className="nav-item nav-link px-3" to="/login">Please Login to Book appointment</Link>
                
            </div>
        )
    }
}

export default (Logout)