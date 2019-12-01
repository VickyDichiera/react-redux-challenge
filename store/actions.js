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

let setProductQuantity = (code, quantity) => {
    return {
        type: 'SET',
        code: code,
        quantity: quantity
    }
};

let scanProduct = code => {
    return {
        type: 'SCAN',
        code: code
    }
};