import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';
import PortfolioChart from '../chart/portfolio_chart_container';
import NavBar from '../navbar/nav_bar';
import Sidebar from '../sidebar/sidebar_container';
import ReactLoading from 'react-loading';


    class Greeting extends React.Component {
        constructor(props){
            super(props);
            this.state = {
            };
            this.portVal = "";
            this.handleClick = this.handleClick.bind(this);
        }
    
        componentDidMount(){
            this.props.fetAllNews();
        }
        
        updateSearch(e) {
            this.setState({ search: e.target.value });
        }

        handleClick(symbol) {
            this.props.history.push(`/asset/${symbol}`);
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

            const propbar = {};
            let that = this;
            this.portVal = document.getElementById("portfolioVal") ? document.getElementById("portfolioVal").innerHTML : 0;
            debugger
            if (this.props.transactions && this.props.watchlists ) {
                this.props.transactions.forEach((obj) => {
                if (obj.user_id === this.props.currentUser.id) {const symbol = obj.asset_symbol;
                    const quantity = obj.quantity;
                    if (propbar[symbol]) {
                        propbar[symbol] += quantity;
                    } else {
                        propbar[symbol] = {};
                        propbar[symbol]= quantity;
                    }
                }
                });
                this.props.watchlists.forEach(ele => {
                    if (ele.user_id === that.props.currentUser.id) {
                        const symbol = ele.asset_symbol;
                        propbar[symbol] = 0;
                    }
                })
            }

                if ( !this.props.chart.news ) {
                    return (
                        <div className="load-container">
                            <div className="loading">
                                <ReactLoading
                                    type={"spinningBubbles"}
                                    color={"#21ce99"}
                                    height={100}
                                    width={100}
                                />
                            </div>
                        </div>
                    )
                } else {
                return(
                    <div className="greet-page">
                        <NavBar 
                            currentUser={this.props.currentUser}
                            portVal={this.portVal}
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
                                            <>${}</>
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
                                    />
                                    <div>
                                        {this.parsedNews()}
                                    </div>
                            </div>
                            <Sidebar />
                            </div>
                    </div>
                    </div>
                )
            }
        }
    }

export default Greeting;

