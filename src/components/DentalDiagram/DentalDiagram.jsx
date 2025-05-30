import React from 'react'
import { Button } from 'antd'
import './style.scss'

const DentalDiagram = ({children, saveData}) => {

    const adultPieces = [
        18, 17, 16, 15, 14, 13, 12, 11,
        21, 22, 23, 24, 25, 26, 27, 28,
        31, 32, 33, 34, 35, 36, 37, 38,
        48, 74, 46, 45, 44, 43, 42, 41
    ]

    const childrenPieces = [
        55, 54, 53, 52, 51,
        61, 62, 63, 64, 65,
        71, 72, 73, 74, 75,
        85, 84, 83, 82, 81
    ]
    
    const setResult = () => {
        let adultData = []
        let childrenData = []
        adultPieces.forEach(tooth => {
            for(let i = 0; i >= 4; i++){
                adultData.push(document.getElementById(`tooth_${tooth}_area_${i}`).checked)
            }
        })

        if(children){
            childrenPieces.forEach(tooth => {
                for(let i = 0; i >= 4; i++){
                    childrenData.push(document.getElementById(`tooth_${tooth}_area_${i}`).checked)
                }
            })
        }

        const data = {
            adult: adultData,
            children: childrenData
        }

        saveData(data)
    }

    return(
        <div className='dental_diagram'>
            <div className='diagram_container'>
                {children ? (<h1>Dientes permanentes</h1>):(<h1>Odontograma</h1>)}
                {adultPieces.map(tooth => (
                    <div className='visual_tooth_container'>
                        {[...Array(5)].map(i => {
                            const isChecked = document.getElementById(`tooth_${tooth}_area_${i}`)
                            let divActive = 'false'; //puede ser necesario cambiarlo por un useState si no renderiza cambios
                            
                            return(<>
                                <input type='checkbox' className='dental_diagram_checkbox' id={`tooth_${tooth}_area_${i}`}/>
                                {i + 1 == 1 && <div className={`visual_checkbox_dental_diagram_0 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                {i + 1 == 2 && <div className={`visual_checkbox_dental_diagram_1 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                {i + 1 == 3 && <div className={`visual_checkbox_dental_diagram_2 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                {i + 1 == 4 && <div className={`visual_checkbox_dental_diagram_3 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                {i + 1 == 5 && <div className={`visual_checkbox_dental_diagram_4 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                            </>)})}
                    </div>
                ))}
            </div>

            {children && <>
                <h1>Dientes temporales</h1>
                <div className='diagram_container'>
                    {childrenPieces.map(tooth => (
                        <div className='visual_tooth_container'>
                            {[...Array(5)].map(i => {
                                const isChecked = document.getElementById(`tooth_${tooth}_area_${i+1}`)
                                let divActive = 'false'; //puede ser necesario cambiarlo por un useState si no renderiza cambios
                                
                                return(<>
                                    <input type='checkbox' className='dental_diagram_checkbox' id={`tooth_${tooth}_area_${i+1}`}/>
                                    {i + 1 == 1 && <div className={`visual_checkbox_dental_diagram_0 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                    {i + 1 == 2 && <div className={`visual_checkbox_dental_diagram_1 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                    {i + 1 == 3 && <div className={`visual_checkbox_dental_diagram_2 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                    {i + 1 == 4 && <div className={`visual_checkbox_dental_diagram_3 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                    {i + 1 == 5 && <div className={`visual_checkbox_dental_diagram_4 ${divActive}`} onClick={() => {isChecked.checked = !isChecked.checked; if(divActive == 'true'){divActive = 'false'}else{divActive=='false'}} } />}
                                </>)})}
                        </div>
                    ))}
                </div>
            </>}
            <Button variant='solid' color='primary' onClick={setResult}>Guardar</Button>
        </div>
    )
}

export default DentalDiagram;