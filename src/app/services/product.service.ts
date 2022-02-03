import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { ResponseApi } from '../Models/ResponseAPI';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private authService:AuthentificationService,private http:HttpClient) { }

  getProduct(){
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.authService.jwtToken});
    return this.http.get<ResponseApi>(this.authService.host+'api/products',{headers:headers});
  }

  addProduct(product: Product) {
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.authService.jwtToken});
    return this.http.post<ResponseApi>(this.authService.host+'api/saveproduct', product,{headers:headers});
  }


  editProduct(productid: number, products: Product) {
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.authService.jwtToken});
    return this.http.put<ResponseApi>(`${this.authService.host}api/updateproduct/${productid}`, products,{headers:headers});
  }
}
