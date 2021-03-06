import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import merge from 'lodash/merge';
import ReactLoading from 'react-loading';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "1m",
            chart: [],
        };
        this.dateChart = [];
    }

    componentDidMount() {
        if (this.props.symbols.length > 0) {
            this.props.fetBatch(this.props.symbols.join(","), "5y");
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        // if (prevProps.symbols[0] !== this.props.symbols[0]) {

        //     this.props.fetBatch(this.props.symbols.join(","), "5y");
        // }
        if (prevProps.symbols.length !== this.props.symbols.length) {
            this.props.fetBatch(this.props.symbols.join(","), "5y").then(() => {
                this.setCharts();
            });
        }
        if (this.state.chart[0] === undefined && this.props.transactions[0] !== undefined) {
            this.setCharts();
        }
        if (this.state.chart.length > 0) {
            if (Number.isNaN(this.state.chart[0].price)) {
                this.props.fetBatch(this.props.symbols.join(","), "5y").then(()=> {
                    this.setCharts();
                });
            }
        }
    }

    changeDate(date) {
        this.setState({ range: date });
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
        if (e.payload && e.payload.length > 0) {
            let datePoint = new Date(e.payload[0].payload.date * 1000).toString().slice(0,10);

            let pricePoint = Number(e.payload[0].payload.price);

            let startPoint = Number(this.dateChart[0].price);

            let change = (Number(pricePoint) - Number(startPoint)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            let percentChange = ((Number(pricePoint) - Number(startPoint)) / Number(startPoint + 0.01) * 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            let temp = change.slice(1);
            if ((pricePoint - startPoint) < 0) {
                change = "-" + "$" + temp;
            } else {
                change = "+" + "$" + change;
            }

            if (percentChange > 0) {
                percentChange = "+" + percentChange;
            }

            document.getElementById("portfolioVal").innerHTML = "$" + pricePoint.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById("portChange").innerHTML = change;
            document.getElementById("portPer").innerHTML = "(" + percentChange + "%)";
            return ( <div className="dateTool">{datePoint}</div>)
        } else if (this.dateChart.length > 0) {
            let pricePoint = Number(this.dateChart[this.dateChart.length - 1].price);

            let startPoint = Number(this.dateChart[0].price);

            let change = (Number(pricePoint) - Number(startPoint)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            let percentChange = ((Number(pricePoint )- Number(startPoint)) / Number(startPoint + 0.01) * 100 ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            let temp = change.slice(1);
            if ((pricePoint - startPoint) < 0) {
                change = "-" + "$" + temp;
            } else {
                change = "+" + "$" + change;
            }

            if (percentChange > 0) {
                percentChange = "+" + percentChange;
            }

            document.getElementById("portfolioVal").innerHTML = "$" + pricePoint.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });;;
            document.getElementById("portChange").innerHTML = change;
            document.getElementById("portPer").innerHTML = "(" + percentChange + "%)";
        }
    }

    setCharts() {
        let charts = {};
        let chart = [];
        let symb = this.props.symbols[0];
        let that = this;
        let easyactions = {};
        const transactionDup = Array.from(this.props.transactions);

        if (this.props.transactions && this.props.chart){
            this.props.transactions.forEach(obj => {
                let createDate = new Date(obj.created_at.slice(0,10)).getTime()/1000.0;
                if (easyactions[obj.asset_symbol]) {
                    if ([createDate] in easyactions[obj.asset_symbol]) {
                        easyactions[obj.asset_symbol][createDate] += obj.quantity;
                    } else {
                        easyactions[obj.asset_symbol][createDate] = obj.quantity;
                    }
                } else {
                        easyactions[obj.asset_symbol] = {};
                        easyactions[obj.asset_symbol][createDate] = obj.quantity;
                    }
            });
        }

        if (this.props.chart !== undefined) {
            this.props.symbols.forEach(sym => {
                charts[sym] = {};
                if (that.props.chart[sym] !== undefined) {
                    if (that.props.chart[sym].chart !== undefined) {
                        that.props.chart[sym].chart.forEach(obj => {
                            const myEpoch = new Date(obj.date).getTime()/1000.0;
                            charts[sym][myEpoch] = obj.close;
                        });
                    }
                }
            });

            if (that.props.symbols && that.props.chart[symb]) {
                    while(chart.length < that.props.chart[symb].chart.length) {
                        for (let i = that.props.chart[symb].chart.length - 1; i >= 0 ; i--) {        // iterating through dates
                            const obj = that.props.chart[symb].chart[i];
                                let chartEpoch = new Date(obj.date).getTime()/1000.0;
                                let price = 0;
                                    for (let i = 0; i < that.props.symbols.length; i++) {           // iterating through symbols
                                        const ele = that.props.symbols[i];                          // getting ele to grab quantity
                                        if (charts[ele][chartEpoch] === undefined) {
                                            price += 0

                                        } else {
                                            price += (parseFloat(Math.round(charts[ele][chartEpoch] * 100) / 100).toFixed(2) * that.props.sidebar[ele]);

                                        }
                                        if (easyactions[ele] && transactionDup.length > 0) {        // easyactions = transactions / transactionDup = array               // iterate through array
                                            for (let idx= 0; idx< transactionDup.length; idx++) {
                                                const arr = transactionDup[idx];
                                                let createdAt = new Date(arr.created_at.slice(0,10)).getTime() / 1000.0;
                                                if (chartEpoch < createdAt) {                       // if transaction is created after date
                                                    that.props.sidebar[arr.asset_symbol] -= transactionDup[idx].quantity;     // 
                                                    transactionDup.splice(idx, 1);
                                                    idx= 0;
                                                }
                                            }
                                        } 
                                    }
                                if (transactionDup.length === 0) {
                                    chart.unshift({ date: chartEpoch, price: 0 });
                                } else {
                                    chart.unshift({ date: chartEpoch, price: (parseFloat(Math.round( price * 100) / 100).toFixed(2))});
                                }
                            }
                        if (that.state.chart.length !== chart.length) {
                            that.setState({chart: chart});
                            that.dateChart = chart;
                        }

                    }

            }
        }
    }

    render(){
        if (this.state.chart.length > 0) {
            if (Number.isNaN(this.state.chart[0].price)) {
                this.props.fetBatch(this.props.symbols.join(","), this.state.range);
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
            }
        }
        if (!this.props.chart) {
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
            return (
                <div className="chart-chart-chart">
                    <LineChart
                        margin={{ top: 37, right: 30, left: 20, bottom: 30 }}
                        width={700}
                        height={270}
                        data={this.dateChart}>
                        <Line type="linear"
                            dataKey="price"
                            stroke="#21ce99"
                            strokeWidth={1.7}
                            dot={false}
                        />
                        <XAxis dataKey="date"
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
                            onClick={() => this.changeDate("1m")} className="click-date">
                            <span className="oneday">1M</span>
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

export default PortfolioChart;