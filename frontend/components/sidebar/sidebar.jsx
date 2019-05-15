import React from 'react';
import merge from 'lodash/merge';
import MiniChart from '../chart/mini_chart';
import ReactLoading from 'react-loading';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            portVal: 0,
            symbolPrices: {},
        };
        this.handleClick = this.handleClick.bind(this);
        this.stockbar = this.stockbar.bind(this);
        this.watchbar = this.watchbar.bind(this);
    }

    componentDidMount() {
        this.props.fetWatchlists(this.props.currentUser.id).then(() => {
            let that = this;
            let keys = {};
            if ( this.props.watchlists.length > 0 ) {
                this.props.watchlists.forEach(ele => {
                    if (!keys[ele.asset_symbol]) {
                        this.props.fetQuote(ele.asset_symbol).then(quote => {
                            let newPrice = merge({}, this.state.symbolPrices, {[ele.asset_symbol]: quote.quote.latestPrice});
                            that.setState({ symbolPrices: newPrice });
                        });
                        keys[ele.asset_symbol] = true;
                    }
                });
            }
            this.props.fetTransaction(this.props.currentUser.id).then(() => {
                let keys = {};
                (this.props.transactions.length < 1) ? null : 
                (this.props.transactions.map(transaction => {
                    if (transaction.user_id === this.props.currentUser.id) {
                        let that = this;
                        if (transaction.quantity < 0) {
                            let sellVal = (transaction.quantity * transaction.price);
                            this.setState({ portVal: that.state.portVal + sellVal });
                        } else if (!keys[transaction.asset_symbol] && transaction.quantity >= 0) {
                            this.props.fetQuote(transaction.asset_symbol).then(quote => {
                                let newPrices = merge({}, this.state.symbolPrices, { [transaction.asset_symbol]: quote.quote.latestPrice });
                                that.setState({ symbolPrices: newPrices });
                                let val = (quote.quote.latestPrice * transaction.quantity);
                                if ( val === undefined ) {
                                    val = quote.quote.latestPrice * transaction.quantity;
                                }
                                this.setState({ portVal: that.state.portVal + val });
                            });
                            keys[transaction.asset_symbol] = true;
                        }
                    }
                }))
            });
        });
    }

    handleClick(symbol) {
        this.props.history.push(`/asset/${symbol}`);
    }

    stockbar() {
            const object = {};
            const keys = [];
            let that = this;
            if (this.props.transactions) {
                this.props.transactions.forEach((obj) => {
                    if (obj.user_id === this.props.currentUser.id) {
                        const symbol = obj.asset_symbol;
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
            const sidebar = (keys.length > 0) ? (keys.map((sym, idx) => {
                const symbol = sym.toUpperCase();
                const quantity = object[sym].quantity;
                let price;
                if (that.state.symbolPrices[symbol]) {
                    price = that.state.symbolPrices[symbol].toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
                }
                that.state.portVal;
                if (quantity > 0) {
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
                                <MiniChart symbol={symbol} />
                            </div>
                            <div className="p-price">
                                ${price}
                            </div>
                        </li>
                    )
                }
            })) : (<li></li>);
    
            return sidebar;
    }

    watchbar() {
        const hash = {};
        const watchies = [];
        let that = this;

        if (this.props.watchlists) {
            this.props.watchlists.forEach(ele => {
                if (ele.user_id === that.props.currentUser.id) {
                    const symbol = ele.asset_symbol;
                    const price = that.state.symbolPrices[symbol];
                    hash[symbol] = {};
                    hash[symbol].price = price;
                    watchies.push(symbol);
                }
            })
        }
        const watchbar = (watchies.length > 0) ? (watchies.map((sym, idx) => {
            const symbol = sym.toUpperCase();
            let price;
            if (that.state.symbolPrices[symbol]) {
                price = that.state.symbolPrices[symbol].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            }
            return (
                <li key={idx}
                    className="personal-asset"
                    onClick={() => { this.handleClick(symbol) }}
                >
                    <div className="key-quantity">
                        <div className="p-key">
                            {symbol.toUpperCase()}
                        </div>

                    </div>
                    <div className="minichart">
                        <MiniChart symbol={symbol}
                        />
                    </div>
                    <div className="p-price">
                        ${price}
                    </div>
                </li>
            )
        })) : (<li></li>)
        return watchbar;
    }

    render() {
        return(
            <div className="sidebar-div">
                <div className="sidebar-holder">
                    <div className="sidebar">

                        <div className="personal-holder">
                            <div className="stocks">
                                <span>
                                    Stocks
                                </span>
                            </div>
                            {this.stockbar()}
                            <div className="stocks">
                                <span>
                                    Watchlist
                                </span>
                            </div>
                            {this.watchbar()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;