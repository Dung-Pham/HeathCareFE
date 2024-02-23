import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getScheduleDoctorByDate } from '../../../services/userService'
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTimes: [],
            isOpenBookingModal: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getAllDays(language)

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTimes: res.data ? res.data : []
            })
        }

        this.setState({ allDays })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getAllDays(this.props.language)
            this.setState({ allDays })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getAllDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
        }
    }

    ucfirst = (str) => {
        var firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    }

    getAllDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddmm = new moment(new Date()).format('DD/MM')
                    let labelVi = `Hôm nay - ${ddmm}`
                    object.label = this.ucfirst(labelVi)
                } else {
                    let labelVi = new moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.ucfirst(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddmm = new moment(new Date()).format('DD/MM')
                    let labelEn = `Today - ${ddmm}`
                    object.label = labelEn
                } else {
                    object.label = new moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                }
            }
            object.value = new moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        return allDays;
    }

    handleOnChange = async (e) => {
        let { doctorIdFromParent } = this.props
        if (doctorIdFromParent && doctorIdFromParent !== -1) {
            let doctorId = doctorIdFromParent
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: time,
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenBookingModal: false
        })
    }

    render() {
        let { allDays, allAvailableTimes, isOpenBookingModal, dataScheduleTimeModal } = this.state
        let { language } = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnChange(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-time-available'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'></i>
                            <span>
                                <FormattedMessage id='patient.detail-doctor.schedule' />
                            </span>
                        </div>
                        <div className='time-content'>
                            <>
                                <div className='time-content-btns'>
                                    {allAvailableTimes && allAvailableTimes.length > 0 ?
                                        allAvailableTimes.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                </button>
                                            )
                                        })
                                        :
                                        <div className='no-schedule'>
                                            <FormattedMessage id='patient.detail-doctor.notice' />
                                        </div>
                                    }
                                </div>

                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.choose' />
                                        <i className='far fa-hand-point-up'></i>
                                        <FormattedMessage id='patient.detail-doctor.book-free' />
                                    </span>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenBookingModal={isOpenBookingModal}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleTimeModal={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
