enum Methods {
  Address = 'address'
}

const url = 'https://viewblock.io/zilliqa';

export function viewAddress(address: string) {
  return `${url}/${Methods.Address}/${address}`;
}
