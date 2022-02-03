import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TypeProduct } from 'src/app/Models/TypeProduct';
import { ProductService } from 'src/app/services/product.service';
import { TypeProductService } from 'src/app/services/type-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  typeProducts!:TypeProduct[];
  productFormGroup!:FormGroup;
  constructor(private productService:ProductService,private typeProductService:TypeProductService,private _formbuilder:FormBuilder,private router:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productFormGroup=this._formbuilder.group({
      id:['',],
      name:['',Validators.required,],
      typeProductid:['',Validators.required,]
  })

    this.typeProductService.getTypeProduct().subscribe(
      (data: any)=>{
        this.typeProducts=data;
      }
    )
  }
  closeModal(){
    this.dialog.closeAll();
  }
  onSubmit(){
    this.productService.addProduct(this.productFormGroup.value).subscribe(
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
