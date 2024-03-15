import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import TagDoctor from '../../../components/tag-homepage/tag-doctor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {

            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id='home-page.outstanding-doctor' />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id='home-page.more-info' />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider ref={this.sliderRef} {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <TagDoctor
                                                date= "12/03/2024"
                                                description={nameVi}
                                                imageSrc={imageBase64}
                                            />
                                            {/* <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-img section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})`, }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Thần Kinh 1</div>
                                                </div>
                                            </div> */}
                                        </div>
                                    )
                                })}
                        </Slider>
                        <button className="custom-prevArrow" onClick={() => this.sliderRef.current.slickPrev()}>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faChevronRight}
                                flip="horizontal"
                                size="2xs"
                            />
                        </button>
                        <button className="custom-nextArrow" onClick={() => this.sliderRef.current.slickNext()}>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faChevronRight}
                                flip="vertical"
                                size="2xs"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.loadTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
