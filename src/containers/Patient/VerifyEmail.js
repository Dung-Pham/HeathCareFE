import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            verifyStatus: false,
            errCode: 0,
        }
    }

    async componentDidMount() {
        // get token & doctorId from url params
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            // post api
            let res = await postVerifyBookingAppointment({
                token,
                doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    verifyStatus: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    verifyStatus: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        let { verifyStatus, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {
                        verifyStatus === false ?
                            <div>
                                Loading data...
                            </div>
                            :
                            <div>
                                {errCode === 0 ?
                                    <div className='info-booking'>Xác nhận lịch hẹn thành công!</div> :
                                    <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                                }
                            </div>

                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
