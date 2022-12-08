// Variables
// selects de filtrado
const minimo = document.querySelector('#precio-min');
const maximo = document.querySelector('#precio-max');
const categoria = document.querySelector('#categoria');
const subCategoria = document.querySelector('#subcategoria');
const marca = document.querySelector('#marca');
const descuento = document.querySelector('#descuento');

// select de ordenación de los productos
const ordenar = document.querySelector('#ordenar');

// Indica tipo de ordenación de los productos
let ordenadoPor = '';

// contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Generamos un objeto con el filtrado
const datosFiltrado = {
	minimo: '',
	maximo: '',
	categoria: '',
	subCategoria: '',
	marca: '',
	descuento: ''
}

let resultadoFiltrado = productos;

// Eventos
document.addEventListener('DOMContentLoaded', () => {
	// Mostramos los productos al cargar la página
	mostrarProductos(resultadoFiltrado, rate, currencySymbol);
});

// Escucha de eventos para los selects de filtrado
// Precio mínimo
minimo.addEventListener('change', e => {
	datosFiltrado.minimo = e.target.value;

	filtrarProducto();
});

// Precio máximo
maximo.addEventListener('change', e => {
	datosFiltrado.maximo = e.target.value;

	filtrarProducto();
});

// Marca
marca.addEventListener('change', e => {
	datosFiltrado.marca = e.target.value;

	filtrarProducto();
});

// Descuento
descuento.addEventListener('change', e => {
	datosFiltrado.descuento = e.target.value;

	filtrarProducto();
});

// Categoria
categoria.addEventListener('change', e => {
	datosFiltrado.categoria = e.target.value;

	filtrarProducto();
	cargarSubcategorias();
});

// Subcategoria
subCategoria.addEventListener('change', e => {
	datosFiltrado.subCategoria = e.target.value;

	filtrarProducto();
});

// Evento para la ordenación
ordenar.addEventListener('change', ordenarProductos);

// Funciones
// Ordenar Productos
function ordenarProductos(e) {
	switch (e.target.value) {
		case 'pa':
			ordenarPrecioMenorMayor();
			ordenadoPor = 'pa';
			break;
		case 'pd':
			ordenarPrecioMayorMenor();
			ordenadoPor = 'pd';
			break;
		case 'na':
			ordenarNombreAscendente();
			ordenadoPor = 'na';
			break;
		case 'nd':
			ordenarNombreDescendente();
			ordenadoPor = 'nd';
			break;
		default:
			ordenadoPor = '';
			break;
	}
}

// Ordenar productos por precio de menor a mayor
const ordenarPrecioMenorMayor = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => a.preciobaseeu - b.preciobaseeu);
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Ordenar productos por precio de mayor a menor
const ordenarPrecioMayorMenor = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => b.preciobaseeu - a.preciobaseeu);
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}


// Ordenar productos por nombre ascendente alfabeticamente
const ordenarNombreAscendente = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => {
			if (a.nombre > b.nombre) {
				return 1;
			}
			if (a.nombre < b.nombre) {
				return -1;
			}

			return 0;
		});
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Ordenar productos por nombre descendente alfabeticamente
const ordenarNombreDescendente = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => {
			if (a.nombre < b.nombre) {
				return 1;
			}
			if (a.nombre > b.nombre) {
				return -1;
			}

			return 0;
		});
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Limpia el contenido del ul #resultado
function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

// Muestra los productos
function mostrarProductos(productos, rate, currencySymbol) {

	// Limpiamos el HTML previo
	limpiarHTML();

	productos.forEach(producto => {
		const { productoId, nombre, marca, presentacion, preciobaseeu, descuento, imagen } = producto;

		let precioFinal = (preciobaseeu - ((preciobaseeu * descuento) / 100)).toFixed(2);

		const productoHTML = document.createElement('li');

		productoHTML.innerHTML = `
			<div class="card-producto bg-white min-h-[640px] mx-auto max-w-[340px] mt-3 p-6 rounded">
				<picture>
					<img src="${imagen}" alt="">
				</picture>
				<div class="card-body">
					<p class="nombre text-green-500 text-3xl font-bold">${nombre}</p>
					<p class="marca">${marca}</p>
					<p class="presenta">${presentacion}</p>
					<p class="descuento"><span class="tachado line-through">${(preciobaseeu * (rate ? rate : 1)).toFixed(2)}</span> <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span> <span class="porcentaje border-2 bg-green-500 text-white rounded p-1">${descuento}%</span></p>
					<p class="precio font-black text-orange-500 text-3xl">${(precioFinal * (rate ? rate : 1)).toFixed(2)} <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span></p>
					<a href="#" class="agregar-carrito bg-orange-500 p-4 text-white inline-block mt-3 rounded" data-id="${productoId}">Añadir al Carrito</a>
				</div>
			</div>
		`;



		//Se inserta en el HTML
		resultado.appendChild(productoHTML);

	});
}

// Carga las categorías de forma dinámmica en el select correspondiente
function cargarCategorias() {
	const categorias = ["Sistema Nervioso", "Sistema Digestivo", "Sistema Inmunitario", "Sistema Respiratorio", "Sistema Circulatorio", "Sistema Renal", "Sistema Óseo y Articular", "Sistema Hormonal", "Sistema Reproductor", "Nutricosmética", "Vitaminas, Minerales y Aminoácidos"];

	categorias.sort();

	addOptions(categorias);
}

