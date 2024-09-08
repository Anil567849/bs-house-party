
import React from "react";
import {DateRangePicker} from "@nextui-org/react";

export default function App({date, setDate}: {date: any, setDate: any}) {


  return (
      <DateRangePicker
        fullWidth
        granularity="second"
        value={date}
        onChange={setDate}
        className="border rounded-lg"
      />
  );
}
