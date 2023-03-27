import { Component } from '@angular/core';
import { FileItem } from '../../models/fire-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {

  archivos: FileItem[] = [];
  estaSobreElemento: boolean = false;

  constructor( public cargaImgService: CargaImagenesService ) {

  }

  cargarImagenes() {

    this.cargaImgService.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
