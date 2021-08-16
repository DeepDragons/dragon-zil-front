export const RARITY = [
  {
    color: '#b0c3d9',
    name: 'Common'
  },
  {
    color: '#5e98d9',
    name: 'Uncommon'
  },
  {
    color: '#4b69ff',
    name: 'Rare'
  },
  {
    color: '#8847ff',
    name: 'Mythical'
  },
  {
    color: '#d32ce6',
    name: 'Legendary'
  },
  {
    color: '#b28a33',
    name: 'Immortal'
  },
  {
    color: '#ade55c',
    name: 'Arcane'
  },
  {
    color: '#eb4b4b',
    name: 'Ancient'
  }
];

export function getRarity(rarity: number, genschain: string) {
  const gensImage = [
    {
      max: 6,
      value: genschain.substr(3, 1)
    },
    {
      max: 8,
      value: genschain.substr(5, 1)
    },
    {
      max: 5,
      value: genschain.substr(7, 1)
    },
    {
      max: 10,
      value: genschain.substr(9, 1)
    },
    {
      max: 9,
      value: genschain.substr(11, 1)
    },
    {
      max: 6,
      value: genschain.substr(13, 1)
    },
    {
      max: 4,
      value: genschain.substr(17, 1)
    },
    {
      max: 10,
      value: genschain.substr(19, 1)
    },
    {
      max: 6,
      value: genschain.substr(21, 1)
    }
  ];

  return {
    ...RARITY[rarity],
    gensImage
  };
}
