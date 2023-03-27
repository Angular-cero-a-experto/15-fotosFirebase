import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 
import { FileItem } from '../models/fire-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore ) { }

  private guardaraImagen( imagen: {nombre: string, url: string }) {

      this.db.collection(`/${this.CARPETA_IMAGENES}`)
          .add( imagen );

  }

  cargarImagenesFirebase( imagenes: FileItem[ ] ) {

    console.log(imagenes);

    const storageRef = firebase.storage().ref();

    for( const item of imagenes ) {

      item.estaSubiendo = true;
      if(item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = 
      storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo}`)
      .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 

        ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
        ( error ) => console.log('Error al subir', error),
        () => {
          console.log('Imagen cargada correctamente');
          uploadTask.snapshot.ref.getDownloadURL()
                    .then( (url) => {
                      item.url = url;
                      item.estaSubiendo = false;
                      this.guardaraImagen({
                        nombre: item.nombreArchivo,
                        url: item.url
                      })
                    } )          
          item.estaSubiendo = false;
        }
         
      )

    }
  }
}
