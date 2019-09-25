import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiBaseUrl:string='';
  access_token:string='jAX3OVKBCFahDc2tYPcAtAoFzfPu9FfDmBE2YaF5rTHNJe5wwxjSHMP3lufBC9YB';
  constructor(
    public http: HttpClient
  ) { 
    this.apiBaseUrl = 'http://0.0.0.0:3000/api/';
  }

  getUser(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl + 'posts?access_token=' + this.access_token).subscribe(data=>{
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
