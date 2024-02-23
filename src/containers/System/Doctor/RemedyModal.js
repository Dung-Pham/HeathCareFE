import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './RemedyModal.scss'
import { toast } from 'react-toastify'
import moment from 'moment/moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenRemedyModal, closeRemedyModal, dataModal, sendRemedy } = this.props
        return (
            <div>
                <Modal
                    isOpen={isOpenRemedyModal} className={'booking-modal-container'}
                    centered={true} size={'md'}
                >
                    <ModalHeader toggle={closeRemedyModal}>Gửi hóa đơn khám bệnh thành công</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input className='form-control-file' type='file'
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                />
                            </div>
                        </div>
                    </ModalBody >
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleSendRemedy()}>Gửi</Button>
                        <Button color='secondary' onClick={closeRemedyModal}>Hủy</Button>
                    </ModalFooter>
                </Modal >
            </div >
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
