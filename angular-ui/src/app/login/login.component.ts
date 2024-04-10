import {Component, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { SHA256 } from 'crypto-js';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    MatCardTitle,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  wrongPassword: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.wrongPassword = this.route.snapshot.queryParams["error"] === 'true';
  }

  onLogin() {
    const hash = SHA256(this.username + this.password).toString()
    this.router.navigate(['main'], { queryParams: { user: this.username, auth: hash }})
  }

  onLimited() {
    this.router.navigate(['main'], { queryParams: { user: "Worker", auth: "no" } })
  }

}
