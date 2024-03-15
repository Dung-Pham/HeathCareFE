import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import specialtyImg from '../../../assets/specialty/than-kinh.jpg'
import { getAllSpecialty } from '../../../services/userService'
// import './Specialty.scss'
import { withRouter } from 'react-router'
import TagSpecialty from '../../../components/tag-homepage/tag-specialty';


class Specialty extends Component {

    constructor(props) {
        super(props)
        this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('check res: ', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty} = this.state
        // const settings = {
        //     // dots: true, // Hiển thị chấm tròn chỉ số
        //     infinite: true, // Cho phép cuộn vô hạn
        //     speed: 500, // Tốc độ cuộn (ms)
        //     slidesToShow: 5, // Số lượng slide hiển thị trên mỗi lần cuộn
        //     slidesToScroll: 3 // Số lượng slide cuộn mỗi lần
        // };
        return (
            <div className='section-share section-specialty'>
                {/* <div className='section-container'> */}
                <div className='section-header'>
                    <span className='title-section'>Chuyên khoa</span>
                    <button className='btn-section'>
                        <FormattedMessage id='home-page.more-info' />
                    </button>
                </div>
                <div className='section-body'>

                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div
                                        className='section-customize ' key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                         <TagSpecialty
                                                date="12/03/2024"
                                                description={item.name}
                                                imageSrc={item.image}
                                            />
                                    </div>
                                )
                            })
                        }
                
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
