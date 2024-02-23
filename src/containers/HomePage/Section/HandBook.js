import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router-dom';

class Handbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrHandbooks: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.handbookHomeRedux !== this.props.handbookHomeRedux) {
            this.setState({
                arrHandbooks: this.props.handbookHomeRedux
            })
        }
    }

    componentDidMount() {
        this.props.getHandbookHome();
    }

    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }
    render() {
        let { arrHandbooks } = this.state
        console.log('handbookHomeRedux::::::', this.props.handbookHomeRedux)
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrHandbooks && arrHandbooks.length > 0 &&
                                arrHandbooks.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let name = `${item.name}`
                                    let desc = `${item.description}`
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div className='section-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-img section-handbook'
                                                        style={{ backgroundImage: `url(${imageBase64})`, }}
                                                    ></div>
                                                </div>

                                                <div className='position text-center'>
                                                    <div style={{
                                                        width: '300px',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        font: '17px sans-serif',
                                                        textDecoration: 'none',
                                                        lineHeight: '3',
                                                        WebkitLineClamp: '3'

                                                    }}>
                                                        {name}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        handbookHomeRedux: state.admin.handbookHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHandbookHome: () => dispatch(actions.getHandbookHome())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
