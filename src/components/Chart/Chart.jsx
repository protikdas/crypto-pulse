import React, { Component } from "react";
import "./Chart.less";
import { LineChart, XAxis, YAxis, Line } from "recharts";
import chartIcon from "../../assets/icons/chart.svg";

export default class Chart extends Component {
  constructor() {
    super();

    this.state = {
      data: [{ time: new Date().getSeconds(), price: "N/A" }]
    };
  }

  componentDidMount() {
    setInterval(() => {
      let data = Array.from(this.state.data);
      const time = new Date();
      const sec = time.getSeconds();
      data.push({ time: sec, price: Math.random() * 100 + 5000 });
      this.setState({
        data
      });
    }, 10000);
  }

  getYAxisDomains = priceHistory => {
    let max = priceHistory[0].price;
    let min = priceHistory[0].price;
    for (let i = 1; i < priceHistory.length; i++) {
      if (priceHistory[i].price > max) {
        max = priceHistory[i].price;
      } else if (priceHistory[i] < min) {
        min = priceHistory[i].price;
      }
    }

    max = parseFloat(max).toFixed(0);
    min = parseFloat(min).toFixed(0);

    return [min, max];
  };

  render() {
    const { chartData } = this.props;
    let data = [];
    let yDomain = [0, 10000];
    if (chartData) {
      const { priceHistory } = chartData;
      if (priceHistory) {
        data = priceHistory;
        yDomain = this.getYAxisDomains(data);
      }
    }
    const { lineStroke } = this.props;

    let chartJSX;

    if (data.length) {
      chartJSX = (
        <div className="chart-container">
          <img
            className="chart-avatar"
            src={chartData ? chartData.avatar : ""}
            alt=""
          />
          <LineChart
            width={420}
            height={200}
            data={data}
            margin={{ top: 35, right: 5, bottom: 5, left: 5 }}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineStroke}
              strokeWidth={3}
              dot={null}
            />
            <XAxis dataKey="time" stroke="#b2bec3" fontFamily="Rajdhani" />
            <YAxis
              domain={[yDomain[0], yDomain[1]]}
              stroke="#b2bec3"
              fontFamily="Rajdhani"
            />
          </LineChart>
          <div className="vertical-text">
            <p className="y-axis-label">Price per Coin (USD)</p>
          </div>
          <p className="x-axis-label">Time (seconds)</p>
        </div>
      );
    } else {
      chartJSX = (
        <div className="chart-container">
          <div className="chart-message">
            <p>Please click on the </p>
            <div className="chart-logo-wrapper">
              <div className="chart-logo" />
            </div>
            <p>icon of a coin to view price chart.</p>
          </div>
        </div>
      );
    }

    return chartJSX;
  }
}
