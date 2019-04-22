import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';
import Search from '../navbar/search';
import PortfolioChart from '../chart/portfolio_chart_container';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import MiniChart from '../chart/mini_chart';

    
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

            let propbar = []; 
            const sidebar = ( keys.length > 0 ) ? (keys.map((sym, idx) => {

                const symbol = sym.toUpperCase();
                const quantity = object[sym].quantity;
                const price = that.state.symbolPrices[symbol];
                that.state.portVal;
                propbar[symbol] = quantity;
                return (
                    <li key={idx}
                        className="personal-asset"
                        onClick={() => { this.handleClick(symbol) }}
                    >
                        <div className="key-quantity">
                            <div className="p-key">
                                {symbol.toUpperCase()}
                            </div>

                            <div className="p-quantity">
                                {quantity}
                                <div className="p-shares">
                                    Shares
                                </div>
                            </div>
                        </div>
                        <div className="minichart">
                            <MiniChart symbol={symbol}/>
                        </div>
                        <div className="p-price">
                            ${parseFloat(Math.round(price * 100) / 100).toFixed(2)}
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
                                </div>
                                <span className="port-val">
                                        ${parseFloat(Math.round(this.state.portVal * 100) / 100).toFixed(2)}
                                </span>
                            </div>
                                <PortfolioChart 
                                    sidebar={propbar}
                                    portVal={this.state.portVal}
                                />
                                <div>
                                    {this.parsedNews()}
                                </div>
                        </div>
                        <div className="sidebar">

                            <div className="personal-holder">
                            <div className="stocks">
                            <span>
                                Stocks
                            </span>
                            </div>
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

