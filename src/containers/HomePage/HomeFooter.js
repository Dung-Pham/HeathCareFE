import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './HomeFooter.scss'
class HomeFooter extends Component {
    constructor(props) {
        super(props)
        // this.sliderRef = React.createRef(); // Tạo một tham chiếu
        // this.state = {
        //     arrDoctors: [],
        // }
    }
    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    handleViewSpecialtyMore = () => {
        if (this.props.history) {
            this.props.history.push(`/specialty_more`)
        }
    }

    handleViewDoctorMore = () => {
        if (this.props.history) {

            this.props.history.push(`/doctor_more`)
        }
    }

    handleViewClinicMore = () => {
        if (this.props.history) {
            this.props.history.push(`/clinic_more`)
        }
    }
    
    handleViewHandbookMore = () => {
        if (this.props.history) {
            this.props.history.push(`/handbook_more`)
        }
    }

    render() {
        return (
            <div className='home-footer'>
                <div className='footer-container'>
                    <div className='container health-care'>
                        <div className='txt name'>
                            <b>Health Care</b>
                        </div>
                        <div className='description'>
                            <p className="txt">
                                Dịch vụ tư vấn sức khỏe chất lượng và tiện lợi
                            </p>
                            <p className="txt">
                                Đặt lịch hẹn với bác sĩ dễ dàng hơn
                            </p>
                            <p className="txt">
                                Cung cấp kiến thức và thông tin quan trọng về y tế
                            </p>
                        </div>
                    </div>
                    <div className='container quick-link'>
                        {/* <b className="txt">
                            Quick link
                        </b> */}
                        <div>
                            <p className="txt" onClick={() => this.handleViewDoctorMore()}>
                                Bác sĩ
                            </p>
                            <p className="txt" onClick={() => this.handleViewClinicMore()}>
                                Cơ sở y tế
                            </p>
                            <p className="txt" onClick={() => this.handleViewHandbookMore()}>
                                Cẩm nang
                            </p>
                            <p className="txt" onClick={() => this.handleLogin()}>
                                Tư vấn
                            </p>
                            <p className="txt"  onClick={() => this.handleLogin()}>
                                Đăng nhập
                            </p>
                        </div>
                    </div>
                    <div className='container contact'>
                        <b className="txt">
                            Liên hệ
                        </b>
                        <div className='cnt'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faEnvelope} />
                            <p className="txt">dungptt.b21cn261@ptit.edu.vn</p>
                        </div>
                        <div className='cnt'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faGithub} />
                            <a className="txt" href='https://github.com/Dung-Pham'>https://github.com/Dung-Pham</a>
                        </div>

                    </div>

                </div>
            </div>
        )
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
