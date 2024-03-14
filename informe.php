<?php

	require "../controlador/relleno_informe.php";
	

	$num_acta=isset($_POST['num_acta']) ? $_POST['num_acta']:0.0;
	$obj=new mostrar_num_acta($num_acta);
	$acta=$obj->select_acta();
	
	if(isset($_POST['buscar'])){
		$rbd_b=isset($_POST['rbd_b']) ? $_POST['rbd_b']:0.0;
		
		$obj=new mostrar_establecimiento($rbd_b);
		$resultado=$obj->select();
		
	}
	if( isset($_POST['registro_acta'])){
		$tema=isset($_POST['tema']) ? $_POST['tema']:0.0;
		$fecha=isset($_POST['fecha']) ? $_POST['fecha']:0.0;
		$rut_acta=isset($_POST['rut_acta']) ? $_POST['rut_acta']:0.0;
		$nombre_acta=isset($_POST['nombre_acta']) ? $_POST['nombre_acta']:'';
		$rbd_acta=isset($_POST['rbd_acta']) ? $_POST['rbd_acta']:0.0;
		$director_acta=isset($_POST['director_acta']) ? $_POST['director_acta']:0.0;
		$direccion_acta=isset($_POST['direccion_acta']) ? $_POST['direccion_acta']:0.0;
		$responsable_acta=isset($_POST['responsable_acta']) ? $_POST['responsable_acta']:0.0;

		$telefono=isset($_POST['telefono']) ? $_POST['telefono']:0.0;

		$motivo=isset($_POST['motivo']) ? $_POST['motivo']:0.0;
		$descripcion=isset($_POST['descripcion']) ? $_POST['descripcion']:0.0;
		$recepcion=isset($_POST['recepcion']) ? $_POST['recepcion']:0.0;

		$obj=new registrar_acta($tema,$fecha,$rut_acta,$nombre_acta,$rbd_acta,
		$director_acta,$direccion_acta,$responsable_acta,$telefono,
		$motivo,$descripcion,$recepcion);
		$registro_acta=$obj->ingresar_acta();

	} else if(empty($rut)){
	
	}
	if (isset($_POST['registro_acta'])) {
		// Obtener datos del formulario
		$tema_acta = isset($_POST['tema']) ? $_POST['tema'] : '';
		$fecha_acta = isset($_POST['fecha']) ? $_POST['fecha'] : '';
		$rut_acta = isset($_POST['rut_acta']) ? $_POST['rut_acta'] : '';
		$nombre_acta = isset($_POST['nombre_acta']) ? $_POST['nombre_acta'] : '';
		$rbd_acta = isset($_POST['rbd_acta']) ? $_POST['rbd_acta'] : '';
		$director_acta = isset($_POST['director_acta']) ? $_POST['director_acta'] : '';
		$direccion_acta = isset($_POST['direccion_acta']) ? $_POST['direccion_acta'] : '';
		$responsable_acta = isset($_POST['responsable_acta']) ? $_POST['responsable_acta'] : '';

		$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';

		$motivo_acta = isset($_POST['motivo']) ? $_POST['motivo'] : '';
		$descripcion_acta = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
		$recepcion_acta = isset($_POST['recepcion']) ? $_POST['recepcion'] : '';

		// Crear instancia del GeneradorActaInforme
		$generadorActaInforme = new ActaInforme($num_acta,$tema, $fecha, $rut_acta, $nombre_acta, $rbd_acta, $director_acta,
		 $direccion_acta, $responsable_acta, $telefono
		 , $motivo, $descripcion, $recepcion);

		// Generar el acta informe
		$generadorActaInforme->generarActaInforme();

	}	
