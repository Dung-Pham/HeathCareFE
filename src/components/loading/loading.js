
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './loading.scss'

class Loading extends Component {

    render() {
        return (
            <div className="load-wrapp">
                <div className="load">
                    <div className="ring"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
}
export default (Loading);