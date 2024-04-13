import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IRegister } from '../../models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userName = this.registerForm.value.userName;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const phoneNumber = this.registerForm.value.phoneNumber;
      
      const registerationDate: IRegister = {
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber
      };

      console.log(registerationDate);

      this.authservice.register(registerationDate).subscribe(
        response => {
          console.log(response);
          this.registerForm.reset();
        },
        error => {
          console.log(error);

        }
      )

    }


  }
}
