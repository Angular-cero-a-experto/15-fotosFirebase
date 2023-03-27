import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string, url: string };

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent {


  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor( private afs: AngularFirestore ) {

    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();

  }
}
