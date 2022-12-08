const currency = document.getElementById('currency');
const divCurrency = document.querySelector('.currency');
const envioGratis = document.getElementById('envioGratis');
const monedas = document.querySelectorAll('.moneda');

const envioGratisApartir = 45;

let rate = 1;
let currencySymbol;

// Event Listeners
currency.addEventListener('change', calculate);

// Fetch exchange rates and update the DOM
function calculate() {

	const currencyValue = currency.value;


	fetch(`https://v6.exchangerate-api.com/v6/e8cbd1badb9430319b8513ef/latest/EUR`)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			rate = data.conversion_rates[currencyValue];

			switch (currencyValue) {
				case 'ARS':
					currencySymbol = '$';
					break;
				case 'CLP':
					currencySymbol = '$';
					break;
				case 'COP':
					currencySymbol = '$';
					break;
				case 'MXN':
					currencySymbol = '$';
					break;
				case 'USD':
					currencySymbol = '$';
					break;
				case 'BOB':
					currencySymbol = 'Bs';
					break;
				case 'CRC':
					currencySymbol = '₡';
					break;
				case 'DOP':
					currencySymbol = 'RD$';
					break;
				case 'EUR':
					currencySymbol = '€';
					break;
				case 'GTQ':
					currencySymbol = 'Q';
					break;
				case 'PEN':
					currencySymbol = 'S/';
					break;
				case 'PYG':
					currencySymbol = 'PYG';
					break;
				case 'UYU':
					currencySymbol = 'UYU';
					break;
				case 'VES':
					currencySymbol = 'Bs.';
					break;
				default:
					break;
			}

			envioGratis.textContent = (envioGratisApartir * rate).toFixed(2);

			monedas.forEach(moneda => {
				moneda.textContent = currencySymbol;
			})

			mostrarProductos(productos, rate, currencySymbol);

			carritoHTML(rate, currencySymbol);
			actualizarTotalesCarrito(articulosCarrito, rate);

			return rate, currencySymbol;
		})
		.catch(showError);
}

// Función que muestra los errores en caso de fallo en la petición a la API
function showError(error) {
	// Se crea un elemento div con clase error
	const msg = document.createElement('div');
	msg.classList.add('error');

	// Se inserta el mensaje de error en el div
	msg.innerHTML = `
		Se ha producido el error siguiente: ${error}
	`;

	// Se añade el div creado al elemento con clase currency
	divCurrency.appendChild(msg);
}