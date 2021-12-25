export class Blockchain {
  private _http = `https://api.zilliqa.com/`;

  public async getTransaction(...hash: string[]) {
    const batch = hash.map((hash) => ({
      method: `GetTransaction`,
      params: [hash],
      id: 1,
      jsonrpc: `2.0`,
    }));
    const res = await fetch(this._http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}
