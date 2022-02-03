import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { TypeProductService } from 'src/app/services/type-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-product-add',
  templateUrl: './type-product-add.component.html',
  styleUrls: ['./type-product-add.component.css']
})
export class TypeProductAddComponent implements OnInit {
  typeProductFormGroup!:FormGroup
  constructor(private _formbuilder:FormBuilder ,private typeProductService:TypeProductService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.typeProductFormGroup=this._formbuilder.group({
      id:['',],
      name:['',Validators.required,]
  })
  }
  closeModal(){
    this.dialog.closeAll();
  }
  onSubmit(){
    this.typeProductService.addTypeProduct(this.typeProductFormGroup.value).subscribe(
      (data)=>{
        if(data.statut==200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.description,
            showConfirmButton: false,
            timer: 1500
          })
          this.dialog.closeAll();
        }else if(data.statut==500){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.description,
            footer: ''
          })
          this.dialog.closeAll();
      }
      },error=>{
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
