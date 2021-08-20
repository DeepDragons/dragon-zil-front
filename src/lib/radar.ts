import { Colors } from '@/config/colors';
import { Chart, registerables } from 'chart.js';

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
