import { ACTION } from 'config/action';

export function getAction(actinos?: Array<string[]>) {
  if (actinos && actinos.length > 0 && actinos[0][0]) {
    return ACTION[Number(actinos[0][0])];
  }

  return '';
}

export function getMarketOrder(actinos?: Array<string[]>) {
  if (actinos && actinos.length > 1 && actinos[1][1]) {
    return String(actinos[1][1]);
  }

  return 'incorect order';
}

export function getMarketPrice(actinos?: Array<string[]>) {
  if (actinos && actinos.length > 0 && actinos[0][1]) {
    return String(actinos[0][1]);
  }

  return '0';
}
