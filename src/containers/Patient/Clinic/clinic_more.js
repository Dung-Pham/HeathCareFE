import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router'
import './clinic_more.scss'
import TagMoreClinic from '../../../components/tag-more/tag-more-clinic';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'


class clinic_more extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
            currentPage: 1,
            newsPerPage: 6,
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        let { dataClinics } = this.state
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentList = dataClinics.slice(indexOfFirstNews, indexOfLastNews);
        // const renderTodos = currentTodos.map((todo, index) => {
        // return <TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={todo} />;
        // });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataClinics.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        return (
            <div className='clinic-more'>
                <HomeHeader />
                <div className='clinic-more-container'>
                    <div className='header'>
                        <b>Cơ sở y tế</b>
                    </div>
                    <div className='list'>
                        {currentList && currentList.length > 0 &&
                            currentList.map((data, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => this.handleViewDetailClinic(data)}
                                    >
                                        <TagMoreClinic
                                            date="12/03/2024"
                                            description={data.name}
                                            imageSrc={data.image}
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* Đánh số trang */}
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
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(clinic_more));
