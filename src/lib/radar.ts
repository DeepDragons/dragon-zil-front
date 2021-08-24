import { Colors } from '@/config/colors';
import { Chart, registerables } from 'chart.js';
import { DragonObject } from './api';
import { genParse } from './gen-parse';

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
  const firstGens = genParse(first.gen_fight).splice(1);
  const secondGens = genParse(second.gen_fight).splice(1);

  Chart.register(...registerables);
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Array.from({length: 20}, (e, i)=> String(i + 1)),
      datasets: [{
        label: `#${first.id}`,
        data: firstGens,
        fill: false,
        backgroundColor: Colors.Primary + '87',
        borderColor: Colors.Primary,
        pointBackgroundColor: Colors.Primary,
        pointHoverBorderColor: Colors.Primary
      }, {
        label: `#${second.id}`,
        data: secondGens,
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
