
export const getChart = (symbol, range) => {
    return $.ajax({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
    });
};

export const getQuote = (symbol) => {
    return $.ajax({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/quote`
    });
};

export const getSymbol = () => {
    return $.ajax ({
        method:"GET",
        url: "https://api.iextrading.com/1.0/ref-data/symbols"
    });
};

export const getNews = (symbol) => {
    return $.ajax ({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/news`
    });
};

export const getCompany = (symbol) => {
    return $.ajax ({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/company`
    });
};

