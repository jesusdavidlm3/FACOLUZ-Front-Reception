import { Divider, Button, Form, Space, Input, DatePicker, Select, TimePicker, InputNumber } from 'antd'
import * as lists from '../context/lists'
import React, { useState, useEffect, useContext } from 'react'
import { getStudentList, makeDate, makeChildHistory } from '../client/client'
import { mergeDateTime, getAge } from "../functions/formatDateTime";
import { appContext } from '../context/appContext'
import InputPhone from '../components/InputPhone'
import Title from 'antd/es/typography/Title'

const UnderAgeRegister = () => {

    //Estados para el manejo de la UI
    const [doctorList, setStudentList] = useState()
    const { messageApi, contextHolder } = useContext(appContext)
    const [loading, setLoading] = useState(false)

    //Estados para recoleccion de datos
    const [birthDate, setBirthDate] = useState()
    const [sex, setSex] = useState()
    const [race, setRace] = useState()
    const [ethnicity, setEthnicity] = useState(null)
    const [currentStudying, setCurrentStudying] = useState()
    const [instructionGrade, setInstructionGrade] = useState()
    const [emergenciRelationship, setEmergencyRelationship] = useState()
    const [companionRelationship, setCompanionRelationship] = useState(null)
    const [doctorId, setDoctorId] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [representativeWorking, setRepresentativeWorking] = useState()
    const [representativeInstructionGrade, setRepresentativeInstructionGrade] = useState()
    const [homeOwnership, setHomeOwnership] = useState()
    const [companionPhone, setCompanionPhone] = useState(null)
    const [emergencyPhone, setEmergencyPhone] = useState()
    const [representativePhone, setRepresentativePhone] = useState()
    const [representativeWorkPhone, setRepresentativeWorkPhone] = useState()

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
        setRace(null)
        setEthnicity(null)
        setRepresentativeWorking(null)
        setRepresentativeInstructionGrade(null)
        setEmergencyRelationship(null)
        setCompanionRelationship(null)
        setRepresentativePhone(null)
        setRepresentativeWorkPhone(null)
        setInstructionGrade(null)
        setCompanionPhone(null)
        setEmergencyPhone(null)
        setCurrentWorking(false)
        setHomeOwnership(null)
        setCurrentStudying(null)
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

    const send = async() => {
        try{
            const name = document.getElementById("nameField").value
            const lastname = document.getElementById("lastnameField").value
            //const childPosition = document.getElementById("childPositionField").value
            const addressState = document.getElementById("addressStateField").value
            const addressMunicipality = document.getElementById("addressMunicipalityField").value
            const addressCity = document.getElementById("addressCityField").value
            const birthPlace = document.getElementById("birthPlaceField").value
            const address = document.getElementById("addressField").value
            const companionName = document.getElementById("companionNameField").value || null
            const emergencyName = document.getElementById("emergencyNameField").value
            const representativeName = document.getElementById("representativeNameField").value
            const representativeId = document.getElementById("representativeIdField").value 
            let representativeWorkType = representativeWorking == 1 ? document.getElementById("representativeWorkTypeField").value : null
            //let representativeWorkAddress = representativeWorking == 1 ? document.getElementById("representativeWorkAddressField").value : null
            const representativeFamilyBurden = representativeWorking == 1 ?document.getElementById("representativeFamilyBurdenField").value : 0

            const historyData = {
                name: name,
                lastname: lastname,
                birthDate: birthDate != undefined ? (birthDate.$d):(null),
                //childPosition: childPosition,
                sex: sex,
                race: race,
                ethnicity: ethnicity,
                instructionGrade: instructionGrade,
                currentStudying: currentStudying,
                addressState: addressState,
                addressMunicipality: addressMunicipality,
                addressCity: addressCity,
                birthPlace: birthPlace,
                address: address,
                companionName: companionName,
                companionPhone: companionPhone,
                companionRelationship: companionRelationship,
                emergencyName: emergencyName,
                emergencyPhone: emergencyPhone,
                emergencyRelationship: emergenciRelationship,
                representativeName: representativeName,
                representativeId: representativeId,
                representativeInstructionGrade: representativeInstructionGrade,
                representativePhone: representativePhone,
                representativeWorking: representativeWorking,
                representativeWorkType: representativeWorkType,
                //representativeWorkAddress: representativeWorkAddress,
                representativeWorkPhone: representativeWorkPhone,
                representativeFamilyBurden: representativeFamilyBurden,
                homeOwnership: homeOwnership,
                idStudent: doctorId,
            }
            console.log(historyData)
            const historyRes = await makeChildHistory(historyData)
            console.log(historyRes)
            
            if(historyRes.status == 200){
                messageApi.open({
                    type: 'success',
                    content: 'Paciente registrado correctamente'
                })
                const dateData = {
                    patientId: historyRes.data.uuid,
                    doctorId: doctorId,
                    date: mergeDateTime(date, time)
                }
                const dateRes = await makeDate(dateData)
                if(dateRes.status == 200){
                    messageApi.open({
                        type: 'success',
                        content: 'Cita registrada'
                    })
                    setLoading(false)
                    cleanState()
                }else{
                    messageApi.open({
                        type: 'error',
                        content: 'error al registrar la cita'
                    })
                }
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'error al registrar el paciente'
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

    return(
        <div className="UnderAgeRegister">
            {contextHolder}
            <Title level={2} style={{textAlign: 'center'}}>Registro de pacientes menores de edad</Title>
            <Divider></Divider>
            <Form style={{display: 'Flex', alignItems: 'center', flexDirection: 'column'}}>
                <Space>
                    <Form.Item label="Nombre:">
                        <Input id='nameField'/>
                    </Form.Item>
                    <Form.Item label="Apellido:">
                        <Input id='lastnameField'/>
                    </Form.Item>
                    <Form.Item label="Fecha de nacimiento:">
                        <DatePicker onChange={e=>setBirthDate(e)}/>
                    </Form.Item>
                    <Form.Item label='Numero de hijo'>
                        <InputNumber controls={false} id='childPositionField'/>
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item label="Sexo:">
                        <Select options={lists.sexList} onChange={e=>setSex(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    <Form.Item label="Raza:">
                        <Select options={lists.raceList} onChange={e=>setRace(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    { race == 4 && (<Form.Item label='Etnia:'>
                        <Select options={lists.ethnicityList} onChange={e=>setEthnicity(e)} style={{width: '150px'}}/>
                    </Form.Item>) }
                    <Form.Item label="Grado de instruccion:">
                        <Select options={lists.instructionGradeList.slice(0,4)} onChange={e=>setInstructionGrade(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    <Form.Item label="Estudia actualmente:">
                        <Select options={lists.listOfThree.slice(0,2)} style={{width: '80px'}} onChange={e=>setCurrentStudying(e)}/>
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item label='Estado:'>
                        <Input id='addressStateField'/>
                    </Form.Item>
                    <Form.Item label='Municipio:'>
                        <Input id='addressMunicipalityField'/>
                    </Form.Item>
                    <Form.Item label='Ciudad:'>
                        <Input id='addressCityField'/>
                    </Form.Item>
                    <Form.Item label='Lugar de nacimiento:'>
                        <Input id='birthPlaceField'/>
                    </Form.Item>
                </Space>
                <Form.Item label='Direccion' layout='vertical'>
                    <Input.TextArea autoSize style={{width: '50vw'}} id='addressField'/>
                </Form.Item>
                <Divider>Datos del acompanante habitual</Divider>
                <Space>
                    <Form.Item label='Nombre:'>
                        <Input id='companionNameField'/>
                    </Form.Item>
                    <Form.Item label='Telefono:'>
                        <InputPhone setter={setCompanionPhone}/>
                    </Form.Item>
                    <Form.Item label='Relacion:'>
                        <Select options={lists.relationshipType} style={{width: '150px'}} onChange={e=>setCompanionRelationship(e)}/>
                    </Form.Item>
                </Space>
                <Divider>Datos del contacto de emergencia</Divider>
                <Space>
                    <Form.Item label='Nombre:'>
                        <Input id='emergencyNameField'/>
                    </Form.Item>
                    <Form.Item label='Telefono:'>
                        <InputPhone setter={setEmergencyPhone}/>
                    </Form.Item>
                    <Form.Item label='Relacion:'>
                        <Select options={lists.relationshipType} style={{width: '150px'}} onChange={e=>setEmergencyRelationship(e)}/>
                    </Form.Item>
                </Space>
                <Divider>Datos socio-economicos</Divider>
                <Space>
                    <Form.Item label='Nombre del representante:'>
                        <Input id='representativeNameField'/>
                    </Form.Item>
                    <Form.Item label='Cedula:'>
                        <InputNumber controls={false} id='representativeIdField'/>
                    </Form.Item>
                    <Form.Item label='Telefono'>
                        <InputPhone setter={setRepresentativePhone}/>
                    </Form.Item>
                    <Form.Item label='Grado de instruccion:'>
                        <Select options={lists.instructionGradeList} style={{width: '150px'}} onChange={e=>setRepresentativeInstructionGrade(e)}/>
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item label='Tipo de vivienda:'>
                        <Select
                            options={lists.homeOwnership}
                            style={{width: '150px'}}
                            onChange={e=>setHomeOwnership(e)}
                        />
                    </Form.Item>
                    <Form.Item label='Trabaja actualmente:'>
                        <Select
                            options={lists.listOfThree.slice(0,2)}
                            style={{width: '80px'}}
                            onChange={e=>setRepresentativeWorking(e)}/>
                    </Form.Item>
                    { representativeWorking == 1 &&
                        <Form.Item label="Ocupacion">
                            <Input id='representativeWorkTypeField'/>
                        </Form.Item>
                    }
                </Space>
                { representativeWorking == 1 && <>
                    <Space>
                        <Form.Item label='Telefono del trabajo:'>
                            <InputPhone setter={setRepresentativeWorkPhone}/>
                        </Form.Item>
                        <Form.Item label='Cargar familiar:'>
                            <InputNumber controls={false} id='representativeFamilyBurdenField'/>
                        </Form.Item>
                    </Space>
                    <Form.Item label='Direccion de trabajo:' layout='vertical'>
                        <Input.TextArea id='representativeWorkAddressField' style={{width: '50vw'}} autoSize/>
                    </Form.Item>
                </> }
                <Divider>Datos de la cita</Divider>
                <Space>
                    <Form.Item label='Doctor:'>
                        <Select options={doctorList} onChange={e=>setDoctorId(e)} style={{width: '250px'}}/>
                    </Form.Item>
                    <Form.Item label='Fecha:'>
                        <DatePicker
                            format="DD/MM/YYYY"
                            onChange={(a, b)=>setDate(a.$d)}
                        />
                    </Form.Item>
                    <Form.Item label='Hora:'>
                        <TimePicker
                            onChange={(a, b)=>setTime(a.$d)}
                            use12Hours
                            format="hh:mm a"
                        />
                    </Form.Item>
                </Space>

                <Button variant='solid' color='primary' htmlType='submit' onClick={send}>Agendar cita</Button>
            </Form>
        </div>
    )
}

export default UnderAgeRegister;