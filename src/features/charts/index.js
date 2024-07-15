import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import PieChart from "./components/PieChart";
import ScatterChart from "./components/ScatterChart";
import StackBarChart from "./components/StackBarChart";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import DataTableItems from "../../components/items/DataTableItems";
import { TheData } from "../../components/items/data";
import TitleCard from "../../components/Cards/TitleCard";
import DataTableTweets from "../../components/Tweets/DataTableTweets";
import DataTableWords from "../../components/words/DataTableWords";
import { initialTweets } from "../../components/Tweets/data";
import { initialWords } from "../../components/words/data";

function Charts() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };
  const [tweets, setTweets] = useState(initialTweets);
  const [words, setWords] = useState(initialWords);
  return (
    <>
      <TitleCard>
        <DataTableItems data={TheData} />{" "}
      </TitleCard>{" "}
      <TitleCard>
        <DataTableTweets data={tweets} />{" "}
      </TitleCard>{" "}
      <TitleCard>
        <DataTableWords data={words} />{" "}
      </TitleCard>{" "}
    </>
  );
}

export default Charts;
