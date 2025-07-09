import React, { useState, useEffect } from "react";
import { List, Button, Tooltip, Input, DatePicker, Divider, Form } from 'antd'
import { FormOutlined, StopOutlined } from '@ant-design/icons'
import { getDates, getDatesByPatient, getDateByDate } from '../client/client'
import { EditDateModal, ConfirmCancelDate } from '../components/Modals'
import { mergeDate, getDate } from "../functions/formatDateTime";

const DateList = () => {

    const pruebas = []

    const [selectedDate, setSelectedDate] = useState()
    const [editModal, setEditModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [showList, setShowList] = useState(pruebas)
    const [firstLoad, setFirstLoad] = useState(false)
    useEffect(() => {
        getList()
    },[])

    const getList = async () => {
        const res = await getDates();
        setShowList(res.data);
    };

    async function searchById(e) {
        if(e.toString() == ''){
            getList()
            return
        }
        const res = await getDatesByPatient(e)
        setShowList(res.data)
    }

    async function searchByDate(e) {
        if(e == null){
            getList()
            return
        }
        const date = mergeDate(e)
        const res = await getDateByDate(date)
        setShowList(res.data)
    }

    return(
        <div className="DateList">
            <Divider>Listado de citas</Divider>
            <Form layout="horizontal" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Form.Item label="Filtrar por fecha">
                    <DatePicker selected={selectedDate} onChange={e => searchByDate(e)} dateFormat="YYYY-MM-DD"/>
                </Form.Item>
                <Form.Item label="Filtrar por cedula">
                    <Input.Search onSearch={e => searchById(e)}/>
                </Form.Item>
            </Form>
            <List bordered size="small">
                {showList.map(item => (
                    <List.Item key={item.dateId}>
                    <p>{getDate(item.date.toString())} - {('Paciente: ' + item.patientName + ' ' + item.patientLastname)} - {('Doctor: ' + item.doctorName + ' ' + item.doctorLastname)}</p>
                    <div className="Buttons">
                        <Tooltip onClick={() => {setSelectedDate(item); setEditModal(true)}} title="Editar cita">
                            <Button variant="solid" color="primary" icon={<FormOutlined />} shape="circle" size="large" />
                        </Tooltip>
                        <Tooltip onClick={() => {setSelectedDate(item); setCancelModal(true)}} title="Cancelar cita">
                            <Button variant="solid" color="danger" icon={<StopOutlined />} shape="circle" size="large" />
                        </Tooltip>
                    </div>
                </List.Item>))}
            </List>

            <ConfirmCancelDate
                open={cancelModal}
                rawData={selectedDate}
                onCancel={() => setCancelModal(false)}
            />

            <EditDateModal
                open={editModal}
                data={selectedDate}
                onCancel={() => setEditModal(false)}
            />
        </div>
    )
}

export default DateList;