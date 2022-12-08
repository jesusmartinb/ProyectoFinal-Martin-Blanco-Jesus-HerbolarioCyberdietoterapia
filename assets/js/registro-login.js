// Registro y login
// Variables
const openModalRegister = document.getElementById('open_modal_register');
const openModalRegister2 = document.getElementById('open_modal_register2');
const modalRegister = document.getElementById('modal-register');
const close = document.getElementById('close');
const closeLogin = document.getElementById('closeLogin');
const openModalLogin = document.getElementById('open_modal_loginb');
const modalLogin = document.getElementById('modal-login');
const formRegister = document.getElementById('form_register');
const formLogin = document.getElementById('form_login');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const usernameRegister = document.getElementById('username_modal_register');
const emailRegister = document.getElementById('email_modal_register');
const emailLogin = document.getElementById('email_modal_login')
const passwordRegister = document.getElementById('password_register');
const password2Register = document.getElementById('password2_register');
const passwordLogin = document.getElementById('password_login');
const direccion = document.getElementById('direccion');
const cp = document.getElementById('cp');
const ciudad = document.getElementById('ciudad');
const pais = document.getElementById('pais');
const provincia = document.getElementById('provincia');
const nif = document.getElementById('nif');
const phone = document.getElementById('phone');
const btnEnviar = document.getElementById('enviar');
const btnEntrar = document.getElementById('entrar');
const botonEnviar = document.getElementById('boton-enviar');
const botonEntrar = document.getElementById('boton-entrar');

// expresion regular para la validación del email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validación de fuerza de contraseña
let upperCase = false;
let lowerCase = false;
let number = false;
let symbol = false;
let caracter;

// expresion regular para la validacion del NIF
const nifRegExp = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
const str = "TRWAGMYFPDXBNJZSQVHLCKET";
let letraNifCorrecta = false;

// Registro del usuario
let usuarioId = 0;
let nifValidado = ''
let nameValidado = '';
let surnameValidado = '';
let usernameValidado = '';
let emailValidado = '';
let passwordValidado = '';
let direccionValidado = '';
let cpValidado = '';
let ciudadValidado = '';
let paisValidado = '';
let provinciaValidado = '';
let phoneValidado = '';
let admin = false;

let usuarioRegistrado = [];

// Event listeners
// Se abre la ventana de registro de cliente
openModalRegister.addEventListener('click', openRegister);
openModalRegister2.addEventListener('click', openRegister2);

// Cerrar ventana de registro de cliente y de login
close.addEventListener('click', closeWindow);
closeLogin.addEventListener('click', closeWindow);

// cambiar a ventana de login
openModalLogin.addEventListener('click', openLogin);

function eventListeners() {
	// campos del formulario
	name.addEventListener('blur', validarFormulario);
	surname.addEventListener('blur', validarFormulario);
	usernameRegister.addEventListener('blur', validarFormulario);
	emailRegister.addEventListener('blur', validarFormulario);
	emailLogin.addEventListener('blur', validarFormulario);
	passwordRegister.addEventListener('blur', validarFormulario);
	password2Register.addEventListener('blur', validarFormulario);
	passwordLogin.addEventListener('blur', validarFormulario);
	direccion.addEventListener('blur', validarFormulario);
	cp.addEventListener('blur', validarFormulario);
	ciudad.addEventListener('blur', validarFormulario);
	pais.addEventListener('blur', validarFormulario);
	provincia.addEventListener('blur', validarFormulario);
	nif.addEventListener('blur', validarFormulario);
	phone.addEventListener('blur', validarFormulario);
}

// registrar cliente y Entrada de cliente
formRegister.addEventListener('submit', registrarUsuario);
formLogin.addEventListener('submit', loginCliente);

// Mostramos el usuario regiistrado desde el localStorage
document.addEventListener('DOMContentLoaded', () => {
	usuarioRegistrado = JSON.parse(localStorage.getItem('usuario')) || [];
	if (usuarioRegistrado !== []) {
		mostrarUsuario(usuarioRegistrado);
	}
})


// Funciones
// Abre el modal register
function openRegister() {
	modalRegister.classList.add('show-modal');
	iniciar();
	eventListeners();
}

function closeWindow() {
	formRegister.reset();
	formLogin.reset();
	iniciar();

	modalRegister.classList.remove('show-modal');
	modalLogin.classList.remove('show-modal');
}

function openLogin() {
	closeWindow();

	modalLogin.classList.add('show-modal');
}

