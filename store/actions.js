let incrementProductQuantity = code => {
    return {
        type: 'INCREMENT',
        code: code
    }
};

let decrementProductQuantity = code => {
    return {
        type: 'DECREMENT',
        code: code
    }
};