//Agrega options a un select
function addOptions(array) {
	// const selector = document.getElementsByName(domElement)[0];
	for (let i = 0; i < array.length; i++) {
		const opcion = document.createElement('option');
		opcion.value = array[i];
		opcion.textContent = array[i];
		categoria.appendChild(opcion);
	}
}

// cargar subcategorias de forma dinamica al cargar la categoria
function cargarSubcategorias() {
	// Objeto de ategorías con subcategorías
	const listaSubcategorias = {
		'Sistema Nervioso': ["Imsonio", "Relajantes", "Falta de Ánimo", "Energizantes", "Dolor de Cabeza"],
		'Sistema Digestivo': ["Transito Intestinal", "Digestivo", "Antiácidos", "Gases", "Flora Intestinal", "Parásitos Intestinales", "Enzimas Digestivos"],
		'Sistema Inmunitario': ["Jalea Real", "Alergias", "Echináceas y Propóleos", "Aumentar Defensas", "Cándidas y Hongos"],
		'Sistema Respiratorio': ["Molestias Garganta", "Antitusivos", "Mucolíticos", "Afecciones Respiratorias"],
		'Sistema Circulatorio': ["Rendimiento Intelectual", "Exceso de Azucar", "Colesterol", "Varices y Piernas Cansadas", "Salud Cardiovascular", "Hemorroides", "Tensión Arterial", "Anemias"],
		'Sistema Renal': ["Diuréticos", "Próstata", "Infecciones", "Cálculos", "Pérdidas de Orina"],
		'Sistema Óseo y Articular': ["Inflamaciones", "Huesos", "Articulaciones", "Cartílago de Tiburón", "Cremas y Hunguentos"],
		'Sistema Hormonal': ["Menopausia", "Menstruación", "Tiroides"],
		'Sistema Reproductor': ["Estimulantes sexuales", "Embarazo y Lactancia"],
		'Nutricosmética': ["Cuidado del Pelo y Uñas", "Cuidado de la Piel"],
		'Vitaminas, Minerales y Aminoácidos': ["Vitaminas", "Minerales", "Complejos Multinutriéntes", "Aminoácidos", "Oligoelementos"]
	};

	let categoriaSeleccionada = categoria.value
	// limpiar subcategorias
	subCategoria.innerHTML = `<option value="">Seleccione</option>`;

	if (categoriaSeleccionada !== '') {
		// Se seleccionan las subcategorias y se ordenan
		categoriaSeleccionada = listaSubcategorias[categoriaSeleccionada];
		categoriaSeleccionada.sort();

		// Insertamos las subcategorias
		categoriaSeleccionada.forEach(function (subcategoria) {
			const opcion = document.createElement('option');
			opcion.value = subcategoria;
			opcion.textContent = subcategoria;
			subCategoria.appendChild(opcion);
		});
	}

}

// Iniciar la carga de categorias
cargarCategorias();


// Filtra los productos en base a filtros
function filtrarProducto() {
	resultadoFiltrado = productos.filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarMarca).filter(filtrarDescuento).filter(filtrarCategoria).filter(filtrarSubcategoria);

	if (resultadoFiltrado.length) {
		if (ordenadoPor) {
			switch (ordenadoPor) {
				case 'pa':
					ordenarPrecioMenorMayor();
					ordenadoPor = 'pa';
					break;
				case 'pd':
					ordenarPrecioMayorMenor();
					ordenadoPor = 'pd';
					break;
				case 'na':
					ordenarNombreAscendente();
					ordenadoPor = 'na';
					break;
				case 'nd':
					ordenarNombreDescendente();
					ordenadoPor = 'nd';
					break;
				default:
					ordenadoPor = '';
					break;
			}
		} else {
			mostrarProductos(resultadoFiltrado, rate, currencySymbol);
		}
		return resultadoFiltrado;
	} else {
		// console.log('No hay resultados');
		noResultados();
	}
}

// Cuando no hay resultados en el filtrado
function noResultados() {

	limpiarHTML();

	const noResultados = document.createElement('div');
	noResultados.classList.add('p-4', 'text-center', 'font-bold', 'uppercase', 'text-white', 'text-xl', 'bg-red-500');
	noResultados.textContent = 'No Hay Resultados';
	resultado.appendChild(noResultados);
}

function filtrarMinimo(producto) {
	const { minimo } = datosFiltrado;

	if (minimo) {
		return producto.preciobaseeu >= minimo;
	}
	return producto;
}

function filtrarMaximo(producto) {
	const { maximo } = datosFiltrado;

	if (maximo) {
		return producto.preciobaseeu <= maximo;
	}
	return producto;
}

function filtrarMarca(producto) {
	const { marca } = datosFiltrado;

	if (marca) {
		return producto.marca === marca;
	}
	return producto;
}

function filtrarDescuento(producto) {
	let { descuento } = datosFiltrado;

	descuento = Number(descuento);

	if (descuento) {
		return ((producto.descuento >= descuento) && (producto.descuento <= (descuento + 9)));
	}
	return producto;
}

function filtrarCategoria(producto) {
	const { categoria } = datosFiltrado;

	if (categoria) {
		return producto.categoria.indexOf(categoria) >= 0;
	}
	return producto;
}

function filtrarSubcategoria(producto) {
	const { subCategoria } = datosFiltrado;

	if (subCategoria) {
		return producto.subcategoria.indexOf(subCategoria) >= 0;
	}
	return producto;
}
