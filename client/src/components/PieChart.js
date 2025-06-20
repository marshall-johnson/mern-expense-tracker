import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ totals }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      datalabels: {
        color: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 4,
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`;
        },
      },
    },
  };

  const data = {
    labels: ["Expenses", "Savings", "Bills"],

    datasets: [
      {
        label: "Spent",
        data: [totals.expenseSpent, totals.savingsSpent, totals.billsSpent],
        backgroundColor: ["#C6164A", "#DEB415", "#F78300"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie className="pie-chart" data={data} options={options} />;
};

export default PieChart;
