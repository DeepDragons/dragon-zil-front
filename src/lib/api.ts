export enum BackendMethods {
  Dragons = `dragons`,
  Market = `market`,
  Battle = `battle`,
  Breed = `breed`,
}

export interface DragonObject {
  children: string[];
  parents: string[];
  actions: Array<string[]>;
  fights_lose: number;
  fights_win: number;
  gen_fight: string;
  gen_image: string;
  id: string;
  owner: string;
  rarity: number;
  stage: number;
  url: string;
  name?: string;
  wounds: string[];
}

export interface QueryParams {
  limit: number;
  offset: number;
  owner?: string;
  stage?: number;
  sort?: number; // 0 and _ - id, 1 - rarity, 2 - strong, 3 - price
  startPrice?: number;
  endPrice?: number;
}

export interface PaginationObject {
  current_page: number;
  limit: number;
  pages: number;
  records: number;
}

export class DragonAPI {
  private _host = process.browser
    ? `http://127.0.0.1:8083`
    : `http://127.0.0.1:8083`;

  private _api = `api/v1`;

  public async getDragons(params: QueryParams) {
    let url = new URL(
      `${this._host}/${this._api}/${BackendMethods.Dragons}?${params}`,
    );
    url = this._addParams(url, params);
    const res = await fetch(url.toString());

    if (res.status !== 200) {
      throw new Error(String(res.status));
    }

    const result = await res.json();

    return {
      list: result.data as DragonObject[],
      pagination: result.pagination as PaginationObject,
    };
  }

  public async getDragon(id: string): Promise<DragonObject | null> {
    const url = `${this._host}/${this._api}/${BackendMethods.Dragons}/${id}`;
    const res = await fetch(url);

    if (res.status === 404) {
      return null;
    }

    const { data } = await res.json();

    return data[0];
  }

  public async getDragonsFromMarket(params: QueryParams) {
    let url = new URL(`${this._host}/${this._api}/${BackendMethods.Market}`);
    url = this._addParams(url, params);
    const res = await fetch(url.toString());

    if (res.status === 404) {
      return {
        list: [] as DragonObject[],
        pagination: {
          limit: params.limit,
          current_page: 0,
          pages: params.offset,
          records: 0,
        } as PaginationObject,
      };
    }

    const result = await res.json();

    return {
      list: result.data as DragonObject[],
      pagination: result.pagination as PaginationObject,
    };
  }

  public async getDragonsFromFight(limit = 6, offset = 0) {
    const params = `limit=${limit}&offset=${offset}`;
    const url = `${this._host}/${this._api}/${BackendMethods.Battle}?${params}`;
    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error(String(res.status));
    }

    const result = await res.json();

    return {
      list: result.data as DragonObject[],
      pagination: result.pagination as PaginationObject,
    };
  }

  public async getDragonsFromBreed(params: QueryParams) {
    let url = new URL(`${this._host}/${this._api}/${BackendMethods.Breed}`);
    url = this._addParams(url, params);
    const res = await fetch(url.toString());

    if (res.status !== 200) {
      throw new Error(String(res.status));
    }

    const result = await res.json();

    return {
      list: result.data as DragonObject[],
      pagination: result.pagination as PaginationObject,
    };
  }

  private _addParams(url: URL, params: QueryParams) {
    if (params.endPrice && Number(params.endPrice) > 0) {
      url.searchParams.set(`end_price`, String(params.endPrice * 10 ** 12));
    }
    if (params.startPrice && Number(params.startPrice) > 0) {
      url.searchParams.set(`start_price`, String(params.startPrice * 10 ** 12));
    }
    if (params.limit) {
      url.searchParams.set(`limit`, String(params.limit));
    }
    if (params.offset) {
      url.searchParams.set(`offset`, String(params.offset));
    }
    if (params.owner) {
      url.searchParams.set(`owner`, String(params.owner));
    }
    if (params.sort) {
      url.searchParams.set(`sort`, String(params.sort));
    }
    if (!isNaN(Number(params.stage))) {
      url.searchParams.set(`stage`, String(params.stage));
    }

    return url;
  }
}
