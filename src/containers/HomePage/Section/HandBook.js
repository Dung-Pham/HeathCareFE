import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router-dom';
import TagHandbook from '../../../components/tag-homepage/tag-handbook';
import handbook_sample from '../../../assets/handbook/handbook-sample.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
class Handbook extends Component {
    constructor(props) {
        super(props)
        this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            arrHandbooks: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.handbookHomeRedux !== this.props.handbookHomeRedux) {
            this.setState({
                arrHandbooks: this.props.handbookHomeRedux
            })
        }
    }

    componentDidMount() {
        this.props.getHandbookHome();
    }

    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }
    render() {
        let { arrHandbooks } = this.state
        const settings = {
            // dots: true, // Hiển thị chấm tròn chỉ số
            infinite: true, // Cho phép cuộn vô hạn
            speed: 500, // Tốc độ cuộn (ms)
            slidesToShow: 3, // Số lượng slide hiển thị trên mỗi lần cuộn
            slidesToScroll: 1 // Số lượng slide cuộn mỗi lần
        };
        console.log('handbookHomeRedux::::::', this.props.handbookHomeRedux)
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider  ref={this.sliderRef} {...settings}>
                            {arrHandbooks && arrHandbooks.length > 0 &&
                                arrHandbooks.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let name = `${item.name}`
                                    let desc = `${item.description}`
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <TagHandbook
                                                date="12/03/2024"
                                                description={item.name}
                                                imageSrc={handbook_sample}
                                            />
                                        </div>
                                    )
                                })}
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
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        handbookHomeRedux: state.admin.handbookHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHandbookHome: () => dispatch(actions.getHandbookHome())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
