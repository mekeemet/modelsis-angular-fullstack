import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Models/ResponseAPI';
import { Utilisateur } from '../Models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  host = environment.baseUrl;
  jwtToken !:any;
  user_id!: number;
  username!: string;
  roles!: Array<any>;
  connected_user!:any;
  constructor(private http:HttpClient) { }


  register(utilisateur:Utilisateur){
    return this.http.post<ResponseApi>(this.host+'register',utilisateur,{observe:'response'});
  }
  login(user:Utilisateur){
    return this.http.post(this.host + 'login', user, {observe: 'response'});
  }
  saveToken(jwt: any){
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    this.parseJWT();
  }

  parseJWT(){
    const jwtHelpers = new JwtHelperService();
    let objJWT = jwtHelpers.decodeToken(this.jwtToken);
    this.username = objJWT.sub;
    this.user_id = objJWT.user_id;
    this.roles = objJWT.roles;
  }

  loadToken(){
  this.jwtToken = localStorage.getItem('token');
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams(){
    this.jwtToken = undefined;
    this.username = '';
    this.roles = [];
  }
  isAdmin(){
    return this.roles.indexOf('ADMIN') >= 0;
  }
  isUser(){
    return this.roles.indexOf('USER') >= 0;
  }
  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }}
