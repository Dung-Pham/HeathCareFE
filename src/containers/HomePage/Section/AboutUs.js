import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUs.scss'
import image from '../../../assets/header-background.jpg'

class About extends Component {
    render() {
        return (
            <div className="composite-node">
                <div className="grouping-node">
                    <h1 className="hotels-how-to-container">
                            Welcome to <b className="livestock">Health Care</b> Kết Nối Và Cung Cấp Giải Pháp Sáng Tạo Cho Mọi Nhu Cầu
                    </h1>
                    <h3 className="so-youre-trying-container">
                        <p className="buy-fit-for-slaughter-and">
                            – Dịch vụ tư vấn sức khỏe chất lượng và tiện lợi
                        </p>
                        <p className="get-it-processed">
                            – Đặt lịch hẹn với bác sĩ dễ dàng hơn
                        </p>
                        <p className="we-deliver-to">
                            – Cung cấp kiến thức và thông tin quan trọng về y tế
                        </p>
                    </h3>
                </div>
                <div className="else-node">
                    <img className="base-icon" loading="lazy" alt="" src={image} />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
