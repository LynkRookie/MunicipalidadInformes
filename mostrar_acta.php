<?php 
	    require "../controlador/proto_mostrar.php";
    
        $nombre_acta = isset($_POST['nombre_acta']) ? $_POST['nombre_acta'] : '';      
        $obj = new mostrar_acta($nombre_acta);
        $resultado = $obj->select_acta();
?>
<!DOCTYPE html>
 <html lang="es" class="no-js">
    <head>
    	<!-- meta character set -->
        <meta charset="utf-8">
		<!-- Always force latest IE rendering engine or request Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Muestra de Datos</title>	
		<!-- Mobile Specific Meta -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- CSS
		================================================== -->
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
		
		<!-- Fontawesome Icon font -->
        <link rel="stylesheet" href="css/css_mostrar_D/font-awesome.min.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/jquery.fancybox.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_proto/bootstrap.mins.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/owl.carousel.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/slit-slider.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/animate.css">
		<!-- Main Stylesheet -->
        <link rel="stylesheet" href="css/css_mostrar_D/mains_mostrardatos.css">
		<!-- Main Stylesheet -->
      
        <!-- buscar btn -->
			<link rel="stylesheet" href="css/css_mostrar_D/botondesca.css">
        <!-- icono de la pagina -->
		<link class="logo"rel="website icon" type="png" href="image/minilogo.png">

         <!-- Bootstrap-->
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous" />
        <!-- DataTable -->
        <link rel="stylesheet" href="css/css_proto/dataTables.bootstrap5.min.css" />
        <!-- Font Awesome -->
    
        <link
            rel="stylesheet"
            href=" https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css"
        />
       
        <link
            rel="stylesheet"
            href=" https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css"
        />

        <!-- Custom CSS -->
        <link rel="stylesheet" href="styles.css" />

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

                        <li><a href="../controlador/salir.php">Cerrar Sesion</a></li>
                    </ul>
                </nav>
				<!-- /main nav -->
				
            </div>
        </header>
<!--End Fixed Navigation==================================== -->
	<main class="site-content" role="main">


			<!-- el id sirve para ubicarse en la seccion del nav-->
			<!--titulo -->
			<section id="dtg" >
				<div class="container">
					<div class="row">
						
						
                   
				</div>
			</section>
            <br>
            <br>
            <br>
            <section>
                <form action="mostrar_usuario.php" method="post">
              
                    <div class="sec-titles text-center wow animated fadeInDown">
							<h2>Muestra de Acta:</h2>
							<p>Muestra de Datos que se encuentran en el acta</p>
                            <br>
						</div>
                        <div class="container my-4">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <table id="example" class="table table-striped" style="width:100%">
                        <thead>
                            <br>
                                <tr>
                                        
                                    <th>N° de Acta</th>
                                    <th>Tema</th>
                                    <th>Fecha</th>
                                    <th>RUT</th>
                                    <th>Establecimiento</th>
                                    <th>RBD</th>
                                    <th>Director o Encargado</th>
                                    <th>Direción</th> 
                                    <th>Responsable</th>
                                    <th>Telefono</th>
                                    <th>Motivo</th>
                                    <th>Descripcion</th>
                                    <th>Recepcion</th>
                                    
                                </tr>
                        </thead>
                        <tbody>
                        <?php  
                                while ($row = mysqli_fetch_assoc($resultado)) {
                                    echo "<tr>";
                                    echo "<td>".$row['num_acta']."</td>";
                                    echo "<td>".$row["tema"]."</td>";
                                    echo "<td >".$row['fecha']."</td>";
                                    echo "<td>".$row["rut_acta"]."</td>";
                                    echo "<td>".$row["nombre_acta"]."</td>";
                                    echo "<td>".$row["rbd_acta"]."</td>";
                                    echo "<td>".$row["director_acta"]."</td>";
                                    echo "<td>".$row["direccion_acta"]."</td>";
                                    echo "<td>".$row["responsable_acta"]."</td>";
                                    echo "<td>".$row["telefono"]."</td>";
                                    echo "<td>".$row["motivo"]."</td>";
                                    echo "<td>".$row["descripcion"]."</td>";
                                    echo "<td>".$row["recepcion"]."</td>";
                                    echo "</tr>";
                                }mysqli_free_result($resultado);
                             ?>
                        
                        
                        
                        </tbody>
                        <tfoot>
                            <tr>
                                    <th>N° de Acta</th>
                                    <th>Tema</th>
                                    <th>Fecha</th>
                                    <th>RUT</th>
                                    <th>Establecimiento</th>
                                    <th>RBD</th>
                                    <th>Director o encargado</th>
                                    <th>Direción</th> 
                                    <th>Responsable</th>
                                    <th>Telefono</th>
                                    <th>Motivo</th>
                                    <th>Descripcion</th>
                                    <th>Recepcion</th>
                            </tr>
                        </tfoot>
                    </table>
                        </div>
                    </div>

                </form>
            </section>
            

    </main>
            
            <footer id="footer">
                <div class="container">
                    <div class="row text-center">
                        <div class="footer-content">
                            <div class="wow animated fadeInDown">
                                <p>Para Mas Consultas</p>
                                <p>Ingrese su Correo Para Responderles</p>
                            </div>
                            <form action="#" method="post" class="subscribe-form wow animated fadeInUp">
                                <div class="input-field">
                                    <input type="email" class="subscribe form-control" placeholder="Ingrese su Correo...">
                                
                                </div>
                            </form>
                            <div class="footer-social">
                                <ul>
                                    
                                </ul>
                            </div>
                            
                            <p>Copyright &copy; 2023 Dpto. del Area de Informatica </p>
                        </div>
                    </div>
                </div>
            </footer>
            
              <!-- Bootstrap-->
        <script src="css/css_proto/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
        <!-- jQuery -->
        <script src="css/css_proto/jquery.min.js"></script>
        <!-- DataTable -->
        <script src="css/css_proto/jquery.dataTables.min.js"></script>
        <script src="css/css_proto/dataTables.bootstrap5.min.js"></script>
        <!-- Custom JS -->

        <script src="css/css_proto/script.js"></script>
    </body>
</html>


