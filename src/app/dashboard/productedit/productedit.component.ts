import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeProduct } from 'src/app/Models/TypeProduct';
import { ProductService } from 'src/app/services/product.service';
import { TypeProductService } from 'src/app/services/type-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
  typeProducts!:TypeProduct[];
  productFormGroup!:FormGroup;
  constructor(private productService:ProductService,private typeProductService:TypeProductService, @Inject(MAT_DIALOG_DATA) public data:any,private _formbuilder:FormBuilder,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.productFormGroup=this._formbuilder.group({
      name:[this.data.name],
      typeProductid:[this.data.typeProduct.id],

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
    this.productService.editProduct(this.data.id,this.productFormGroup.value).subscribe(
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
