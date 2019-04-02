import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


class Asset extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: `${props.id}`,
            range: "1d",
        };
    }

    componentDidMount(){
        this.getStuff(this.state.symbol, this.state.range);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.symbol !== this.state.symbol){
            this.setState({symbol: `${props.id}`})
        }
        if (prevState.range !== this.state.range) {
            this.getStuff(this.state.symbol, this.state.range);
        }
    }

    getStuff(symbol, range) {
        this.props.fetChart(symbol, range).then(() => {
            this.props.fetQuote(symbol);
        });
    }

    changeDate(date) {
        debugger
        this.setState({range: date});
    }

    render(){
        let parsedData = (this.props.chart[this.props.symbol]) ? (this.props.chart[this.props.symbol].map((ele) => {
            return {time: ele.label, price: ele.high};
        })) : null;
        const names = (this.props.chart.companyName) ? (this.props.chart.companyName.split(" ")) : null;
        const companyName = (this.props.chart.companyName) ? (names.slice(0, names.length - 1)).join(" ") : null;
        const latestPrice = (this.props.chart.latestPrice) ? (this.props.chart.latestPrice) : null;
        
        this.min = "dataMin";

        if (parsedData) {
                let filteredData = parsedData.filter( obj => obj.price > 0);
                parsedData = filteredData;
                let prices = filteredData.map(obj => obj.price);
                this.min = Math.min(...prices);
            }
        
            debugger
        return(
            <div className="asset-page">
            <nav className="asset-nav">
                <div className="login-logo-link">
                    <Link to={"/"}
                        className="logo-link">
                        BetterCapital
                    </Link>
                </div>
                searchbar nav
            </nav>
            <div className="asset-sym">
                {companyName}
            </div>
            <div className="asset-price">
                {latestPrice}

            </div>

            <div className="asset-chart">
                <LineChart
                    margin={{ top: 17, right: 30, left: 20, bottom: 30 }}
                    width={700}
                    height={300}
                    data={parsedData}>
                    <Line type="linear" 
                        dataKey="price" 
                        stroke="#21ce99"
                        strokeWidth={2}
                        dot={false} 
                        
                    />
                    <XAxis dataKey="time" 
                        hide={true}
                    />
                    <YAxis dataKey="price"
                        type="number"
                        domain={[ "dataMin" , 'dataMax']} 
                        hide={true}  
                    />
                    <Tooltip
                        position={{x: 0, y: -70 }}
                        // viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                        // coordinate={{ x: 100, y: 140 }}

                    />

                </LineChart>

            </div>

            <div className="date-ranges">
                <button onClick={() => this.changeDate("1d")} className="click-date">
                    1D
                </button> 
                <button onClick={() => this.changeDate("1m")} className="click-date">
                    1M
                </button> 
                <button onClick={() => this.changeDate("3m")} className="click-date">
                    3M
                </button> 
                <button onClick={() => this.changeDate("6m")} className="click-date">
                    6M
                </button> 
                <button onClick={() => this.changeDate("1y")} className="click-date">
                    1Y
                </button> 
                <button onClick={() => this.changeDate("5y")} className="click-date">
                    5Y
                </button> 
                
                <span className="5y">

                </span>
            </div>
            </div>
        )
    }
}

export default Asset;