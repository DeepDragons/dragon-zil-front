export enum Methods {
  Dragons = 'dragons',
  Dragon = 'dragon'
}

export interface DragonObject {
  children: string[];
  parents: string[];
  actions: Array<string[]>;
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

export interface PaginationObject {
  current_page: number;
  limit: number;
  pages: number;
  records: number;
}

export class DragonAPI {
  private _host = 'http://127.0.0.1:8083';
  private _api = 'api/v1';

  public async getDragons(owner: string, limit = 6, offset = 0) {
    owner = String(owner).toLowerCase();
    const params = `owner=${owner}&limit=${limit}&offset=${offset}`;
    const url = `${this._host}/${this._api}/${Methods.Dragons}?${params}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return {
        list: [] as DragonObject[],
        pagination: {
          limit,
          current_page: 0,
          pages: offset,
          records: 0
        } as PaginationObject
      };
    }

    const result = await res.json();

    return {
      list: result.data as DragonObject[],
      pagination: result.pagination as PaginationObject
    };
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