import { connect } from 'react-redux';
import { fetChart, fetBatch, fetQuote, fetSymbol, fetNews, fetCompany } from '../../actions/asset_actions';


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
        fetChart: (symbol, range) => dispatch(fetChart(symbol, range)),
        fetBatch: (symbols, range) => dispatch(fetBatch(symbols, range)),

    });
};


import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import merge from 'lodash/merge';

class MiniChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: "1m",
        };
    }

    render() {

        let parsedChart;
        if (this.props.chart.charts) {
            if (this.props.chart.charts[this.props.symbol]) {
                parsedChart = this.props.chart.charts[this.props.symbol].chart.map((ele) => {
                    return { time: ele.label, price: ele.high };

                });
                console.log(parsedChart);
            }
        } else {
            return null;
        }
        this.min = "dataMin";

        if (parsedChart) {
            let filteredData = parsedChart.filter(obj => obj.price > 0);
            parsedChart = filteredData;
            let prices = filteredData.map(obj => obj.price);
            this.min = Math.min(...prices);
        }

        let color;
        if (parsedChart.length > 0) {
            if (parsedChart[0].price < parsedChart[parsedChart.length - 1].price) {
                color = "#21ce99";
            } else {
                color = "#ff3700";
            }
        }

        return (
            <div className="chart-chart-chart">
                <LineChart
                    // margin={{ top: 17, right: 30, left: 20, bottom: 30 }}
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


export default connect(msp, mdp)(MiniChart);