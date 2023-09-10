import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

export const data = {

};

export function Chart(props) {
  return <Doughnut data={{
    labels: ["Completed", "Pending,"],
    datasets: [
      {
        //   label: '# of Votes',
        data: [props.completed, props.pending],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }
  } />;
}
