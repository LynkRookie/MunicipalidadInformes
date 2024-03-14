<?php 
	require "../controlador/registrar_date.php";
	if(isset($_POST['registrar']))
	{
		$rut=isset($_POST['rut']) ? $_POST['rut']:'';
		$rbd=isset($_POST['rbd']) ? $_POST['rbd']:'';
		$obj= new eliminar_datos($rut,$rbd);
		$registro_datos=$obj->eliminar_Datos();
	}
	if(isset($_POST['registrar_usuario']))
	{
		$user=isset($_POST['user']) ? $_POST['user']:'';
		$obj= new eliminar_Usuario($user);
		$registro_usuario=$obj->Eliminar_Usuario();
	}
	
		
?>
<!DOCTYPE html>
 <html lang="es" class="no-js">
    <head>
    	<!-- meta character set -->
        <meta charset="utf-8">
		<!-- Always force latest IE rendering engine or request Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Eliminar Datos Generales</title>	
		<!-- Mobile Specific Meta -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- CSS
		================================================== -->
		
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
		
		<!-- Fontawesome Icon font -->
        <link rel="stylesheet" href="css/css_eliminar/font-awesome.min.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_eliminar/jquery.fancybox.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_eliminar/bootstrap.min.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_eliminar/owl.carousel.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_eliminar/slit-slider.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_eliminar/animate.css">
		<!-- Main Stylesheet -->
        <link rel="stylesheet" href="css/css_eliminar/mains_eliminar.css">
		<!-- icono de la pagina -->
		<link class="logo"rel="website icon" type="png" href="image/minilogo.png">
		<!-- Main Stylesheet -->
		<link rel="stylesheet" href="css/css_eliminar/diseñobtn.css">
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
						<a class="imagen"href="opciones.php">
							<img src="image/logo_muni.png" >
						</a>
					</h1>
					<!-- /logo -->
                </div>

				<!-- main nav -->
                
				<nav class="collapse navbar-collapse navbar-right" role="navigation">
                    <ul  class="nav navbar-nav">
						<li><a href="Registrar_Datos.php">Ingresar Datos</a></li>
                        <li><a href="Modificar_datos.php">Modificar Datos</a></li>						
						<li><a href="mostrar_datos.php">Mostrar Datos</a></li>
						<li><a href="opciones.php">Volver</a></li>
					</ul>
                </nav>
				<nav class="collapse navbar-collapse navbar-right" role="navigation">
                    <ul id="nav" class="nav navbar-nav">
                  

						
                    </ul>
                </nav>
				<!-- /main nav -->
				
            </div>
        </header>

	<main class="site-content" role="main">


			<!-- el id sirve para ubicarse en la seccion del nav-->
			<!--titulo -->
			<section id="dtg" >
				<div class="container">
					<div class="row">
						
						<div class="sec-title text-center wow animated fadeInDown">
							<h2>Eliminar Datos Del Establecimiento</h2>
							<p>Rellene los Parametros Incompletos</p>
						</div>
<!--seccion del busqueda-->
						<div class="col-md-7 contact-form wow animated fadeInLeft">
						</div>

					</div>
				</div>
			</section>
<!--inicio de la primera seccion -->
		<section id="testimonials" class="parallax">
				<div class="overlay">
					<div class="container">
						<div class="row">
							<form class="formauno" style="text-align:left " action="Registrar_Datos.php" method="post">
								<label>RBD:</label>
								<input type="tex" name="rbd" required>
								<br>
								<br>
								<label>Rut:</label>
								<input type="text" name="rut" required>
								<br>
								<br>
								<div class="btn-bg1 bg1-1">
								<div class=" btn-1"><a >
									<button class="boton3" type="submit"  name="registrar">Registrar</button></a>                                                  														
								</div>
								</div>
								<div class="btn-bg3 bg-3">
									<div class=" btn-1"><a >
										<button class="boton3" type="reset"  name="vaciar">Vaciar</button></a>                                                  														
									</div>
								</div>
								<br>
								<br>
								<?php if(isset($_POST['registrar'])){
				 					echo '<label>'.$registro_datos.'</label>';
								} 
			 					?>
							</form>
						</div>
					</div>
				</div>
		</section>
		<div class="sec-titles text-center wow animated fadeInDown">
							<h2>Eliminar  Usuarios Internos</h2>
							<p>Rellene los Parametros Incompletos</p>
						</div>
		<section id="testimonials" class="parallax">
				<div class="overlay">
					<div class="container">
						<div class="row">
						<form class="formados" style="text-align:left " action="Registrar_Datos.php" method="post">
							<label>Usuario:</label>
							<input type="text" name="user"required>
							<br>
							<br>
							<div class="btn-bg1 bg1-1">
								<div class=" btn-1"><a >
									<button class="boton3" type="submit"  name="registrar_usuario">Registrar </button></a>                                                  														
								</div>
							</div>
							<div class="btn-bg bg-2">
								<div class=" btn-1"><a >
									<button class="boton3" type="reset"  name="vaciar">Vaciar</button></a>                                                  														
								</div>
							</div>
						</form>
						<br>
						<br>
							<?php if(isset($_POST['registrar_usuario'])){
				 					echo '<label>'.$registrar_usuario.'</label>';
								} 
			 					?>
						</div>
					</div>
				</div>
		</section>

		
	</section>
</main>
		
<footer id="footer">
			<div class="container">
				<div class="row text-center">
					<div class="footer-content">
						<div class="wow animated fadeInDown">
							<p></p>
							<p></p>
						</div>
						<form action="#" method="post" class="subscribe-form wow animated fadeInUp">
							<div class="input-field">
								
								
									
								</button>
							</div>
						</form>
						<div class="footer-social">
							<ul>
								
							</ul>
						</div>
						
						<p> </p>
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