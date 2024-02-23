import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { getExtraInfoDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetails: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {

            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                ...this.state
            })
        }
    }

    showHideInfoPrice = (type) => {
        if (type === 'PRICE') {
            this.setState({
                isShowDetails: !this.state.isShowDetails
            })
        }
    }

    render() {
        let { isShowDetails, extraInfo } = this.state
        let { language } = this.props
        let priceVi = extraInfo && extraInfo.priceData &&
            extraInfo.priceData.valueVi ? extraInfo.priceData.valueVi : ''
        let priceEn = extraInfo && extraInfo.priceData &&
            extraInfo.priceData.valueEn ? extraInfo.priceData.valueEn : ''
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.extra-info-doctor.text-address' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='address-clinic'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='content-mid'>
                    {
                        isShowDetails === false ?
                            <div className='short-info'>
                                <span className='title-pri'>
                                    <FormattedMessage id='patient.extra-info-doctor.title-price' />
                                </span>
                                <NumberFormat
                                    value={language === LANGUAGES.VI ? priceVi : priceEn}
                                    displayType={'text'} thousandSeparator={true}
                                    suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                />.
                                <span className='detail' onClick={() => this.showHideInfoPrice('PRICE')}>
                                    <FormattedMessage id='patient.extra-info-doctor.detail' />
                                </span>
                            </div>
                            :
                            <>
                                <div className='title-price'>
                                    <FormattedMessage id='patient.extra-info-doctor.title-price' />
                                </div>
                                <div className='detail-info'>
                                    <div className='price'>
                                        <span className='left'>
                                            <FormattedMessage id='patient.extra-info-doctor.title-pri' />
                                        </span>
                                        <span className='right'>
                                            <NumberFormat
                                                value={language === LANGUAGES.VI ? priceVi : priceEn}
                                                displayType={'text'} thousandSeparator={true}
                                                suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                            />
                                        </span>
                                    </div>
                                    <div className='note'>
                                        {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                    </div>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id='patient.extra-info-doctor.payment' />
                                    {extraInfo && extraInfo.paymentData && language === LANGUAGES.VI ?
                                        extraInfo.paymentData.valueVi : ''}
                                    {extraInfo && extraInfo.paymentData && language === LANGUAGES.EN ?
                                        extraInfo.paymentData.valueEn : ''}
                                </div>
                                <div className='hide-price'>
                                    <span onClick={() => this.showHideInfoPrice('PRICE')}>
                                        <FormattedMessage id='patient.extra-info-doctor.hide-price' />
                                    </span>
                                </div>
                            </>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
