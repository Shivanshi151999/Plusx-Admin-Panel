import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import style from "./Graph.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const data = [
  { name: "2024-11-1", value: 0.3 },
  { name: "2024-11-2", value: 1 },
  { name: "2024-11-3", value: 0.125 },
  { name: "2024-11-4", value: 2 },
  { name: "2024-11-5", value: 0.1 },
  { name: "2024-11-6", value: 0.45 },
  { name: "2024-11-7", value: 0.75 },
];

const Graph = () => {
  return (
    <div className={style.graph}>
      <div className={`${style.graphContainer}`}>
        <div className={style.graphHeadingGroup}>
          <div className={style.graphHeading}>Total Request</div>
          <div className={style.menu}>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className={style.chartTime}>Weekly Count</div>
        <div className={style.chart}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#FFFFFF", fontSize: 12 }}
                axisLine={{ stroke: "#FFFFFF" }}
                tickMargin={15}
              />
              <YAxis
                domain={[0, 2]}
                tick={{ fill: "#FFFFFF", fontSize: 12 }}
                axisLine={{ stroke: "#FFFFFF" }}
                tickMargin={15}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000000",
                  border: "1px solid #00FFC3",
                  color: "#fff",
                  fontSize: "15px",
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#00FFc3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;
