import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { get } from 'https';
import ReactLoading from 'react-loading';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "5y",
            chart: [],
        };
        this.oneChart = [];
        this.dateChart = [];
    }
    componentDidMount() {
        // this.props.fetChart(this.props.symbol, this.state.range);
        this.props.fetBatch(this.props.symbol, "5y").then(() => {
            this.props.fetChart(this.props.symbol, "1d").then(() => {
                this.setChart();
            });
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.symbol !== prevProps.symbol) {
        //     this.fetChart(this.props.symbol, this.state.range);
            this.props.fetBatch(this.props.symbol, "5y").then(() => {
                this.setChart();
            });
        }
    }
    
    changeDate(date) {
        this.setState({range: date});
        // this.props.fetChart(this.props.symbol, date);
        if (date === "1d") {
            this.dateChart = this.oneChart;
        }
        if (date === "1m") {
            this.dateChart = this.state.chart.slice(1237);
        }
        if (date === "3m") {
            this.dateChart = this.state.chart.slice(1195);
        }
        if (date === "6m") {
            this.dateChart = this.state.chart.slice(1134);
        }
        if (date === "1y") {
            this.dateChart = this.state.chart.slice(1006);
        }
        if (date === "5y") {
            this.dateChart = this.state.chart;
        }
    }
    ToolTipContent(e) {
        if (document.getElementById("assetPrice")) {
            if (e.payload && e.payload.length > 0) {
                let datePoint = e.payload[0].payload.time;
                let pricePoint = Number(e.payload[0].value);
                let startPoint = Number(this.dateChart[0].price);
                let change = (pricePoint - startPoint).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                let percentChange = (((pricePoint - startPoint) / startPoint) * 100).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                let temp = change.slice(1);
                if (change < 0) {
                    change = "-" + "$" + temp;
                } else {
                    change = "+" + "$" + change;
                }

                if (percentChange > 0) {
                    percentChange = "+" + percentChange;
                }
                document.getElementById("assetPrice").innerHTML = "$" + pricePoint.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                document.getElementById("portChange").innerHTML = change;
                document.getElementById("portPer").innerHTML = "(" + percentChange + "%)";
                return (<div className="dateTool">{datePoint}</div>)
            } else if (this.dateChart) {
                if(this.dateChart.length > 0) { 
                    let pricePoint = Number(this.dateChart[this.dateChart.length - 1].price);
                    let startPoint = Number(this.dateChart[0].price);
                    let change = Number(pricePoint - startPoint).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    let percentChange = Number(((pricePoint - startPoint) / startPoint) * 100 ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    let temp = change.slice(1);
                    if (change < 0) {
                        change = "-" + "$" + temp;
                    } else {
                        change = "+" + "$" + change;
                    }

                    if (percentChange > 0) {
                        percentChange = "+" + percentChange;
                    }

                    document.getElementById("assetPrice").innerHTML = "$" + pricePoint.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });;
                    document.getElementById("portChange").innerHTML = change;
                    document.getElementById("portPer").innerHTML = "(" + percentChange + "%)";
                }
            } 
        }
    }

    setChart() {
        if (this.props.chart.charts) {
            let chart = (this.props.chart.charts[this.props.symbol]
            ) ? (this.props.chart.charts[this.props.symbol].chart.map((ele) => {
                return { time: ele.label, price: ((ele.high + ele.low) / 2) };
            })) : null;
            this.dateChart = chart;
            this.setState({ chart: chart });
        } 
        if (this.props.chart[this.props.symbol].length > 0) {
            let chart = (this.props.chart[this.props.symbol]
            ) ? (this.props.chart[this.props.symbol].map((ele) => {
                return { time: ele.label, price: ((ele.high + ele.low) / 2) };
            })) : null;
            this.oneChart = chart;
            debugger
        }
    }

    render() {

        this.min = "dataMin";

        if (this.dateChart) {
            let filteredData = this.dateChart.filter(obj => obj.price > 0);
            this.dateChart = filteredData;
            let prices = filteredData.map(obj => obj.price);
            this.min = Math.min(...prices);
        }
        
        let color;

        if (this.dateChart && this.dateChart.length > 0) {
            if (this.dateChart[0].price < this.dateChart[this.dateChart.length - 1].price) {
                color = "#21ce99";
            } else {
                color = "#ff4700";
            }
        }

        if (!this.props.chart[this.props.symbol]) {
            return (
                <div className="loading">
                    <ReactLoading
                        type={"bars"}
                        color={"#21ce99"}
                        height={100}
                        width={100}
                    />
                </div>
            )
        } else {
            return(
                <div className="chart-chart-chart">
                    <LineChart
                        margin={{ top: 37, right: 30, left: 20, bottom: 30 }}
                        width={700}
                        height={270}
                        data={this.dateChart}>
                        <Line type="linear"
                            dataKey="price"
                            stroke={color}
                            strokeWidth={1.7}
                            dot={false}
                        />
                        <XAxis dataKey="time"
                            hide={true}
                        />
                        <YAxis dataKey="price"
                            type="number"
                            domain={["dataMin", 'dataMax']}
                            hide={true}
                        />
                        <Tooltip
                            position={{ y: 0 }}
                            content={this.ToolTipContent.bind(this)}
                            offset={-45}
                            isAnimationActive={false}
                            contentStyle={{
                                border: "0",
                                backgroundColor: "transparent",
                                fontSize: "10"
                            }}
                        />
                    </LineChart>
                    <div className="date-ranges">
                        <div className="oneday"
                            onClick={() => this.changeDate("1d")} className="click-date">
                            <span className="oneday">1D</span>
                        </div>
                        <div className="date-button"
                            onClick={() => this.changeDate("1m")} className="click-date">
                            <span className="date-button">1M</span>
                        </div>
                        <div className="date-button"
                            onClick={() => this.changeDate("3m")} className="click-date">
                            <span className="date-button">3M</span>
                        </div>
                        <div className="date-button"
                            onClick={() => this.changeDate("6m")} className="click-date">
                            <span className="date-button">6M</span>
                        </div>
                        <div className="date-button"
                            onClick={() => this.changeDate("1y")} className="click-date">
                            <span className="date-button">1Y</span>
                        </div>
                        <div className="date-button"
                            onClick={() => this.changeDate("5y")} className="click-date">
                            <span className="date-button">5Y</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Chart;