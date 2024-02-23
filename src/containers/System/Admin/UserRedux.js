import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genderArr: [],
			positionArr: [],
			roleArr: [],
			previewImgUrl: "",
			isOpen: false,

			id: "",
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			phoneNumber: "",
			address: "",
			gender: "",
			role: "",
			position: "",
			avatar: "",

			action: "",
		};
	}

	async componentDidMount() {
		this.props.getGenderStart();
		this.props.getPositionStart();
		this.props.getRoleStart();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {

			let arrGenders = this.props.genderRedux
			this.setState({
				genderArr: arrGenders,
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
			});
		}
		if (prevProps.positions !== this.props.positions) {
			let arrPositions = this.props.positions
			this.setState({
				positionArr: arrPositions,
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMapMap : ''
			});
		}
		if (prevProps.roles !== this.props.roles) {
			let arrRoles = this.props.roles
			this.setState({
				roleArr: arrRoles,
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
			});
		}
		if (prevProps.users !== this.props.users) {
			let arrGenders = this.props.genderRedux
			let arrPositions = this.props.positions
			let arrRoles = this.props.roles

			this.setState({
				email: "",
				password: "",
				firstName: "",
				lastName: "",
				phoneNumber: "",
				address: "",
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
				avatar: "",
				action: CRUD_ACTIONS.CREATE,
				previewImgUrl: ""
			})
		}
	}

	handleOnChangeImg = async (e) => {
		let data = e.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file)
			console.log('check base64: ', base64)
			let objectUrl = URL.createObjectURL(file);
			this.setState({
				previewImgUrl: objectUrl,
				avatar: base64
			});
		}
	};

	openPreviewImage = () => {
		if (!this.state.previewImgUrl) return;
		this.setState({
			isOpen: true,
		});
	};

	handleSaveUser = () => {
		let isValid = this.checkValidInput()
		if (isValid === false) return
		let { action } = this.state

		// fire create user
		if (action === CRUD_ACTIONS.CREATE) {
			this.props.createNewUserRedux({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phoneNumber: this.state.phoneNumber,
				roleId: this.state.role,
				gender: this.state.gender,
				positionId: this.state.position,
				avatar: this.state.avatar
			})
		}

		// fire edit user
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.fetchEditUserStart({
				id: this.state.id,
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phoneNumber: this.state.phoneNumber,
				roleId: this.state.role,
				gender: this.state.gender,
				positionId: this.state.position,
				avatar: this.state.avatar
			})
		}
	}

	onChangeInput = (e, id) => {

		let copyState = { ...this.state }
		copyState[id] = e.target.value
		this.setState({
			...copyState
		})
	}

	checkValidInput = () => {
		let arrCheck = ['email', 'password', 'firstName',
			'lastName', 'phoneNumber', 'address']
		let isValid = true;

		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false
				alert('Missing ' + arrCheck[i])
				break;
			}
		}

		return isValid
	}

	handleEditUserFromParent = (user) => {
		let imageBase64 = ''
		if (user.image) {
			imageBase64 = new Buffer(user.image, 'base64').toString('binary')
		}

		this.setState({
			id: user.id,
			email: user.email,
			password: 'HARDCODE',
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			address: user.address,
			gender: user.gender,
			position: user.positionId,
			role: user.roleId,
			action: CRUD_ACTIONS.EDIT,
			previewImgUrl: imageBase64
		})
	}

	render() {
		let genders = this.state.genderArr;
		let positions = this.state.positionArr;
		let roles = this.state.roleArr;
		let language = this.props.language;
		let {
			email, password, firstName, lastName, phoneNumber,
			address, gender, role, position, avatar,
		} = this.state;

		return (
			<div className="user-redux-container">
				<div className="title">Thêm người dùng</div>
				<div className="user-redux-body mt-4">
					<div className="container">
						<div className="row">
							<div className="col-12 my-3">
								<FormattedMessage id="manage-user.add" />
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.email" />
								</label>
								<input
									className="form-control" type="email"
									value={email}
									onChange={(e) => this.onChangeInput(e, 'email')}
									disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.password" />
								</label>
								<input className="form-control" type="password"
									value={password}
									onChange={(e) => this.onChangeInput(e, 'password')}
									disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.firstName" />
								</label>
								<input className="form-control" type="text"
									value={firstName}
									onChange={(e) => this.onChangeInput(e, 'firstName')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.lastName" />
								</label>
								<input className="form-control" type="text"
									value={lastName}
									onChange={(e) => this.onChangeInput(e, 'lastName')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.phoneNumber" />
								</label>
								<input className="form-control" type="text"
									value={phoneNumber}
									onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
								/>
							</div>
							<div className="col-9">
								<label>
									<FormattedMessage id="manage-user.address" />
								</label>
								<input className="form-control" type="text"
									value={address}
									onChange={(e) => this.onChangeInput(e, 'address')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.gender" />
								</label>
								<select class="form-control"
									onChange={(e) => this.onChangeInput(e, 'gender')}
									value={gender}
								>
									{genders &&
										genders.length > 0 &&
										genders.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI
														? item.valueVi
														: item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.position" />
								</label>
								<select class="form-control"
									onChange={(e) => this.onChangeInput(e, 'position')}
									value={position}
								>
									{positions &&
										positions.length > 0 &&
										positions.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI
														? item.valueVi
														: item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.roleId" />
								</label>
								<select class="form-control"
									onChange={(e) => this.onChangeInput(e, 'role')}
									value={role}
								>
									{roles &&
										roles.length > 0 &&
										roles.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI
														? item.valueVi
														: item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.image" />
								</label>
								<div className="preview-img-container">
									<input
										id="previewImg"
										type="file"
										hidden
										onChange={(e) => this.handleOnChangeImg(e)}
									/>
									<label className="label-upload" htmlFor="previewImg">
										Tải ảnh <i className="fas fa-upload"></i>
									</label>
									<div
										className="previewImg"
										onClick={() => this.openPreviewImage()}
										style={{
											backgroundImage: `url(${this.state.previewImgUrl})`,
										}}
									></div>
								</div>
							</div>
							<div className="col-12 my-3">
								<button
									className={
										this.state.action === CRUD_ACTIONS.EDIT ?
											"btn btn-warning" : "btn btn-primary"
									}
									onClick={() => this.handleSaveUser()}
								>
									{this.state.action === CRUD_ACTIONS.EDIT ?
										<FormattedMessage id="manage-user.save-change" /> :
										<FormattedMessage id="manage-user.save" />
									}

								</button>
							</div>
							<div className="col-12 mb-5">
								<TableManageUser
									handleEditUserFromParent={this.handleEditUserFromParent}
									action={this.state.action}
								/>
							</div>
						</div>
					</div>
				</div>

				{this.state.isOpen && (
					<Lightbox
						mainSrc={this.state.previewImgUrl}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genderRedux: state.admin.genders,
		isLoadingGender: state.admin.isLoadingGender,
		positions: state.admin.positions,
		roles: state.admin.roles,
		users: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getPositionStart: () => dispatch(actions.fetchPositionStart()),
		getRoleStart: () => dispatch(actions.fetchRoleStart()),
		createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
		fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
		fetchEditUserStart: (data) => dispatch(actions.fetchEditUserStart(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
