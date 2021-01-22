import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <div className="text-center">
                <footer className = "footer">
                    <span className="text-muted">All Rights Reserved 2020 @ HealthCareSystem</span>
                </footer>
                </div>
            </div>
        )
    }
}

export default Footer