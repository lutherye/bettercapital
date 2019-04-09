import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import Search from '../navbar/search';

class Asset extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: `${props.id}`,
            range: "1d",
            quantity: "",
            price: `${this.props.chart.latestPrice}`
        };
        this.changeDate = this.changeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getStuff(this.state.symbol, this.state.range);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.symbol !== this.props.match.params.symbol){
            this.setState({symbol: `${this.props.id}`}, () => {
                this.getStuff(this.state.symbol, this.state.range);
            });
        }
    }

    getStuff(symbol, range) {
        this.props.fetChart(symbol, range).then(() => {
            this.props.fetQuote(symbol).then(() => {
                this.props.fetSymbol().then(() => {
                    this.props.fetNews(symbol).then(() => {
                        this.props.fetCompany(symbol);
                    });
                });
            });
        });
    }

    changeDate(date) {
            this.getStuff(this.state.symbol, date);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateTransaction({ user_id: this.props.currentUser.id,
            quantity: this.state.quantity,
            asset_symbol: this.props.symbol,
            price: this.props.chart.latestPrice,
        });
        this.setState({quantity: ""});
    }

    update(){
        return (e) => {
            this.setState({ quantity: e.target.value });
        };
    }

    render(){

        let parsedData = (this.props.chart[this.props.id]) ? (this.props.chart[this.props.id].map((ele) => {
            return {time: ele.label, price: (( ele.high + ele.low ) / 2 ) };
        })) : null;

        let parsedCompany = (this.props.chart.company) ? (this.props.chart.company.description) : null;

        let parsedNews = (this.props.chart.news) ? (this.props.chart.news.map((ele, idx) => {
            return <div key={idx}>
                    <span className="headline">{ele.headline}</span>
                    <span className="summary">{ele.summary}</span>
                    <span className="news-url">{ele.url}</span>
                </div>
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
        

        return(

            <div className="asset-page">
                <header className="asset-header">
                    <nav className="asset-nav">
                        <div className="login-nav-logo-link">
                            <Link to={"/home"}
                                className="logo-link">
                                BetterCapital
                            </Link>
                        </div>
                        <div className="asset-search">
                            <Search
                                props={this.props.symbol} />
                        </div>
                        <div className="home-button-div">
                            <div className="home-home">
                                <Link to={"/home"}
                                    className="home-link">
                                    Home
                                </Link>
                            </div>
                            <div className="home-home">
                                <Link to={"/home"}
                                    className="home-link">
                                    Notifications
                                </Link>
                            </div>
                            
                            <button className="asset-header-button"
                                onClick={() => this.props.logout()}>Log Out</button>
                        </div>
                    </nav>
                </header>


                <div className="asset-content-wrapper">

                        <div className="asset-chart">
                            <div className="sym-price">
                                <div className="asset-sym">
                                    {companyName}
                                </div>
                                <div className="asset-price">
                                    $ {latestPrice}
                                </div>
                            </div>
                            <div className="chart">
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
                                        position={{y: -30 }}
                                        offset={-45}
                                        isAnimationActive={false}
                                        contentStyle = {{border: "0",
                                            backgroundColor: "transparent",
                                            fontSize: "14"}}
                                        // viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                                        // coordinate={{ x: 100, y: 140 }}
                                    />
                                </LineChart>
                                <div className="buybox">
                                    <div className="buy-wrapper">
                                        <div className="buy-symbol">
                                            Buy {this.props.chart.symbol}
                                        </div>
                                    </div>
                                    <form className="asset-form"
                                        onSubmit={this.handleSubmit}>
                                        <div className="shares">
                                            <label className="buy-quantity">Shares</label>
                                            <input className="asset-input"
                                                type="number"
                                                placeholder="0"
                                                value={this.state.quantity}
                                                onChange={this.update()}
                                            />
                                        </div>
                                        <div className="market">
                                            <div>
                                                Market Price
                                            </div>
                                            $ {this.props.chart.latestPrice}
                                        </div>
                                        <div className="button-div">
                                            <input 
                                                className="asset-buy"
                                                type="submit" 
                                                value="Buy" />
                                        </div>
                                        <div>
                                            <div className="buy-words">

                                                    ${this.props.currentUser.buying_power}

                                                    <div className="buying">
                                                        Buying Power Available
                                                    </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        <div className="date-ranges">
                            <div 
                                onClick={() => this.changeDate("1d")} className="click-date">
                                    <span className="date-button">1D</span>
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
                            
                            <span className="5y">

                            </span>
                        </div>
                        </div>

                    <div className="asset-content">
                        <div className="asset-about">
                            <div>
                                About
                            </div>

                            <div>
                                {parsedCompany}
                            </div>
                        </div>

                        <div className="asset-news">
                            <div>
                                News
                            </div>

                            <div>
                                {parsedNews}
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

export default Asset;