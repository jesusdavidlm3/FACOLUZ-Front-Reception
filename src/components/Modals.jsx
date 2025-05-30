import { Modal, Form, Select, DatePicker, TimePicker, Input, Space, InputNumber, Button, Steps } from "antd";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../context/appContext";
import * as lists from '../context/lists'
import React from 'react'
import { routerContext } from '../context/routerContext'

export const LogoutModal = ({open, onCancel}) => {

    const {setUserData, setLogged} = useContext(appContext)
    const {setView} = useContext(routerContext)

    const logout = () => {
        setUserData('')
        setLogged(false)
        setView('Login')
    }

    return(
        <Modal
            title='Cerrar sesion'
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='danger' onClick={logout} >Cerrar sesion</Button>,
                <Button onClick={onCancel} variant='text' >Cancelar</Button>
            ]}
        >
        </Modal>
    )
}

export const MakeDateModal = ({onCancel, open}) => {
    return(
        <Modal destroyOnClose title='Agendar cita' onCancel={onCancel} open={open}>
            <Form>
                <Form.Item name='patientIdField'>
                    <Input.Search placeholder="Cedula del paciente"/>
                </Form.Item>
                <Form.Item name='doctorField'>
                    <Input.Search placeholder="Seleccione doctor"/>
                </Form.Item>
                <Form.Item name='dateField' label='Seleccione una fecha:'>
                    <DatePicker/>
                </Form.Item>
                <Form.Item name='timeField' label='Seleccione la hora:'>
                    <TimePicker/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const BasicPatientRegisterModal = ({onCancel, open}) => {

    const [selectedPatientType, setSelectedPatientType] = useState(false)
    const [cedulado, setCedulado] = useState(0)
    const [selectedIdType, setSelectedIdType] = useState(false)

    return(
        <Modal destroyOnClose title='Registrar paciente' open={open} oncancel={onCancel}>
            <Form>
                <Space.Compact>
                    <Form.Item name='nameField'>
                        <Input placeholder="Nombre"/>
                    </Form.Item>
                    <Form.Item name='lastnameField'>
                        <Input placeholder="Apellido"/>
                    </Form.Item>
                </Space.Compact>
                <Form.Item label='Tipo de paciente'>
                    <Select
                        options={lists.patientTypeList}
                        onChange={(e) => {
                            setSelectedPatientType(e)
                            if(e == 0){
                                setCedulado(false)
                            }else{
                                setCedulado(true)
                            }
                        }} />
                </Form.Item>
                { selectedPatientType == 0 && 
                    <Form.Item>
                        <Select
                            placeholder='Tiene cedula?'
                            options={lists.trueFalseList}
                            onChange={(e) => {
                                setCedulado(e);
                                if(cedulado == false){
                                    setSelectedIdType(2)
                                }
                            }} />
                    </Form.Item>
                }

                <Space.Compact>
                { cedulado ? (
                    <>
                        <Form.Item>
                            <Select options={lists.identificationList.slice(0, 2)} placeholder='Tipo de identificacion' />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Numero"/>
                        </Form.Item>
                    </>
                ):(
                    <>
                        <Form.Item>
                            <Select options={lists.identificationList} placeholder='Tipo de identificacion' defaultValue='Codigo' disabled={true} />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Numero" disabled={true} />
                        </Form.Item>
                    </>
                ) }
                </Space.Compact>
                
                <Form.Item label='Fecha de nacimiento'>
                    <DatePicker />
                </Form.Item>
                <Form.Item label='Sexo'>
                    <Select options= {lists.sexList} />
                </Form.Item>
                <Form.Item>
                    <Input placeholder='Direccion' />
                </Form.Item>
                <Form.Item label='Grado de instruccion'>
                    <Select options={lists.instructionGradeList} />
                </Form.Item>
                <Form.Item label= 'Raza'>
                    <Select options={lists.raceList} />
                </Form.Item>
                <h3>Contacto de emergencia</h3>
                <Form.Item>
                    <Input placeholder='Nombre'/>
                </Form.Item>       
                <Form.Item>
                    <Input placeholder='Telefono'/>
                </Form.Item>  
            </Form>
        </Modal>
    )
}

export const CreateHistoryModal = ({open, onCancel}) => {

    //Campos principales
    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [patientType, setPatientType] = useState(null)
    const [cedulado, setCedulado] = useState(null)
    const [idType, setIdType] = useState(null)
    const [idNumber, setIdNumber] = useState(null)
    const [birthDate, setBirthDate] = useState(null)
    const [sex, setSex] = useState(null)
    const [address, setAddress] = useState(null)
    const [instructionGrade, setInstructionGrade] = useState(null)
    const [bloodType, setBloodType] = useState(null)
    const [proneToBleeding, setProneToBleeding] = useState(null)
    const [race, setRace] = useState(null)
    const [aliments, setAliments] = useState(null)
    const [otherAliments, setOtherAliments] = useState(null)
    const [emergencyName, setEmergencyName] = useState(null)
    const [emergencyPhone, setEmergencyPhone] = useState(null)


    //Campos Opcionales
    const [cardiovascularAffection, setCardiovascularAfecction] = useState(null)
    const [hematologicalDisorders, setHematologicalDisorders] = useState(null)
    const [kidneyDisease, setKidneyDisease] = useState(null) //Este es afecciones renales
    const [neurologicalAffection, setNeurologicalAffection] = useState(null)
    const [liverConditions, setLiverConditions] = useState(null) //Esta es afecciones hepaticas
    const [diabetes, setDiabetes] = useState(null)
    const [gastrointestinalDisorders, setGastrointestinalDisorders] = useState(null)
    const [herpes, setHerpes] = useState(null)
    const [VPH, setVPH] = useState(null)
    const [ETS, setETS] = useState(null)
    const [drugAlergies, setDrugAlergies] = useState(null) //Alergias a medicamentos


    //Campos de control 
    const [currentPhase, setCurrentPhase] = useState(0)


    //Funciones
    const submitHistory = () => {
        console.log('se envio la historia')
        const data = {
            name: name,
            lastname: lastname,
            patientType: patientType,
            idType: idType,
            idNumber: idNumber,
            birthDate: birthDate,
            sex: sex,
            address: address,
            instructionGrade: instructionGrade,
            bloodType: bloodType,
            proneToBleeding: proneToBleeding,
            race: race,
            aliments: aliments,
            otherAliments: otherAliments,
            emergencyName: emergencyName,
            emergencyPhone: emergencyPhone
        }
        console.log(data)
    }

    return(
        <Modal
            destroyOnClose={true}
            open={open}
            onCancel={() => {onCancel(); setCurrentPhase(0)}}
            title='Crear historia'
            footer={[
                <Button
                    variant='outlined'
                    color='danger'
                    onClick={() => {
                        if(currentPhase == 1){
                            setCurrentPhase(0)
                        }else{
                            setCurrentPhase(0)
                            onCancel()
                        }
                    }}
                >{currentPhase == 1 ? ('Volver'):('Cancelar')}</Button>,
                <Button
                    type='primary'
                    onClick={() => {
                        if(currentPhase == 1){
                            submitHistory()
                        }else{
                            setCurrentPhase(1)
                        }
                    }}
                >{currentPhase == 1 ? ('Guardar'):('Siguiente')}</Button>
            ]}
        >
            <Steps
                size='small'
                current={currentPhase}
                items={[{title: 'Datos personales'}, {title: 'Informacion medica'}]}
                style={{marginBottom: '15px'}}
            />
            <Form layout='vertical' >

                { currentPhase == 0 && 
                <>
                    <Space.Compact style={{width: '100%', display: 'flex'}} >
                    <Form.Item name='nameField' style={{width: '50%'}} >
                        <Input placeholder='Nombre' onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name='lastNameField' style={{width: '50%'}}>
                        <Input placeholder='Apellido' onChange={(e) => setLastname(e.target.value)}/>
                    </Form.Item>
                    </Space.Compact>
                    <Form.Item>
                        <Select
                            options={lists.patientTypeList}
                            placeholder='Tipo de paciente'
                            onChange={(e) => {
                                setPatientType(e);
                                if(e==0){
                                    setCedulado(false)
                                }else{
                                    setCedulado(true)
                                }
                            }} />
                    </Form.Item>
                    { patientType == 0 && 
                        <Form.Item>
                            <Select
                                placeholder='Tiene cedula?'
                                options={lists.trueFalseList}
                                onChange={(e) => {
                                    setCedulado(e);
                                    if(cedulado == false){
                                        setPatientType(2)
                                    }
                                }} />
                        </Form.Item>
                    }
                    <Space.Compact style={{width: '100%', display: 'flex'}} >
                        {cedulado ? (
                            <>
                                <Form.Item style={{width: '50%'}}>
                                    <Select
                                        options={lists.identificationList.slice(0, 2)}
                                        placeholder='Tipo de identificacion'
                                        defaultValue='V'
                                        onChange={(e) => setIdType(e.target.value)}
                                    />  
                                </Form.Item>
                                <Form.Item style={{width: '50%'}}>
                                    <Input placeholder="Numero" onChange={(e) => setIdNumber(e)}/>
                                </Form.Item>
                            </>
                        ):(
                            <>
                                <Form.Item style={{width: '50%'}}>
                                    <Select disabled={true} defaultValue='Codigo' />
                                </Form.Item>
                                <Form.Item style={{width: '50%'}}>
                                    <InputNumber disabled={true} />
                                </Form.Item>
                            </>
                        )}
                    </Space.Compact>
                    <Form.Item>
                        <DatePicker placeholder='Fecha de nacimiento' style={{width: '100%'}} onChange={(a, b) => setBirthDate(a)}/>
                    </Form.Item>
                    <Form.Item>
                        <Select options= {lists.sexList} placeholder='Sexo' onChange={(e) => setSex(e)}/>
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea autoSize={true} placeholder='Direccion'  onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Item>
                    { patientType == 0 ? (
                        <Form.Item>
                            <Select options={lists.instructionGradeList.slice(0, 4)} placeholder='Grado de instruccion' onChange={(e) => setInstructionGrade(e)}/>
                        </Form.Item>
                    ):(
                        <Form.Item>
                            <Select options={lists.instructionGradeList} placeholder='Grado de instruccion' onChange={(e) => setInstructionGrade(e)}/>
                        </Form.Item>
                    ) }
                </>
                }

                { currentPhase == 1 && 
                <>
                    <Space.Compact style={{width: '100%', display: 'flex'}} >
                    <Form.Item name='bloodType' style={{width: '50%'}}>
                        <Select options={lists.bloodTypeList} placeholder='tipo de sangre' onChange={(e) => setBloodType(e)}/>
                    </Form.Item>
                    <Form.Item name='proneToBleeding' style={{width: '50%'}}>
                        <Select options={lists.trueFalseList} placeholder='Propenso al sangrado' onChange={(e) => setProneToBleeding(e)}/>
                    </Form.Item>
                    </Space.Compact>
                    <Form.Item>
                        <Select options={lists.raceList} placeholder='Raza' onChange={(e) => setRace(e)}/>
                    </Form.Item>
                    <Form.Item>
                        <Select options={lists.alimentsList} placeholder='Padecimientos' mode='multiple' onChange={(e) => setAliments(e)} />   {/*Este debe ser de seleccion multiple*/}
                    </Form.Item>    

                    {/*Campos opcionales segun los padecimientos*/}
                    { aliments != null && aliments.includes(1) && <Form.Item>
                        <Input
                            placeholder='Afeccion cardiovascular'
                            onChange={(e) => setcardiovascularAffection(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(2) && <Form.Item>
                        <Input
                            placeholder='Afeccion hematologica'
                            onChange={(e) => setHematologicalDisorders(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(3) && <Form.Item>
                        <Input
                            placeholder='Afeccion renal'
                            onChange={(e) => setKidneyDisease(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(4) && <Form.Item>
                        <Input
                            placeholder='Afeccion neurologica'
                            onChange={(e) => setNeurologicalAffection(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(5) && <Form.Item>
                        <Input
                            placeholder='Afeccion hepatica'
                            onChange={(e) => setLiverConditions(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(6) && <Form.Item>
                        <Input
                            placeholder='Diabetes'
                            onChange={(e) => setDiabetes(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(7) && <Form.Item>
                        <Input
                            placeholder='Desordenes gastrointestinales'
                            onChange={(e) => setGastroIntestinalDisorders(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(11) && <Form.Item>
                        <Input
                            placeholder='Herpes'
                            onChange={(e) => setHerpes(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(13) && <Form.Item>
                        <Input
                            placeholder='VPH'
                            onChange={(e) => setVPH(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(14) && <Form.Item>
                        <Input
                            placeholder='ETS'
                            onChange={(e) => setETS(e)} />
                    </Form.Item> }
                    { aliments != null && aliments.includes(21) && <Form.Item>
                        <Input
                            placeholder='Alergia a medicamentos'
                            onChange={(e) => setDrugAlergies(e)} />
                    </Form.Item> }
                    {/*Final de campos opcionales segun los padecimientos*/}

                    <Form.Item>
                        <Input.TextArea autoSize={true} placeholder='Otros padecimientos' onChange={(e) => setOtherAliments(e)}/>
                    </Form.Item>  
                    <h4>Contacto de emergencia</h4>
                    <Space.Compact style={{width: '100%', display: 'flex'}} >
                        <Form.Item style={{width: '100%'}} >
                            <Input placeholder='Nombre' onChange={(e) => setEmergencyName(e.target.value)}/>
                        </Form.Item>       
                        <Form.Item style={{width: '100%'}} >
                            <Input placeholder='Telefono' onChange={(e) => setEmergencyPhone(e.target.value)}/>
                        </Form.Item>       
                    </Space.Compact>
                </>
                }
            </Form>
        </Modal>
    )
}