import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FirebaseService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    email: [
      { type: 'required', message: 'Se necesita un correo.' },
      { type: 'pattern', message: 'Ingrese un correo válido.' },
    ],
    password: [
      { type: 'required', message: 'Se necesita una contraseña.' },
      {
        type: 'minlength',
        message:
          'La contraseña debería tener un tamaño mínimo de 5 caractéres.',
      },
    ],
  };

  constructor(
    private navCtrl: NavController,
    private authService: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  tryRegister(value) {
    this.authService.signup(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage =
          'Ahora inicia sesión y chatea con tu amigo o crush, tranqui que todo es secreto ;)';
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
