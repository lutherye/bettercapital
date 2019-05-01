import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';
import Search from '../navbar/search';
import PortfolioChart from '../chart/portfolio_chart_container';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import MiniChart from '../chart/mini_chart';
import NavBar from '../navbar/nav_bar';
    
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
                            if (transaction.user_id === this.props.currentUser.id) {
                                let that = this;
                                if (transaction.quantity < 0) {
                                    let sellVal = (transaction.quantity * transaction.price);
                                    this.setState({portVal: that.state.portVal + sellVal});
                                } else if (transaction.quantity >= 0){
                                    this.props.fetQuote(transaction.asset_symbol).then(quote => {
                                    let newPrices = merge({}, this.state.symbolPrices, { [transaction.asset_symbol]: quote.quote.latestPrice });
                                    that.setState({ symbolPrices: newPrices });
                                    let val = (quote.quote.latestPrice * transaction.quantity);
                                    if (val === undefined) {
                                        val = quote.quote.latestPrice * transaction.quantity;
                                    }
                                    this.setState({portVal: that.state.portVal + val});
                                    });}
                                }
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
            return parsedNews.slice(0, 7);
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
                let price;
                if (that.state.symbolPrices[symbol]) {
                    price = that.state.symbolPrices[symbol].toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }
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
                            ${price}
                        </div>
                    </li>
                )
            })) : (<li></li>);

            return(

                <div className="greet-page">
                    <NavBar 
                        portVal={this.state.portVal}
                        currentUser={this.props.currentUser}
                    />

                <div className="main-wrapper">
                    <div className="greet-chart">
                    <br/>
                        <div className="p-asset-chart">
                            <div className="port-holder">
                                <div className="buying-power">
                                </div>
                                <span className="port-val"
                                    id="portfolioVal">
                                        <>${this.state.portVal}</>
                                </span>
                                <div className="changes">
                                    <span className="port-change"
                                        id="portChange"
                                    >
                                        <>{}</>
                                    </span>
                                    <span className="port-per"
                                        id="portPer"
                                    >
                                            <>{}</>
                                    </span>
                                   
                                </div>
                            </div>
                                <PortfolioChart 
                                    sidebar={propbar}
                                    portVal={this.state.portVal}
                                />
                                <div>
                                    {this.parsedNews()}
                                </div>
                        </div>
                        <div className="sidebar-div">
                            <div className="sidebar-holder">
                                <div className="sidebar">

                                    <div className="personal-holder">
                                        <div className="stocks">
                                            <span>
                                                Stocks
                                            </span>
                                        </div>
                                        {sidebar}
                                        <div className="stocks">
                                            <span>
                                                Watchlist
                                            </span>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
                </div>
            )
        }
    }

export default Greeting;

