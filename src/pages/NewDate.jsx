import React, { useContext, useState, useEffect } from "react";
import { Divider, Form, Input, Select, DatePicker, Space, Button, TimePicker, InputNumber } from 'antd'
import { makeDate, makeAdultHistory, verifyPatientExist, getStudentList } from '../client/client'
import { appContext } from '../context/appContext'
import * as lists from "../context/lists"
import { mergeDateTime, getAge } from "../functions/formatDateTime";
import { LoadingOutlined } from "@ant-design/icons"
import { routerContext } from "../context/routerContext";
import InputPhone from '../components/InputPhone'

const NewDate = () => {

    //Estados para manejo de la UI
    const {setView} = useContext(routerContext)
    const { messageApi, contextHolder } = useContext(appContext)
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
    const [ethnicity, setEthnicity] = useState(null)
    const [emergencyRelation, setEmergencyRelation] = useState()
    const [companionRelation, setCompanionRelation] = useState(null)
    const [instructionGrade, setInstructionGrade] = useState()
    const [phone, setPhone] = useState()
    const [companionPhone, setCompanionPhone] = useState(null)
    const [emergencyPhone, setEmergencyPhone] = useState()
    const [currentWorking, setCurrentWorking] = useState(false)
    const [homeOwnership, setHomeOwnership] = useState()

    //Comunicacion back end
    useEffect(() => {
        getList()
    }, [])

    function cleanState(){
        setSex(null)
        setBirthDate(null)
        setDate(null)
        setTime(null)
        setDoctorId(null)
        setIdType(null)
        setRace(null)
        setEthnicity(null)
        setEmergencyRelation(null)
        setCompanionRelation(null)
        setInstructionGrade(null)
        setPhone(null)
        setCompanionPhone(null)
        setEmergencyPhone(null)
        setCurrentWorking(false)
        setHomeOwnership(null)
    }

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

    async function verifyPatient(){
        const id = document.getElementById("idField").value
        if(id.length > 0){
            const res = await verifyPatientExist(id)
            console.log(res)
            if(res.status == 200){
                setPatientExists(true)
                setPatientData(res.data[0])
            }else if(res.status == 404){
                setPatientExists(false)
            }else{
                console.log(res)
                messageApi.open({
                    type: "error",
                    content: "ah ocurrido un error"
                })
            }
        } else{
            messageApi.open({
                type: "info",
                content: "Debe ingresar una cedula o codigo de un paciente"
            })
        }
    }

    const saveDate = async() => {
        setLoading(true)
        if(patientExist == true){
            const data = {
                patientId: patientData.id,
                doctorId: doctorId,
                date: mergeDateTime(date, time)
            }

            const res = await makeDate(data)
            if(res.status == 200){
                messageApi.open({
                    type: 'success',
                    content: "Cita registrada"
                })
                setLoading(false)
                setPatientExists(null)
            }else{
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: "error al registrar la cita"
                })
            }
        }else if(patientExist == false){
            try{
                const id = document.getElementById("idField").value
                const name = document.getElementById("nameField").value
                const lastname = document.getElementById("lastnameField").value
                const birthPlace = document.getElementById("birthPlaceField").value
                //const childPosition = document.getElementById("childPositionField").value
                const state = document.getElementById("addressStateField").value
                const municipality = document.getElementById("addressMunicipalityField").value
                const city = document.getElementById("addressCityField").value
                const address = document.getElementById("addressField").value
                const emergencyName = document.getElementById("emergencyNameField").value
                const companionName = document.getElementById("companionNameField").value || null
                let workType = currentWorking == 1 ? (document.getElementById("workTypeField").value):(null)
                let familyBurden = currentWorking == 1 ? (document.getElementById("familyBurdenField").value):(0)

                const historyData = {
                    patientIdentification: id,
                    name: name,
                    lastname: lastname,
                    identificationType: idType,
                    birthDate: birthDate != undefined ? (birthDate.$d):(null),
                    sex: sex,
                    race: race,
                    instructionGrade: instructionGrade,
                    phone: phone,
                    birthPlace: birthPlace,
                    //childPosition: childPosition,
                    ethnicity: ethnicity,
                    addressState: state,
                    addressMunicipality: municipality,
                    addressCity: city,
                    address: address,
                    emergencyName: emergencyName,
                    emergencyPhone: emergencyPhone,
                    emergencyRelationship: emergencyRelation,
                    companionName: companionName,
                    companionPhone: companionPhone,
                    companionRelationship: companionRelation,
                    idStudent: doctorId,
                    workType: workType,
                    familyBurden: familyBurden,
                    currentWorking: currentWorking,
                    homeOwnership: homeOwnership
                }

                console.log(historyData)

                const historyRes = await makeAdultHistory(historyData)
                if(historyRes.status == 200){
                    messageApi.open({
                        type: 'success',
                        content: "Paciente registrado"
                    })
                    const dateData = {
                        patientId: historyRes.data.uuid,
                        doctorId: doctorId,
                        date: mergeDateTime(date, time)
                    }
                    console.log(dateData)
                    const dateRes = await makeDate(dateData)
                    if(dateRes.status == 200){
                        messageApi.open({
                            type: 'success',
                            content: "Cita registrada"
                        })
                        setLoading(false)
                        setPatientExists(null)
                        cleanState()
                    }else{
                        setLoading(false)
                        verifyPatient()
                        messageApi.open({
                            type: 'error',
                            content: "error al registrar la cita"
                        })
                    }
                }else{
                    setLoading(false)
                    messageApi.open({
                        type: 'error',
                        content: "error al registrar al paciente"
                    })
                }
            }catch(err){
                console.log(err)
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: 'parece que algun dato esta incompleto'
                })
            }
        }
    }

    return(
        <div className="NewDate">
            {contextHolder}
            <Divider>Agendar cita</Divider>
            <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} disabled={loading}>
                <Space>
                    <Form.Item label="Cedula o codigo de Paciente" style={{margin: '0'}}>
                        <Input.Search onSearch={e => verifyPatient(e)} id="idField"/>
                    </Form.Item>
                    <Button onClick={()=>setView("UnderAgeRegister")} variant="solid" color="primary">Registrar menor de edad</Button>
                </Space>
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
                        { race == 4 && <Form.Item label="Etnia">
                            <Select options={lists.ethnicityList} style={{width: '150px'}} onChange={e=>setEthnicity(e)}/>
                        </Form.Item> }
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
                            <InputPhone setter={setPhone}/>
                        </Form.Item>
                        <Form.Item label="Lugar de nacimiento">
                            <Input id="birthPlaceField"/>
                        </Form.Item>
                        
                    </Space>
                    <Space>
                        <Form.Item label="Estado:">
                            <Input id="addressStateField" />
                        </Form.Item>
                        <Form.Item label="Municipio:">
                            <Input id="addressMunicipalityField" />
                        </Form.Item>
                        <Form.Item label="Ciudad:">
                            <Input id="addressCityField" />
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
                            <InputPhone setter={setEmergencyPhone} />
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
                            <InputPhone setter={setCompanionPhone}/>
                        </Form.Item>
                        <Form.Item label="Relacion (Opcional)">
                            <Select
                                options={lists.relationshipType}
                                style={{width: '150px'}}
                                onChange={e=>setCompanionRelation(e)}    
                            />
                        </Form.Item>                        
                    </Space>
                    <Divider>Datos Socio economicos</Divider>
                    <Space>
                        <Form.Item label="Tipo de vivienda">
                            <Select style={{width: '150px'}} options={lists.homeOwnership} onChange={e=>setHomeOwnership(e)}/>
                        </Form.Item>
                        <Form.Item label="Trabaja actualmente:">
                            <Select style={{width: '150px'}} options={lists.listOfThree.slice(0,2)} onChange={e=>setCurrentWorking(e)}/>
                        </Form.Item>
                        { currentWorking == 1 && <>
                            <Form.Item label='Ocupacion:'>
                                <Input style={{width: '150px'}} id="workTypeField"/>
                            </Form.Item>
                            <Form.Item label="Carga Famliar">
                                <InputNumber style={{width: '150px'}} controls={false} id="familyBurdenField" />
                            </Form.Item>
                        </> }
                    </Space>

                </>)}
                {(patientExist != null && patientExist == true) && (<>
                    <h3>Nombre: {`${patientData.name} ${patientData.lastname}`}</h3>
                    <h3>Contacto de emergencia: {patientData.emergencyName} {`(${patientData.emergencyPhone})`}</h3>
                    {patientData.companionName != null && <h3>Acompanante habitual: {patientData.companionName} {`(${patientData.companionPhone})`}</h3>}
                    <h3>Edad: {getAge(patientData.birthDate)}</h3>

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