// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const finalizarPedidoBtn = document.querySelector('#finalizar-pedido');
const listaProductos = document.querySelector('#lista-productos');
const finalizarPedido = document.querySelector('#finalizar-pedido');
let articulosCarrito = [];
let totalCompra = 0;

let btnMas;
let btnMenos;


//Listeners
cargarEventListeners();
function cargarEventListeners() {
	// Cuando se agrega un producto presionando botón "Añadir al Carrito"
	listaProductos.addEventListener('click', agregarProducto);

	// Elimina productos del carrito
	carrito.addEventListener('click', eliminarProducto);

	// Muestra los productos de LocalStorage
	document.addEventListener('DOMContentLoaded', () => {
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

		carritoHTML(rate, currencySymbol);
		actualizarTotalesCarrito(articulosCarrito, rate);

	})

	// Vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		// SweetAlert
		Swal.fire({
			title: '¿Está Usted Seguro?',
			text: "No podrá desacer el cambio!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Vaciar el Carrito!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Eliminados!',
					'Sus Productos han sido Borrrados',
					'success'
				)
				// reseteamos en memoria la cantidad para los productos del carrito
				articulosCarrito.map(articuloCarrito => articuloCarrito.cantidad = 1);

				// reseteamos el arreglo
				articulosCarrito = [];

				localStorage.removeItem('carrito');

				// Eliminamos todo el HTML del tbody del carrito
				limpiarHTMLCarrito();

				// Actualizamos el total del carrito
				actualizarTotalesCarrito(articulosCarrito, rate);
			}
		})

	})

	finalizarPedido.addEventListener('click', () => {
		if (articulosCarrito !== [] && localStorage.getItem('usuario')) {
			procesoCompra(totalCompra);
		} else {
			openRegister();
		}
	});
}


// Funciones
function agregarProducto(e) {
	e.preventDefault();

	// Evitamos el event bubbling
	if (e.target.classList.contains('agregar-carrito')) {
		const idProductoSeleccionado = Number(e.target.dataset.id);

		// Recuperamos el objeto del producto seleccionado
		const productoSeleccionado = productos.find(producto => producto.productoId === idProductoSeleccionado);

		leerDatosProducto(productoSeleccionado);
	}
}

// Elimina un producto del carrito
function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-producto')) {
		const id = Number(e.target.getAttribute('data-id'));

		// SweetAlert
		Swal.fire({
			title: '¿Está Usted Seguro?',
			text: "No podrá desacer el cambio!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminarlo!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Borrado!',
					'Su Producto ha sido Eliminado',
					'success'
				)
				// Reiniciar en memoria la cantidad de producto a eliminar a 1
				const articuloAEliminar = articulosCarrito.filter(productoCarrito => productoCarrito.productoId === id);
				articuloAEliminar.map(productoAEliminar => productoAEliminar.cantidad = 1);

				// Eliminar del arreglo de articulosCarrito por el data-id
				articulosCarrito = articulosCarrito.filter(productoCarrito => productoCarrito.productoId !== id);

				// Actualizamos el total del carrito
				actualizarTotalesCarrito(articulosCarrito, rate);

				carritoHTML(rate, currencySymbol); // Iterar sobre el carrito y mostrar su HTML
			}
		})

	}
}

// Lee el contenido del HTML del card producto en el que hacemos click y extrae la información del producto
function leerDatosProducto(producto) {

	// Destructuring del producto
	const { preciobaseeu, descuento, productoId } = producto;

	// Cálculo del precio producto en función preciobase en euros y el descuento
	let precioFinal = (preciobaseeu - ((preciobaseeu * descuento) / 100)).toFixed(2);
	producto.preciofinal = precioFinal;

	// Revisa si un elemento ya existe en el carrito
	const existe = articulosCarrito.some(productoCarrito => productoId === productoCarrito.productoId);
	if (existe) {
		// Actualizamos la cantidad
		const productosCarrito = articulosCarrito.map(productoCarrito => {
			if (productoId === productoCarrito.productoId) {
				productoCarrito.cantidad++;
				return productoCarrito; // retorna el objeto actualizado
			} else {
				return productoCarrito; // retorna los objetos que no son duplicados
			}
		});
		articulosCarrito = [...productosCarrito];
	} else {
		// Agrega elementos al arreglo de carrito
		articulosCarrito = [...articulosCarrito, producto];
	}

	carritoHTML(rate, currencySymbol);
	actualizarTotalesCarrito(articulosCarrito, rate);
}

