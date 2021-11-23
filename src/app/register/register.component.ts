import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AllFirebaseServiceService } from '../all-firebase-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  progressStatus:boolean = false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  accountType:string;
  username:string;
  email:string;
  password:string;
  confirmPass:string;
  userUid:any;
  avatarFile:File = null;
  avatarFileUrl :any  = "assets/avatar.png";
  avatarUrlFirebase:any;

  constructor(private firebaseServ:AllFirebaseServiceService,
    private afAuth:AngularFireAuth,
    private router:Router,
    private afStorage: AngularFireStorage) {

    }

    registerFormGroup = new FormGroup({
      selectTypeControl:new FormControl('',[
        Validators.required
      ]),
      userNameControl:new FormControl('',[
        Validators.required,
        Validators.maxLength(15)
      ]),
      emailControl:new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      passwordControl:new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      confirmPassControl:new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])
    })



  ngOnInit(): void {
  }

  imageSelector(event){
    this.avatarFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarFileUrl = reader.result;
    };
    reader.readAsDataURL(this.avatarFile);
  }

  registerUser(){
    this.progressStatus = true;
    if(this.avatarFile !== null){

      let storageRef = firebase.storage().ref();
      let avatarRef = storageRef.child('AllUserImages/'+this.username);

      avatarRef.put(this.avatarFile).then(()=>{
        this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{

          avatarRef.getDownloadURL().then(url=>{
            this.avatarUrlFirebase = url;

            this.afAuth.user.subscribe(userData=>{
              if(userData !== null){
                this.firebaseServ.setUserAccount({
                  imgFile:this.avatarUrlFirebase,
                  username:this.username,
                  email:this.email,
                  password:this.password,
                  accountType:this.accountType
                },userData.uid).then(()=>{
                  this.router.navigate(['/login']);
                  this.progressStatus = false;
                })
              }
            })

          });
        })

      });
    }else{
      this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
        this.afAuth.user.subscribe(userData=>{
          if(userData !== null){
            this.firebaseServ.setUserAccount({
              imgFile:this.avatarUrlFirebase,
              username:this.username,
              email:this.email,
              password:this.password,
              accountType:this.accountType
            },userData.uid).then(()=>{
              this.router.navigate(['/login']);
              this.progressStatus = false;
            })
          }
        })
      })
    }




  }



}
