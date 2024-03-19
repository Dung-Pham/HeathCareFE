import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import TagDoctor from '../../../components/tag-homepage/tag-doctor';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import Loading from '../../../components/loading/loading'
import './doctor_more.scss';

class DoctorMore extends Component {

    constructor(props) {
        super(props)
        // this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            arrDoctors: [],
            isLoading: true,
            currentPage: 1,
            newsPerPage: 6,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    async componentDidMount() {
        await this.props.loadTopDoctors();
        this.props.settings && this.setState({ isLoading: false });

    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {

            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        let { arrDoctors, isLoading } = this.state
        // let { language } = this.props
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentList = arrDoctors.slice(indexOfFirstNews, indexOfLastNews);
        // const renderTodos = currentTodos.map((todo, index) => {
        // return <TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={todo} />;
        // });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrDoctors.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <>
                <div className='doctor-more'>
                    <HomeHeader />
                    <div className='doctor-more-container'>
                        <div className='header'>
                            <b>Bác sĩ</b>
                        </div>
                        {/* {isLoading ? (<Loading />) :
                            ( */}
                                <div className='list'>
                                    {currentList && currentList.length > 0 &&
                                        currentList.map((item, index) => {
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
                                                        date="12/03/2024"
                                                        description={nameVi}
                                                        imageSrc={imageBase64}
                                                    />
                                                </div>
                                            )
                                        })}
                                </div>
                            {/* )} */}
                        <div className="pagination-custom">
                            <ul className="page-numbers">
                                {
                                    pageNumbers.map(number => {
                                        if (this.state.currentPage === number) {
                                            return (
                                                <li key={number} id={number} className="active">
                                                    {number}
                                                </li>
                                            )
                                        }
                                        else {
                                            return (
                                                <li key={number} id={number} onClick={this.chosePage} >
                                                    {number}
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <HomeFooter />
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorMore));
