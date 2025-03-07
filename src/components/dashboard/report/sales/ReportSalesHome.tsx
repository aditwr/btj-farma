"use client"

import { useEffect, useState } from "react"
import { DatePicker, Select, Space, Card, Row, Col, Statistic, Divider, Radio, Checkbox, Spin, Typography } from "antd"
const { Option } = Select
const { Title, Text } = Typography
import type { RangePickerProps } from "antd/es/date-picker"
import type { Dayjs } from "dayjs"
const { RangePicker } = DatePicker
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import axios from "axios"

// Register dayjs plugins
dayjs.extend(weekOfYear)

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend,
)

type PickerType = "date" | "week" | "month"
type ChartType = "line" | "bar" | "doughnut"
type DatasetType = "sales" | "profit" | "transactions" | "aov" | "margin"

interface DatasetOption {
  key: DatasetType
  label: string
  color: string
  backgroundColor: string
}

const PickerWithType = ({
  type,
  defaultValue,
  onChange,
}: {
  type: PickerType
  defaultValue?: [Dayjs, Dayjs]
  onChange: RangePickerProps["onChange"]
}) => {
  switch (type) {
    case "date":
      return <RangePicker defaultValue={defaultValue} onChange={onChange} />
    case "week":
      return <RangePicker defaultValue={defaultValue} onChange={onChange} />
    case "month":
      return <RangePicker picker="month" onChange={onChange} />
    default:
      return <RangePicker onChange={onChange} />
  }
}

const getCurrentMonthRange = (): [Dayjs, Dayjs] => {
  const startDate = dayjs().startOf("month")
  const endDate = dayjs().endOf("month")
  return [startDate, endDate]
}

interface SalesData {
  id: number
  no_faktur: string
  nama_outlet: string
  nama_produk: string
  jumlah_produk: number
  harga_jual: number
  harga_total: number
  harga_total_ppn: number
  tgl_nota: string
  status_bayar: string
  total_profit: number
  margin_profit: number
  [key: string]: unknown
}

