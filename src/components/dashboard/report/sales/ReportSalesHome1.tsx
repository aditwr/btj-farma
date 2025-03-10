import React, { useEffect, useState } from 'react'
import {
  DatePicker,
  Select,
  Space,
} from "antd";
const { Option } = Select;
import { RangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import axios from 'axios';
import ReportSalesHomeContent from './ReportSalesHomeContent';

type PickerType = "date" | "week" | "month";

const PickerWithType = ({
  type,
  defaultValue,
  onChange,
}: {
    type: PickerType;
  defaultValue?: [Dayjs, Dayjs];
  onChange: RangePickerProps["onChange"];
}) => {
    switch (type) {
      case "date":
        return <RangePicker defaultValue={defaultValue} onChange={onChange} />;
      case "week":
        return <RangePicker defaultValue={defaultValue} onChange={onChange} />;
      case "month":
        return <RangePicker picker="month" onChange={onChange} />;
      default:
        return <RangePicker onChange={onChange} />;
    }
};

const getCurrentMonthRange = (): [Dayjs, Dayjs] => {
  const startDate = dayjs().startOf('month');
  const endDate = dayjs().endOf('month');
  return [startDate, endDate];
};

function ReportSalesHome() {
  const [salesData, setSalesData] = useState([]);
  const [type, setType] = useState<PickerType>("date");
  const [range, setRange] = useState<[Dayjs, Dayjs]>(
    // create new day.js object of current month
    getCurrentMonthRange()
  ); // day.js object
  useEffect(() => {
    const apiParams: { [key: string]: unknown } = {};
    switch (type) {
      case "date":
        apiParams.startDate = range[0].format("YYYY-MM-DD");
        apiParams.endDate = range[1].format("YYYY-MM-DD");
        break;
      case "week":
        apiParams.startDate = range[0].format("YYYY-MM-DD");
        apiParams.endDate = range[1].format("YYYY-MM-DD");
        break;
      case "month":
        apiParams.startMonth = range[0].format("YYYY-MM") + "-01";
        apiParams.endMonth = range[1].format("YYYY-MM") + "-31";
        console.log(range[0].format("M"))
        break;
      default:
    }

    // api call (parameter: date, week, month, quarter, year)
    axios.post('/api/sales', { apiParams }).then((res) => {
      setSalesData(res.data.data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);
  
  return (
    <div>
      <div className="">
        <div className="mb-2">
          <p className="">
            Show Business Key Performance Indicators/KPI based on :
          </p>
        </div>
        <Space>
          <Select aria-label="Picker Type" value={type} onChange={setType}>
            <Option value="date">Date</Option>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
          </Select>
          <PickerWithType
            type={type}
            defaultValue={range}
            onChange={(value) => {
              if (value && value[0] && value[1]) {
                setRange([value[0], value[1]]);
              }
            }}
          />
        </Space>
      </div>
      <div className="">
        <ReportSalesHomeContent salesData={salesData} timeType={type}  />
      </div>
    </div>
  );
}

export default ReportSalesHome
