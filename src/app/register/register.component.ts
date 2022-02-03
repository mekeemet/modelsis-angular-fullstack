import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  utilisateurFormGroup!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private authService:AuthentificationService,private router:Router) { }

  ngOnInit(): void {

    this.utilisateurFormGroup=this._formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    });
  }

  onSubmit(){
    console.log(this.utilisateurFormGroup.value);
    this.authService.register(this.utilisateurFormGroup.value).subscribe(
      (data)=>{
        if(data.body?.statut==200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.body.description,
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/'])
        }else if(data.body?.statut==500){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.body.description,
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if(data.body?.statut==403){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.body.description,
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur Serveur',
          footer: ''
        })
      }
    )
  }
}
