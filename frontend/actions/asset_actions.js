
import * as ApiUtilAsset from '../util/asset_util';
export const RECEIVE_CHART = "RECEIVE_CHART";

export const receiveChart = (symbol, chart) => {
    return({
        type: RECEIVE_CHART,
        symbol,
        chart
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
            .then(chart => dispatch(receiveChart(symbol, chart)))
    );
};