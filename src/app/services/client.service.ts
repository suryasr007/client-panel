import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Client } from "../models/client";

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.clientsCollection = afs.collection('clients',
      ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.clients;
  }

  getClient(id: string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    })
    return this.client
  }

  newClient(client: Client){
    this.clientsCollection.add(client);
  }

  updateClient(client: Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
