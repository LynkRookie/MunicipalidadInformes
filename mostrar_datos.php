<?php 
	 require "../controlador/proto_mostrar.php";
    

    
    $rbd=isset($_POST['rbd']) ? $_POST['rbd']:0.0;
    $obj=new mostrar_establecimiento($rbd);
    $resultado=$obj->select();
/*--------------------------------------------------------------------------*/
$user = isset($_POST['user']) ? $_POST['user'] : '';      
$obj = new mostrar_usuarios($user);
$resultados = $obj->select_usuarios();
 /*--------------------------------------------------------------------------*/
$nombre_acta = isset($_POST['nombre_acta']) ? $_POST['nombre_acta'] : '';      
$obj = new mostrar_acta($nombre_acta);
$resultadotres = $obj->select_acta();
       
?>
<!DOCTYPE html>
 <html lang="es" class="no-js">
    <head>
    	<!-- meta character set -->
        <meta charset="utf-8">
		<!-- Always force latest IE rendering engine or request Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Muestra de Acta</title>	
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
      
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/owl.carousel.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/slit-slider.css">
		<!-- bootstrap.min -->
        <link rel="stylesheet" href="css/css_mostrar_D/animate.css">
		<!-- Main Stylesheet -->
        <link rel="stylesheet" href="css/css_mostrar_D/mains_mostrardatos.css">
		<!-- Main Stylesheet -->
 
		<!-- icono de la pagina -->
		<link class="logo"rel="website icon" type="png" href="image/minilogo.png">
		<!-- Modernizer Script for old Browsers -->
        <script src="js/modernizr-2.6.2.min.js"></script>


        <link rel="stylesheet" href="css/css_proto/bootstrap.mins.css">
        
        <!-- buscar btn -->
			<link rel="stylesheet" href="css/css_proto/pagina.css">
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
                    <li><a href="opciones.php">Volver a la Pagina de Inicio </a></li>
                    </ul>
                </nav>
				<!-- /main nav -->
				
            </div>
        </header>
<!--End Fixed Navigation==================================== -->
	<main class="site-content" role="main">


			<!-- el id sirve para ubicarse en la seccion del nav-->
			<!--titulo -->
		
            <section>
                
                <form class="md"action="mostrar_usuario.php" method="post">
                
                    <div class="sec-titles text-center wow animated fadeInDown">
                            <h2>Muestra de Establecimiento:</h2>
                            <p>Muestra de Datos que se encuentran en el Establecimiento</p>
                            <br>
                        </div>
                        <div class="container my-4">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <table id="example" class="table table-striped" style="width:100%">
                        <thead>
                            <br>
                                <tr>
                                    <br>
                                    <br>
                                    <br>
                                            <th>Id Establecimiento</th>
                                            <th>RUT</th>
                                            <th>Establecimiento</th>
                                            <th>RBD</th>
                                            <th>Director o encargado</th>
                                            <th>Direción</th>
                                            <th>Telefono</th>
                                </tr>
                            </thead>
                        <tbody>
                                    <?php while($row=mysqli_fetch_assoc($resultado)) {?>
                                <tr>
                                    <td><?php echo $row["id_establecimiento"];?></td>
                                    <td><?php echo $row["rut"];?></td>
                                    <td><?php echo $row["nombre"];?></td>
                                    <td><?php echo $row["rbd"];?></td>
                                    <td><?php echo $row["director"];?></td>
                                    <td><?php echo $row["direccion"];?></td>
                                
                                    <td><?php echo $row["telefono"];?></td>
                                </tr>
                                    <?php } mysqli_free_result($resultado);?>
                        </tbody>
                        <tfoot>
                            <tr>
                                            <th>Id Establecimiento</th>
                                            <th>RUT</th>
                                            <th>Establecimiento</th>
                                            <th>RBD</th>
                                            <th>Director o encargado</th>
                                            <th>Direción</th>
                                            <th>Telefono</th>
                            </tr>
                        </tfoot>
                    </table>
                        </div>
                    </div>

                </form>
                <form class="paginacion">
                <div class="sec-titles text-center wow animated fadeInDown">
                <p>Para ver Los datos usuarios y Actas</p>
                            <p>clique aqui </p>
                        </div>
                <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Atras</a>
                    </li>
                        <li class="page-item"><a class="page-link" href="mostrar_datos.php">1</a></li>
                        <li class="page-item"><a class="page-link" href="mostrar_datos_usuario.php">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="mostrar_datos_usuario.php">Siguiente</a>
                    </li>
                 </ul>
            </nav>
                </form>
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


