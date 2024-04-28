import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Api} from "../apiservice.service";
import {ModalService} from "../modal.service";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionPanelDescription} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButton, MatIcon, MatMiniFabButton, MatIconButton, MatFabButton, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionPanelDescription, FormsModule, MatInput],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'angular-ui';

  @ViewChild('pieChart', { static: true }) pieChart!: ElementRef;

  data: [any] | undefined;
  additionalColumns: any;

  creds = "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892";

  tab: string = "projects";
  activeService: any = this.api.projectService();
  authenticated: boolean = true;
  username: string;

  techsAndMaterials: any;
  materialsByProject: any;
  materials: any;

  readiness: number = 50;
  readinessData: any;

  currentProjects: any;

  deadlines: any;

  constructor(private api: Api, private modalService: ModalService, private route: ActivatedRoute, private router: Router,
              private snackBar: MatSnackBar) {
    api.projectService().findAll().then(data => this.data = data);
    api.projectService().getAdditionalColumns().then(data => this.additionalColumns = data);
    this.authenticated = this.isAuth();
    this.username = route.snapshot.queryParams["user"];
    api.miscService().findTechAndMaterials().then(data => this.techsAndMaterials = data);
    api.miscService().findMaterialsByProject().then(data => this.materialsByProject = data);
    this.updateReadiness();
    api.miscService().findDeadlines().then(data => this.deadlines = data);
    api.miscService().findCurrentProjects().then(data => this.currentProjects = data);
    api.materialService().findAll().then(data => this.materials = data);
  }

  ngOnInit() {
    if (!this.authenticated && this.route.snapshot.queryParams["auth"] !== "no") {
      this.router.navigate(['login'], { queryParams: { error: true } })
    }
  }

  isAuth() {
    const auth = this.route.snapshot.queryParams["auth"]
    return auth === this.creds;
  }

  async openTabNoService(tab: string) {
    this.tab = tab;
    this.activeService = null;
  }

  async openTab(tab: string, service: any) {
    this.tab = "";
    this.activeService = service;

    await this.activeService.findAll().then((data: any) => this.data = data);
    await this.activeService.getAdditionalColumns().then((data: any) => this.additionalColumns = data);

    this.tab = tab;
  }

  openProjectsTab() {
    this.openTab("projects", this.api.projectService());
  }

  openClientsTab() {
    this.openTab("clients", this.api.clientService());
  }

  openTeamsTab() {
    this.openTab("teams", this.api.teamService());
  }

  openSuppliersTab() {
    this.openTab("suppliers", this.api.supplierService());
  }

  openMaterialsTab() {
    this.openTab("materials", this.api.materialService());
  }

  openTechsTab() {
    this.openTab("techs", this.api.techService());
  }

  openOtherTab() {
    this.openTabNoService("other");
  }

  openCurrentTab() {
    switch (this.tab) {
      case "projects": this.openProjectsTab(); break;
      case "clients": this.openClientsTab(); break;
      case "teams": this.openTeamsTab(); break;
      case "suppliers": this.openSuppliersTab(); break;
      case "materials": this.openMaterialsTab(); break;
      case "techs": this.openTechsTab(); break;
    }
  }

  addColumn() {
    const fields = [
      {name: 'name', type: 'text', placeholder: 'Enter column name...'},
    ];

    const dialogRef = this.modalService.openModal('Create new column', fields);

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.activeService.addAdditionalColumn(result.name).then(() => this.openCurrentTab());
    });

  }

  protected readonly console = console;

  removeColumn(column: string) {
    this.activeService.deleteAdditionalColumn(column).then(() => this.openCurrentTab());
  }

  async addClient() {
    const fields = [
      {name: 'name', type: 'text', 'placeholder': 'Enter client name...'},
      {name: 'phone', type: 'text', 'placeholder': 'Enter client phone...'},
      {name: 'email', type: 'text', 'placeholder': 'Enter client email...'},
    ];
    for (let column of await this.api.clientService().getAdditionalColumns()) {
      fields.push({ name: column, type: 'text', placeholder: column });
    }

    const dialogRef = this.modalService.openModal('Create new client', fields);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = { ...result }; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.phone; // Exclude the 'phone' property
      delete additionalColumns.email; // Exclude the 'email' property

      this.api.clientService().create({
        name: result.name,
        phone: result.phone,
        email: result.email,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async addTeam() {
    const fields = [
      {name: 'name', type: 'text', 'placeholder': 'Enter team name...'},
      {name: 'members', type: 'number', 'placeholder': 'Enter team members count...'},
    ];
    for (let column of await this.api.teamService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Create new team', fields);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = { ...result }; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.members; // Exclude the 'phone' property

      this.api.teamService().create({
        name: result.name,
        members: result.members,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async addSupplier() {
    const fields = [
      {name: 'name', type: 'text', 'placeholder': 'Enter supplier name...'},
    ];
    for (let column of await this.api.supplierService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Create new supplier', fields);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property

      this.api.supplierService().create({
        name: result.name,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async addMaterial() {

    const optionSupplier = async () => {
      const options = [];
      const suppliers = await this.api.supplierService().findAll();
      for (let supplier of suppliers) {
        options.push({name: supplier.id, displayName: supplier.name});
      }
      return options;
    }



    const fields = [
      {name: 'name',     type: 'text',   placeholder: 'Enter material name...'},
      {name: 'quantity', type: 'number', placeholder: 'Enter material quantity...'},
      {name: 'unit',     type: 'text',   placeholder: 'Enter material unit...'},
      {name: 'supplier', type: 'text',   placeholder: 'Choose supplier...', optionSupplier: optionSupplier}
    ];
    const buttons = [
      {text: 'Add supplier', ref: () => this.addSupplier()}
    ];
    for (let column of await this.api.materialService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Create new material', fields, buttons);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.quantity; // Exclude the 'name' property
      delete additionalColumns.unit; // Exclude the 'name' property
      delete additionalColumns.supplier; // Exclude the 'name' property

      this.api.materialService().create({
        name: result.name,
        quantity: result.quantity,
        unit: result.unit,
        supplier: { id: result.supplier },
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async addTech() {

    const optionSupplier = async () => {
      const options = [];
      const suppliers = await this.api.supplierService().findAll();
      for (let supplier of suppliers) {
        options.push({name: supplier.id, displayName: supplier.name});
      }
      return options;
    }

    const fields = [
      {name: 'name',     type: 'text',   placeholder: 'Enter tech name...'},
      {name: 'supplier', type: 'text',   placeholder: 'Choose supplier...', optionSupplier: optionSupplier}
    ];
    const buttons = [
      {text: 'Add supplier', ref: () => this.addSupplier()}
    ];
    for (let column of await this.api.techService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Create new tech', fields, buttons);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.supplier; // Exclude the 'name' property

      this.api.techService().create({
        name: result.name,
        supplier: { id: result.supplier },
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async addProject() {

    const client = async () => {
      const options = [];
      const clients = await this.api.clientService().findAll();
      for (let client of clients) {
        options.push({name: client.id, displayName: client.name})
      }
      return options;
    }

    const team = async () => {
      const options = [];
      const teams = await this.api.teamService().findAll();
      for (let team of teams) {
        options.push({name: team.id, displayName: team.name});
      }
      return options;
    }

    const material = async () => {
      const options = [];
      const materials = await this.api.materialService().findAll();
      for (let material of materials) {
        options.push({name: material.id, displayName: material.name + "(" + material.supplier.name + ")"})
      }
      return options;
    }

    const techs = async () => {
      const options = [];
      const techs = await this.api.techService().findAll();
      for (let tech of techs) {
        options.push({name: tech.id, displayName: tech.name + "(" + tech.supplier.name + ")"})
      }
      return options;
    }

    const types = async () => {
      return [
        {name: "Concrete", displayName: "Concrete"},
        {name: "Composite", displayName: "Composite"},
        {name: "Propylene", displayName: "Propylene"},
      ];
    }

    const fields = [
      {name: 'client', type: 'text', placeholder: 'Choose client...', optionSupplier: client},
      {name: 'team', type: 'text', placeholder: 'Choose team...', optionSupplier: team},
      {name: 'type', type: 'text', placeholder: 'Choose type...', optionSupplier: types},
      {name: 'price', type: 'number', placeholder: 'Enter price...'},
      {name: 'startDate', type: 'date', placeholder: 'Enter start date...'},
      {name: 'date', type: 'date', placeholder: "Enter end date..."},
      {name: 'materials', type: 'text', placeholder: 'Choose materials...', multiSelectSupplier: material},
      {name: 'techs', type: 'text', placeholder: 'Choose techs...', multiSelectSupplier: techs},
    ];

    const buttons = [
      {text: 'Add client', ref: () => this.addClient()},
      {text: 'Add team', ref: () => this.addTeam()},
      {text: 'Add material', ref: () => this.addMaterial()},
      {text: 'Add tech', ref: () => this.addTech()}
    ];

    for (let column of await this.api.projectService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', placeholder: column});
    }

    const dialogRef = this.modalService.openModal('Create new project', fields, buttons);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      console.log(result);

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.client;
      delete additionalColumns.team;
      delete additionalColumns.type;
      delete additionalColumns.price;
      delete additionalColumns.date;
      delete additionalColumns.materials;
      delete additionalColumns.techs;
      delete additionalColumns.startDate;

      const materials = [];
      for (let mat of result.materials) {
        materials.push({key:{materialId: mat}, quantity: 0});
      }

      const techs = [];
      for (let tech of result.techs) {
        techs.push({key:{techId: tech}, quantity: 0 })
      }

      if (result.date <= result.startDate) {
        this.snackBar.open("ERROR: End date must be after start date.", "OK");
        return;
      }

      const projects = await this.api.projectService().findAll();
      for (let project of projects) {
        if (project.team.id != result.team) {
          continue;
        }

        if (! (project.date < result.startDate || result.date < project.startDate) ) {
          this.snackBar.open("ERROR: Team is already working on project in this period.", "OK");
          return;
        }
      }

      this.api.projectService().create({
        client: { id: result.client },
        team: { id: result.team },
        type: result.type,
        price: result.price,
        startDate: result.startDate,
        date: result.date,
        materials: materials,
        techs: techs,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  removeEntity(id: number) {
    this.activeService.delete(id).then(() => this.openCurrentTab());
  }

  async editProject(project: any) {

    const client = async () => {
      const options = [];
      const clients = await this.api.clientService().findAll();
      for (let client of clients) {
        options.push({name: client.id, displayName: client.name})
      }
      return options;
    }

    const team = async () => {
      const options = [];
      const teams = await this.api.teamService().findAll();
      for (let team of teams) {
        options.push({name: team.id, displayName: team.name});
      }
      return options;
    }

    const material = async () => {
      const options = [];
      const materials = await this.api.materialService().findAll();
      for (let material of materials) {
        options.push({name: material.id, displayName: material.name + "(" + material.supplier.name + ")"})
      }
      return options;
    }

    const techs = async () => {
      const options = [];
      const techs = await this.api.techService().findAll();
      for (let tech of techs) {
        options.push({name: tech.id, displayName: tech.name + "(" + tech.supplier.name + ")"})
      }
      return options;
    }

    const types = async () => {
      return [
        {name: "Concrete", displayName: "Concrete"},
        {name: "Composite", displayName: "Composite"},
        {name: "Propylene", displayName: "Propylene"},
      ];
    }

    const givenMats: any = [];
    for (let mat of project.materials) {
      givenMats.push(mat.key.materialId);
    }

    const givenTechs: any = [];
    for (let tech of project.techs) {
      givenTechs.push(tech.key.techId);
    }

    const fields = [
      {name: 'client', type: 'text', placeholder: 'Choose client...', value: project.client.id, optionSupplier: client},
      {name: 'team', type: 'text', placeholder: 'Choose team...', value: project.team.id, optionSupplier: team},
      {name: 'type', type: 'text', placeholder: 'Choose type...', value: project.type, optionSupplier: types},
      {name: 'price', type: 'number', placeholder: 'Enter price...', value: project.price},
      {name: 'startDate', type: 'date', placeholder: 'Enter start date...', value: project.startDate},
      {name: 'date', type: 'date', placeholder: "Enter date...", value: project.date},
      {name: 'materials', type: 'text', placeholder: 'Choose materials...', value: givenMats, multiSelectSupplier: material},
      {name: 'techs', type: 'text', placeholder: 'Choose techs...', value: givenTechs, multiSelectSupplier: techs},
    ];

    const buttons = [
      {text: 'Add client', ref: () => this.addClient()},
      {text: 'Add team', ref: () => this.addTeam()},
      {text: 'Add material', ref: () => this.addMaterial()},
      {text: 'Add tech', ref: () => this.addTech()}
    ];

    for (let column of await this.api.projectService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', value: project.additionalColumns[column], placeholder: column});
    }

    const dialogRef = this.modalService.openModal('Edit project', fields, buttons);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      console.log(result);

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.client;
      delete additionalColumns.team;
      delete additionalColumns.type;
      delete additionalColumns.price;
      delete additionalColumns.date;
      delete additionalColumns.materials;
      delete additionalColumns.techs;
      delete additionalColumns.startDate;

      const materials = [];
      for (let mat of result.materials) {
        materials.push({key:{materialId: mat}, quantity: 0});
      }

      const techs = [];
      for (let tech of result.techs) {
        techs.push({key:{techId: tech}, quantity: 0 })
      }

      if (result.date <= result.startDate) {
        this.snackBar.open("ERROR: End date must be after start date.", "OK");
        return;
      }

      const projects = await this.api.projectService().findAll();
      for (let pr1 of projects) {
        if (pr1.id == project.id) {
          continue;
        }

        if (pr1.team.id != result.team) {
          continue;
        }

        if (! (pr1.date < result.startDate || result.date < pr1.startDate) ) {
          this.snackBar.open("ERROR: Team is already working on project in this period.", "OK");
          return;
        }
      }

      this.api.projectService().create({
        id: project.id,
        client: { id: result.client },
        team: { id: result.team },
        type: result.type,
        price: result.price,
        startDate: result.startDate,
        date: result.date,
        materials: materials,
        techs: techs,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async editClient(client: any) {
    const fields = [
      {name: 'name', type: 'text', value: client.name, 'placeholder': 'Enter client name...'},
      {name: 'phone', type: 'text', value: client.phone, 'placeholder': 'Enter client phone...'},
      {name: 'email', type: 'text', value: client.email, 'placeholder': 'Enter client email...'},
    ];

    for (let column of await this.api.clientService().getAdditionalColumns()) {
      fields.push({ name: column, type: 'text', value: client.additionalColumns[column], placeholder: column });
    }

    const dialogRef = this.modalService.openModal('Edit client', fields);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = { ...result }; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.phone; // Exclude the 'phone' property
      delete additionalColumns.email; // Exclude the 'email' property

      this.api.clientService().create({
        id: client.id,
        name: result.name,
        phone: result.phone,
        email: result.email,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async editTech(tech: any) {

    const optionSupplier = async () => {
      const options = [];
      const suppliers = await this.api.supplierService().findAll();
      for (let supplier of suppliers) {
        options.push({name: supplier.id, displayName: supplier.name});
      }
      return options;
    }

    const fields = [
      {name: 'name',     type: 'text', value: tech.name,         placeholder: 'Enter tech name...'},
      {name: 'supplier', type: 'text', value: tech.supplier.id,  placeholder: 'Choose supplier...', optionSupplier: optionSupplier}
    ];
    const buttons = [
      {text: 'Add supplier', ref: () => this.addSupplier()}
    ];
    for (let column of await this.api.techService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', value: tech.additionalColumns[column], placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Edit tech', fields, buttons);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.supplier; // Exclude the 'name' property

      this.api.techService().create({
        id: tech.id,
        name: result.name,
        supplier: { id: result.supplier },
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  async editMaterial(material: any) {

    const optionSupplier = async () => {
      const options = [];
      const suppliers = await this.api.supplierService().findAll();
      for (let supplier of suppliers) {
        options.push({name: supplier.id, displayName: supplier.name});
      }
      return options;
    }

    const fields = [
      {name: 'name',     type: 'text',   value: material.name,     placeholder: 'Enter material name...'},
      {name: 'quantity', type: 'number', value: material.quantity, placeholder: 'Enter material quantity...'},
      {name: 'unit',     type: 'text',   value: material.unit,     placeholder: 'Enter material unit...'},
      {name: 'supplier', type: 'text',   value: material.supplier.id, placeholder: 'Choose supplier...', optionSupplier: optionSupplier}
    ];
    const buttons = [
      {text: 'Add supplier', ref: () => this.addSupplier()}
    ];
    for (let column of await this.api.materialService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', value: material.additionalColumns[column], placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Edit material', fields, buttons);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.quantity; // Exclude the 'name' property
      delete additionalColumns.unit; // Exclude the 'name' property
      delete additionalColumns.supplier; // Exclude the 'name' property

      this.api.materialService().create({
        id: material.id,
        name: result.name,
        quantity: result.quantity,
        unit: result.unit,
        supplier: { id: result.supplier },
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }
  async editTeam(team: any) {
    const fields = [
      {name: 'name', type: 'text', value: team.name, 'placeholder': 'Enter team name...'},
      {name: 'members', type: 'number', value: team.members, 'placeholder': 'Enter team members count...'},
    ];
    for (let column of await this.api.teamService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', value: team.additionalColumns[column], placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Create new client', fields);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = { ...result }; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property
      delete additionalColumns.members; // Exclude the 'phone' property

      this.api.teamService().create({
        id: team.id,
        name: result.name,
        members: result.members,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }
  async editSupplier(supplier: any) {
    const fields = [
      {name: 'name', type: 'text', value: supplier.name, 'placeholder': 'Enter supplier name...'},
    ];
    for (let column of await this.api.supplierService().getAdditionalColumns()) {
      fields.push({name: column, type: 'text', value: supplier.additionalColumns[column], placeholder: column});
    }
    const dialogRef = this.modalService.openModal('Edit supplier', fields);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined) return;

      const additionalColumns = {...result}; // Create a copy of the result object

      delete additionalColumns.name; // Exclude the 'name' property

      this.api.supplierService().create({
        id: supplier.id,
        name: result.name,
        additionalColumns: {
          ...additionalColumns
        }
      })
        .then(() => this.openCurrentTab());
    });
  }

  generateReport(invoiceData: any) {
    const invoiceContent = `
    <div style="display: flex; justify-content: center;">
        <img alt="logo" width="40%" src="assets/logo.png">
    </div>

    <h1>Invoice</h1>
    <hr>
    <div class="client-info">
      <p><strong>Client:</strong> ${invoiceData.client.name}</p>
      <p><strong>Phone:</strong> ${invoiceData.client.phone}</p>
      <p><strong>Email:</strong> ${invoiceData.client.email}</p>
    </div>
    <div class="invoice-details">
      <p><strong>Invoice ID:</strong> ${invoiceData.id}</p>
      <p><strong>Date:</strong> ${invoiceData.date}</p>
    </div>
    <h2>Materials</h2>
    <table class="materials-table">
      <thead>
        <tr>
          <th>Material Name</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Supplier</th>
        </tr>
      </thead>
      <tbody>
        ${invoiceData.materials
      .map(
        (material: any) => `
            <tr>
              <td>${material.material.name}</td>
              <td>${material.quantity}</td>
              <td>${material.material.unit}</td>
              <td>${material.material.supplier.name}</td>
            </tr>
          `
      )
      .join('')}
      </tbody>
    </table>
    <h2>Techs:</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
            </tr>
        </thead>
        <tbody>
        ${invoiceData.techs
      .map(
        (material: any) => `
            <tr>
              <td>${material.tech.name}</td>
              <td>${material.quantity}</td>
              <td>${material.tech.supplier.name}</td>
            </tr>
          `
      )
      .join('')}
      </tbody>
    </table>

    <h2>Additional info:</h2>
    ${Object.entries(invoiceData.additionalColumns)
      .map(([key, value], hz) => `
        <p><strong>${key}</strong>: ${value}</p>
      `)}

    <div class="total-amount">
      <p><strong>Total Amount:</strong> ${invoiceData.price}</p>
    </div>
  `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
            }
            h1 {
              font-size: 24px;
              text-align: center;
              margin-bottom: 20px;
            }
            hr {
              border: none;
              border-top: 1px solid #ccc;
              margin-bottom: 20px;
            }
            .client-info {
              margin-bottom: 20px;
            }
            .invoice-details {
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .total-amount {
              text-align: right;
            }
          </style>
        </head>
        <body>
          ${invoiceContent}
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  protected readonly matchMedia = matchMedia;

  logout() {
    this.router.navigate(['login']);

  }

  send(client: any) {
    window.open("mailto:" + client.email, );
  }
  updateReadiness() {
    this.api.miscService().findReadiness(this.readiness).then(data => this.readinessData = data);
  }
  protected readonly Math = Math;

  viewProjects(client: any) {
    this.router.navigate(["client"], { queryParams: {
      clientId: client.id,
      user: this.route.snapshot.queryParams["user"],
      auth: this.route.snapshot.queryParams["auth"],
    } })
  }
}
