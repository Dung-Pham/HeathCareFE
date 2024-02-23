import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import Select from 'react-select';
import { getDetailDoctorById } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            allDoctors: [],
            hasOldData: false,

            // save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.getALLDoctors()
        this.props.getRequiredDoctorInfo()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                allDoctors: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            let listPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')


            this.setState({
                allDoctors: dataSelect, listPrice, listPayment, listProvince
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo
            let listPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let listSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let listClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            this.setState({ listPrice, listPayment, listProvince, listSpecialty, listClinic })
        }
    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'USER') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            } else if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi + ' VND'
                    let labelEn = item.valueEn + ' USD'
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            } else if (type === 'PAYMENT') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            } else if (type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            } else if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            } else if (type === 'CLINIC') {
                data.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.fetchInfoDoctor({
            contentHtml: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleChangeSelectedDoctor = async (selectedDoctor) => {
        // console.log('check select doctor: ', selectedDoctor)
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorById(selectedDoctor.value)
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state
        if (res && res.errCode === 0 && res.data) {
            let { Markdown, Doctor_info } = res.data
            let contentHtml = '', contentMarkdown = '', description = '', hasOldData = false
            let selectedPrice = '', selectedPayment = '', selectedProvince = '',
                nameClinic = '', addressClinic = '', note = '', selectedSpecialty = '',
                specialtyId = '', clinicId = '', selectedClinic = ''
            if (Markdown) {
                contentHtml = Markdown.contentHTML
                contentMarkdown = Markdown.contentMarkdown
                description = Markdown.description
                hasOldData = true
            }
            if (Doctor_info) {
                nameClinic = Doctor_info.nameClinic
                addressClinic = Doctor_info.addressClinic
                note = Doctor_info.note
                specialtyId = Doctor_info.specialtyId
                clinicId = Doctor_info.clinicId

                // built default value select component
                let priceId = Doctor_info.priceId
                let paymentId = Doctor_info.paymentId
                let provinceId = Doctor_info.provinceId


                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                // Markdown
                contentHtml,
                contentMarkdown,
                description,
                hasOldData,

                // Doctor_info
                selectedPrice,
                selectedPayment,
                selectedProvince,
                selectedSpecialty,
                selectedClinic,
                nameClinic,
                addressClinic,
                note,
            })
        } else {
            this.setState({
                // Markdown
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                // Doctor_info
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }

    };

    handleOnChangeDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let copyState = this.state
        copyState[stateName] = selectedOption
        this.setState({
            ...copyState
        })
    }

    handleOnChangeText = (e, id) => {
        let copyState = this.state
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let { hasOldData, listSpecialty } = this.state
        console.log('check state: ', this.state)
        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className='more-info'>
                        <div className='content-left form-group' rows='4'>
                            <label><FormattedMessage id="admin.manage-doctor.select" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelectedDoctor}
                                options={this.state.allDoctors}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                            <textarea
                                onChange={(e) => this.handleOnChangeText(e, 'description')}
                                value={this.state.description}
                                className='form-control'
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className='more-info-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleOnChangeDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleOnChangeDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                name='selectedPayment'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleOnChangeDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name='selectedProvince'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                            <input
                                className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                            <input
                                className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                            <input
                                className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>Chọn chuyên khoa</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                options={this.state.listSpecialty}
                                placeholder='Chọn chuyên khoa'
                                onChange={this.handleOnChangeDoctorInfo}
                                name='selectedSpecialty'
                            // placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phòng khám</label>
                            <Select
                                value={this.state.selectedClinic}
                                options={this.state.listClinic}
                                placeholder='Chọn phòng khám'
                                onChange={this.handleOnChangeDoctorInfo}
                                name='selectedClinic'
                            // placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>


                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className=
                        {hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    >
                        {hasOldData === true ?
                            <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                            :
                            <span><FormattedMessage id="admin.manage-doctor.create" /></span>}
                    </button>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLDoctors: () => dispatch(actions.getALLDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        fetchInfoDoctor: (data) => dispatch(actions.fetchInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
