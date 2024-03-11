import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ObjectEntry } from "../App";

const TPSChart = ({ data }: { data: ObjectEntry[] }) => {
  return (
    <div style={{ width: "1400px", height: 600 }}>
      <div>
        <h1>Total Requests per second (TPS) Chart</h1>
      </div>

      <LineChart width={1400} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 40, right: 30 }} />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={false} />
      </LineChart>

      <hr />
    </div>
  );
};

export default TPSChart;
