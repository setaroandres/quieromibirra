import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiBaseUrl:string='';
  access_token:string='';
  dataUser:any;
  private dataUrl: string = "assets/data/"
  constructor(
    public http: HttpClient
  ) { 
    this.apiBaseUrl = 'http://0.0.0.0:3000/api/';
  }

  getPromos(): Observable<any>{
    return this.http.get(this.dataUrl+"promos.json");
  }
  /* getUser(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl + 'posts?access_token=' + this.access_token).subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
        
      })
    })
  } */

  createUser(user){
    var body = { 
      nombreusuario: user.nomyAp,
      email: user.email,
      contrasenia:user.pw,
      nacimiento: user.nacimiento,
      puntos: 0
    };
    console.log('body', body);

    return new Promise(resolve=>{
      this.http.post(this.apiBaseUrl + 'usuarios/replaceOrCreate', body).subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
      })
    })
  }

  /* addUser(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl + 'posts').subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
        
      })
    })
  }
  updateUser(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl + 'posts').subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
        
      })
    })
  }
  removeUser(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl + 'posts').subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
        
      })
    })
  } */
}
