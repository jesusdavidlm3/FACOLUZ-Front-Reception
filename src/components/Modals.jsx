import { Modal, Form, Select, DatePicker, TimePicker, Input, Space, InputNumber, Button, Steps } from "antd";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../context/appContext";
import React from 'react'
import { routerContext } from '../context/routerContext'
import { editDate, cancelDate } from "../client/client";
import { getDate, getTime, mergeDate, mergeTime, mergeDateTime } from "../functions/formatDateTime";

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
            closable={false}
            footer={[
                <Button variant='solid' color='danger' onClick={logout} >Cerrar sesion</Button>,
                <Button onClick={onCancel} variant='text' >Cancelar</Button>
            ]}
        >
        </Modal>
    )
}

export const ConfirmCancelDate = ({open, onCancel, id, updateList}) => {
    const {messageApi} = useContext(appContext)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try{
            setLoading(true)
            let res = await cancelDate(id)
            if(res.status == 200){
                messageApi.open({
                    type: 'success',
                    content: 'Eliminado con exito'
                })
                setLoading(false)
                updateList()
                onCancel()
            }else{
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: 'ah ocurrido un error'
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
            <Modal
                title="¿Desea cancelar la cita?"
                open={open}
                closable={false}
                //onCancel={onCancel}
                footer={[
                    <Button disabled={loading} color="primary" variant="solid" onClick={handleDelete}>Cancelar cita</Button>,
                    <Button disabled={loading} color="primary" variant="solid" onClick={onCancel}>Salir</Button>
                ]}
            ></Modal>
        )
    
    
}

export const EditDateModal = ({open, onCancel, data, doctorList, uptateList}) => {
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [doctorId, setDoctorId] = useState()
    const {messageApi} = useContext(appContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            // defaultDateTime()
            setDoctorId(data.doctorId)
        }
    }, [data]);

    // const defaultDateTime = () => {
    //     const rawDate = getDate(data.date, true)
    //     setDate(rawDate)

    //     const rawTime = getTime(data.date)
    //     setTime(rawTime)
    // }

    const handleChangeDate = (value) => {
        const rawDate = value !== undefined ? mergeDate(value) : date
        setDate(rawDate)
        console.log(rawDate)
    }

    const handleChangeTime = (value) => {
        const rawTime = value !== undefined ? mergeTime(value) : time
        setTime(rawTime)
    }
    
    const handlesaveDate = async () => {
        try{
            const dateData = {
                id: data.dateId,
                date: mergeDateTime(date, time),
                doctorId: doctorId
            }
            setLoading(true)
            let res = await editDate(dateData)
            if(res.status == 200){
                messageApi.open({
                    type: 'success',
                    content: 'Cita cambiada con exito'
                })
                setLoading(false)
                uptateList()
                onCancel()
            }else{
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: 'ah ocurrido un error'
                })
            }
        }catch(err){
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: 'parece que algun dato esta incompleto'
            })
        }
    }

    return(
        <Modal
            destroyOnClose
            title="Cambiar cita"
            open={open}
            onCancel={onCancel}
            closable={false}
            footer={[
                <Button disabled={loading} variant="solid" color="primary" onClick={handlesaveDate} >Guardar</Button>,
                <Button disabled={loading} color="primary" variant="solid" onClick={onCancel}>Salir</Button>
            ]}
        >
            <Form>
                <Form.Item labe="Doctor: ">
                    <Select  value={doctorId} options={doctorList} onChange={e=>setDoctorId(e)}/>
                </Form.Item>
                <Space>
                    <Form.Item labe="Fecha: ">
                        <DatePicker
                            format="DD/MM/YYYY"
                            onChange={(a, b)=> handleChangeDate(a.$d)}
                        />
                    </Form.Item>
                    <Form.Item labe="Hora: ">
                        <TimePicker
                            onChange={(a, b)=>handleChangeTime(a.$d)}
                            use12Hours
                            format="hh:mm a"
                        />
                    </Form.Item>
                </Space>
            </Form>
        </Modal>
    )
}