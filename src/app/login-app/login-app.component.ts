import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  email:string;
  password:string;
  progressStatus:boolean = false;

  constructor(
    private afAuth:AngularFireAuth,
    private snackBar:MatSnackBar,
    private router:Router) {

    }

    loginFormGroup = new FormGroup({
      emailControl:new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      passwordControl:new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])
    })


  ngOnInit(): void {
  }




  login(){
    this.progressStatus = true;

    this.afAuth.signInWithEmailAndPassword(this.email,this.password)
    .then(()=>{
      this.progressStatus = false;
      this.router.navigate(['/all'])
    })
    .catch(error=>{
      console.log(error)
    })
  }

}
