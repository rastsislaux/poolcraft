import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Api} from "../apiservice.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit {
  client!: any;
  additionalColumns: any;
  projects: any;

  authenticated: boolean = true;
  username: string;

  creds = "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892";

  constructor(protected route: ActivatedRoute, private api: Api, private router: Router) {
    this.authenticated = this.isAuth();
    this.username = route.snapshot.queryParams["user"];

    api.clientService().findById(route.snapshot.queryParams["clientId"]).then(data => this.client = data);
    api.projectService().getAdditionalColumns().then(data => this.additionalColumns = data);
    api.projectService().findForClient(route.snapshot.queryParams["clientId"]).then(data => this.projects = data);
  }

  isAuth() {
    const auth = this.route.snapshot.queryParams["auth"]
    return auth === this.creds;
  }

  ngOnInit(): void {
    if (!this.authenticated && this.route.snapshot.queryParams["auth"] !== "no") {
      this.router.navigate(['login'], { queryParams: { error: true } })
    }
  }

}
