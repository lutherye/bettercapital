
import * as ApiUtilAsset from '../util/asset_util';
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_QUOTE = "RECEIVE_QUOTE";
export const RECEIVE_SYMBOL = "RECEIVE_SYMBOL";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_COMPANY = "RECEIVE_COMPANY";

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
        quote,
    });
};

export const receiveSymbol = (symbols) => {
    return({
        type: RECEIVE_SYMBOL,
        symbols,
    });
};

export const receiveNews = (news) => {
    return ({
        type: RECEIVE_NEWS,
        news
    });
};

export const receiveCompany = (company) => {
    return({
        type: RECEIVE_COMPANY,
        company,
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

export const fetNews = (symbol) => dispatch => {
    return(
        ApiUtilAsset.getNews(symbol)
            .then(news => dispatch(receiveNews(news.articles)))
    );
};

export const fetAllNews = () => dispatch => {
    return(
        ApiUtilAsset.getAllNews()
            .then(news => dispatch(receiveNews(news.articles)))
    );
};

export const fetCompany = (symbol) => dispatch => {
    return(
        ApiUtilAsset.getCompany(symbol)
            .then( company => dispatch(receiveCompany(company)))
    );
};