export enum Methods {
  Dragons = 'dragons'
}

export class DragonAPI {
  private _host = 'http://127.0.0.1:8083';
  private _api = 'api/v1';
  
  constructor() {
    
  }

  public async getDragons(owner: string) {
    owner = String(owner).toLowerCase();
    const params = `owner=${owner}`;
    const url = `${this._host}/${this._api}/${Methods.Dragons}?${params}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return [];
    }

    const result = await res.json();

    console.log(result);
  }

  public async getDragon(id: string) {
    const url = `${this._host}/${this._api}/${Methods.Dragons}/${id}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return [];
    }

    const result = await res.json();

    console.log(result);
  }
}
