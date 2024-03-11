import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { percentileData } from "../App";

const ResponseTimeChart = ({ data }: { data: percentileData[] }) => {
  return (
    <div style={{ width: "1400px", height: 600 }}>
      <div>
        <h1>Response Time Chart</h1>
      </div>

      <LineChart width={1400} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 40, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="1%" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="25%" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="50%" stroke="#ffc658" dot={false} />
        <Line type="monotone" dataKey="75%" stroke="#ff7300" dot={false} />
        <Line type="monotone" dataKey="99%" stroke="#ff0000" dot={false} />
      </LineChart>

      <hr />
    </div>
  );
};

export default ResponseTimeChart;
