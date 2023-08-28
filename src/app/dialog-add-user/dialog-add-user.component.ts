import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {


  user = new User();
  birthDate: Date;
  formattedBirthDate: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) {

  }


  saveUser(){
    this.user.birthDate = new Date(this.birthDate);
    this.formattedBirthDate = this.user.getFormattedBirthDate(); 
    console.log('user', this.user)
    this.loading = true;
    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result:any) => {
      this.loading = false;
      console.log('adding user finish', result)
      this.dialogRef.close();
    });
  }
}
