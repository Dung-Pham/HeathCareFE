import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            // console.log(e)
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {
        // JSX
        return (
            <div>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Đăng nhập</div>
                            <div className='col-12 form-group login-input'>
                                <label>Tên đăng nhập</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Điền tên đăng nhập của bạn'
                                    value={this.state.username}
                                    onChange={(e) => { this.handleOnChangeUsername(e) }}

                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Mật khẩu</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'
                                        placeholder='Điền mật khẩu của bạn'
                                        onChange={(e) => { this.handleOnChangePassword(e) }}
                                        onKeyDown={(e) => this.handleKeyDown(e)}
                                    />
                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12'>
                                <button className='btn-login' onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                            </div>
                            {/* <div className='col-12'>
                                <span className='forgot-password'>Quên mật khẩu?</span>
                            </div> */}
                            <div className='col-12 text-center mt-3'>
                                <span className='text-other-login'>Hoặc đăng nhập với:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-facebook-f facebook"></i>
                                <i className="fab fa-google-plus-g google"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
