import React from "react";
import { Chart } from "react-google-charts";

export const App = ({ userData, dailyData }) => {
  console.log("dailyData:", dailyData);
  const data = [
    ["Type", "Calories"],
    ["Remaining Calories", dailyData.TDEE - dailyData.caloriesConsumed],
    ["Consumed Calories", dailyData.caloriesConsumed],
  ];

  const options = {
    legend: "none",
    pieSliceText: "none",
    pieSliceBorderColor: "transparent",
    backgroundColor: {
      fill: "transparent",
    },
    pieHole: 0.85,
    is3D: false,
    slices: {
      0: { color: "#FFFFFF" }, // Remaining Calories
      1: { color: "#35373D" }, // Consumed Calories
    },
    width: "26vh", // Set the width of the chart
    height: "26vh", // Set the height of the chart
  };

  return <Chart chartType="PieChart" data={data} options={options} />;
};
