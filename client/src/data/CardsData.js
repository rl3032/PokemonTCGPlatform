export const cards = [
  {
    id: "base1-4",
    name: "Charizard",
    hp: "120",
    types: ["Fire"],
    abilities: [
      {
        name: "Energy Burn",
        text: "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Fire Spin",
        cost: ["Fire", "Fire", "Fire", "Fire"],
        convertedEnergyCost: 4,
        damage: "100",
        text: "Discard 2 Energy cards attached to Charizard in order to use this attack.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/4.png",
    price: {
      low: 250,
      mid: 313.19,
      high: 999.0,
      market: 386.97,
    },
  },
  {
    id: "base1-2",
    name: "Blastoise",
    hp: "100",
    types: ["Water"],
    abilities: [
      {
        name: "Rain Dance",
        text: "As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn't use up your 1 Energy card attachment for the turn.) This power can't be used if Blastoise is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Hydro Pump",
        cost: ["Water", "Water", "Water"],
        convertedEnergyCost: 3,
        damage: "40+",
        text: "Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/2.png",
    price: {
      low: 73.23,
      mid: 104.0,
      high: 194.79,
      market: 118.7,
    },
  },
  {
    id: "base1-15",
    name: "Venusaur",
    hp: "100",
    types: ["Grass"],
    abilities: [
      {
        name: "Energy Trans",
        text: "As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can't be used if Venusaur is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Solarbeam",
        cost: ["Grass", "Grass", "Grass", "Grass"],
        convertedEnergyCost: 4,
        damage: "60+",
        text: "Does 60 damage plus 10 more damage for each Grass Energy attached to Venusaur but not used to pay for this attack's Energy cost. You can't add more than 20 damage in this way.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/15.png",
    price: {
      low: 49.95,
      mid: 79.99,
      high: 249.98,
      market: 94.07,
    },
  },
  {
    id: "base1-8",
    name: "Machamp",
    hp: "100",
    types: ["Fighting"],
    abilities: [
      {
        name: "Strikes Back",
        text: "Whenever your opponent's attack damages Machamp (even if Machamp is Knocked Out), this power does 10 damage to the attacking Pokémon. (Don't apply Weakness and Resistance.) This power can't be used if Machamp is Asleep, Confused, or Paralyzed when your opponent attacks.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Seismic Toss",
        cost: ["Fighting", "Fighting", "Fighting", "Colorless"],
        convertedEnergyCost: 4,
        damage: "60",
        text: "",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/8.png",
    price: {
      low: 57.0,
      mid: 90.0,
      high: 199.99,
      market: 89.0,
    },
  },
  {
    id: "base1-1",
    name: "Alakazam",
    hp: "80",
    types: ["Psychic"],
    abilities: [
      {
        name: "Damage Swap",
        text: "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to another as long as you don't Knock Out that Pokémon. This power can't be used if Alakazam is Asleep, Confused, or Paralyzed.",
        type: "Pokémon Power",
      },
    ],
    attacks: [
      {
        name: "Confuse Ray",
        cost: ["Psychic", "Psychic", "Colorless"],
        convertedEnergyCost: 3,
        damage: "30",
        text: "Flip a coin. If heads, the Defending Pokémon is now Confused.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/1.png",
    price: {
      low: 33.0,
      mid: 55.0,
      high: 99.99,
      market: 52.0,
    },
  },
  {
    id: "base1-6",
    name: "Gyarados",
    hp: "100",
    types: ["Water"],
    abilities: [],
    attacks: [
      {
        name: "Dragon Rage",
        cost: ["Water", "Water", "Water"],
        convertedEnergyCost: 3,
        damage: "50",
        text: "",
      },
      {
        name: "Bubblebeam",
        cost: ["Water", "Water", "Water", "Water"],
        convertedEnergyCost: 4,
        damage: "40",
        text: "Flip a coin. If heads, the Defending Pokémon is now Paralyzed.",
      },
    ],
    imageUrl: "https://images.pokemontcg.io/base1/6.png",
    price: {
      low: 39.99,
      mid: 59.99,
      high: 99.99,
      market: 59.99,
    },
  },
];
