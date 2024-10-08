import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cartService/cart.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  returnUrl = '';
  
  constructor(private formBuilder:FormBuilder,
     private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private route:Router){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['', [Validators.required]]
      })
      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true

    if(this.loginForm.invalid) return;
    
    this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
      this.route.navigateByUrl(this.returnUrl);
    });
  }
}
