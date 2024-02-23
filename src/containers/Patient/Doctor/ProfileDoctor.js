import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format';
import _ from 'lodash'
import moment from 'moment/moment';
import { Link } from 'react-router-dom'

class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileDoctor: {}
        }
    }

    async componentDidMount() {
        let profileDoctor = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            profileDoctor
        })
    }

    getInfoDoctor = async (doctorId) => {
        let result = {}
        if (doctorId) {
            let res = await getProfileDoctorById(doctorId)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    componentDidUpdate(prevProps) {
        if (prevProps.doctorId !== this.props.doctorId) {

        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }
    }

    render() {
        let { profileDoctor } = this.state
        let { language, isShowDescriptionDoctor, dataScheduleTimeModal, isShowLinkDetail, isShowPrice,
            doctorId
        } = this.props
        console.log('check dataScheduleTimeModal: ', dataScheduleTimeModal)
        let nameVi = '', nameEn = ''
        let priceVi = profileDoctor && profileDoctor.Doctor_info && language === LANGUAGES.VI ?
            profileDoctor.Doctor_info.priceData.valueVi : ''
        let priceEn = profileDoctor && profileDoctor.Doctor_info && language === LANGUAGES.EN ?
            profileDoctor.Doctor_info.priceData.valueEn : ''
        if (profileDoctor && profileDoctor.positionData) {
            nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.lastName} ${profileDoctor.firstName}`
            nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.firstName} ${profileDoctor.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div
                        className='content-left'
                        style={{
                            backgroundImage: `url(${profileDoctor && profileDoctor.image ? profileDoctor.image : " "})`,
                        }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.EN ? nameEn : nameVi}
                        </div>
                        <div className='down'>
                            {
                                isShowDescriptionDoctor === true ?
                                    <>
                                        {profileDoctor && profileDoctor.Markdown && profileDoctor.Markdown.description
                                            && <span>
                                                {profileDoctor.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    this.renderTimeBooking(dataScheduleTimeModal)
                            }

                        </div>
                    </div>

                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&

                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />: <NumberFormat
                            value={language === LANGUAGES.VI ? priceVi : priceEn}
                            displayType={'text'} thousandSeparator={true}
                            suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                        />
                    </div>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
