import React, { useState } from 'react'
type PickerType = "date" | "week" | "month";
type ChartType = "line" | "bar" | "doughnut";

function ReportSalesHomeContent({
    salesData,
    timeType,
}: {
    salesData: unknown[];
    timeType: PickerType;
  }) {
  const [chartType, setChartType] = useState<ChartType>("line");
  return (
    <div>
      Report sales home content
    </div>
  )
}

export default ReportSalesHomeContent
