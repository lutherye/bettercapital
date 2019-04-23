import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import Search from '../navbar/search';
import Chart from '../chart/chart_container';

class Asset extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: `${props.id}`,
            range: "1d",
            quantity: "",
            price: `${this.props.chart.latestPrice}`,
            buying: true,
        };
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
                        this.props.fetCompany(symbol).then(() => {
                            this.props.fetTransaction(this.props.currentUser.id);
                        });
                    });
                });
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.buying) {
            this.props.updateTransaction({ user_id: this.props.currentUser.id,
                quantity: this.state.quantity,
                asset_symbol: this.state.symbol,
                price: this.props.chart.latestPrice,
            });
        } else {
            this.props.updateTransaction({
                user_id: this.props.currentUser.id,
                quantity: (this.state.quantity) * -1,
                asset_symbol: this.state.symbol,
                price: this.props.chart.latestPrice,
            });
        }
        this.setState({quantity: ""});
    }

    update(){
        return (e) => {
            this.setState({ quantity: e.target.value });
        };
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
                        <img className="news-picture" src={ele.urlToImage} alt={ele.title}/>
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
        let parsedCompany = (this.props.chart.company) ? (this.props.chart.company.description) : null;
        const names = (this.props.chart.companyName) ? (this.props.chart.companyName.split(" ")) : null;
        const companyName = (this.props.chart.companyName) ? (names.slice(0, names.length - 1)).join(" ") : null;
        const latestPrice = (this.props.chart.latestPrice) ? (this.props.chart.latestPrice) : null;
        let thisCount = 0;
            if (this.props.entities.transactions.length > 0) {
                for (let i = 0; i < this.props.entities.transactions.length; i++) {
                    const obj = this.props.entities.transactions[i];
                    if (obj.asset_symbol === this.state.symbol) {
                        thisCount += obj.quantity
                    }
                }
        }

        let buy = (
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
                                $ {parseFloat(Math.round(this.props.chart.latestPrice * 100) / 100).toFixed(2)}
                            </div>
                            <div className="estimated">
                                <div>
                                    Estimated Cost
                                    </div>
                                $   {parseFloat(Math.round(this.props.chart.latestPrice * 100) / 100).toFixed(2) * this.state.quantity}
                            </div>
                            <div className="checkbox">
                                <div className="box">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </div>
                                This order should only execute during normal market hours.
                                </div>
                            <div className="button-div">
                                <input
                                    className="asset-buy"
                                    type="submit"
                                    value=" Buy" />
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
        )

        let sell = (
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
                                $ {parseFloat(Math.round(this.props.chart.latestPrice * 100) / 100).toFixed(2)}
                            </div>
                            <div className="estimated">
                                <div>
                                    Estimated Credit
                                    </div>
                                $   {parseFloat(Math.round(this.props.chart.latestPrice * 100) / 100).toFixed(2) * this.state.quantity}
                            </div>
                            <div className="checkbox">
                                <div className="box">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </div>
                                This order should only execute during normal market hours.
                                </div>
                            <div className="button-div">
                                <input
                                    className="asset-buy"
                                    type="submit"
                                    value="Sell" />
                            </div>
                            <div>
                                <div className="buy-words">
                                    {thisCount}
                                    <div className="buying">
                                        Shares Available
                                    </div>
                                </div>
                            </div>
                        </form>

        )
        let box = (this.state.buying) ? buy: sell


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
            <div className="asset-main-wrapper">
            <div className="asset-main-div">
                <div className="asset-content-wrapper">
                    <div className="asset-chart">
                        <div className="sym-price">
                            <div className="asset-sym">
                                {companyName}
                            </div>
                            <div className="asset-price"
                                id="assetPrice"
                            >
                                <>$ {}</>
                            </div>
                        </div>
                            <div className="chart">
                                <Chart 
                                    symbol={this.state.symbol}
                                    range={this.state.range}/>
                            </div>
                    </div>

                    <div className="asset-content">
                        <div className="asset-about">
                        <div className="about-div-div">
                            <div className="about-div">
                                <span>About</span>
                            </div>
                        </div>

                            <div className="about-content">
                                <span>{parsedCompany}</span>
                            </div>
                        </div>

                        <div className="asset-about">
                            <div className="about-div-div">
                                <div className="about-div">
                                    <span>News</span>
                                </div>
                            </div>

                            <div>
                                {this.parsedNews()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buybox-wrapper">
                    <div className="buybox-div">
                        <div className="buybox">
                            <div className="buy-wrapper">
                                <div className={(this.state.buying) ? "buy-active" : "buy-symbol"}
                                    onClick={()=> this.setState({buying: true})}
                                >
                                    Buy {this.props.chart.symbol}
                                </div>
                                <div className={(this.state.buying) ? "buy-symbol" : "buy-active"}
                                    onClick={()=> this.setState({buying: false})}
                                >
                                    Sell {this.props.chart.symbol}
                                </div>
                            </div>
                                        {box}
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

export default Asset;