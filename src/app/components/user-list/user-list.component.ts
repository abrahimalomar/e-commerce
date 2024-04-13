import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
 
  users: IUser[] = [];
  constructor(private auth:AuthService){}
  ngOnInit(): void {
  this.getUser();
  }

  // getUser(){
  // this.users=  this.auth.getAllUser();
  // }
  getUser() {
    this.auth.getAllUser().subscribe(
      resopnse => {
        this.users = resopnse; // تعيين البيانات التي تم الحصول عليها إلى مصفوفة المستخدمين
      },
      error => {
        console.log(error); // التعامل مع الخطأ هنا
      }
    );
  }
}
