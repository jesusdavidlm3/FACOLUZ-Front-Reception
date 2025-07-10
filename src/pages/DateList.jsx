import React, { useState, useEffect } from "react";
import { List, Button, Tooltip, Input, DatePicker, Divider, Form } from 'antd'
import { FormOutlined, StopOutlined } from '@ant-design/icons'
import { getDates, getDatesByPatient, getDateByDate, cancelDate } from '../client/client'
import { EditDateModal, ConfirmCancelDate } from '../components/Modals'
import { mergeDate, getDate } from "../functions/formatDateTime";

const DateList = () => {

    const l = []
    const [doctorList, setStudentList] = useState()
    const [selectedDate, setSelectedDate] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [showList, setShowList] = useState(l)
    
    useEffect(() => {
        getList()
        getDatesList()
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

    async function getDatesList() {
        const res = await getDates();
        setShowList(res.data);
    };

    async function searchById(e) {
        if(e.toString() == ''){
            getDatesList()
            return
        }
        const res = await getDatesByPatient(e)
        setShowList(res.data)
    }

    async function searchByDate(e) {
        if(e == null){
            getDatesList()
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
                id={selectedDate.dateId}
                onCancel={() => setCancelModal(false)}
            />

            <EditDateModal
                open={editModal}
                data={selectedDate}
                doctorList={doctorList}
                onCancel={() => setEditModal(false)}
            />
        </div>
    )
}

export default DateList;