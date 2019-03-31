
export const getChart = (symbol, range) => {
    return $.ajax({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
    });
};

