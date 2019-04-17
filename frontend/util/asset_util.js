
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
let now = new Date();
let year = now.getFullYear();
let mo = now.getMonth();
let month = mo + 1;
let day = now.getDate();
let today = day - 1
let yesterday = day - 2;
export const getNews = (symbol) => {
    return $.ajax ({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${symbol}&from=${year}-${month}-${yesterday}&to=${year}-${month}-${today}&sortBy=popularity&apiKey=d2fe2ae5a16244569a1f135e842aa8b1`
    });
};

export const getAllNews = () => {
    return $.ajax ({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d2fe2ae5a16244569a1f135e842aa8b1"
    });
};

export const getCompany = (symbol) => {
    return $.ajax ({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/company`
    });
};

