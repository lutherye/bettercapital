import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import merge from 'lodash/merge';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "1m",
            chart: [],
        };
    }

    componentDidMount() {
        this.props.fetBatch(this.props.symbols.join(","), this.state.range);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.symbols[0] !== this.props.symbols[0]) {
            this.props.fetBatch(this.props.symbols.join(","), this.state.range);
        }
        if (this.state.chart[0] === undefined && this.props.transactions[0] !== undefined) {
            this.setCharts();
        }
        if (prevState.range !== this.state.range) {
            this.props.fetBatch(this.props.symbols.join(","), this.state.range).then(() => {
                this.setCharts();
            });
        }
        if (this.state.chart.length > 0) {
            if (Number.isNaN(this.state.chart[0].price)) {
                this.props.fetBatch(this.props.symbols.join(","), this.state.range).then(()=> {
                    this.setCharts();
                });
            }
        }
    }

    changeDate(date) {
        this.setState({ range: date });
        this.props.fetBatch(this.props.symbols.join(","), date);
    }

    setCharts() {
        let charts = {};
        let chart = [];
        let symb = this.props.symbols[0];
        let easyactions = {};
        let that = this;
        const transactionDup = Array.from(this.props.transactions);
        if (this.props.transactions && this.props.chart){
            //symb
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

        if (this.props.chart) {
            //symb
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
            // let today = new Date().getTime() / 1000.0;
            // chart.push({date: today, price: that.props.portVal});

            while(chart.length < that.props.chart[symb].chart.length) {
                // that.props.chart[symb].chart.reverse.forEach(obj => {
                for (let i = that.props.chart[symb].chart.length - 1; i > 0 ; i--) {
                    const obj = that.props.chart[symb].chart[i];
                        let chartEpoch = new Date(obj.date).getTime()/1000.0;
                        debugger
                        let price = 0;
                        if (that.props.symbols) {
                            for (let i = 0; i < that.props.symbols.length; i++) {
                                const ele = that.props.symbols[i];
                                price += (parseFloat(Math.round(charts[ele][chartEpoch] * 100) / 100).toFixed(2) * that.props.sidebar[ele]);
                                // if (easyactions[ele] && transactionDup.length > 0) {
                                //     debugger
                                //     transactionDup.forEach((arr, idx) => {
                                //         let createdAt = new Date(arr.created_at).getTime() / 1000.0;
                                //         debugger
                                //         if (chartEpoch < createdAt) {
                                //             debugger
                                //             that.props.sidebar[ele] -= easyactions[ele][createdAt];
                                //             debugger
                                //             transactionDup.splice(idx, 1);
                                //         }
                                //     });
                                // }
                            }
                        }
                        chart.unshift({date: chartEpoch, price: price});
                    }
                // });
                console.log(chart);
                if (that.state.chart !== chart) {
                    that.setState({chart: chart});
                }
            }
        }
    }

    render(){
        if (this.state.chart.length > 0) {
            if (Number.isNaN(this.state.chart[0].price)) {
                this.props.fetBatch(this.props.symbols.join(","), this.state.range);
            }
        }
        return (
            <div className="chart-chart-chart">
                <LineChart
                    margin={{ top: 17, right: 30, left: 20, bottom: 30 }}
                    width={700}
                    height={300}
                    data={this.state.chart}>
                    <Line type="linear"
                        dataKey="price"
                        stroke="#21ce99"
                        strokeWidth={2}
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
                        position={{ y: -30 }}
                        offset={-45}
                        isAnimationActive={false}
                        contentStyle={{
                            border: "0",
                            backgroundColor: "transparent",
                            fontSize: "14"
                        }}
                    // viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                    // coordinate={{ x: 100, y: 140 }}
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

export default PortfolioChart;