function openRegister2() {
	closeWindow();

	modalRegister.classList.add('show-modal');
}

// Inicia el formulario
function iniciar() {
	btnEnviar.disabled = true;
	btnEntrar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
	btnEntrar.classList.add('cursor-not-allowed', 'opacity-50');

	name.classList.remove('border-2', 'border-green-500');
	surname.classList.remove('border-2', 'border-green-500');
	usernameRegister.classList.remove('border-2', 'border-green-500');
	emailRegister.classList.remove('border-2', 'border-green-500');
	emailLogin.classList.remove('border-2', 'border-green-500');
	passwordRegister.classList.remove('border-2', 'border-green-500');
	password2Register.classList.remove('border-2', 'border-green-500');
	passwordLogin.classList.remove('border-2', 'border-green-500');
	direccion.classList.remove('border-2', 'border-green-500');
	cp.classList.remove('border-2', 'border-green-500');
	ciudad.classList.remove('border-2', 'border-green-500');
	pais.classList.remove('border-2', 'border-green-500');
	provincia.classList.remove('border-2', 'border-green-500');
	nif.classList.remove('border-2', 'border-green-500');
	phone.classList.remove('border-2', 'border-green-500');
}

// Mostrar errores de validación
function mostrarError(mensaje, referencia) {
	limpiarError(referencia);

	//Genera el mensaje de error en HTML
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

	referencia.appendChild(mensajeError);
}

// Limpiar los mensajes de error
function limpiarError(referencia) {
	//comprueba si ya existe un mensaje de error
	const error = referencia.querySelector('p.error');
	if (error) {
		error.remove();
	}
}

// Validación del nif
function validarNif(e) {

	if (e.target.id === 'nif') {
		let nifSinLetra = nif.value.slice(0, 8);
		let letraNif = nif.value.slice(8, 10).toUpperCase();

		if (letraNif === str.charAt(nifSinLetra % 23)) {
			// letra Nif correcto
			letraNifCorrecta = true;
		}

		if (nifRegExp.test(nif.value) && letraNifCorrecta) {
			limpiarError(e.target.parentElement);
			letraNifCorrecta = false;

			nif.classList.remove('border-2', 'border-red-500');
			nif.classList.add('border-2', 'border-green-500');
			return nif.value;
		} else {
			nif.classList.remove('border-2', 'border-green-500');
			nif.classList.add('border-2', 'border-red-500');

			mostrarError('NIF/NIE no válido', e.target.parentElement);
			return;
		}
	}
}

// Validar email
function validarEmail(e) {

	if (e.target.type === 'email') {

		if (er.test(e.target.value)) {
			// email válido
			limpiarError(e.target.parentElement);

			e.target.classList.remove('border-2', 'border-red-500');
			e.target.classList.add('border-2', 'border-green-500');
			return e.target.value;
		} else {
			e.target.classList.remove('border-2', 'border-green-500');
			e.target.classList.add('border-2', 'border-red-500');

			mostrarError('Email no válido', e.target.parentElement);
			return;
		}
	}
}

// Validar fuerza de la contraseña
function validarFuerzaPassword(e) {

	// https://es.wikipedia.org/wiki/ASCII#Caracteres_imprimibles_ASCII
	if (e.target.type === 'password') {

		for (let i = 0; i < e.target.value.length; i++) {
			caracter = e.target.value.charCodeAt(i);
			if (caracter >= 65 && caracter <= 90) {
				upperCase = true;
			} else if (caracter >= 97 && caracter <= 122) {
				lowerCase = true;
			} else if (caracter >= 48 && caracter <= 57) {
				number = true;
			} else {
				symbol = true;
			}
		}

		if (upperCase === true && lowerCase === true && number === true && symbol === true) {
			//fortaleza adecuada
			limpiarError(e.target.parentElement);

			e.target.classList.remove('border-2', 'border-red-500');
			e.target.classList.add('border-2', 'border-green-500');
			return e.target.value;
		} else {
			e.target.classList.remove('border-2', 'border-green-500');
			e.target.classList.add('border-2', 'border-red-500');

			mostrarError('Debe contener al menos un número, una letra mayúscula, una minúscula y un simbolo', e.target.parentElement);
			return;
		}
	}
}

