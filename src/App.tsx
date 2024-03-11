import { useEffect, useState } from "react";
import "./App.css";
import TPSChart from "./components/TPSChart";
import AverageResponseTimeChart from "./components/AverageResponseTimeChart";
import ResponseTimeChart from "./components/ResponseTimeChart";

export type Data = {
  [key: string]: number[];
};

export interface ProcessedData {
  [key: string]: number[];
}

export type ObjectEntry = {
  name: string;
  pv: number;
};

export type averageResponseTime = {
  [key: string]: number;
};

export type percentileData = {
  [key: string]: string | number;
};

export type DataEntry = [string, number[]];

function App() {
  const [data, setData] = useState<ObjectEntry[]>([]);
  const [averageResponseTime, setAverageResponseTime] = useState<ObjectEntry[]>(
    []
  );
  const [percentileData, setPercentileData] = useState<percentileData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // https://storage.googleapis.com/beagle-static-web/test3.txt 에서 데이터를 가져옵니다.
        const response = await fetch(
          "https://storage.googleapis.com/beagle-static-web/test3.txt"
        );
        const rawData: string = await response.text();
        const processedData = processRawData(rawData);
        const objToArr = Object.entries(processedData).map(([key, value]) => {
          return {
            name: key,
            pv: value.length,
          };
        });

        const averageResponseTime = calculateAverageResponseTime(processedData);
        const objToArr2 = Object.entries(averageResponseTime).map(
          ([key, value]) => {
            return {
              name: key,
              pv: value,
            };
          }
        );

        const percentileData = calculatePercentile(processedData);
        const objToArr3 = Object.entries(percentileData).map(([key, value]) => {
          return {
            name: key,
            "1%": value[0],
            "25%": value[1],
            "50%": value[2],
            "75%": value[3],
            "99%": value[4],
          };
        });

        setData(objToArr);
        setAverageResponseTime(objToArr2);
        setPercentileData(objToArr3);
      } catch (error) {
        console.error("Failed to fetch and process data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Test For Uplus</div>
      <TPSChart data={data} />
      <AverageResponseTimeChart data={averageResponseTime} />
      <ResponseTimeChart data={percentileData} />
    </>
  );
}

function processRawData(rawData: string): ProcessedData {
  const processedData: ProcessedData = rawData
    .split("|")
    .reduce((acc, item) => {
      const [timestamp, valueString] = item.split(":");
      const date = new Date(Number(timestamp))
        .toISOString()
        .split(".")[0]
        .split("T")[1];
      const value = Number(valueString);

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(value);

      return acc;
    }, {} as ProcessedData);

  return processedData;
}

function calculateAverageResponseTime(
  data: ProcessedData
): averageResponseTime {
  const averageResponseTime: averageResponseTime = Object.entries(data).reduce(
    (acc, [key, value]) => {
      const average = value.reduce((acc, item) => acc + item, 0) / value.length;
      acc[key] = average;
      return acc;
    },
    {} as averageResponseTime
  );

  return averageResponseTime;
}

// 1,25,50,75,95 percentile
function calculatePercentile(data: Data): Data {
  const percentileData: Data = Object.entries(data).reduce(
    (acc, [key, value]) => {
      const sorted = value.sort((a, b) => a - b);
      const length = sorted.length;
      const percentile1 = sorted[Math.floor(length * 0.01)];
      const percentile25 = sorted[Math.floor(length * 0.25)];
      const percentile50 = sorted[Math.floor(length * 0.5)];
      const percentile75 = sorted[Math.floor(length * 0.75)];
      const percentile99 = sorted[Math.floor(length * 0.99)];

      acc[key] = [
        percentile1,
        percentile25,
        percentile50,
        percentile75,
        percentile99,
      ];
      return acc;
    },
    {} as Data
  );

  return percentileData;
}

export default App;
