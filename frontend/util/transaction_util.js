
export const getUserInfo = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}`,
    });
};

export const updateUserInfo = (user) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: {user},       // user obj needs id and buying power
    }); // {id: 17, buying_power: 1000}
};

export const getTransactions = (id) => {
    return $.ajax({
        method:"GET",   
        url: `/api/users/${id}/transactions`
    });
};

export const updateTransaction = (transaction) => {
    debugger
    return $.ajax({
        method: "POST",
        url: `/api/users/${transaction.user_id}/transactions`,
        data: {transaction}
    });
};
