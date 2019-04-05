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
        this.selectAss = this.selectAss.bind(this);
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
            this.props.symbols.forEach(ass => {
                if ((ass.symbol.includes(this.state.inputVal.toUpperCase())) || 
                (ass.name.toUpperCase().includes(this.state.inputVal.toUpperCase()))) {
                    matches.push(ass.symbol);
                }
            });
            if ( matches.length === 0 ) {
                matches.push("We're unable to find any results for your search.");
            }
            return matches.slice(0,6);
        }
    }

    selectAss(e) {
        const ass = e.target.innerText;

        if (this.props.match.url.includes("asset")) {
            this.setState({inputVal: ""});
            this.props.history.push(`/asset/${ass}`);
        } else {
            this.setState({ inputVal: "" });
            this.props.history.push(`/asset/${ass}`);
        }
    }

    render() {
        const results = (this.matches()) ? (
            this.matches().map((result, i) => {
                return(
                    <li 
                        className="drop-li"
                        key={i} 
                        onClick={this.selectAss}>
                        {result}
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
                <ul className="drop-ul">
                    {results}
                </ul>

            </div>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(Search));