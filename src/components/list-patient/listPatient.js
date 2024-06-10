
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import { getListPatientForDoctor } from '../../services/userService'

import './listPatient.scss';


class ListPatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {

            this.getDataPatient()
        }
    }

    getDataPatient = async () => {
        let { doctorIdFromParent } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        console.log('check formatedDate', formatedDate)
        console.log('check doctorId', doctorIdFromParent)
        let res = await getListPatientForDoctor({
            doctorId: doctorIdFromParent,
            date: formatedDate
        })

        let listPatient = []; // Mảng mới để lưu trữ các phần tử hợp lệ
        res.data.forEach(item => {
            if (item.statusId != "S3") {
                listPatient.push(item);
            }
        });

        if (listPatient.length > 0) {
            this.setState({
                dataPatient: listPatient
            });
        } else {
            console.log("Không có dữ liệu");
        }

        console.log('check list doctor', res)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            this.getDataPatient()
        }
    }
    render() {
        let { dataPatient } = this.state
        return (
            <div className="list-container">
                <h1>Xếp Hàng Đợi Khám</h1>
                <ol className="my-list">
                    {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                            return (
                                <li key={index} tabIndex="1">
                                    {item.patientData.firstName}
                                </li>
                            );
                        })
                    ) : (
                        <li>No data available</li>
                    )}
                </ol>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPatient);
