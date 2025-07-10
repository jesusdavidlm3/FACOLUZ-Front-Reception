import { Modal, Form, Select, DatePicker, TimePicker, Input, Space, InputNumber, Button, Steps } from "antd";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../context/appContext";
import React from 'react'
import { routerContext } from '../context/routerContext'
import { cancelDate } from "../client/client";

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

export const ConfirmCancelDate = ({open, onCancel, id}) => {

    const {messageApi} = useContext(appContext)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        let res = await cancelDate(id)
        console.log(res)
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

export const EditDateModal = ({open, onCancel, data, doctorList}) => {

    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [doctorId, setDoctorId] = useState()
    

    const handlesaveDate = async () => {
        setLoading(true)
        let res = await editDate(data)
        console.log(res)
        if(res.status == 200){
            messageApi.open({
                type: 'success',
                content: 'Cita cambiada con exito'
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
    }

    return(
        <Modal
            title="Cambiar cita"
            open={open}
            onCancel={onCancel}
            closable={false}
            footer={[
                <Button variant="solid" color="primary" onClick={handlesaveDate} >Guardar</Button>,
                <Button color="primary" variant="solid" onClick={onCancel}>Salir</Button>
            ]}
        >
            <Form>
                <Form.Item labe="Doctor: ">
                    <Select options={doctorList} onChange={e=>setDoctorId(e)}/>
                </Form.Item>
                <Space>
                    <Form.Item labe="Fecha: ">
                        <DatePicker
                            format="DD/MM/YYYY"
                            onChange={(a, b)=>setDate(a.$d)}
                        />
                    </Form.Item>
                    <Form.Item labe="Hora: ">
                        <TimePicker
                            onChange={(a, b)=>setTime(a.$d)}
                            use12Hours
                            format="hh:mm a"
                        />
                    </Form.Item>
                </Space>
            </Form>
        </Modal>
    )
}