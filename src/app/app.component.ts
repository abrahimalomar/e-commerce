import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
  constructor(private authservice:AuthService,private router:Router){}
  logout(): void {
    
    this.authservice.clearUserId();
 
    this.router.navigate(['/login']);
  }
}

