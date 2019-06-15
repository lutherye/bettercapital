import { connect } from 'react-redux';
import { fetChart, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';
import ReactLoading from 'react-loading';

const msp = (state, ownProps) => {
    let symbols = [];
    if (ownProps.sidebar !== undefined) {
        Object.keys(ownProps.sidebar).forEach(ele => {
            symbols.push(ele.toUpperCase());
        });
    }

    const chart = state.entities.assets;
    return ({
        currentUser: state.entities.users[state.session.userId],
        chart,
        transactions: state.entities.transactions,
        symbols,
    });
};

const mdp = dispatch => {
    return ({
        // fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
    });
};


import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';


class MiniChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "1m",
        };
    }

    render() {
        debugger
        let parsedChart;
        debugger
        if (this.props.chart.charts) {
            debugger
            if (this.props.chart.charts[this.props.symbol]) {
                parsedChart = this.props.chart.charts[this.props.symbol].chart.map((ele) => {
                    return { time: ele.label, price: ele.high };

                });
            }
        } else {
            return null;
        }
        this.min = "dataMin";
        let color;
        if (parsedChart) {
            let filteredData = parsedChart.filter(obj => obj.price > 0);
            parsedChart = filteredData;
            let prices = filteredData.map(obj => obj.price);
            this.min = Math.min(...prices);
            if (parsedChart.length > 0) {
                if (parsedChart[0].price < parsedChart[parsedChart.length - 1].price) {
                    color = "#21ce99";
                } else {
                    color = "#ff3700";
                }
            }
        }
        debugger
        if (!parsedChart) {
            return (
                <div className="loading">
                    <ReactLoading
                    type={"bars"}
                    color={"#21ce99"}
                    height={20}
                    width={20}
                    />
                </div>
            )
        } else {
            return (
                <div className="chart-chart-chart">
                    <LineChart
                        width={70}
                        height={30}
                        data={parsedChart}>
                        <Line type="linear"
                            dataKey="price"
                            stroke={color}
                            strokeWidth={1}
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
                    </LineChart>
                    
                </div>
            )
        }
    }
}


export default connect(msp, mdp)(MiniChart);