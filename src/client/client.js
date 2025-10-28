import { httpMethods } from './httpMethods'

const http = new httpMethods()
let token

export async function login(data){
	const res = await http.post('api/login', null, data)
	if(res.status == 200){
		token = res.data.jwt
	}
	return res
}

export async function verifyPatientExist(patientId) {
	const res = await http.get(`api/verifyPatient/${patientId}`, token)
	return res
}

export async function makeAdultHistory(data) {
	const res = await http.post('api/makeAdultHistory', token, data)
	return res
}

export async function makeChildHistory(data) {
	const res = await http.post('api/makeChildHistory', token, data)
	return res
}

export async function makeDate(data) {
	const res = await http.post('api/makeDate', token, data)
	return res
}

export async function getDates(page) {
	const res = await http.get(`api/getDates/${page}`, token)
	return res
}

export async function getDatesByPatient(patientId) {
	const res = await http.get(`api/getDateByPatient/${patientId}`, token)
	return res
}

export async function getDateByDate(date, page) {
	const res = await http.get(`api/getDateByDate/${date}/${page}`, token)
	return res
}

export async function editDate(data) {
	const res = await http.patch('api/editDate', token, data)
	return res
}

export async function cancelDate(dateId) {
	const res = await http.patch(`api/cancelDate/${dateId}`, token)
	return res
}

export async function getStudentList() {
	const res = await http.get('api/getStudentList', token)
	return res
}