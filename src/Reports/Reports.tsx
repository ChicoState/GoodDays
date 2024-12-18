import React, { useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label, Cell, Line, ComposedChart } from 'recharts';
import { JournalEntry } from "../journal";
import { JournalContext, useJournal } from "../JournalContext";
import { scaleLinear } from 'd3-scale';
import { sampleCorrelation } from "simple-statistics";
import { startOfYear, addWeeks, format, startOfWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';


// Function to filter data for a specific week
const getWeekData = (data: JournalEntry[], startDate: Date) => {
  const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 0 });
  const endOfWeekDate = new Date(startOfWeekDate);
  endOfWeekDate.setDate(startOfWeekDate.getDate() + 6); // End of the week 

  return data.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startOfWeekDate && entryDate <= endOfWeekDate;
  });
};



//color gradient for bar graph
const colorScale = scaleLinear<string>()
  .domain([1, 3, 5, 10, 18]) // 1 is red, 3 is orange, 5 is yellow, 10 is green, all the way up is more green
  .range(["#cf2900","#e68620", "#fef200", "#34ba36", "#12a114"]);

//expiramenting with customizations

//end expiramentation

//graphs
export const LineChartComponent: React.FC<{
  reportGraph: JournalEntry[];
  dataKey: string;
  yAxisLabel: string;
}> = ({ reportGraph, dataKey, yAxisLabel}) => {
  return (
    <ComposedChart
      width={500}
      height={300}
      barGap={10}
      barSize={80} 
      data={reportGraph}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
    
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date">
        <Label value="Date" offset={-10} position="insideBottom" />
      </XAxis>
      
      //y axis for bar/line chart
      <YAxis domain={[0, 10]}>
        <Label value={yAxisLabel} angle={-90} position="insideLeft" />
      </YAxis>

      {/* Bar graph with gradient color */}
      <Bar dataKey={dataKey} name="Bar Data">
        {reportGraph.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colorScale(entry[dataKey])} />
        ))}
      </Bar>


      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#5e5c56" 
        strokeWidth={1} 
        dot={{ fill: '#5e5c56', r: 2 }}
      />
    </ComposedChart>
    
  );
};

function getMean(arr: number[]): number {
  if (arr.length === 0) throw new Error("Array cannot be empty");
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

function getStd(arr: number[]): number {
  if (arr.length === 0) throw new Error("Array cannot be empty");

  const mean = getMean(arr);
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function getMax(arr: number[]): number {
  if (arr.length === 0) throw new Error("Array cannot be empty");

  return Math.max(...arr);
}

function getMin(arr: number[]): number {
  if (arr.length === 0) throw new Error("Array cannot be empty");

  return Math.min(...arr);
}


const VarTable = () => {
  const { journalList } = useJournal();

  const activeArr = [];
  const sleepingArr = [];
  const focusedArr = [];
  const screenArr = [];
  const outsideArr = [];
  const readingArr = [];
  const moodArr = [];


  // add values to arrays
  journalList.forEach( entry => {
    activeArr.push(entry.hoursActive);
    sleepingArr.push(entry.hoursSleeping);
    focusedArr.push(entry.hoursFocused);
    screenArr.push(entry.hoursOnScreen);
    outsideArr.push(entry.hoursOutside);
    readingArr.push(entry.hoursReading);
    moodArr.push(entry.mood);
  })

  // define vars for table
  const variables = [
    { name: "Hours Active", values: activeArr },
    { name: "Hours Sleeping", values: sleepingArr },
    { name: "Hours Focused", values: focusedArr },
    { name: "Hours on Screen", values: screenArr },
    { name: "Hours Outside", values: outsideArr },
    { name: "Hours Reading", values: readingArr },
    { name: "Mood", values: moodArr },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Statistic</th>
          {variables.map((variable) => (
            <th key={variable.name}>{variable.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Mean row */}
        <tr>
          <td>Mean</td>
          {variables.map((variable) => (
            <td key={`mean-${variable.name}`}>
              {getMean(variable.values).toFixed(2)}
            </td>
          ))}
        </tr>
        {/* Standard Deviation row */}
        <tr>
          <td>Standard Deviation</td>
          {variables.map((variable) => (
            <td key={`std-${variable.name}`}>
              {getStd(variable.values).toFixed(2)}
            </td>
          ))}
        </tr>
        {/* Max row */}
        <tr>
          <td>Max</td>
          {variables.map((variable) => (
            <td key={`max-${variable.name}`}>
              {getMax(variable.values).toFixed(2)}
            </td>
          ))}
        </tr>
        {/* Min row */}
        <tr>
          <td>Min</td>
          {variables.map((variable) => (
            <td key={`min-${variable.name}`}>
              {getMin(variable.values).toFixed(2)}
            </td>
          ))}
        </tr>
        {/* Correlation row */}
        <tr>
          <td>Correlation</td>
          {variables.map((variable) => (
            <td key={`min-${variable.name}`}>
              {sampleCorrelation(variable.values, moodArr).toFixed(2)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

type ReportsProps = {};

// Reports component to show the data for selected week
const Reports: React.FC = () => {
  const { journalList } = useJournal(); // Assuming you're using context to get journal data
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date()); // Default to current date

  // Generate weeks for the entire year
  const weeks = [];
  const startOfYearDate = startOfYear(new Date());
  for (let i = 0; i < 52; i++) {
    const weekStartDate = addWeeks(startOfYearDate, i);
    weeks.push({
      label: `Week of ${format(startOfWeek(weekStartDate, { weekStartsOn: 0 }), 'MMM dd, yyyy')}`,
      value: startOfWeek(weekStartDate, { weekStartsOn: 0 }),
    });
  }

  // Handle week selection from dropdown
  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeek = new Date(event.target.value);
    setSelectedWeek(selectedWeek);
  };

  // Get data for the selected week
  const currentWeekData = getWeekData(journalList, selectedWeek);

  return (
    <div>
      <h2>Reports Section</h2>

      {/* Dropdown for week selection */}
      <div>
        <label htmlFor="week-select">Select a Week: </label>
        <select id="week-select" onChange={handleWeekChange} value={selectedWeek.toISOString()}>
          {weeks.map(week => (
            <option key={week.value.toString()} value={week.value.toISOString()}>
              {week.label}
            </option>
          ))}
        </select>
      </div>
      <VarTable></VarTable>
      <h4>Hours Active</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursActive" yAxisLabel="Hours Active" />
      <h4>Hours Sleeping</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursSleeping" yAxisLabel="Hours Sleeping" />
      <h4>Hours Focused </h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursFocused" yAxisLabel="Hours Focused"  />
      <h4>Hours on Screen</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursOnScreen" yAxisLabel="Hours On Screen"  />
      <h4>Hours Outside</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursOutside" yAxisLabel="Hours Outside" />
      <h4>Hours Reading</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="hoursReading" yAxisLabel="Hours Reading" />
      <h4>Mood</h4>
      <LineChartComponent reportGraph={currentWeekData} dataKey="mood" yAxisLabel="Mood"  />
    </div>
  );
};

export default Reports;
