import { Colors } from '@/config/colors';
import { Chart, registerables } from 'chart.js';
import { DragonObject } from './api';
import { genParse } from './gen-parse';
import { RARITY } from './rarity';


let char:  Chart<"radar", number[], string> | null = null;
export function radar(gens: Array<number[]>, ctx: HTMLCanvasElement) {
  Chart.register(...registerables);
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'
      ],
      datasets: [{
        label: 'Attack',
        data: gens[1],
        fill: false,
        backgroundColor: '#e8313e87',
        borderColor: '#E8313E',
        pointBackgroundColor: '#E8313E',
        pointHoverBorderColor: '#E8313E'
      }, {
        label: 'Defence',
        data: gens[0],
        fill: false,
        backgroundColor: Colors.Success + '70',
        borderColor: Colors.Success,
        pointHoverBorderColor: Colors.Success
      }]
    },
    options: {
      elements: {
        line: {
          borderWidth: 1
        }
      }
    }
  });
}

export function compareRadar(first: DragonObject, second: DragonObject, ctx: HTMLCanvasElement) {
  const firstGens = genParse(first.gen_fight);
  const secondGens = genParse(second.gen_fight);
  const firstColor = RARITY[first.rarity].color;
  const secondColor = first.rarity === second.rarity
    ? RARITY[second.rarity].color + '50' : RARITY[second.rarity].color;
  const data = {
    labels: Array.from({length: 20}, (e, i)=> String(i + 1)),
    datasets: [{
      label: `#${second.id}`,
      data: secondGens,
      fill: false,
      backgroundColor: secondColor + '70',
      borderColor: secondColor,
      pointBackgroundColor: secondColor,
      pointHoverBorderColor: secondColor
    }, {
      label: `#${first.id}`,
      data: firstGens,
      fill: false,
      backgroundColor: firstColor + '87',
      borderColor: firstColor,
      pointBackgroundColor: firstColor,
      pointHoverBorderColor: firstColor
    }]
  };
  Chart.register(...registerables);

  if (char) {
    char.data = data;
    char.update();

    return char;
  }

  char = new Chart(ctx, {
    data,
    type: 'radar',
    options: {
      elements: {
        line: {
          borderWidth: 1
        }
      }
    }
  });

  return char;
}
