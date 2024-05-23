import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm';

export const LoginPage = () => {
	const navigate = useNavigate();

	const {username, password, onInputChange, onResetForm } =
		useForm({
			username: '',
			password: '',
		});

		const onLogin = e => {
			e.preventDefault();
		  
			const credenciales = { username, password };
		  
			fetch("http://localhost:8080/login", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify(credenciales)
			})
			  .then(response => response.json())
			  .then(data => {
				if (data.token) {
				  localStorage.setItem('token', data.token); // Almacena el token en localStorage
				  localStorage.setItem('rol',data.rol)
		  
				  navigate('/dashboard', {
					replace: true,
					state: {
					  logged: true,
					  name,
					},
				  });
		  
				  onResetForm();
				} else {
				  console.log("usuario incorrecto");
				}
			  })
			  .catch(error => {
				console.log(error);
			  });
		  };
		  

	return (
		<div className='wrapper'>
			<form onSubmit={onLogin}>
				<h1>Iniciar Sesión</h1>

				<div className='input-group'>
					<input
						type='text'
						name='username'
						id='username'
						value={username}
						onChange={onInputChange}
						required
						autoComplete='off'/>
					<label htmlFor='username'>username:</label>
				</div>
				<div className='input-group'>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					<label htmlFor='password'>Contraseña:</label>
				</div>

				<button>Entrar</button>
			</form>
		</div>
	);
};
