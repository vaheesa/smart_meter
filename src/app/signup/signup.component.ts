import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";

  validation_messages = {
   'mail': [
     { type: 'required', message: 'Name is required.' }
   ],
   'password': [
     { type: 'required', message: 'password is required.' }
   ],
   'name': [
    { type: 'required', message: 'password is required.' }
  ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      mail: ['', Validators.required ],
      name: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.exampleForm = this.fb.group({
      mail: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required),
      
    });
  }

  onSubmit(value){
    console.log(value)
    this.firebaseService.signup(value.mail,value.password).then(res=>{
      this.firebaseService.createUser(value,this.avatarLink)
      this.router.navigate(['/login']);})
    

    
  }


}
