import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
} from "recharts";

const AnalyticsChart =
({ results }) => {

 const chartData =
 results.map(
 (item,index)=>({

  interview:
  index + 1,

  score:
  item.overallScore,

 })
 );

 return (

 <ResponsiveContainer
 width="100%"
 height={400}
 >

 <LineChart
 data={chartData}
 >

 <XAxis
 dataKey="interview"
 />

 <YAxis />

 <Tooltip />

 <Line
 type="monotone"
 dataKey="score"
 />

 </LineChart>

 </ResponsiveContainer>

 );

};

export default
AnalyticsChart;