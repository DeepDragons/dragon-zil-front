import { ACTION } from 'config/action';

export function getAction(actinos?: Array<string[]>) {
  if (actinos && actinos.length > 0 && actinos[0][0]) {
    return ACTION[Number(actinos[0][0])];
  }

  return '';
}
