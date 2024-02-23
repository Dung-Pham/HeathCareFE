import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DetailHandbook.scss'
import { getDetailHandbookService } from '../../services/userService'

class DetailHandbook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailHandbook: {},
            currentHandbookId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentHandbookId: id
            })
            let res = await getDetailHandbookService(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailHandbook: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        console.log(this.props.match.params.id)
        let { detailHandbook } = this.state
        // let name = ''
        // if (detailHandbook && detailHandbook.data) {
        //     name = `${detailHandbook.name}`

        // }
        return (
            <div>
                {/* section-featured */}
                <HomeHeader isShowBanner={false} />
                <div className='detail-handbook-container'>
                    {/* ===========================================================================      */}
                    <div className="section-featured featured-image" style={{ backgroundImage: "url(https://images.pexels.com/photos/7659570/pexels-photo-7659570.jpeg)" }}>
                    </div>
                    {/* ===================================== */}
                    <div className="section-post wrap">
                        <div className="post-wrap ">
                            <h1 className="white">{detailHandbook.name}</h1>
                            <div >{detailHandbook.description}</div>
                            {detailHandbook &&
                                detailHandbook.contentHtml &&
                                <div dangerouslySetInnerHTML={{ __html: detailHandbook.contentHtml }}></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
