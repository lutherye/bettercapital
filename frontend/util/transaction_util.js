
export const getUserInfo = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}`,
    });
};

export const updateUserInfo = (id, buyingPower) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${id}`,
        data: {buyingPower},       // user obj needs id and buying power
    }); // {id: 17, buying_power: 1000}
};

export const getTransactions = (id) => {
    return $.ajax({
        method:"GET",   
        url: `/api/users/${id}/transactions`
    });
};

export const updateTransaction = (transaction) => {
    return $.ajax({
        method: "POST",
        url: `/api/users/${transaction.user_id}/transactions`,
        data: {transaction}
    });
};

export const destroyTransaction = (transaction) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/users/${transaction.user_id}/transactions/${transaction.id}`,
        data: {id: transaction.id}
    });
};