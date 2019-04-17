import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Search from '../navbar/search';


    
    class Greeting extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                portVal: 0,
                symbolQuants: [],
                firstRender: true,
                symbolPrices: {},
            };
           this.handleClick = this.handleClick.bind(this);
        }
    
        componentDidMount(){
                this.props.fetTransaction(this.props.currentUser.id).then(() => {
                    this.props.fetAllNews();
                    (this.props.transactions.length < 1) ? null :
                        (this.props.transactions.map(transaction => {

                            if (transaction.user_id === this.props.currentUser.id) {let that = this;
                            this.props.fetQuote(transaction.asset_symbol).then(quote => {
                                let newPrices = merge({}, this.state.symbolPrices, { [transaction.asset_symbol]: quote.quote.latestPrice });
                                that.setState({ symbolPrices: newPrices });
                                let val = (quote.quote.latestPrice * transaction.quantity);
                            this.setState({portVal: that.state.portVal + val});
                            });}
                        }));
                    this.setState({ firstRender: false });
                });
        }
        
        updateSearch(e) {
            this.setState({ search: e.target.value });
        }

        handleClick(symbol) {
            this.props.history.push(`/asset/${symbol}`);
            this.props.fetChart(symbol, "1d").then(() => {
                this.props.fetQuote(symbol);
             });
        }

        parsedNews() {
            const parsedNews = [];
            (this.props.chart.news) ? (this.props.chart.news.forEach((ele, idx) => {
                parsedNews.push(
                    <a href={ele.url}
                        key={idx}
                        className="news-section"
                        target="_blank"
                    >
                        <div className="news-picture-div">
                            <div >
                                <img className="news-picture" src={ele.urlToImage} alt={ele.title} />
                            </div>
                        </div>
                        <div className="news-section-div">
                            <div className="source-name-div">
                                <span className="source-name">{ele.source.name}</span>
                            </div>
                            <div className="headline-summary">
                                <div className="headline-div">
                                    <span className="headline">{ele.title}</span>
                                </div>
                                <div className="summary-div">
                                    <span className="summary">{ele.description}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })) : null;
            return parsedNews.slice(0, 4);
        }

        createChart() {

                let chart = [];
                let that = this;
            debugger
                this.props.fetChart
                while (chart.length < 30) {
                    let today = Math.floor(new Date().getTime()/1000.0);
                    if (that.props.transactions) {  
                        that.props.transactions.forEach(transaction => {
                            let myDate = new Date(transaction.created_at);
                            let myEpoch = myDate.getTime()/1000.0;
                            

                        })
                    }
                }

                // let idx = this.props.transactions.length - 1; 
                //     while (idx >= 0) {
                //     if (that.props.transactions) {
                //         debugger
                //         const transaction = that.props.transactions[idx];
                //         let val = 0;
                //         debugger
                //         that.props.fetChart(transaction.asset_symbol, "1y").then(() => {
                //             debugger
                //             for (let i = 0; i < that.props.chart[transaction.asset_symbol].length; i++) {
                //                 const ele = transaction.asset_symbol[i];
                //                 if (ele.date === transaction.created_at.slice(0,10)) {
                //                     debugger
                //                     val += ele.high;
                //                     if (idx !== 0) {
                //                         debugger
                //                         if (transaction.created_at.slice(0, 10) !== this.props.transactions[idx + 1]) {
                //                         chart.push({ time: `${transaction.created_at.slice(0, 10)}`, price: val });
                //                         }
                //                         break;
                //                     }
                //                     idx -= 1;
                //                 }  
                //             }
                //         });
                //     }
                // }
            }

        render(){   

            const object = {};
            const keys = [];
            let that = this;
            if (this.props.transactions) {

                this.props.transactions.forEach((obj) => {

                if (obj.user_id === this.props.currentUser.id) {const symbol = obj.asset_symbol;
                    const quantity = obj.quantity;
                    const price = that.state.symbolPrices[symbol];

                    if (object[symbol]) {
                        object[symbol].quantity += quantity;
                    } else {
                        object[symbol] = {};
                        object[symbol].quantity = quantity;
                        object[symbol].price = price;
                        keys.push(symbol);
                    }
                }
                });
            }

            
            const sidebar = ( keys.length > 0 ) ? (keys.map((sym, idx) => {

                const symbol = sym;
                const quantity = object[sym].quantity;
                const price = that.state.symbolPrices[symbol];
                that.state.portVal

                return (
                    <li key={idx}
                        className="personal-asset"
                        onClick={() => { this.handleClick(symbol) }}
                    >
                        <div className="key-quantity">
                            <div className="p-key">
                                {symbol}
                            </div>

                            <div className="p-quantity">
                                {quantity}
                                <div className="p-shares">
                                    Shares
                                </div>
                            </div>
                        </div>
                        <div className="p-price">
                            ${price}
                        </div>
                    </li>
                )
            })) : (<li></li>);

            return(

                <div className="greet-page">
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
                            <div className="home-button-wrapper">
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
                            </div>
                        </nav>
                    </header>

                
                <div className="main-wrapper">
                    <div className="greet-chart">
                    <br/>
                    <span>
                        {/* {this.createChart()} */}
                    </span>
    
                        <div className="p-asset-chart">
                            <div className="port-holder">
                                <div className="buying-power">
                                    {/* ${this.props.currentUser.buying_power} */}
                                </div>
                                <span className="port-val">
                                    ${this.state.portVal}
                                </span>
                            </div>
                            <LineChart
                                margin={{ top: 17, right: 30, left: 20, bottom: 30 }}
                                width={700}
                                height={300}>
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
                                    domain={["dataMin", 'dataMax']}
                                    hide={true}
                                />
                                <Tooltip
                                    position={{ y: -30 }}
                                    contentStyle={{ border: "0", backgroundColor: "transparent", fontSize: "14" }}
                                // viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                                // coordinate={{ x: 100, y: 140 }}
                                />
                            </LineChart>
                                <div className="date-ranges">
                                    <div
                                        // onClick={() => this.changeDate("1d")} 
                                        >
                                        <span className="date-button">1D</span>
                                    </div>
                                    <div 
                                        // onClick={() => this.changeDate("1d")} 
                                        className="date-button">
                                        <span className="date-button">1M</span>
                                    </div>
                                    <div 
                                        className="date-button"
                                        // onClick={() => this.changeDate("3m")} 
                                        >
                                        <span className="date-button">3M</span>
                                    </div>
                                    <div className="date-button"
                                        // onClick={() => this.changeDate("6m")} 
                                        >
                                        <span className="date-button">6M</span>
                                    </div>
                                    <div className="date-button"
                                        // onClick={() => this.changeDate("1y")} 
                                        >
                                        <span className="date-button">1Y</span>
                                    </div>
                                    <div className="date-button"
                                        // onClick={() => this.changeDate("5y")} 
                                        >
                                        <span className="date-button">5Y</span>
                                    </div>
                                </div>
                                <div>
                                    {this.parsedNews()}
                                </div>
                        </div>
                        <div className="sidebar">

                            <div className="personal-holder">
                                {sidebar}

                            </div>
                        </div>
                        </div>
                </div>
                </div>
            )
        }
    }

export default Greeting;

