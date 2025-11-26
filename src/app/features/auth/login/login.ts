import { NgClass } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {

  titulo: string = '';
  subtitulo: string = 'Insira seus dados de login abaixo:';
  loginForm!: FormGroup;
  hidePassword = true;
  formsView: boolean = true;
  loadingIcon: boolean = false;
  showButtonContact: boolean = false;
  isTheNewVisitant: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') { // A merda do SSR fica tentando achar o localstorage, para não dar erro, chamamos essa condicao para setar o titulo de primeira visita
      const visited = localStorage.getItem('visited');

      console.log(visited);
  
      if(!visited) {
        this.isTheNewVisitant = true;
        this.titulo = 'Fala Dev, Seja muito bem-vindo!';
  
        localStorage.setItem('visited', 'true');
      } else {
        this.isTheNewVisitant = false;
        this.titulo = 'Fala Dev, Bem-vindo de volta!';
      }
    }
  }

  togglePassword(inputId: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;

    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Novo tipo:', input.type);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loadingIcon = true;
    this.formsView = false;
    this.titulo = 'Quase lá';
    this.subtitulo = 'Estamos confirmando seus dados';

    const data = this.loginForm.value;

    this.auth.login(data).subscribe({
      next: (response) => {
        this.loadingIcon = false;
        this.showButtonContact = false;

        this.titulo = 'Tudo certo!';
        this.subtitulo = 'Seus dados foram confirmados com sucesso.';

        console.log('eae?', response);

        localStorage.setItem('token', response.token);
        this.router.navigate(['']); //Jogar para o dash

      }, error: (error) => {
        this.loadingIcon = true;
        this.showButtonContact = true;

        this.titulo = 'Ops... algo deu errado';
        this.subtitulo = 'Verifique os dados e tente novamente.';

        console.log('error?', error);
      }
    })
  }

  navigate(value: string) {
    switch (value) {
      case 'register':
        this.router.navigate(['/register']);
        break;

      case 'forgot':
        this.router.navigate(['/forgot']);
        break;

      case 'registerCompany':
        this.router.navigate(['/register-company']);
        break;
    }
  }

  asErrorReset() {
    this.titulo = 'Fala Dev, Bem-vindo de Volta!';
    this.subtitulo = 'Insira seus dados de login abaixo:';
    this.formsView = true
    this.loadingIcon = false;
    this.showButtonContact = false;
  }
}
