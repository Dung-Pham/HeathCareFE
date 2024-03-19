import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router'
// import './MedicalFacility.scss'
import TagClinic from '../../../components/tag-homepage/tag-clinic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../components/loading/loading'

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            dataClinics: [],
            isLoading: true,
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
        this.props.settings && this.setState({ isLoading: false });
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    handleViewClinicMore = () => {
        if (this.props.history) {
            this.props.history.push(`/clinic_more`)
        }
    }

    render() {
        let { dataClinics, isLoading } = this.state
        const settings = {
            // dots: true, // Hiển thị chấm tròn chỉ số
            infinite: true, // Cho phép cuộn vô hạn
            speed: 500, // Tốc độ cuộn (ms)
            slidesToShow: 5, // Số lượng slide hiển thị trên mỗi lần cuộn
            slidesToScroll: 1 // Số lượng slide cuộn mỗi lần
        };
        return (
            <>
                {isLoading ? (<Loading />) :
                    (<div className='section-share section-clinic'>
                        <div className='section-header'>
                            <span className='title-section'>Cơ sở y tế nổi bật</span>
                            <button className='btn-section'onClick={() => this.handleViewClinicMore()}>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider ref={this.sliderRef} {...settings}>
                                {dataClinics && dataClinics.length > 0 &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div className='section-customize' key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            >
                                                <TagClinic
                                                    date="12/03/2024"
                                                    description={item.name}
                                                    imageSrc={item.image}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            <button className="custom-prevArrow" onClick={() => this.sliderRef.current.slickPrev()}>
                                <FontAwesomeIcon
                                    className='icon'
                                    icon={faChevronRight}
                                    flip="horizontal"
                                    size="2xs"
                                />
                            </button>
                            <button className="custom-nextArrow" onClick={() => this.sliderRef.current.slickNext()}>
                                <FontAwesomeIcon
                                    className='icon'
                                    icon={faChevronRight}
                                    flip="vertical"
                                    size="2xs"
                                />
                            </button>
                        </div>
                    </div>
                    )}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
