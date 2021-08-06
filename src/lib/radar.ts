import { Chart, registerables } from 'chart.js';

export class Radar {
  private _gens: string;
  private _char: Chart;

  constructor(gens: string, ctx: Element) {
    this._gens = gens;
    Chart.register(...registerables);
    this._char = new Chart(ctx, {
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
          data: [65, 59, 90, 81, 56, 55, 40, 77, 11, 99],
          fill: false,
          backgroundColor: '#e8313e87',
          borderColor: '#E8313E',
          pointBackgroundColor: '#E8313E',
          pointHoverBorderColor: '#E8313E'
        }, {
          label: 'Defence',
          data: [28, 48, 40, 19, 96, 27, 100, 22, 55, 77],
          fill: false,
          backgroundColor: '#06c19070',
          borderColor: '#06C190',
          pointHoverBorderColor: '#06C190'
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
}