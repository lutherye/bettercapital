import * as ApiUtilTransaction from '../util/transaction_util';
import { RECEIVE_USER } from './session_actions';

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_UPDATED = "RECEIVE_UPDATED";

const receiveTransaction = transaction => {
    return({
        type: RECEIVE_TRANSACTION,
        transaction,
    });
};

const receiveUser = user => {
    return({
        type: RECEIVE_USER,
        user,
    });
};

export const updateUserInfo = (id, buyingPower) => dispatch => {
    return(
        ApiUtilTransaction.updateUserInfo(id, buyingPower)
            .then( user => dispatch(receiveUser(user)))
    );
};

export const fetUser = id => dispatch => {
    return(
        ApiUtilTransaction.getUserInfo(id)
            .then( user => dispatch(receiveUser(user)))
    );
};

export const updateTransaction = transaction => dispatch => {
    return(
        ApiUtilTransaction.updateTransaction(transaction)
            // .then( transaction => dispatch(receiveTransaction(transaction)))
    );
};

export const fetTransaction = id => dispatch => {
    return(
        ApiUtilTransaction.getTransactions(id)
            .then( transaction => dispatch(receiveTransaction(transaction)))
    );
};

