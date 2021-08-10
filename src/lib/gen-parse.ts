export function genParse(_genNumber: string) {
  const gens = String(_genNumber).split(/(..)/g);
  const gensArray = gens.filter(el => el !== '').map(el => Number(el));

  return gensArray.reverse().slice(0, 21);
}
