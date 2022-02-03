import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../Models/Product';
import { AuthentificationService } from '../services/authentification.service';
import { ProductService } from '../services/product.service';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { TypeProductAddComponent } from './type-product-add/type-product-add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog:MatDialog,private authService:AuthentificationService,private productService:ProductService,private router:Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products!: Product[];
  displayedColumns: string[] = ['index','nom','createdDate','actions'];
  dataSource:any;

  ngOnInit(): void {

    this.authService.loadToken();
    this.productService.getProduct().subscribe(
      (data: any) => {
          this.products = data;
          this.dataSource = new MatTableDataSource<Product>(this.products);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator = this.paginator;
      }, (error) => {
        console.log(error);
      }
    )

  }

  public doFilter = (val: any) => {
    this.dataSource.filter = val.value.trim().toLocaleLowerCase();
  }
  dialogProduit(){
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(
      ()=>{
        this.ngOnInit();
      }
    )
  }


  dialogTypeProduit(){
    const dialogRef = this.dialog.open(TypeProductAddComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(
    )
  }

  editProduct(product:Product){
      const matref = this.dialog.open(ProducteditComponent, { data: product });
      matref.afterClosed().subscribe(
        ()=>{
          this.ngOnInit();
        }
      );
  }

}
