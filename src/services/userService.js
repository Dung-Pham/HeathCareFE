import axios from '../axios'

let handleLogin = (email, password) => {
    return axios.post('api/login', { email, password })
}

let getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}

let creatNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

let deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

let editUser = (user) => {
    return axios.put('/api/edit-user', user)
}

let getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

let getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

let getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}

let saveInfoDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data)
}

let getDetailDoctorById = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

let bulkCreateSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

let getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

let getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

let getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?id=${id}`)
}

let postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

let postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

let createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

let getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

let createNewHandbook = (data) => {
    return axios.post(`/api/create-new-handbook`, data)
}

let getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`)
}

let getHandbookHomeService = (limit) => {
    return axios.get(`/api/get-handbook-home?limit=${limit}`)
}
let getDetailHandbookService = (id) => {
    return axios.get(`/api/get-detail-handbook?id=${id}`)
}
let getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

let createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

let getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}

let getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

let getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

let postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {
    handleLogin, getAllUsers, creatNewUser, deleteUser, editUser,
    getAllCodeService, getTopDoctorHomeService, getAllDoctor,
    saveInfoDoctor, getDetailDoctorById, bulkCreateSchedule, getScheduleDoctorByDate,
    getExtraInfoDoctorById, getProfileDoctorById, postBookAppointment,
    postVerifyBookingAppointment, createNewSpecialty, getAllSpecialty, getDetailSpecialtyById,
    createNewClinic, getAllClinic, getDetailClinicById, getListPatientForDoctor,
    postSendRemedy, createNewHandbook, getAllHandbook, getHandbookHomeService,
    getDetailHandbookService
}