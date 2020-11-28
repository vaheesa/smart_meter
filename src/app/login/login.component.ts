import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";

  validation_messages = {
   'mail': [
     { type: 'required', message: 'Name is required.' }
   ],
   'password': [
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
      password: ['', Validators.required ]
    });
  }

  

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.exampleForm = this.fb.group({
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      
    });
  }

  onSubmit(value){
    console.log(value)
    this.firebaseService.login(value.mail,value.password).then(res=>{this.router.navigate(['/page2']);}
      
    )
    
  }



}
