import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuarios: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuarios = event.target.value
  } 

  cadastrar(){
   this.user.tipoUsuario = this.tipoUsuarios

    if(this.user.senha != this.confirmarSenha){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })      
      Toast.fire({
        icon: 'error',
        title: 'Incorrect password or email'
      })
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User)=> {
        this.user = resp
        this.router.navigate(["/entrar"])
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User registered successfully',
          showConfirmButton: false,
          timer: 5000
        })
        
      })
    }

  }

}