function ReportSalesHome() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [type, setType] = useState<PickerType>("date")
  const [chartType, setChartType] = useState<ChartType>("line")
  const [range, setRange] = useState<[Dayjs, Dayjs]>(getCurrentMonthRange())
  const [loading, setLoading] = useState(false)
  const [selectedDatasets, setSelectedDatasets] = useState<DatasetType[]>(["sales", "profit", "transactions"])
  const [activeTab, setActiveTab] = useState<string>("trends")

  // Dataset options
  const datasetOptions: DatasetOption[] = [
    { key: "sales", label: "Total Sales", color: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.5)" },
    { key: "profit", label: "Profit", color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.5)" },
    { key: "transactions", label: "Transactions", color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.5)" },
    { key: "aov", label: "Avg. Order Value", color: "#f97316", backgroundColor: "rgba(249, 115, 22, 0.5)" },
    { key: "margin", label: "Profit Margin %", color: "#8b5cf6", backgroundColor: "rgba(139, 92, 246, 0.5)" },
  ]

  // Mock data for development - remove this in production
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
         console.log(range[0].format("M"));
         break;
       default:
     }

     // api call (parameter: date, week, month, quarter, year)
     axios.post("/api/sales", { apiParams }).then((res) => {
       setSalesData(res.data.data);
     });
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [range]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const apiParams: { [key: string]: unknown } = {}
        switch (type) {
          case "date":
            apiParams.startDate = range[0].format("YYYY-MM-DD")
            apiParams.endDate = range[1].format("YYYY-MM-DD")
            break
          case "week":
            apiParams.startDate = range[0].format("YYYY-MM-DD")
            apiParams.endDate = range[1].format("YYYY-MM-DD")
            break
          case "month":
            apiParams.startMonth = range[0].format("YYYY-MM") + "-01"
            apiParams.endMonth = range[1].format("YYYY-MM") + "-31"
            break
          default:
        }

        // Uncomment this in production and remove the mock data
        // const response = await axios.post('/api/sales', { apiParams });
        // setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [range, type])

  // Group data by time period
  const groupDataByTimePeriod = () => {
    if (!salesData.length) return { labels: [], datasets: [] }

    const groupedData: {
      [key: string]: {
        sales: number
        profit: number
        transactions: number
        aov: number
        margin: number
      }
    } = {}

    salesData.forEach((sale) => {
      let timeKey
      const saleDate = dayjs(sale.tgl_nota)

      switch (type) {
        case "date":
          timeKey = saleDate.format("YYYY-MM-DD")
          break
        case "week":
          // Get the week number and year
          timeKey = `Week ${saleDate.week()} - ${saleDate.year()}`
          break
        case "month":
          timeKey = saleDate.format("MMMM YYYY")
          break
        default:
          timeKey = saleDate.format("YYYY-MM-DD")
      }

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = {
          sales: 0,
          profit: 0,
          transactions: 0,
          aov: 0,
          margin: 0,
        }
      }

      groupedData[timeKey].sales += sale.harga_total_ppn
      groupedData[timeKey].profit += sale.total_profit
      groupedData[timeKey].transactions += 1
    })

    // Calculate average order value and margin for each time period
    Object.keys(groupedData).forEach((key) => {
      if (groupedData[key].transactions > 0) {
        groupedData[key].aov = groupedData[key].sales / groupedData[key].transactions
        groupedData[key].margin = (groupedData[key].profit / groupedData[key].sales) * 100
      }
    })

    // Sort keys by date
    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
      if (type === "week") {
        // Extract week numbers for comparison
        const weekA = Number.parseInt(a.split(" ")[1])
        const weekB = Number.parseInt(b.split(" ")[1])
        return weekA - weekB
      }

      // For date and month, convert to date objects and compare
      const dateA = type === "date" ? dayjs(a) : dayjs(a, "MMMM YYYY")
      const dateB = type === "date" ? dayjs(b) : dayjs(b, "MMMM YYYY")
      return dateA.valueOf() - dateB.valueOf()
    })

    // Create datasets based on selected options
    const datasets = selectedDatasets.map((datasetKey) => {
      const option = datasetOptions.find((opt) => opt.key === datasetKey)

      // Determine if this dataset needs a secondary y-axis
      const needsSecondaryAxis = datasetKey === "transactions" || datasetKey === "margin"

      // For values that are too large, scale them down
      const scaleDown = datasetKey === "sales" || datasetKey === "profit" || datasetKey === "aov"

      return {
        label: option?.label,
        data: sortedKeys.map((key) => {
          const value = groupedData[key][datasetKey]
          return scaleDown ? Math.round(value / 1000) : value
        }),
        borderColor: option?.color,
        backgroundColor: option?.backgroundColor,
        yAxisID: needsSecondaryAxis ? "y1" : "y",
      }
    })

    return {
      labels: sortedKeys,
      datasets,
    }
  }

  // Group data by product for doughnut chart
  const groupDataByProduct = () => {
    if (!salesData.length) return { labels: [], datasets: [] }

    const productSales: { [key: string]: number } = {}

    salesData.forEach((sale) => {
      if (!productSales[sale.nama_produk]) {
        productSales[sale.nama_produk] = 0
      }
      productSales[sale.nama_produk] += sale.harga_total_ppn
    })

    // Sort by sales amount and take top 5
    const sortedProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      labels: sortedProducts.map(([product]) => product),
      datasets: [
        {
          label: "Sales by Product",
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          data: sortedProducts.map(([_, amount]) => amount),
          backgroundColor: [
            "rgba(239, 68, 68, 0.6)",
            "rgba(59, 130, 246, 0.6)",
            "rgba(234, 179, 8, 0.6)",
            "rgba(16, 185, 129, 0.6)",
            "rgba(139, 92, 246, 0.6)",
          ],
          borderColor: ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#8b5cf6"],
          borderWidth: 1,
        },
      ],
    }
  }

  // Group data by outlet for doughnut chart
  const groupDataByOutlet = () => {
    if (!salesData.length) return { labels: [], datasets: [] }

    const outletSales: { [key: string]: number } = {}

    salesData.forEach((sale) => {
      if (!outletSales[sale.nama_outlet]) {
        outletSales[sale.nama_outlet] = 0
      }
      outletSales[sale.nama_outlet] += sale.harga_total_ppn
    })

    // Sort by sales amount and take top 5
    const sortedOutlets = Object.entries(outletSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      labels: sortedOutlets.map(([outlet]) => outlet),
      datasets: [
        {
          label: "Sales by Outlet",
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          data: sortedOutlets.map(([_, amount]) => amount),
          backgroundColor: [
            "rgba(59, 130, 246, 0.6)",
            "rgba(239, 68, 68, 0.6)",
            "rgba(16, 185, 129, 0.6)",
            "rgba(234, 179, 8, 0.6)",
            "rgba(139, 92, 246, 0.6)",
          ],
          borderColor: ["#3b82f6", "#ef4444", "#10b981", "#eab308", "#8b5cf6"],
          borderWidth: 1,
        },
      ],
    }
  }

  // Calculate KPIs
  const calculateKPIs = () => {
    if (!salesData.length)
      return {
        totalSales: 0,
        totalProfit: 0,
        averageOrderValue: 0,
        transactionCount: 0,
        paidPercentage: 0,
        profitMargin: 0,
        topProduct: { name: "", sales: 0 },
        topOutlet: { name: "", sales: 0 },
      }

    const totalSales = salesData.reduce((sum, sale) => sum + sale.harga_total_ppn, 0)
    const totalProfit = salesData.reduce((sum, sale) => sum + sale.total_profit, 0)
    const transactionCount = salesData.length
    const averageOrderValue = totalSales / transactionCount
    const paidTransactions = salesData.filter((sale) => sale.status_bayar === "LUNAS").length
    const paidPercentage = (paidTransactions / transactionCount) * 100
    const profitMargin = (totalProfit / totalSales) * 100

    // Find top product
    const productSales: { [key: string]: number } = {}
    salesData.forEach((sale) => {
      if (!productSales[sale.nama_produk]) {
        productSales[sale.nama_produk] = 0
      }
      productSales[sale.nama_produk] += sale.harga_total_ppn
    })

    const topProductEntry = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0] || ["", 0]

    // Find top outlet
    const outletSales: { [key: string]: number } = {}
    salesData.forEach((sale) => {
      if (!outletSales[sale.nama_outlet]) {
        outletSales[sale.nama_outlet] = 0
      }
      outletSales[sale.nama_outlet] += sale.harga_total_ppn
    })

    const topOutletEntry = Object.entries(outletSales).sort((a, b) => b[1] - a[1])[0] || ["", 0]

    return {
      totalSales,
      totalProfit,
      averageOrderValue,
      transactionCount,
      paidPercentage,
      profitMargin,
      topProduct: { name: topProductEntry[0], sales: topProductEntry[1] },
      topOutlet: { name: topOutletEntry[0], sales: topOutletEntry[1] },
    }
  }

  const kpis = calculateKPIs()
  const chartData =
    chartType === "doughnut"
      ? activeTab === "products"
        ? groupDataByProduct()
        : groupDataByOutlet()
      : groupDataByTimePeriod()

  // Chart options
  const lineBarOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Amount (thousands Rp)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: selectedDatasets.includes("transactions") ? "Number of Transactions" : "Percentage (%)",
        },
      },
    },
  }

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: activeTab === "products" ? "Top 5 Products by Sales" : "Top 5 Outlets by Sales",
      },
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line options={lineBarOptions} data={chartData} />
      case "bar":
        return <Bar options={lineBarOptions} data={chartData} />
      case "doughnut":
        return <Doughnut options={doughnutOptions} data={chartData} />
      default:
        return <Line options={lineBarOptions} data={chartData} />
    }
  }

  const handleDatasetChange = (checkedValues: DatasetType[]) => {
    setSelectedDatasets(checkedValues)
  }

  return (
    <div className="p-4">
      <Title level={2}>Sales Report Dashboard</Title>

      <div className="mb-6">
        <Card title="Filter Data" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Text strong>Group data by time period:</Text>
              <div className="mt-2 flex flex-wrap gap-4">
                <Select aria-label="Picker Type" value={type} onChange={setType} style={{ width: 120 }}>
                  <Option value="date">Daily</Option>
                  <Option value="week">Weekly</Option>
                  <Option value="month">Monthly</Option>
                </Select>
                <PickerWithType
                  type={type}
                  defaultValue={range}
                  onChange={(value) => {
                    if (value && value[0] && value[1]) {
                      setRange([value[0], value[1]])
                    }
                  }}
                />
              </div>
            </div>

            <Divider />

            <div>
              <Text strong>Chart Type:</Text>
              <div className="mt-2">
                <Radio.Group value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <Radio.Button value="line">Line Chart</Radio.Button>
                  <Radio.Button value="bar">Bar Chart</Radio.Button>
                  <Radio.Button value="doughnut">Doughnut Chart</Radio.Button>
                </Radio.Group>
              </div>
            </div>

            {chartType !== "doughnut" && (
              <>
                <Divider />
                <div>
                  <Text strong>Select Datasets to Display:</Text>
                  <div className="mt-2">
                    <Checkbox.Group
                      options={datasetOptions.map((opt) => ({ label: opt.label, value: opt.key }))}
                      value={selectedDatasets}
                      onChange={(checkedValues) => handleDatasetChange(checkedValues as DatasetType[])}
                    />
                  </div>
                </div>
              </>
            )}

            {chartType === "doughnut" && (
              <>
                <Divider />
                <div>
                  <Text strong>View By:</Text>
                  <div className="mt-2">
                    <Radio.Group value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                      <Radio.Button value="products">Products</Radio.Button>
                      <Radio.Button value="outlets">Outlets</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </>
            )}
          </Space>
        </Card>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={kpis.totalSales}
              precision={0}
              valueStyle={{ color: "#22c55e" }}
              prefix="Rp"
              suffix=""
              formatter={(value) => `${value.toLocaleString("id-ID")}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Profit"
              value={kpis.totalProfit}
              precision={0}
              valueStyle={{ color: kpis.totalProfit >= 0 ? "#22c55e" : "#ef4444" }}
              prefix={kpis.totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix=""
              formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Avg. Order Value"
              value={kpis.averageOrderValue}
              precision={0}
              valueStyle={{ color: "#3b82f6" }}
              prefix="Rp"
              formatter={(value) => `${value.toLocaleString("id-ID")}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Transactions" value={kpis.transactionCount} valueStyle={{ color: "#3b82f6" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Payment Rate"
              value={kpis.paidPercentage}
              precision={1}
              valueStyle={{ color: kpis.paidPercentage > 80 ? "#22c55e" : "#f59e0b" }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Profit Margin"
              value={kpis.profitMargin}
              precision={1}
              valueStyle={{ color: kpis.profitMargin >= 0 ? "#22c55e" : "#ef4444" }}
              prefix={kpis.profitMargin >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Top Product" value={kpis.topProduct.name} valueStyle={{ color: "#3b82f6" }} />
            <div className="mt-2">
              <Text type="secondary">Rp {kpis.topProduct.sales.toLocaleString("id-ID")}</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Top Outlet" value={kpis.topOutlet.name} valueStyle={{ color: "#3b82f6" }} />
            <div className="mt-2">
              <Text type="secondary">Rp {kpis.topOutlet.sales.toLocaleString("id-ID")}</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Sales Analysis" bordered={false} className="mb-6">
        <Spin spinning={loading}>
          <div style={{ height: "400px" }}>{renderChart()}</div>
        </Spin>
      </Card>

      <Divider />

      <Card title="Recent Transactions" bordered={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Outlet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.slice(0, 5).map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.no_faktur}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dayjs(sale.tgl_nota).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.nama_outlet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.nama_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.jumlah_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp {sale.harga_total_ppn.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.status_bayar === "LUNAS" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {sale.status_bayar}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      sale.total_profit >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Rp {sale.total_profit.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ReportSalesHome