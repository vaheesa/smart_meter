import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
email:string=""

  constructor(public db: AngularFirestore,public afAuth: AngularFireAuth
    ) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }
  signup(mail,password){
   return this.afAuth.auth.createUserWithEmailAndPassword(mail,password).then((result) => {
      
    }).catch((error) => {
      window.alert(error.message)
    })
  }
  login(mail,password){
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(mail,password).then((result) => {
      //this.email=result.mail
      this.email=mail
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }
getmail(mail){
  return this.db.collection('users',ref=>ref.where('mail','==',mail)).snapshotChanges()
}
  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value,avatar){
    return this.db.collection('users').add({
      mail: value.mail,
      name: value.name
    });
  }
}
