import React, { useState, useEffect, useContext } from "react";
import { List, Button, Tooltip, Input, DatePicker, Divider, Form } from 'antd'
import { FormOutlined, StopOutlined } from '@ant-design/icons'
import { getDates, getDatesByPatient, getDateByDate, getStudentList} from '../client/client'
import { EditDateModal, ConfirmCancelDate } from '../components/Modals'
import { mergeDate, getDate, getTime } from "../functions/formatDateTime";
import Pagination from "../components/Pagination"
import { appContext } from "../context/appContext";

const DateList = () => {

    const [doctorList, setStudentList] = useState()
    const [selectedDate, setSelectedDate] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [showList, setShowList] = useState([])
    const [page, setPage] = useState(1)
    const {messageApi} = useContext(appContext)
    
    useEffect(() => {
        getDatesList()
    }, [page])

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

    async function getDatesList() {
        const res = await getDates(page);
        if(res.status == 200){
            setShowList(res.data);
        }else{
            messageApi.open({
                type: "error",
                content: "error al obtener la lista de citas"
            })
        }
    };

    async function searchById() {
        const idInput = document.getElementById("idInput").value
        if(idInput.toString() == ''){
            getDatesList()
        }else{
            const res = await getDatesByPatient(idInput)
            if(res.status == 200){
                setShowList(res.data)
            }else{
                messageApi.open({
                    type: 'error',
                    content: 'error al obtener la lista de citas'
                })
            }
        }
    }

    async function searchByDate() {
        const dateInput = document.getElementById("dateInput").value
        console.log(dateInput)
        if(dateInput == null){
            getDatesList()
        }else{
            const date = mergeDate(dateInput)
            const res = await getDateByDate(date, page)
            if(res.status == 200){
                setShowList(res.data)        
            }else{
                messageApi.open({
                    type: 'error',
                    content: 'error al obtener la lista de citas'
                })
            }
        }
    }

    return(
        <div className="DateList">
            <Divider className="PageTitle"><h1>Listado de citas</h1></Divider>
            <Form layout="horizontal" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Form.Item label="Filtrar por fecha">
                    <DatePicker selected={selectedDate} onChange={() => searchByDate()} id="dateInput" dateFormat="YYYY-MM-DD"/>
                </Form.Item>
                <Form.Item label="Filtrar por cedula">
                    <Input.Search onSearch={() => searchById()} id="idInput"/>
                </Form.Item>
            </Form>
            <div className="listContainer Content">
                <List bordered size="small" className="mainList">
                    {showList.map(item => (
                        <List.Item key={item.dateId}>
                        <p>{getDate(item.date, false) + ' - ' + getTime(item.date)} - {('Paciente: ' + item.patientName + ' ' + item.patientLastname)} - {('Doctor: ' + item.doctorName + ' ' + item.doctorLastname)}</p>
                        <div className="Buttons">
                            <Tooltip onClick={() => {setSelectedDate(item); setEditModal(true)}} title="Editar cita">
                                <Button variant="solid" color="primary" icon={<FormOutlined />} shape="circle" size="large" />
                            </Tooltip>
                            <Tooltip onClick={() => {setSelectedDate(item); setCancelModal(true)}} title="Cancelar cita">
                                <Button variant="solid" color="danger" icon={<StopOutlined />} shape="circle" size="large" />
                            </Tooltip>
                        </div>
                    </List.Item>))}
                    <Pagination page={page} setPage={setPage}/>
                </List>
            </div>
            <div className="EmptyFooter"/>

            <ConfirmCancelDate
                open={cancelModal}
                id={selectedDate.dateId}
                onCancel={() => setCancelModal(false)}
                updateList={getDatesList}
            />

            <EditDateModal
                open={editModal}
                data={selectedDate}
                doctorList={doctorList}
                onCancel={() => setEditModal(false)}
                uptateList={getDatesList}
            />
        </div>
    )
}

export default DateList;