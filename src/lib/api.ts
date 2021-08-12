export enum Methods {
  Dragons = 'dragons',
  Dragon = 'dragon'
}

export interface DragonObject {
  children: string[];
  parents: string[];
  fight_lose: number;
  fight_win: number;
  gen_fight: string;
  gen_image: string;
  id: string;
  owner: string;
  rarity: number;
  stage: number;
  url: string;
}

export class DragonAPI {
  private _host = 'http://127.0.0.1:8083';
  private _api = 'api/v1';

  public async getDragons(owner: string): Promise<DragonObject[]> {
    owner = String(owner).toLowerCase();
    const params = `owner=${owner}`;
    const url = `${this._host}/${this._api}/${Methods.Dragons}?${params}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return [];
    }

    const result = await res.json();

    console.log(result);

    return [];
  }

  public async getDragon(id: string): Promise<DragonObject | null> {
    const url = `${this._host}/${this._api}/${Methods.Dragon}/${id}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return null;
    }

    const { data } = await res.json();

    return data[0];
  }
}
