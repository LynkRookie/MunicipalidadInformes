<?php
require_once dirname(__FILE__).'/PHPWord-master/src/PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();

use PhpOffice\PhpWord\TemplateProcessor;
class Descargar_Word {
	public $tema;
	public $fecha;
	public $rut;
	public $nombre;
	public $rbd;
	public $director;
	public $direccion;
	public $responsable;
	public $telefono;
	public $motivo;
	public $descripcion;
	public $recepcion;

	
	public function __construct($tema,$fecha,$rut,$nombre,$rbd,$director,$direccion,
	$responsable,$telefono,$motivo,$descripcion,$recepcion)
	{
				$this->tema=$tema;
				$this->fecha=$fecha;
				$this->rut=$rut;
				$this->nombre=$nombre;
				$this->rbd=$rbd;
				$this->director=$director;
				$this->direccion=$direccion;
				$this->responsable=$responsable;
				$this->telefono=$telefono;
				$this->motivo=$motivo;
				$this->descripcion=$descripcion;
				$this->recepcion=$recepcion;
	}
	public function descargarDocumento() {
		$templateWord = new TemplateProcessor('acta_informe_php.docx');

		// ---valores 
		$templateWord->setValue('tema', $this->tema);
		$templateWord->setValue('fecha',$this->fecha);
		$templateWord->setValue('rut',$this->rut);
		$templateWord->setValue('nombre',$this->nombre);
		$templateWord->setValue('rbd',$this->rbd);
		$templateWord->setValue('director',$this->director);
		$templateWord->setValue('direccion',$this->direccion);
		$templateWord->setValue('responsable',$this->responsable);
		$templateWord->setValue('telefono',$this->telefono);
		$templateWord->setValue('motivo',$this->motivo);
		$templateWord->setValue('descripcion',$this->descripcion);
		$templateWord->setValue('recepcion',$this->recepcion);

		$templateWord->setValue('responsable',$this->responsable);
		$templateWord->setValue('director',$this->director);

		// --- Guardamos el documento
		$templateWord->saveAs('Documento02.docx');

		header("Content-Disposition: attachment; filename=Documento02.docx; charset=iso-8859-1");
		echo file_get_contents('Documento02.docx');
	}
}
?>