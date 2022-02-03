import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../Models/Utilisateur';
import { AuthentificationService } from '../services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  utilisateurFormGroup!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private authService:AuthentificationService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.utilisateurFormGroup=this._formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
    });
  }
  onLogin(user:Utilisateur) {
    this.authService.login(user).subscribe(
      resp => {
        const jwt = resp.headers.get('authorization');
        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/dashboard');
      }, (error)=> {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username or Password Incorrect',
          footer: ''
        })
        this.router.navigateByUrl("/login");
      }
    );
}

}
