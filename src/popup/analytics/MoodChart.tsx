import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import format from "date-fns/format";

const moods = [
  { emoji: "🤩", text: "ahhh", color: "blue", count: 4 },
  { emoji: "😊", text: "nicee", color: "green", count: 3 },
  { emoji: "😐", text: "okey", color: "orange", count: 2 },
  { emoji: "😔", text: "bummy", color: "red", count: 1 },
  { emoji: "😣", text: "rotten", color: "black", count: 0 },
];

const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getChartData = (moodData) => {
  const chartData = [];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = `${year}-${month + 1}-${i}`;
    const mood = moodData[dateString] ? moodData[dateString] : "😐";
    let moodIndex = 0;
    for (let j = 0; j < moods.length; j++) {
      if (moods[j].emoji === mood) {
        moodIndex = moods[j].count;
        break;
      }
    }
    chartData.push({ date: i, mood: moodIndex * 5 });
  }

  return chartData;
};

const MoodChart = ({ data }) => {
  const chartData = getChartData(data);

  return (
    <div>
      <h2 className="text-md mt-2 font-bold mb-4">Monthly Mood-o-Meter</h2>
      <LineChart
        width={325}
        height={250}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: -30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => value.toString()}
          label={{
            value: monthsOfYear[new Date().getMonth()],
            position: "bottom",
            offset: -8,
          }}
        />

        <YAxis
          dataKey="mood"
          tickFormatter={(value) => ["😣", "😔", "😐", "😊", "🤩"][value / 5]}
          domain={[0, 20]}
          tick={{
            fontSize: 16,
          }}
        />

        <Tooltip />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={{ r: 4 }}
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default MoodChart;