// validar que las contraseñas coincidan
function validarPasswordsMatch(e) {
	if (e.target.id === 'password2_register') {
		if (passwordRegister.value === password2Register.value) {
			// passwords coinciden
			limpiarError(e.target.parentElement);

			password2Register.classList.remove('border-2', 'border-red-500');
			password2Register.classList.add('border-2', 'border-green-500');
		} else {
			password2Register.classList.remove('border-2', 'border-green-500');
			password2Register.classList.add('border-2', 'border-red-500');

			mostrarError('Las contraseñas no coinciden', e.target.parentElement);
			return;
		}
	}
}

// ValidarFormulario
function validarFormulario(e) {

	// validar obligatoriedad de todos los campos
	if (e.target.value.trim().length > 0) {
		// si hay algo escrito en los campos
		// Eliminamos los errores si los hay
		limpiarError(e.target.parentElement);

		e.target.classList.remove('border-2', 'border-red-500');
		e.target.classList.add('border-2', 'border-green-500');

	} else {
		e.target.classList.remove('border-2', 'border-green-500');
		e.target.classList.add('border-2', 'border-red-500');

		mostrarError('Todos los campos son obligatorios', e.target.parentElement);
		return;
	}

	validarNif(e);

	validarEmail(e);

	validarFuerzaPassword(e);

	validarPasswordsMatch(e);

	if ((name.value !== '') && (surname.value !== '') && (usernameRegister.value !== '') && (direccion.value !== '') && (cp.value !== '') && (ciudad.value !== '') && (pais.value !== '') && (provincia.value !== '') && (phone.value !== '') && (er.test(emailRegister.value)) && (upperCase === true && lowerCase === true && number === true && symbol === true) && (passwordRegister.value === password2Register.value) && (nifRegExp.test(nif.value) && !letraNifCorrecta)) {
		// Se supero la validación de todos los campos
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
		btnEnviar.classList.add('cursor-pointer');

		usuarioId = usuarios.length + 1;
		nifValidado = nif.value;
		nameValidado = name.value;
		surnameValidado = surname.value;
		usernameValidado = usernameRegister.value.toLowerCase();
		emailValidado = emailRegister.value.toLowerCase();
		passwordValidado = passwordRegister.value;
		direccionValidado = direccion.value;
		cpValidado = cp.value;
		ciudadValidado = ciudad.value;
		paisValidado = pais.value;
		provinciaValidado = provincia.value;
		phoneValidado = phone.value;
		admin = false;
	}

	if ((er.test(emailLogin.value)) && (upperCase === true && lowerCase === true && number === true && symbol === true)) {
		btnEntrar.disabled = false;
		btnEntrar.classList.remove('cursor-not-allowed', 'opacity-50');
		btnEntrar.classList.add('cursor-pointer');
	}
}


// Añadimos el nuevo usuario al array usuarios
function registrarUsuario(e) {
	e.preventDefault();

	const usuario = new Usuario(usuarioId, nifValidado, nameValidado, surnameValidado, usernameValidado, emailValidado, passwordValidado, direccionValidado, cpValidado, ciudadValidado, paisValidado, provinciaValidado, phoneValidado, admin);

	// Guardar el registro del usuario en el array usuarios
	usuarios.push(usuario);

	// Guardar el usuario registrado en localStorage
	usuarioRegistrado.push(usuario);
	sincronizarUsuarioStorage();

	const parrafo = document.createElement('p');
	parrafo.textContent = 'El registro se efectuó correctamente';
	parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

	botonEnviar.appendChild(parrafo);

	setTimeout(() => {
		parrafo.remove();
		formRegister.reset();

		iniciar();

		setTimeout(() => {
			closeWindow();
		}, 1000);

	}, 4000);

	return usuarios;
}

// Entrada de cliente
function loginCliente(e) {
	e.preventDefault();


	const parrafo = document.createElement('p');
	parrafo.textContent = 'Nos alegra volverte a ver...';
	parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

	botonEntrar.appendChild(parrafo);

	setTimeout(() => {
		parrafo.remove();
		formLogin.reset();

		iniciar();

		setTimeout(() => {
			closeWindow();
		}, 1000);

	}, 4000);

	// Entrada al área privada
	console.log('En zona privada...');

}

// Agregar el usuario registrado al LocalStorage
function sincronizarUsuarioStorage() {
	localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
	mostrarUsuario(usuarioRegistrado);
}

//
function mostrarUsuario(usuarios) {
	const nombreUsuario = document.querySelector('#nombre-usuario');

	const nombre = usuarios.map(usuario => usuario.name);
	nombreUsuario.textContent = nombre;
}
