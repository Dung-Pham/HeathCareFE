import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về BookingCare?
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            BookingCare là nền tảng nền tảng đặt lịch khám giúp bệnh nhân có thể dễ dàng lựa chọn bác sĩ chuyên khoa phù hợp từ mạng lưới bác sĩ giỏi, với thông tin đã xác thực và cách thức đặt lịch nhanh chóng, thuận tiện, BookingCare (https://bookingcare.vn) đã chính thức đi vào hoạt động từ tháng 7/2016. Hiện tại, BookingCare tập trung phục vụ khách hàng khu vực miền Bắc (từ Hà Tĩnh trở ra), với mạng lưới bác sĩ, cơ sở y tế tập trung ở Hà Nội.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
