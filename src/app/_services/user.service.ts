import { apiViaCEP } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: any;

  constructor(private http: HttpClient) { }

  getUser(id: any) {

    let tokenStr = 'Bearer' + this.token;

    const headers = new HttpHeaders().set("Authorization", tokenStr);

    return this.http.get<any>(`${baseUrl}/api/v1/users/getUserId/${id}`, { headers, responseType: 'text' as 'json' });

}

  createUser( user: Object):Observable<Object>{

    let tokenStr = 'Bearer' + this.token;

    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post(`${baseUrl}/api/v1/users`, user, { headers, responseType: 'text' as 'json' });
  }
  
  updateUser(id: number, value: any):Observable<any> {

    let tokenStr = 'Bearer' + this.token;

    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put<any>(`${baseUrl}/api/v1/users/${id}`, value, { headers, responseType: 'text' as 'json' });
  }

  getUserList() {

    let tokenStr = 'Bearer' + this.token;

    const headers = new HttpHeaders().set("Authorization", tokenStr);
    console.log('token enviado', headers);
    return this.http.get<any>(`${baseUrl}/api/v1/users/list`, { headers, responseType: 'text' as 'json' });
  }

  deleteUser(id: number):Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/users/${id}`, { responseType: 'text'});
  }

  buscarCep(cep: string) {
    return this.http.get(`${apiViaCEP}/${cep}/json/`);
  }

  
}

