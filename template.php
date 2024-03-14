<?php

require_once dirname(__FILE__).'/PHPWord-master/src/PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();

use PhpOffice\PhpWord\TemplateProcessor;

$templateWord = new TemplateProcessor('acta_informe_php.docx');
 

// ---valores 
     $tema=$_POST['tema'];
	 $fecha=$_POST['fecha'];
	 $rut=$_POST['rut'];
	 $nombre=$_POST['nombre'];
	 $rbd=$_POST['rbd'];
     $director=$_POST['director'];
	 $direccion=$_POST['direccion'];
	 $responsable=$_POST['responsable'];
	 $telefono=$_POST['telefono'];
	 $motivo=$_POST['motivo'];
	 $descripcion=$_POST['descripcion'];
	 $recepcion=$_POST['recepcion'];
// --- termino

// --- Asignamos valores a la plantilla

$templateWord->setValue('tema', $tema);
$templateWord->setValue('fecha',$fecha);
$templateWord->setValue('rut',$rut);
$templateWord->setValue('nombre',$nombre);
$templateWord->setValue('rbd',$rbd);
$templateWord->setValue('director',$director);
$templateWord->setValue('direccion',$ $direccion);
$templateWord->setValue('responsable',$responsable);
$templateWord->setValue('telefono',$telefono);
$templateWord->setValue('motivo',$motivo);
$templateWord->setValue('descripcion',$descripcion);
$templateWord->setValue('recepcion',$recepcion);

$templateWord->setValue('responsable',$responsable);
$templateWord->setValue('director',$director);


// --- Guardamos el documento
$templateWord->saveAs('Documento02.docx');

header("Content-Disposition: attachment; filename=Documento02.docx; charset=iso-8859-1");
echo file_get_contents('Documento02.docx');
        
?>