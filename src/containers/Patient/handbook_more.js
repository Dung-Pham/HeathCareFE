import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from './../../store/actions'
import { withRouter } from 'react-router-dom';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter'
import './handbook_more.scss';
import TagHandbook from '../../components/tag-homepage/tag-handbook';
import handbook_sample from '../../assets/handbook/handbook-sample.jpg'


class handbook_more extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrHandbooks: [],
            currentPage: 1,
            newsPerPage: 6,
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
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        let { arrHandbooks } = this.state
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentList = arrHandbooks.slice(indexOfFirstNews, indexOfLastNews);
        // const renderTodos = currentTodos.map((todo, index) => {
        // return <TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={todo} />;
        // });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrHandbooks.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <div className='handbook-more'>
                <HomeHeader />
                <div className='handbook-more-container'>
                    <div className='header'>
                        <b>Cẩm nang</b>
                    </div>
                    <div className='list'>
                        {currentList && currentList.length > 0 &&
                            currentList.map((data, index) => {
                                // let imageBase64 = ''
                                // if (item.image) {
                                //     imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                // }
                                // let name = `${item.name}`
                                // let desc = `${item.description}`
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewDetailHandbook(data)}
                                    >
                                        <TagHandbook
                                            date="12/03/2024"
                                            description={data.name}
                                            imageSrc={handbook_sample}
                                        />
                                    </div>
                                )
                            })}
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handbook_more));
