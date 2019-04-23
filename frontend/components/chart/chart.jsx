import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "1d",
        };
        this.parsedData = undefined;
    }
    componentDidMount() {
        this.props.fetChart(this.props.symbol, this.state.range);
    }
    
    changeDate(date) {
        this.setState({range: date});
        this.props.fetChart(this.props.symbol, date);
    }
    ToolTipContent(e) {
            if (e.payload && e.payload.length > 0) {
                let datePoint = e.payload[0].payload["time"];
                let pricePoint = parseFloat(Math.round(e.payload[0].value * 100) / 100).toFixed(2);
    
                document.getElementById("assetPrice").innerHTML = "$" + pricePoint;
                return (<div className="dateTool">{datePoint}</div>)
            } else if (this.parsedData > 0) {
                let pricePoint = this.parsedData[this.parsedData.length - 1]["price"];
                document.getElementById("assetPrice").innerHTML = "$" + pricePoint;
            } 
    }

    render() {
        this.parsedData = (this.props.chart[this.props.symbol] && this.props.chart[this.props.symbol].chart === undefined) ? (this.props.chart[this.props.symbol].map((ele) => {
            return { time: ele.label, price: ((ele.high + ele.low) / 2) };
        })) : null;

        this.min = "dataMin";

        if (this.parsedData) {
            let filteredData = this.parsedData.filter(obj => obj.price > 0);
            this.parsedData = filteredData;
            let prices = filteredData.map(obj => obj.price);
            this.min = Math.min(...prices);
        }
        
        let color;

        if (this.parsedData) {
            if (this.parsedData[0].price < this.parsedData[this.parsedData.length - 1].price) {
                color = "#21ce99";
            } else {
                color = "#ff4700";
            }
        }

        return(
            <div className="chart-chart-chart">
                <LineChart
                    margin={{ top: 17, right: 30, left: 20, bottom: 30 }}
                    width={700}
                    height={300}
                    data={this.parsedData}>
                    <Line type="linear"
                        dataKey="price"
                        stroke={color}
                        strokeWidth={2}
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
                            fontSize: "14"
                        }}
                    // viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                    // coordinate={{ x: 100, y: 140 }}
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

export default Chart;