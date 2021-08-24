export function getPrice(actinos?: Array<string[]>) {
  if (actinos && actinos.length > 0 && actinos[0][1]) {
    return actinos[0][1];
  }

  return '0';
}
