import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils'
import { postBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment/moment';

class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctorId: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            gender: '',
            birthday: '',
            selectedGender: '',
            genderArr: [],
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getALLGenders();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allGenders)
            this.setState({
                genderArr: dataSelect,
            })
        }

        if (prevProps.allGenders !== this.props.allGenders) {
            let dataSelect = this.buildDataInputSelect(this.props.allGenders)
            this.setState({
                genderArr: dataSelect,
            })
        }

        if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {
            console.log('check preprops this.props: ', prevProps, this.props)
            let { dataScheduleTimeModal } = this.props
            let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ?
                dataScheduleTimeModal.doctorId : ''
            let timeType = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ?
                dataScheduleTimeModal.timeType : ''
            this.setState({
                doctorId,
                timeType
            })
        }
    }

    buildDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    handleOnChangeInput = (e, id) => {
        let value = e.target.value
        let copyState = { ...this.state }
        copyState[id] = value
        this.setState({
            ...copyState
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelectedGender = (selectedGender) => {
        this.setState({
            selectedGender
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }

    handleConfirmBookingModal = async () => {
        // console.log('check state: ', this.state)
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal)
        // console.log('check doctorId: ', this.state.doctorId)
        // console.log('check timetype: ', this.state.timeType)
        console.log('check state: ', this.state)
        let res = await postBookAppointment({
            doctorId: this.state.doctorId,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTimeModal.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString,
            doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    render() {
        let { isOpenBookingModal, closeBookingModal, dataScheduleTimeModal } = this.props
        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : ''
        console.log('check dataScheduleTimeModal: ', dataScheduleTimeModal)
        console.log('check doctorId: ', doctorId)
        return (
            <div>
                <Modal
                    isOpen={isOpenBookingModal} className={'booking-modal-container'}
                    centered={true} size={'lg'}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='patient.booking-modal.title' />
                            </span>
                            <span className='right'
                                onClick={closeBookingModal}
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataScheduleTimeModal={dataScheduleTimeModal}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.fullName' />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.phoneNumber' />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.email' />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.address' />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.reason' />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.dob' />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='patient.booking-modal.gender' />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelectedGender}
                                        options={this.state.genderArr}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBookingModal()}
                            >
                                <FormattedMessage id='patient.booking-modal.confirm' />
                            </button>
                            <button className='btn-booking-cancel'
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id='patient.booking-modal.cancel' />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allGenders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
