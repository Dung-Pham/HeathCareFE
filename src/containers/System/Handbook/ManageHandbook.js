import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageHandbook.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewHandbook } from '../../../services/userService';
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',   
            contentHtml: '',
            contentHandbook: '',
            description: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentHandbook: text,
        })
    }

    // handleOnChangeImg = async (e) => {
    //     let data = e.target.files;
    //     let file = data[0]; // file tải lên ở phần tử đầu tiên
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file)
    //         this.setState({
    //             imageBase64: base64
    //         });
    //     }
    // };

    handleSaveNewHandbook = async () => {
        // alert('click me')
        console.log('TEST', this.state)
        let res = await createNewHandbook(this.state)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success('Creat a new handbook success!')
            this.setState({
                name: '',
                contentHtml: '',
                contentHandbook: '',
                description: ''
            })
        } else {
            toast.error('Error!')
            console.log('lỗi rùi', res.errCode)

        }
        
    }

    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='ms-title'>Quản lý Cẩm Nang</div>
                <div className='add-new-handbook row'>
                    <div className='col-6 form-group'>
                        <label>Tên cẩm nang</label>
                        <input className='form-control' value={this.state.name} type='text'
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Miêu tả cẩm nang</label>
                        <input className='form-control' value={this.state.description} type='text'
                            onChange={(e) => this.handleOnChangeInput(e, 'description')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '650px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentHandbook}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-handbook'
                            onClick={() => this.handleSaveNewHandbook()}
                        >Save</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
