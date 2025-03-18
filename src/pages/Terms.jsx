import Layout from "../components/layout/Layout.jsx";
import styles from "./CarDetails.module.css";
import termsStyles from "./Terms.module.css";


const CarDetails = () => {
	return (
		<Layout>
			<section className={`section ${styles.carDetails}`}>
				<h2>Términos y condiciones</h2>
				<div className={termsStyles.container}>
					<div className={termsStyles.termsContainer}>
						<h3>1. Introducción</h3>
						<p>
							Bienvenido a RapidRide, un servicio de alquiler de automóviles disponible a través de nuestro sitio web. Al acceder y utilizar nuestros servicios, usted acepta los presentes Términos y Condiciones. Le recomendamos leerlos detenidamente antes de realizar una reserva.
						</p>
						<br />
						<h3>2. Registro y Cuenta de Usuario</h3>
						<p>
							Para acceder a ciertos servicios, es posible que deba registrarse y proporcionar información veraz y actualizada. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, asumiendo toda responsabilidad por las actividades realizadas bajo su cuenta.
						</p>
						<br />
						<h3>3. Requisitos para el Alquiler</h3>
						<p>Para alquilar un vehículo, el usuario debe cumplir con los siguientes requisitos:</p>
						<ul>
							<li>Tener al menos 18 años de edad.</li>
							<li>Poseer una licencia de conducir válida y vigente.</li>
							<li>Presentar un método de pago válido.</li>
							<li>Cumplir con las políticas de depósito de garantía establecidas por la empresa.</li>
						</ul>
						<br />
						<h3>4. Reservas y Pagos</h3>
						<p>
							Las reservas pueden realizarse a través de nuestro sitio web. El pago debe efectuarse según las opciones disponibles al momento de ir a recoger el automóvil. Nos reservamos el derecho de cancelar reservas en caso de fraude, información incorrecta o incumplimiento de los requisitos establecidos.
						</p>
						<br />
						<h3>5. Uso del Vehículo</h3>
						<p>El usuario se compromete a:</p>
						<ul>
							<li>Utilizar el vehículo de manera responsable y conforme a la ley.</li>
							<li>No subarrendar ni transferir el vehículo a terceros.</li>
							<li>Devolver el vehículo en las mismas condiciones en que fue entregado.</li>
						</ul>
						<br />
						<h3>6. Seguro y Responsabilidad</h3>
						<p>
							El vehículo está asegurado según las coberturas estipuladas en el contrato de alquiler. En caso de accidente, robo o daños, el usuario podrá ser responsable de ciertos costos según lo establecido en la póliza de seguro.
						</p>
						<br />
						<h3>7. Cancelaciones y Reembolsos</h3>
						<p>
							Las políticas de cancelación y reembolso están detalladas en nuestro sitio web y pueden variar según el tipo de reserva. Nos reservamos el derecho de aplicar cargos por cancelación.
						</p>
						<br />
						<h3>8. Modificaciones a los Términos y Condiciones</h3>
						<p>
							Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en nuestro sitio web.
						</p>
						<br />
						<h3>9. Legislación Aplicable y Jurisdicción</h3>
						<p>
							Estos Términos y Condiciones se rigen por las leyes de jurisdicción aplicable. Cualquier disputa será resuelta en los tribunales competentes de dicha jurisdicción.
						</p>
						<p>Si tiene alguna consulta, puede contactarnos a través de <strong>rapidride@gmail.com</strong>.</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
