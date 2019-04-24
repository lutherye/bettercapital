import React from 'react';
import {fetSymbol} from '../../actions/asset_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const msp = (state) => {
    return({
        symbols: state.entities.assets.symbols,
    });
};

const mdp = dispatch => {
    return({
        fetSymbol: () => dispatch(fetSymbol()),
    });
};

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputVal: "",
        };
        this.handleInput = this.handleInput.bind(this);
        this.selectAsset = this.selectAsset.bind(this);
    }

    componentDidMount(){
        this.props.fetSymbol();
    }

    handleInput(e) {
        this.setState({inputVal: e.target.value});
    }

    matches(){
        const matches = [];
        if ( this.state.inputVal.length === 0 ) {
            return null;
        }
        if (this.props.symbols){
            this.props.symbols.forEach(asset => {
                if ((asset.symbol.includes(this.state.inputVal.toUpperCase())) || 
                (asset.name.toUpperCase().includes(this.state.inputVal.toUpperCase()))) {
                    matches.push(asset);
                }
            });
            if ( matches.length === 0 ) {
                matches.push("We're unable to find any results for your search.");
            }
            return matches.slice(0,6);
        }
    }

    selectAsset(result) { 
        return () => {
            if (this.props.match.url.includes("asset")) {
                this.setState({inputVal: ""});
                this.props.history.push(`/asset/${result.symbol}`);
            } else {
                this.setState({ inputVal: "" });
                this.props.history.push(`/asset/${result.symbol}`);
            }
        };
    }


    render() {
        const results = (this.matches()) ? (
            this.matches().map((result, i) => {
                return(
                    <li 
                        className="drop-li"
                        key={i} 
                        onClick={this.selectAsset(result)}>
                        <div className="res-sym">
                            {result.symbol}
                        </div>
                        <div className="res-name">
                            {(result.name) ? (result.name.split(" ")
                                .slice(0, (result.name.split(" ").length - 1)).join(" ")) : ("We're unable to find any results.")}
                        </div>
                    </li>
                );
            })
        ) : ("")

        return(
            <div className="entire-search">
            <div className="searchbar">
                <i className="magPicture"></i>
                <input className="search-input"
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.inputVal}
                    placeholder="Search"/>
                    <i className="fas fa-search mag"></i>
                <ul className="drop-ul">
                    {results}
                </ul>

            </div>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(Search));