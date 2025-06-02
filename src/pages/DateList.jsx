import React, { useState } from "react";
import { List, Button, Tooltip, Input, DatePicker, Divider, Form } from 'antd'
import { FormOutlined, StopOutlined } from '@ant-design/icons'
import { EditDateModal, ConfirmCancelDate } from '../components/Modals'

const DateList = () => {

    const pruebas = [
        {id: "55", doctorName: "Juan Patricio", patientName: "Horacio Wilbur", date: Date.now()},
        {id: "44668", doctorName: "Bob Esponja", patientName: "Patricio Estrella", date: Date.now()},
        {id: "35343", doctorName: "Patricio Estrella", patientName: "Bob Esponja", date: Date.now()},
        {id: "3984398", doctorName: "Horacio Wilbur", patientName: "Juan Patricio", date: Date.now()}
    ]

    const [selectedDate, setSelectedDate] = useState()
    const [editModal, setEditModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)

    const [showList, setShowList] = useState(pruebas)

    const searchById = (e) => {

    }

    const searchByDate = (e) => {

    }

    return(
        <div className="DateList">
            <Divider>Listado de citas</Divider>
            <Form layout="horizontal" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Form.Item label="Filtrar por fecha">
                    <DatePicker onChange={e => searchByDate(e)}/>
                </Form.Item>
                <Form.Item label="Filtrar por cedula">
                    <Input.Search onSearch={e => searchById(e)}/>
                </Form.Item>
            </Form>
            <List bordered size="small">
                {showList.map(item => (<List.Item key={item.id}>
                    <p>{Date(item.date).toString()} - {item.doctorName} - {item.patientName}</p>
                    <div className="Buttons">
                        <Tooltip title="Editar cita">
                            <Button variant="solid" color="primary" icon={<FormOutlined />} shape="circle" size="large" onClick={() => setEditModal(true)}/>
                        </Tooltip>
                        <Tooltip title="Cancelar cita">
                            <Button variant="solid" color="danger" icon={<StopOutlined />} shape="circle" size="large" onClick={() => setCancelModal(true)}/>
                        </Tooltip>
                    </div>
                </List.Item>))}
            </List>

            <ConfirmCancelDate
                open={cancelModal}
                dateId={selectedDate}
                onCancel={() => setCancelModal(false)}
            />

            <EditDateModal
                open={cancelModal}
                data={selectedDate}
                onCancel={() => setEditModal(false)}
            />
        </div>
    )
}

export default DateList;