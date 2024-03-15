import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions'
import { withRouter } from 'react-router-dom';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    render() {
        let language = this.props.language
        return (

            <React.Fragment>
                <div className="header">
                    <header className="base-rectangle1" />
                    <div className='left-content'>
                        <img
                            className='header-logo' src={logo}
                            onClick={() => this.returnHome()}
                        />
                    </div>
                    <div className="items">
                        <div className="doctors">BÁC SĨ</div>
                        <div className="clinics">CƠ SỞ Y TẾ</div>
                        <div className="handbooks">CẨM NANG</div>
                    </div>
                    <div className="right-btn">
                            <div className="btn-1">TƯ VẤN</div>
                        
                            <div className="btn-2" onClick={() => this.handleLogin()}>ĐĂNG NHẬP</div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
