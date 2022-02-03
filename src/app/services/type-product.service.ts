import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Models/ResponseAPI';
import { TypeProduct } from '../Models/TypeProduct';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  constructor(private authService:AuthentificationService,private http:HttpClient) { }

  getTypeProduct(){
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.authService.jwtToken});
    return this.http.get<ResponseApi>(this.authService.host+'api/productTypes',{headers:headers});
  }

  addTypeProduct(typeProduct: TypeProduct) {
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.authService.jwtToken});
    return this.http.post<ResponseApi>(this.authService.host+'api/saveproductType', typeProduct,{headers:headers});
  }

}
