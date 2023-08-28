import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  loading = false;
  birthDate: Date;
  userId: string;
  dialog: any;


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) {
  }
  ngOnInit(): void {
    if (this.user) {
      this.birthDate = new Date(this.user.birthDate); // Ensure a new Date object
    }
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.birthDate = new Date(this.user.birthDate); // Pass the birthDate as a new Date object
    dialog.componentInstance.userId = this.userId;
  }
  


  saveUser(){
    this.user.birthDate = this.birthDate;
    this.loading = true;
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    .then(()=>{
      this.loading = false;
      this.dialogRef.close();
    });
  }


}