?>
<!DOCTYPE html>
<html lang="es" class="no-js">
	<head>
		<!-- meta character set -->
		<meta charset="utf-8">
			<!-- Always force latest IE rendering engine or request Chrome Frame -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
			<title>Informe Área Informatica</title>	
			<!-- Mobile Specific Meta -->
			<meta name="viewport" content="width=device-width, initial-scale=1">
			
			<!-- CSS
			================================================== -->
			
			<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
			
			<!-- Fontawesome Icon font -->
			<link rel="stylesheet" href="css/css_informe/font-awesome.min.css">
			<!-- bootstrap.min -->
			<link rel="stylesheet" href="css/css_informe/jquery.fancybox.css">
			<!-- bootstrap.min -->
			<link rel="stylesheet" href="css/css_informe/bootstrap.mins.css">
			<!-- bootstrap.min -->
			<link rel="stylesheet" href="css/css_informe/owl.carousel.css">
			<!-- bootstrap.min -->
			<link rel="stylesheet" href="css/css_informe/slit-slider.css">
			<!-- bootstrap.min -->
			<link rel="stylesheet" href="css/css_informe/animate.css">
			<!-- Main Stylesheet -->
			<link rel="stylesheet" href="css/css_informe/estilo_info.css">
			<!-- Main Stylesheet -->
			<link rel="stylesheet" href="css/css_informe/botondesca.css">
			<!-- icono de la pagina -->
			<link class="logo"rel="website icon" type="png" href="image/minilogo.png">
			<!-- Modernizer Script for old Browsers -->
			<script src="js/modernizr-2.6.2.min.js"></script>

	</head>
	<body id="body">
		<!--navegador==================================== -->
		<header id="navigation" class="navbar-inverse navbar-fixed-top animated-header">
				<div class="container">
					<div class="navbar-header">
						<!-- boton nav responsivo-->
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>

					</button>
					<!-- /boton nav responsivo -->

					<!-- logo -->
					<h1 class="navbar-brand">
							<a class="imagen">
								<img src="image/logo_muni.png" >
							</a>
						</h1>
				<!-- /logo -->
			</div>

			<!-- menu de navegación -->
					<nav class="collapse navbar-collapse navbar-right" role="navigation">
						<ul  class="nav navbar-nav">
							<li><a class="cerrar"href="../controlador/salir.php">Cerrar Sesion</a></li>
							
						</ul>
					</nav>
					<nav class="collapse navbar-collapse navbar-right" role="navigation">
						<ul id="nav" class="nav navbar-nav">
							<li><a href="#dtg">Datos Generales</a></li>
							<li><a href="#testimonials">Motivo Visita</a></li>

							
						</ul>
					</nav>
				<!-- /menu de navegación -->
			</div>
		</header>
	<!-- /navegador -->
	<main class="site-content" role="main">
	<!-- Encabezado
	==================================== -->
	<section id="dtg" >
					<div class="container">
						<div class="row">
						<div class="sec-title text-center wow animated fadeInDown">
								<h2>Informe Área Informatica</h2>
								
						</div>
						<div class="col-md-7 contact-form wow animated fadeInLeft">
							</div>

						</div>
					</div>
				</section>
	<!-- /Encabezado -->
	<!-- Mostrar Datos
	==================================== -->
		<section id="testimonials" class="parallax">
			<div class="overlay">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							
						<form class="testimonial"action="informe.php" method="post">
							<div class="vertical-table">
								<table class="table table-bordered">
									<div class="vertical-table__content">
									<?php 
											if(empty($acta) ){
												
											} else{
												while($row=mysqli_fetch_assoc($acta)){
													$num_acta=$row['num_acta']+1;
												}mysqli_free_result($acta);
												echo '<label class="num">N° Acta:<input class="acta"type="text" name="num_acta" value= ' .$num_acta.'></label>';
											}
											
											
											?>
										<br>
										
									</div>
									<div class="formados">
										<label class="tema">Tema:<input class="tema"type="text" name="tema" value="informatica" ></label>
										<label class="fecha">fecha:<input class="fechas"type="date" name="fecha" value="<?php echo date('Y-m-d'); ?>" ></label>
										<br>
									</div>
									<br>
									
										<label class="t1">Buscar Por Rbd:</label>
										<input class="formauno"type="text" name="rbd_b"   placeholder="ingrese Rbd de establecimiento" title="ingrese Rbd" >
																
										<div class="btn-bg bg-2">
												<div class="btn btn-1"><a >
													<button class="boton2" type="submit"  name="buscar">Buscar</button></a>
														<i class="fa-regular fa-cloud-arrow-down fa-bounce fa-xs" style="color: #ffffff;"></i>
												</div>
										</div>
										<thead>
										<br>
										</thead>
										<tbody>
											<?php 
											if(empty($rbd_b) ){
												
											} else{
												while($row=mysqli_fetch_assoc($resultado)){
													echo '<br>';
													echo '<br>';
													echo '<div class="columna1">';
												
													echo '<label>Rut:</label><input class="rut" name="rut_acta" type="text"  length="30" value='.$row['rut'].'>';
													echo '<br>';
													echo '<br>';
													echo '<label>Establecimiento:</label><input class="nombre_acta" name="nombre_acta"  width="60px" type="text" length="500" value="'.$row['nombre'].'">';
													echo '<br>';
													echo '<br>';
													echo '<label>Rbd:</label><input class="rbd" name="rbd_acta"  type="text"  width="64" length="30" value='.$row['rbd'].'>';
													echo '<br>';
													echo '<br>';
													echo '</div>';
													echo '<div class="columna2">';
													echo '<label>Director:</label><input class="director" name="director_acta" type="text" width="64px" length="500" value="'.htmlentities($row['director']).'">';
													echo '<br>';
													echo '<br>';
													echo '<label>Direccion:</label><input class="direccion" name="direccion_acta" type="text" length="500" value="'.htmlentities($row['direccion']).'">';
													echo '<br>';
													echo '<br>';
													echo '<label>Responsable:</label><input class="responsable" name="responsable_acta" type="text" length="30"  >';
													echo '<br>';
													echo '<br>';
													echo '<label>Telefono:</label><input class="telefono" name="telefono" type="text" length="30" >';
													echo '<br>';
													echo '<br>';
													echo '</div>';

												
													echo '<table >';
													echo '<thead class="motivo">';
													echo '<th class="titulo1">Motivo Visita</th>';
													echo '</thead>';
													echo '</table>';
													echo '<textarea  name="motivo" class="titulomotivo-3 " id="exampleTextarea" rows="5" cols="75" ></textarea>';

													echo '<table  >';
													echo '<thead>';
													echo '<th class="titulo2" >Descripcion de Equipos</th>';
													echo '</thead>';
													echo '</table>';
													echo '<textarea name="descripcion" class="Descripcion-2 " id="exampleTextarea" rows="5" cols="75" ></textarea>';

													echo '<table >';
													echo '<thead>';
													echo '<th class="titulo3">Recepción de Equipo</th>';
													echo '</thead>';
													echo '</table>';
													echo '<textarea name="recepcion" class="Recepcion-2 " id="exampleTextarea" rows="5" cols="75" ></textarea >';
													echo '<br>';
													echo '<br>';

													echo '<div class="btn-bg bg-1">';
														echo '<div class="btn btn-1"><a >';
														echo '<button class="button1" type="submit"  name="registro_acta">Registrar y Descargar</button></a>';
														echo '<i class="fa-regular fa-cloud-arrow-down fa-bounce fa-xs" style="color: #ffffff;"></i>';
														echo '</div>';
													echo '</div>';
											
												}mysqli_free_result($resultado);
											}
											?>
										</tbody>
								</table>
								
							</div>

					
							<?php 
								if(isset($_POST['registro_acta'])){
								echo $registro_acta;
								echo '<br>';
								//echo '<input class="btn-2 btn-3" type="submit"  value="Descargar Copia de Informe" name="enviar">';
								} 	
								if(isset($_POST['enviar'])){

								}	
							?>
							
						</form>
							
					</div>
				</div>
			</div>
		</section>
		<div class="sec-titles text-center wow animated fadeInDown">
				<h3></h3>
				<p></p>
		</div>
		<section id="testimonials" class="parallax">
					
				</section>
		</section>
		</main>
		<footer id="footer">
				<div class="container">
					<div class="row text-center">
						<div class="footer-content">
							<div class="wow animated fadeInDown">
								
							</div>
							<form action="#" method="post" class="subscribe-form wow animated fadeInUp">
								<div class="input-field">
									
									
								</div>
							</form>
							<div class="footer-social">
								<ul>
									
							</div>
							
							
						</div>
					</div>
				</div>
			</footer>
				<!-- Essential jQuery Plugins
			================================================== -->
			<!-- Main jQuery -->
			<script src="js/js_informe/jquery-1.11.1.min.js"></script>
			<!-- Twitter Bootstrap -->
			<script src="js/js_informe/bootstrap.min.js"></script>
			<!-- Single Page Nav -->
			<script src="js/js_informe/jquery.singlePageNav.min.js"></script>
			<!-- jquery.fancybox.pack -->
			<script src="js/js_informe/jquery.fancybox.pack.js"></script>
			<!-- Google Map API -->
			<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
			<!-- Owl Carousel -->
			<script src="js/js_informe/owl.carousel.min.js"></script>
			<!-- jquery easing -->
			<script src="js/js_informe/jquery.easing.min.js"></script>
			<!-- Fullscreen slider -->
			<script src="js/js_informe/jquery.slitslider.js"></script>
			<script src="js/js_informe/jquery.ba-cond.min.js"></script>
			<!-- onscroll animation -->
			<script src="js/js_informe/wow.min.js"></script>
			<!-- Custom Functions -->
			<script src="js/js_informe/main.js"></script>
	</body>
</html>