// Muestra el carrito de compras en el HTML
function carritoHTML(rate, currencySymbol) {
	// Limpia el HTML previo
	limpiarHTMLCarrito();

	// Recorre el carrito y genera el HTML
	articulosCarrito.forEach(productoCarrito => {
		// se aplica destructuring
		const { imagen, nombre, preciofinal, cantidad, productoId } = productoCarrito;

		const row = document.createElement('tr');
		row.innerHTML = `
		<td>
			<img class="ml-8" src="${imagen}" width="100" alt="">
		</td>
		<td>
			${nombre}
		</td>
		<td>
			${(preciofinal * (rate ? rate : 1)).toFixed(2)} ${currencySymbol ? currencySymbol : '€'}
		</td>
		<td>
			<button class="btn-mas border rounded text-white bg-orange-500 p-3">+</button>
			<span class="cantidadProducto" data-id="${productoId}">${cantidad}</span>
			<button class="btn-menos border rounded text-white bg-orange-500 p-3">-</button>
		</td>
		<td>
			<a href="#" class="borrar-producto border rounded p-3 text-white bg-red-600" data-id="${productoId}">Eliminar</a>
		</td>
		`;

		// Agrega el HTML al carrito en el tbody
		contenedorCarrito.appendChild(row);
	});

	modificarCantidadProducto();

	// Agregar el carrito de compras al LocalStorage
	sincronizarCarritoStorage();

}

function sincronizarCarritoStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Actualiza el contador de cantidad de producto
const actualizarContador = (element, contador) => {
	element.textContent = contador;

	const id = Number(element.dataset.id);
	const existe = articulosCarrito.some(productoCarrito => id === productoCarrito.productoId);

	if (existe) {
		// Actualizamos la cantidad
		const productosCarrito = articulosCarrito.map(productoCarrito => {
			if (id === productoCarrito.productoId) {
				productoCarrito.cantidad = element.textContent;
				return productoCarrito; // retorna el objeto actualizado
			} else {
				return productoCarrito; // retorna los objetos que no son duplicados
			}
		});
		articulosCarrito = [...productosCarrito];
	}
	sincronizarCarritoStorage();
	actualizarTotalesCarrito(articulosCarrito, rate);
}

// Modifica la cantidad de Producto
function modificarCantidadProducto() {
	btnMas = document.querySelectorAll('.btn-mas');
	btnMenos = document.querySelectorAll('.btn-menos');

	let contador;
	btnMas.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			contador = e.target.nextElementSibling.textContent;
			contador++;
			actualizarContador(e.target.nextElementSibling, contador);
		});
	});

	btnMenos.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			contador = e.target.previousElementSibling.textContent;
			if (contador > 1) {
				contador--;
				actualizarContador(e.target.previousElementSibling, contador);
			}
		});
	});
}

// Elimina los cursos de tbody
function limpiarHTMLCarrito() {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

// Actualiza totales del carrito
const actualizarTotalesCarrito = (articulosCarrito, rate) => {
	totalCompra = articulosCarrito.reduce((acc, productoCarrito) => acc + ((productoCarrito.preciofinal * (rate ? rate : 1)) * productoCarrito.cantidad), 0).toFixed(2);

	pintarTotalesCarrito(totalCompra);
	sincronizarCarritoStorage();
};

// Muestra el total de la compra en el carrito
const pintarTotalesCarrito = (totalCompra) => {
	const precioTotal = document.getElementById('total');

	precioTotal.innerText = totalCompra;
}