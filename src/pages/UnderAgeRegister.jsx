import { Divider, Button, Form, Space, Input, DatePicker, Select, TimePicker, InputNumber } from 'antd'
import * as lists from '../context/lists'
import React, { useState, useEffect, useContext } from 'react'
import { getStudentList } from '../client/client'
import { appContext } from '../context/appContext'
import InputPhone from '../components/InputPhone'

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
    const [instructionGrade, setInstructionGrade] = useState()
    const [emergenciRelationship, setEmergencyRelationship] = useState()
    const [companionRelationship, setCompanionRelationship] = useState()
    const [doctorId, setDoctorId] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [representativeWorking, setRepresentativeWorking] = useState()

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

    const send = async() => {

    }

    return(
        <div className="UnderAgeRegister">
            {contextHolder}
            <Divider>Registrar menor de edad</Divider>
            <Form onFinish={send} style={{display: 'Flex', alignItems: 'center', flexDirection: 'column'}}>
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
                        <Select options={lists.sexList} onChange={()=>setSex(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    <Form.Item label="Raza:">
                        <Select options={lists.raceList} onChange={e=>setRace(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    { race == 4 && (<Form.Item label='Etnia:'>
                        <Select options={lists.ethnicityList} onChange={(e=>setEthnicity(e))} style={{width: '150px'}}/>
                    </Form.Item>) }
                    <Form.Item label="Grado de instruccion:">
                        <Select options={lists.instructionGradeList.slice(0,4)} onChange={e=>setInstructionGrade(e)} style={{width: '150px'}}/>
                    </Form.Item>
                    <Form.Item label="Estudia actualmente:">
                        <Select options={lists.listOfThree.slice(0,2)} style={{width: '80px'}}/>
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item label='Estado:'>
                        <Input id='stateField'/>
                    </Form.Item>
                    <Form.Item label='Municipio:'>
                        <Input id='municipalityField'/>
                    </Form.Item>
                    <Form.Item label='Ciudad:'>
                        <Input id='cityField'/>
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
                        <InputPhone />
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
                        <InputPhone/>
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
                        <InputPhone/>
                    </Form.Item>
                    <Form.Item label='Grado de instruccion:'>
                        <Select options={lists.instructionGradeList} style={{width: '150px'}}/>
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item label='Trabaja actualmente:'>
                        <Select
                            options={lists.listOfThree.slice(0,2)}
                            style={{width: '80px'}}
                            onChange={e=>setRepresentativeWorking(e)}/>
                    </Form.Item>
                    { representativeWorking == 1 &&
                        <Form.Item label="Ocupacion">
                            <Input id='workTypeField'/>
                        </Form.Item>
                    }
                    
                </Space>
                { representativeWorking == 1 && <>
                    <Space>
                        <Form.Item label='Telefono del trabajo:'>
                            <InputPhone />
                        </Form.Item>
                        <Form.Item label='Horario de trabajo:'>
                            <TimePicker.RangePicker                             
                                use12Hours
                                format="hh:mm a"
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item label='Direccion de trabajo:' layout='vertical'>
                        <Input.TextArea id='workAddressField' style={{width: '50vw'}} autoSize/>
                    </Form.Item>
                </> }
                <Divider>Vivienda</Divider>
                <Space>
                    <Form.Item label='Tipo de vivienda:'>
                        <Select options={lists.homeOwnership} style={{width: '150px'}}/>
                    </Form.Item>
                    <Form.Item label='Numero de habitaciones:'>
                        <InputNumber/>
                    </Form.Item>
                </Space>
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

                <Button variant='solid' color='primary' htmlType='submit'>Agendar cita</Button>
            </Form>
        </div>
    )
}

export default UnderAgeRegister;