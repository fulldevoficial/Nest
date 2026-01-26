import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from "@app/features/components/dialog/dialog";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Dialog],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private _snackBar = inject(MatSnackBar);

  titulo = '';
  subtitulo = 'Insira seus dados de login abaixo:';
  loginForm!: FormGroup;
  hidePassword = true;
  loadingIcon = false;
  isTheNewVisitant = true;
  returnUrl = '/dashboard';
  errorMessage = signal('');
  showLoadingDialog = signal(false);
  showErrorDialog = signal(false);
  dialogErrorMessage = signal('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('visited');

      console.log(visited);

      if (!visited) {
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

    this.errorMessage.set('');
    this.showLoadingDialog.set(true);

    const credentials = this.loginForm.value;

    this.auth.login(credentials).subscribe({
      next: (response) => {
        this.loadingIcon = false;
        this.showLoadingDialog.set(false);

        this.titulo = 'Tudo certo!';
        this.subtitulo = 'Seus dados foram confirmados com sucesso.';

        console.log('Login bem-sucedido:', response);

        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 1000);
      },
      error: (error) => {
        this.showLoadingDialog.set(false);
        this.showErrorDialog.set(true);
        this.errorMessage.set(error.message || 'Email ou senha incorretos');
        this._snackBar.open(error.message, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.loadingIcon = false;

        console.error('Erro no login:', error);
      },
    });
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
    this.titulo = this.isTheNewVisitant
      ? 'Fala Dev, Seja muito bem-vindo!'
      : 'Fala Dev, Bem-vindo de volta!';
    this.subtitulo = 'Insira seus dados de login abaixo:';
    this.loadingIcon = false;
    this.errorMessage.set('');
  }

  closeErrorDialog(e: boolean) {
    this.showErrorDialog.set(e);
  }
}
