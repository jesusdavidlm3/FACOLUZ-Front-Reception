import React, { useContext, useState, useEffect } from "react";
import { Divider, Form, Input, Select, DatePicker, Space, Button, TimePicker } from 'antd'
import { makeDate, makeHistory, verifyPatientExist, getStudentList } from '../client/client'
import AppContext from "antd/es/app/context";
import * as lists from "../context/lists"
import { mergeDateTime } from "../functions/formatDateTime";
import { LoadingOutlined } from "@ant-design/icons"

const NewDate = () => {

    //Estados para manejo de la UI
    const { messageApi, contextHolder } = useContext(AppContext)
    const [patientExist, setPatientExists] = useState(null)
    const [patientData, setPatientData] = useState()
    const [loading, setLoading] = useState(false)
    const [studentList, setStudentList] = useState([])

    //Estados para recoleccion de informacion
    const [sex, setSex] = useState()
    const [birthDate, setBirthDate] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [doctorId, setDoctorId] = useState()
    const [idType, setIdType] = useState()
    const [race, setRace] = useState()
    const [emergencyRelation, setEmergencyRelation] = useState()
    const [companionRelation, setCompanionRelation] = useState()
    const [instructionGrade, setInstructionGrade] = useState()

    //Comunicacion back end

    useEffect(() => {
        getList()
    }, [])

    const getList = async() => {
        const res = await getStudentList()
        if(res.status == 200){
            setStudentList(res.data.map(item => ({label: `${item.name} ${item.lastname}`, value: item.id})))
        }else{
            messageApi.open({
                type: 'error',
                content: 'error al obtener la lista de doctores'
            })
        }
    }

    const verifyPatient = async(e) => {
        const res = await verifyPatientExist(e)
        console.log(res)
        if(res.status == 200){
            setPatientExists(true)
        }else if(res.status == 404){
            setPatientExists(false)
        }else{
            console.log(res)
            messageApi.open({
                type: "error",
                content: res.response.data
            })
        }
    }

    const saveDate = async() => {
        // setLoading(true)
        if(patientExist == true){
            const data = {
                patientId: patientData.id,
                doctorId: doctorId,
                date: mergeDateTime(date, time)
            }
        }else if(patientExist == false){
            const id = document.getElementById("idField").value
            const name = document.getElementById("nameField").value
            const lastname = document.getElementById("lastnameField").value
            const birthPlace = document.getElementById("birthPlaceField").value
            const phone = document.getElementById("phoneField").value
            const municipality = document.getElementById("phoneField").value
            const city = document.getElementById("cityField").value
            const address = document.getElementById("addressField").value
            const religion = document.getElementById("religionField").value
            const emergencyName = document.getElementById("emergencyNameField").value
            const emergencyPhone = document.getElementById("emergencyPhoneField").value
            const companionName = document.getElementById("companionNameField").value
            const companionPhone = document.getElementById("companionPhoneField").value

            const historyData = {
                name: name,
                lastname: lastname,
                identificationType: idType,
                patientIdentification: id,
                phone: phone,
                sex: sex,
                birthDate: birthDate.$d,
                birthPlace: birthPlace,
                religion: religion,
                race: race,
                address: address,
                addressMunicipality: municipality,
                addressCity: city,
                emergencyName: emergencyName,
                emergencyPhone: emergencyPhone,
                emergencyRelationship: emergencyRelation,
                companionName: companionName,
                companionPhone: companionPhone,
                companionRelationship: companionRelation,
                instructionGrade: instructionGrade,
                idStudent: doctorId
            }

            const dateData = {
                patientId: id,
                doctorId: doctorId,
                date: mergeDateTime(date, time)
            }

            const historyRes = await makeHistory(historyData)
            if(historyRes.status == 200){
                messageApi.open({
                    type: 'success',
                    content: "Paciente registrado"
                })
                const dateRes = await makeDate(dateData)
                if(dateRes.status == 200){
                    messageApi.open({
                        type: 'success',
                        content: "Cita registrada"
                    })
                }else{
                    messageApi.open({
                        type: 'error',
                        content: dateRes.response.data ? (dateRes.response.data):("error al registrar la cita")
                    })
                }
            }else{
                messageApi.open({
                    type: 'error',
                    content: historyRes.response.data ? (historyRes.response.data):("error al registrar al paciente")
                })
            }
        }
    }

    return(
        <div className="NewDate">
            {contextHolder}
            <Divider>Agendar cita</Divider>
            <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} disabled={loading}>
                <Form.Item label="Cedula del Paciente">
                    <Input.Search onSearch={e => verifyPatient(e)} id="idField"/>
                </Form.Item>
                {(patientExist != null && patientExist == false) && (<>
                    <h4 style={{color: 'tomato'}}>No se ha encontrado ningun paciente con esta cedula o codigo, registre al paciente</h4>
                    <Divider>Datos del paciente</Divider>
                    <Space>
                        <Form.Item label="Nombre:">
                            <Input id="nameField"/>
                        </Form.Item>
                        <Form.Item label="Apellido:">
                            <Input id="lastnameField"/>
                        </Form.Item>
                        <Form.Item label="Tipo de identificacion:">
                            <Select
                                options={lists.identificationList.slice(0, 2)}
                                style={{width: '150px'}}
                                onChange={e=>setIdType(e)}
                            />
                        </Form.Item>
                        <Form.Item label="Fecha de nacimiento">
                            <DatePicker
                                style={{width: '150px'}}
                                onChange={e=>setBirthDate(e)}    
                            />
                        </Form.Item>
                    </Space>
                    <Space>
                        <Form.Item label="Sexo">
                            <Select
                                options={lists.sexList}
                                style={{width: '150px'}}
                                onChange={e=>setSex(e)}    
                            />
                        </Form.Item>
                        <Form.Item label="Raza:">
                            <Select
                                options={lists.raceList}
                                style={{width: '150px'}}
                                onChange={e=>setRace(e)}    
                            />
                        </Form.Item>
                        <Form.Item label="Religion (opcional):">
                            <Input id="religionField"/>
                        </Form.Item>
                        <Form.Item label="Grado de instruccion:">
                            <Select
                                style={{width: '150px'}}
                                options={lists.instructionGradeList}
                                onChange={e=>setInstructionGrade(e)}
                            />
                        </Form.Item>
                    </Space>
                    <Space>
                        <Form.Item label="Telefono">
                            <Input id="phoneField" />
                        </Form.Item>
                        <Form.Item label="Lugar de nacimiento">
                            <Input id="birthPlaceField"/>
                        </Form.Item>
                        <Form.Item label="Municipio">
                            <Input id="municipalityField" />
                        </Form.Item>
                        <Form.Item label="Ciudad">
                            <Input id="cityField" />
                        </Form.Item>
                    </Space>
                    <Form.Item label="Direccion:" layout="vertical">
                        <Input.TextArea id="addressField" autoSize style={{width: '50vw'}}/>
                    </Form.Item>
                    <Divider>Datos del contacto de emergencia</Divider>
                    <Space>
                        <Form.Item label="Contacto de emergencia">
                            <Input id="emergencyNameField"/>
                        </Form.Item>
                        <Form.Item label="Telefono">
                            <Input id="emergencyPhoneField"/>
                        </Form.Item>
                        <Form.Item label="Relacion">
                            <Select
                                options={lists.relationshipType}
                                style={{width: '150px'}}
                                onChange={e=>setEmergencyRelation(e)}    
                            />
                        </Form.Item>                        
                    </Space>
                    <Divider>Datos del acompanante habitual</Divider>
                    <Space>
                        <Form.Item label="Nombre (Opcional)">
                            <Input id="companionNameField"/>
                        </Form.Item>
                        <Form.Item label="Telefono (Opcional)">
                            <Input id="companionPhoneField"/>
                        </Form.Item>
                        <Form.Item label="Relacion (Opcional)">
                            <Select
                                options={lists.relationshipType}
                                style={{width: '150px'}}
                                onChange={e=>setCompanionRelation(e)}    
                            />
                        </Form.Item>                        
                    </Space>

                </>)}
                {(patientExist != null && patientExist == true) && (<>
                    <h3>Nombre: </h3>
                    <h3>Edad: </h3>

                </>)}

                {patientExist != null && (<>
                    <Divider>Datos de la cita</Divider>
                    
                    <Space>
                        <Form.Item label="Doctor:">
                            <Select
                                style={{width: '250px'}}
                                onChange={e=>setDoctorId(e)}
                                options={studentList}
                            />
                        </Form.Item>
                        <Form.Item label="Fecha:">
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(a, b)=>setDate(a.$d)}
                            />
                        </Form.Item>
                        <Form.Item label="Hora:">
                            <TimePicker
                                onChange={(a, b)=>setTime(a.$d)}
                                use12Hours
                                format="hh:mm a"
                            />
                        </Form.Item>
                    </Space>

                    <Button htmlType="submit" variant="solid" color="primary" onClick={saveDate}>Registrar{loading && <LoadingOutlined/>}</Button>
                </>)}

            </Form>
        </div>
    )
}

export default NewDate;