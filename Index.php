<?php 
	session_start();
	if(isset($_GET['e'])){
	$opcion= $_GET['e'];
}else{
	$opcion = '';	
}


?>
<!doctype html>
<html lang="es">
  <head>
  	<title>Login Area Informatica</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="website icon" type="png" href="vista/image/minilogo.png">

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<link rel="stylesheet" href="vista/css/css_login/estilo_Login.css">

	</head>
	<body class="img js-fullheight" style="background-image: url(vista/image/bg.jpg);">
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Login Área Informatica</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center"> </h3>
		    <form action="controlador/login.php" class="signin-form" method="post">

			<div class="form-group">
			<select  class="forms-control" name="tipo" id="">
								<option >Tipo De Usuario</option>
								<option name="Administrador"value="Administrador">Administrador</option>
								<option name="Usuario"value="Usuario">Usuario</option>
								<option name="Lector"value="Lector">Lector</option>
							</select>
		    </div>
		      		<div class="form-group">
		      			<input type="text" class="form-control" name="user" placeholder="Usuario" required>
		      		</div>
	            <div class="form-group">
	              <input id="password-field" name="pass" type="password" class="form-control" placeholder="Contraseña" required>
	              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div class="form-group">
	            	<button type="submit" name="enviar" class="form-control btn btn-primary submit px-3">Iniciar sesion</button>
	            </div>
	        </form>	          
			</div>
		</div>
	</section>
	<?php				
		?>
	<script src="vista/js/js_login/jquery.min.js"></script>
  <script src="vista/js/js_login/popper.js"></script>
  <script src="vista/js/js_login/bootstrap.min.js"></script>
  <script src="vista/js/js_login/main.js"></script>

	</body>
</html>

