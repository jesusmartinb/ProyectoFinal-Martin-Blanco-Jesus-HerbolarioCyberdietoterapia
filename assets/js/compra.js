function procesoCompra(totaldeCompra) {
	totaldeCompra = Number(totaldeCompra);

	if (totaldeCompra) {
		const totalConDescuento = aplicarDescuento(totaldeCompra);
		const totalConEnvio = calcularEnvio(totalConDescuento);
		const cuotasAPagar = calcularCantidadDeCuotas();
		const interesTotal = calcularIntereses(totalConEnvio, cuotasAPagar);
		const TotalAPagar = calcularTotalAPagar(totalConEnvio, cuotasAPagar, interesTotal);

		return totalConEnvio, TotalAPagar;
	}
}



function aplicarDescuento(totaldeCompra) {
	let totalConDescuento = 0;
	let descuentoVolumen = 100;

	if (totaldeCompra >= descuentoVolumen) {
		const tasaDescuentoVolumen = 0.90;
		totalConDescuento = totaldeCompra * tasaDescuentoVolumen;
		return totalConDescuento;
	} else {
		return totaldeCompra;
	}
}

function calcularEnvio(totaldeCompra) {

	if (totaldeCompra >= 45) {
		totaldeCompra = totaldeCompra;
	} else if (totaldeCompra < 45 && totaldeCompra !== 0) {
		totaldeCompra += 3;
		totaldeCompra = totaldeCompra;
	} else {
		totaldeCompra = totaldeCompra;
	}

	return totaldeCompra;
}

function calcularCantidadDeCuotas() {
	let cuotas = 0;
	let tieneCuotas = false;

	tieneCuotas = confirm('Quiere pagar en cuotas?');

	if (tieneCuotas) {
		cuotas = parseInt(prompt('¿En cuántas cuotas quiere pagar?'));
		if (cuotas === 0) {
			cuotas = 1;
		} else if (Number.isNaN(cuotas)) {
			calcularCantidadDeCuotas();
		}
	} else {
		cuotas = 1;
	}

	return cuotas;
}

function calcularIntereses(totalConEnvio, cuotas) {
	if (totalConEnvio !== 0) {
		let tasa = 6.0;
		let sinIntereses = 0;
		let tasaTotal = 0;
		let interesesTotales = 0;

		if (cuotas === 1) {
			return sinIntereses;
		} else {
			tasaTotal = tasa + cuotas * 0.2;
			interesesTotales = tasaTotal * cuotas;
			return interesesTotales;
		}
	}
}

function calcularTotalAPagar(totaldeCompraSinCuotas, cuotas, intereses) {

	totaldeCompraSinCuotas = totaldeCompraSinCuotas + intereses;
	let valorCuota = totaldeCompraSinCuotas / cuotas;

	alert('El total a pagar es: ' + totaldeCompraSinCuotas + '€ en ' + cuotas + ' cuotas de ' + valorCuota + '€');
}


