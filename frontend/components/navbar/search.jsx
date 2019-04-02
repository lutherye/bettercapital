import React from 'react';
import {fetSymbol} from '../../actions/asset_actions';
import { connect } from 'react-redux';

const msp = state => {
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

    }

    componentDidMount(){
        this.props.fetSymbol();
    }

    handleInput(e) {
        this.setState({inputVal: e.target.value});
    }

    render() {
        return(
            <div className="searchbar">
                <input type="text"
                    onChange={this.handleInput}
                    value={this.state.inputVal}
                    placeholder="Search"
                />
            </div>
        )
    }
}

export default connect(msp, mdp)(Search);