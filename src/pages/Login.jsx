import { Form, Input, Button } from 'antd'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext' 
import { encrypt } from '../functions/hash'
import { login } from '../client/client'
import { routerContext } from '../context/routerContext'
import React from 'react'
import logofaco from '../assets/Logo_FacoLuz.png'
import logoluz from '../assets/Logo_LUZ.png'

const Login = () => {

	const [loading, setLoading] = useState(false)
	const {setView} = useContext(routerContext)
	const { messageApi, setUserData, setLogged, contextHolder } = useContext(appContext)

	const submitLogin = async () => {
		setLoading(true)
		const identification = document.getElementById('id').value
		const password = document.getElementById('password').value

		const data = {
			id: identification,
			passwordHash: await encrypt(password)
		}
		let res = await login(data)
		if(res.status == 200){
			setUserData(res.data)
			setLogged(true)
			setView('Home')
		}else{
			messageApi.open({
				type: 'error',
				content: res.response.data
			})
			setLoading(false)
		}

	}

	return(
		<div className='Login'>
			{contextHolder}
			<Form disabled={loading} className='loginForm' onFinish={submitLogin}>
				<div className='logos'>
					<img src={logoluz} className='logoluz'/>
					<img src={logofaco} className='logofaco'/>
				</div>
				<h1>Recepcion</h1>
				<h2>Iniciar sesion</h2>
				<Form.Item name='id'>
					<Input placeholder='Identificacion'/>
				</Form.Item>
				<Form.Item name='password'>
					<Input.Password placeholder='Contraseña'/>
				</Form.Item>

				<Button htmlType='submit'>Iniciar Sesion</Button>
			</Form>
		</div>
	)
}

export default Login