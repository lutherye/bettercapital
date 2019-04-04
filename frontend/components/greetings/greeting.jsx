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
           
        }
    
        componentDidMount(){
            this.props.fetTransaction(this.props.currentUser.id);
        }
        
        componentDidUpdate(prevProps){

            if(this.state.firstRender) {
                (this.props.transactions.length < 1) ? null :
                    (this.props.transactions.map(transaction => {
                        let that = this;
                        this.props.fetQuote(transaction.asset_symbol).then(quote => {
                            let newPrices = merge({}, this.state.symbolPrices, {[transaction.asset_symbol]: quote.quote.latestPrice});
                            that.setState({ symbolPrices: newPrices});

                            let val = (quote.quote.latestPrice * transaction.quantity);
                            this.setState({portVal: that.state.portVal + val});
                        });
                    }));
                        this.setState({ firstRender: false});
                    }
        }


        updateSearch(e) {
            this.setState({ search: e.target.value });
        }


        getStuff(symbol, range) {
            this.props.fetChart(symbol, range).then(() => {
                this.props.fetQuote(symbol).then(() => {

                });
            });
        }


        render(){   

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
                        </nav>
                    </header>
                    <div className="greet-chart">
                    <div>
                        {this.props.currentUser.buying_power}
                    </div>
                    <span>
                        {this.state.portVal}
                    </span>
                    <br/>
                    <span>

                    </span>
    
                        <div className="asset-chart">
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
                        </div>
                        <div className="sidebar">
                            <div>
                                Assets
                            </div>
                            <div>
                                {this.props.transactions.map((obj, idx) => {
                                    const key = obj.asset_symbol;
                                    const quantity = obj.quantity;
                                    debugger
                                    const price = this.state.symbolPrices[key]
                                    debugger
                                    return <li key={idx}>{key} {quantity} {price}</li>
                                })}
                                {/* {const obj = {};
                                    this.props.transactions.map((obj, idx) => {
                                        const key = obj.asset_symbol;
                                        const quantity = obj.quantity;
                                        debugger
                                        const price = this.state.symbolPrices[key]
                                        if (obj[key]){
                                        obj[key].quantity += quantity
                                        } else {
                                        obj[key] = {};
                                        obj[key].quantity = quantity;
                                        obj[key].price = price;
                            } */}
                        {/* debugger
                                    return <li key={idx}>{key} {quantity} {price}</li>
                                })} */}
                            </div>
                        </div>
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

                            <span className="5y">

                            </span>
                        </div>
                    </div>
    
                    <button className="header-button" onClick={()=> this.props.logout()}>Log Out</button>
                </div>
            )
        }
    }


export default Greeting;