import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  allUsers = [];

  
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}
  
  ngOnInit(): void{
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any)=>{
      console.log('From DB', changes)
      this.allUsers = changes;
    })
  }


  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.firestore.collection('users').doc(userId).delete()
        .then(() => {
          console.log("User deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting user: ", error);
        });
    }
  }

}
