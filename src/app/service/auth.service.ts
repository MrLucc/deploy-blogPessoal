import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UsuarioDTO } from '../model/UsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  
  entrar(usuarioDTO: UsuarioDTO): Observable<UsuarioDTO>{
    return this.http.put<UsuarioDTO>("https://blogmrlucc.herokuapp.com/usuario/login", usuarioDTO)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>("https://blogmrlucc.herokuapp.com/usuario/register", user)

  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://blogmrlucc.herokuapp.com/usuario/${id}`)
  }

  update(user: User): Observable<User>{
    return this.http.put<User>("https://blogmrlucc.herokuapp.com/usuario/update", user, this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ""){
      ok = true
    }

    return ok
  }

}
