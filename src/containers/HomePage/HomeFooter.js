import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy;
                    2023 Nguyễn Tiến Anh. More infomation please visit my github. <a
                        target='_blank'
                        href='https://github.com/NguyenTien-Anh'>
                        &#8594; Click here &#8592;
                    </a>
                </p>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
