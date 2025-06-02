import React, { useContext, useState } from "react";
import { Divider, Form, Input, Select, DatePicker, Space, Button } from 'antd'
import { verifyPatientExist } from '../client/client'
import AppContext from "antd/es/app/context";
import * as lists from "../context/lists"

const NewDate = () => {

    //Estados para manejo de la UI
    const { messageApi, contextHolder } = useContext(AppContext)
    const [patientExist, setPatientExists] = useState(null)
    const [patientData, setPatientData] = useState()

    //Estados para recoleccion de informacion
    const [sex, setSex] = useState()
    const [birthDate, setBirthDate] = useState()
    const [date, setDate] = useState()
    const [doctorId, setDoctorId] = useState()
    const [idType, setIdType] = useState()
    const [race, setRace] = useState()

    //Comunicacion back end
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

    const saveDate = () => {
        if(patientExist == true){
            const data = {
                patientId: patientData.id,
                doctorId: doctorId,
                // date: 
            }
        }else if(patientExist == false){
            const id = document.getElementById("idField").value
            const name = document.getElementById("nameField").value
            const lastname = document.getElementById("lastnameField").value
            const sexField = sex
            const birthDateField = birthDate
            const birthPlace = document.getElementById("birthPlaceField").value
            const phone = document.getElementById("phoneField").value
            const municipality = document.getElementById("phoneField").value
            const city = document.getElementById("cityField").value
            const address = document.getElementById("addressField").value

            const data = {
                name: name,
                lastname: lastname,
                identificationType: idType,
                patientIdentification: id,
                // patientCode: number,
                phone: phone,
                sex: sex,
                // bloodType: number,
                birthDate: birthDate,
                birthPlace: birthPlace,
                religion: string,
                race: race,
                address: address,
                addressMunicipality: municipality,
                addressCity: city,
                emergencyName: string,
                emergencyPhone: string,
                emergencyRelationship: string,
                companionName: string,
                companionPhone: string,
                companionRelationship: string,
                instructionGrade: number,
                // ailments: number[],
                // idStudent: string,
                // idTeacher: string,
            }
        }
    }

    return(
        <div className="NewDate">
            <Divider>Agendar cita</Divider>
            <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                            <Select options={lists.identificationList.slice(0, 2)} style={{width: '150px'}}/>
                        </Form.Item>
                    </Space>
                    <Space>
                        <Form.Item label="Sexo">
                            <Select options={lists.sexList} style={{width: '150px'}}/>
                        </Form.Item>
                        <Form.Item label="Raza:">
                            <Select options={lists.raceList} style={{width: '150px'}}/>
                        </Form.Item>
                        <Form.Item label="Fecha de nacimiento">
                            <DatePicker style={{width: '150px'}}/>
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
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Telefono">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Relacion">
                            <Select options={lists.relationshipType} style={{width: '150px'}}/>
                        </Form.Item>                        
                    </Space>
                    <Divider>Datos del acompanante habitual</Divider>
                    <Space>
                        <Form.Item label="Nombre (Opcional)">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Telefono (Opcional)">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Relacion (Opcional)">
                            <Select options={lists.relationshipType} style={{width: '150px'}}/>
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
                            <Select style={{width: '150px'}}/>
                        </Form.Item>
                        <Form.Item label="Fecha:">
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item label="Hora:">
                            <DatePicker/>
                        </Form.Item>
                    </Space>

                    <Button variant="solid" color="primary" onClick={saveDate}>Registrar</Button>
                </>)}

            </Form>
        </div>
    )
}

export default NewDate;