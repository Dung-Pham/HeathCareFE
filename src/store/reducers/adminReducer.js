import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    schedule: [],
    allRequiredDoctorInfo: [],
    handbookHome: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = []
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }
        case actionTypes.lOAD_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data
            return {
                ...state,
            }
        case actionTypes.lOAD_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:
            state.schedule = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED:
            state.schedule = []
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data
            console.log('check FETCH_REQUIRED_DOCTOR_INFO_SUCCESS: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = []
            return {
                ...state,
            }
        case actionTypes.FETCH_HANDBOOK_HOME_SUCCESS:
            state.handbookHome = action.data
            console.log('check FETCH_HANDBOOK_HOME_SUCCESS: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_HANDBOOK_HOME_FAILED:
            state.handbookHome = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;