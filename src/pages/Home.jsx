import { useContext } from 'react'
import { routerContext } from '../context/routerContext'
import React from 'react'

const Home = () => {
	const {view} = useContext(routerContext)

	return(
		<div className='Home'>
			<h1>Recepcion</h1>
			<h4>Seleccione una opcion en el menu lateral para empezar</h4>
		</div>
	)
}
export default Home