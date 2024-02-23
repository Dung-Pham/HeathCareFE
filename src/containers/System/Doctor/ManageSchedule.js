import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify'
import { bulkCreateSchedule } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allDoctors: [],
            currentDate: '',
            schedule: [],
            selectedDoctor: {}
        }
    }

    componentDidMount() {
        this.props.getALLDoctors()
        this.props.fetchAllcodeSchedule()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                allDoctors: dataSelect,
            })
        }

        if (prevProps.schedule !== this.props.schedule) {
            let data = this.props.schedule
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                schedule: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         allDoctors: dataSelect,
        //     })
        // }
    }

    buildDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelectedDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        // console.log('check state: ', this.state)
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnSchedule = (data) => {
        let { schedule } = this.state
        if (schedule && schedule.length > 0) {
            schedule = schedule.map(item => {
                if (item.id === data.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        this.setState({
            schedule: schedule
        })
    }

    handleClickBtnSaveSchedule = async () => {
        // console.log('check state: ', this.state)
        let { schedule, selectedDoctor, currentDate } = this.state
        let result = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor!')
            return
        }
        if (!currentDate) {
            toast.error('Invalid date!')
            return
        }
        let formatDate = new Date(currentDate).getTime()
        if (schedule && schedule.length > 0) {
            let scheduleTime = schedule.filter(item => item.isSelected === true)
            // console.log('check scheduleTime: ', scheduleTime)
            if (scheduleTime && scheduleTime.length > 0) {
                scheduleTime.map(time => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatDate
                    object.timeType = time.keyMap
                    result.push(object)
                })
                let res = await bulkCreateSchedule({
                    arrSchedule: result,
                    doctorId: selectedDoctor.value,
                    date: formatDate
                })
                if (res && res.errCode === 0) {
                    toast.success('Creat success!')
                } else {
                    toast.error('Creat failed!')
                    console.log('err save bulk: ', res)
                }
            } else {
                toast.error('Invalid time!')
                return
            }
        }
    }

    render() {
        // console.log('check state: ', this.state)
        // console.log('check props: ', this.props)
        let { schedule } = this.state
        let { language } = this.props
        // console.log('check schedule: ', schedule)
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className='manage-schedule-containner'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-chedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id='manage-chedule.select-doctor' />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelectedDoctor}
                                options={this.state.allDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id='manage-chedule.select-date' />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {
                                schedule && schedule.length > 0 &&
                                schedule.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnSchedule(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleClickBtnSaveSchedule()}
                            >
                                <FormattedMessage id='manage-chedule.save-info' />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLDoctors: () => dispatch(actions.getALLDoctors()),
        fetchAllcodeSchedule: () => dispatch(actions.fetchAllcodeSchedule()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
