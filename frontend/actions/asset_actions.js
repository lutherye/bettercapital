
import * as ApiUtilAsset from '../util/asset_util';
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_QUOTE = "RECEIVE_QUOTE";
export const RECEIVE_SYMBOL = "RECEIVE_SYMBOL";

export const receiveChart = (symbol, chart) => {
    return({
        type: RECEIVE_CHART,
        symbol,
        chart,
    });
};

export const receiveQuote = (symbol, quote) => {
    return({
        type: RECEIVE_QUOTE,
        symbol,
        quote
    });
};

export const receiveSymbol = (symbols) => {
    return({
        type: RECEIVE_SYMBOL,
        symbols,
    });
};

export const fetChart = (symbol, range) => dispatch => {
    return (
        ApiUtilAsset.getChart(symbol, range)
            .then((chart) => dispatch(receiveChart(symbol, chart)))
    );
};

export const fetQuote = (symbol) => dispatch => {
    return(
        ApiUtilAsset.getQuote(symbol)
            .then(quote => dispatch(receiveQuote(symbol, quote)))
    );
};

export const fetSymbol = () => dispatch => {
    return(
        ApiUtilAsset.getSymbol()
            .then(symbols => dispatch(receiveSymbol(symbols)))
    );
};