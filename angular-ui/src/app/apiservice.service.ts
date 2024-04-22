import { Injectable } from '@angular/core';

class APIService {

  protected _baseUrl: string;

  constructor(apiBaseUrl: string, serviceName: string) {
    this._baseUrl = apiBaseUrl + "/" + serviceName
  }

  async findById(id: number) {
    const response = await fetch(this._baseUrl + "/" + id);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async findAll() {
    const response = await fetch(this._baseUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async create(entity: any) {
    console.log(entity)
    const response = await fetch(this._baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async delete(id: any) {
    const response = await fetch(this._baseUrl + "/" + id, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  async getDefaultColumns() {
    const response = await fetch(this._baseUrl + "/columns/default");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async getAdditionalColumns() {
    const response = await fetch(this._baseUrl + "/columns");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async addAdditionalColumn(name: string) {
    const response = await fetch(this._baseUrl + "/columns/" + name, {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  async deleteAdditionalColumn(name: string) {
    const response = await fetch(this._baseUrl + "/columns/" + name, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

}

class ClientsService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'clients');
  }

  // Additional methods specific to the ClientsService class can be added here
}

class MaterialsService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'materials');
  }

  // Additional methods specific to the MaterialsService class can be added here
}

class ProjectsService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'projects');
  }

  async findForClient(id: number) {
    const response = await fetch(this._baseUrl + "/client?clientId=" + id);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  // Additional methods specific to the ProjectsService class can be added here
}

class SuppliersService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'suppliers');
  }

  // Additional methods specific to the SuppliersService class can be added here
}

class TeamsService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'teams');
  }

  // Additional methods specific to the TeamsService class can be added here
}

class TechsService extends APIService {
  constructor(apiBaseUrl: string) {
    super(apiBaseUrl, 'techs');
  }
}

class MiscService {

  constructor(private _baseUrl: string) { }

  async findTechAndMaterials() {
    const response = await fetch(this._baseUrl + "/misc/techs-and-materials");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async findMaterialsByProject() {
    const response = await fetch(this._baseUrl + "/misc/materials-by-project");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async findReadiness(readiness: number) {
    const response = await fetch(this._baseUrl + "/misc/project-readiness?readiness=" + readiness);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async findDeadlines() {
    const response = await fetch(this._baseUrl + "/misc/deadlines");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async findCurrentProjects() {
    const response = await fetch(this._baseUrl + "/misc/current-projects");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }
}

@Injectable({
  providedIn: 'root'
})
export class Api {

  private _baseUrl: string;

  constructor() {
    this._baseUrl = "http://localhost:8080/api";
  }

  clientService() {
    return new ClientsService(this._baseUrl);
  }

  materialService() {
    return new MaterialsService(this._baseUrl);
  }

  projectService() {
    return new ProjectsService(this._baseUrl);
  }

  supplierService() {
    return new SuppliersService(this._baseUrl);
  }

  teamService() {
    return new TeamsService(this._baseUrl);
  }

  techService() {
    return new TechsService(this._baseUrl);
  }

  miscService() {
    return new MiscService(this._baseUrl);
  }
}
