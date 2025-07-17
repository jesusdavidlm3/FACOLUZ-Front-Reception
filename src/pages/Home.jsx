import { useContext } from 'react'
import { routerContext } from '../context/routerContext'
import React from 'react'

const Home = () => {
	const {view} = useContext(routerContext)

	return(
		<div className='HomePage'>
			<div className='BackgroundPage'>
				<h1>Bienvenido al modulo de Recepcion</h1>
				<h3>
					En este modulo podra gestionar citas de pacientes, tambien podra
					cancelar y reagendar citas ademas de crear historias clinicas para los nuevos pacientes.
				</h3>
				<h3>Para empezar seleccione una opcion del menu en la barra de navegacion</h3>
			</div>
			<h4>Todos los derechos reservados 2025© Universidad del Zulia, Facultad de odontologia, Departamento de T.I.C.</h4>
		</div>
	)
}
export default Home