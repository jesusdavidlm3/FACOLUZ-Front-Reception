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
            closable={false}
            footer={[
                <Button variant='solid' color='danger' onClick={logout} >Cerrar sesion</Button>,
                <Button onClick={onCancel} variant='text' >Cancelar</Button>
            ]}
        >
        </Modal>
    )
}

export const ConfirmCancelDate = ({open, onCancel, dateId}) => {
    return(
        <Modal
            title="Cancelar cita?"
            open={open}
            closable={false}
            onCancel={onCancel}
            footer={[
                <Button color="primary" variant="solid">Cancelar cita</Button>,
                <Button color="primary" variant="solid" onClick={onCancel}>Salir</Button>
            ]}
        >
        </Modal>
    )
}

export const EditDateModal = ({open, onCancel, data}) => {

    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [doctorId, setDoctorId] = useState()

    const saveDate = () => {

    }

    return(
        <Modal
            title="Editar cita"
            open={open}
            onCancel={onCancel}
            closable={false}
            footer={[
                <Button variant="solid" color="primary" onClick={saveDate} >Guardar</Button>,
                <Button color="primary" variant="solid" onClick={onCancel}>Salir</Button>
            ]}
        >
            <Form>
                <Form.Item labe="Doctor: ">
                    <Select/>
                </Form.Item>
                <Space>
                    <Form.Item labe="Fecha: ">
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item labe="Hora: ">
                        <TimePicker/>
                    </Form.Item>
                </Space>
            </Form>
        </Modal>
    )
}