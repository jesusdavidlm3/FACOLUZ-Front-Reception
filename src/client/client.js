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

export async function makeHistory(data) {
	const res = await http.post('api/makeHistory', token, data)
}

export async function makeDate(data) {
	const res = await http.post('api/makeDate', token, data)
}

export async function editDate(data) {
	const res = await http.patch('api/editDate', token, data)
}

export async function cancelDate(dateId) {
	const res = await http.delete(`api/cancelDate/${dateId}`, token)
}