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
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <img
                                className='header-logo' src={logo}
                                onClick={() => this.returnHome()}
                            />
                        </div>
                        <div className='center-content'>
                            <div className="searchBar">
                                <input
                                    id="searchQueryInput"
                                    type="text"
                                    name="searchQueryInput"
                                    placeholder="Search"
                                    defaultValue=""
                                />
                                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                        <path
                                            fill="#666666"
                                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <div className='right-content'>
        <ul>
            <li><a href="#">Doctor</a></li>
            <li>
                <a href="#">Support</a>
            </li>
            <li><a onClick={() => this.handleLogin()} >Admin</a></li>
        </ul>
                        </div >
                    </div >
                </div >
        {
            this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            ĐỐI TÁC SỨC KHỎE
                        </div>
                        <div className='title2'>
                            Kết Nối Và Cung Cấp Giải Pháp Sáng Tạo Cho Mọi Nhu Cầu
                        </div>

                    </div>
                    <div className='content-down'>

                    </div>
                </div>
        }
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
