import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import specialtyImg from '../../../assets/specialty/than-kinh.jpg'
import { getAllSpecialty } from '../../../services/userService'
import './specialty_more.scss'
import { withRouter } from 'react-router'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'

class specialty_more extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
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
        let { dataSpecialty } = this.state
        return (
            <div className='specialty-more'>
                <HomeHeader />
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>
                                <FormattedMessage id='home-page.speciality-popular' />
                            </span>
                            <button className='btn-section'>
                                <FormattedMessage id='home-page.more-info' />
                            </button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div
                                                className='section-customize specialty-child' key={index}
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            >
                                                <div className='bg-img section-specialty'
                                                    style={{ backgroundImage: `url(${item.image})`, }}
                                                ></div>
                                                <span className='specialty-name'>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
                <HomeFooter />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(specialty_more));
