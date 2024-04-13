import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LogIn } from '../models/LogIn';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private route:Router
  ){}

  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.value?.userName;
      const password = this.loginForm.value?.password;
      
      // Create a loginData object with the username and password
      const loginData: LogIn = {
        userName: userName,
        password: password
      };
 console.log('user name ',userName);
 console.log('password ',password);
 
      // Pass the loginData object to the authService.LogIn method
      this.authservice.login(loginData).subscribe(
        response=>{
          console.log('Response : ',response);
          this.route.navigate(['/product'])
        },
        error=>{
          console.log('Erorr : ',error);
          
        }
      );
    } else {
      // Handle form validation errors
    }
  }
}
