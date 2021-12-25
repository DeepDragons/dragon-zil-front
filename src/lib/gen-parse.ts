export function genParse(_genNumber: string) {
  const shortGens = _genNumber.substr(_genNumber.length - 42, 40);
  const gens = String(shortGens).split(/(..)/g);
  const gensArray = gens.filter((el) => el !== ``).map((el) => Number(el));

  return gensArray.reverse();
}
