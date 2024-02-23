import actionTypes from './actionTypes';
import { toast } from 'react-toastify'
import {
    getAllCodeService, creatNewUser,
    getAllUsers, deleteUser, editUser, getTopDoctorHomeService,
    getAllDoctor, saveInfoDoctor, getHandbookHomeService,
    getAllSpecialty, getAllClinic
} from '../../services/userService'

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('check fetchGenderStart err: ', e)
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                console.log('check res.data: ', res.data)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('check fetchPositionStart err: ', e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                console.log('check res.data: ', res.data)
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('check fetchRoleStart err: ', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUserRedux = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await creatNewUser(data)
            if (res && res.errCode === 0) {
                toast.success('Creat a new user success!')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            toast.error('Error!')
            console.log('check saveUserFailed err: ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log('check fetchAllUserStart err: ', e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: data,
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const fetchDeleteUserStart = (id) => {
    return async (dispatch, getState) => {

        try {
            let res = await deleteUser(id)
            if (res && res.errCode === 0) {
                toast.success('Delete user success!', {
                    theme: 'dark'
                })
                dispatch(fetchDeleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Delete user failed!')
                dispatch(fetchDeleteUserFailed())
            }
        } catch (e) {
            toast.error('Delete user failed!')
            dispatch(fetchAllUserFailed())
            console.log('check fetchDeleteUserStart err: ', e)
        }
    }
}

export const fetchDeleteUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const fetchDeleteUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchEditUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data)
            if (res && res.errCode === 0) {
                toast.success('Edit user success!')
                dispatch(fetchEditUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Edit user failed!')
                dispatch(fetchEditUserFailed())
            }
        } catch (e) {
            toast.error('Edit user failed!')
            dispatch(fetchAllUserFailed())
            console.log('check fetchEditUserStart err: ', e)
        }
    }
}

export const fetchEditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const fetchEditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const loadTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.lOAD_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.lOAD_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('lOAD_TOP_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.lOAD_TOP_DOCTOR_FAILED,
            })
        }
    }
}

export const getALLDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctor(data)
            if (res && res.errCode === 0) {
                toast.success('Save Info Doctor succeed!')
                dispatch({
                    type: actionTypes.FETCH_INFO_DOCTORS_SUCCESS,
                })
            } else {
                toast.error('Save Info Doctor failed!')
                dispatch({
                    type: actionTypes.FETCH_INFO_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_INFO_DOCTORS_FAILED: ', e)
            toast.error('Save Info Doctor failed!')
            dispatch({
                type: actionTypes.FETCH_INFO_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllcodeSchedule = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {

        try {
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()


            if (resPrice && resPayment && resProvince && resSpecialty && resClinic &&
                resPrice.errCode === 0 && resPayment.errCode === 0 && resProvince.errCode === 0 &&
                resSpecialty.errCode === 0 && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getRequiredDoctorInfoSuccess(data))
            } else {
                dispatch(getRequiredDoctorInfoFailed())
            }
        } catch (e) {
            dispatch(getRequiredDoctorInfoFailed())
            console.log('check getRequiredDoctorInfo err: ', e)
        }
    }
}

export const getRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data
})

export const getRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

export const getHandbookHome = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getHandbookHomeService('5')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_HANDBOOK_HOME_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_HANDBOOK_HOME_FAILED,
                })
            }
            
        } catch (e) {
            console.log('FETCH_HANDBOOK_HOME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_HANDBOOK_HOME_FAILED,
            })
        }
    }
}