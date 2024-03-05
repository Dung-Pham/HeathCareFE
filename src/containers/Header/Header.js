import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE } from '../../utils/constant'
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let { roleID } = userInfo
            if (roleID === USER_ROLE.ADMIN) {
                menu = adminMenu
            } else if (roleID === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        let { menuApp } = this.state
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id='homeHeader.welcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
                    </span>
                
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
