const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

// const instialState = {
//     numOfCakes: 10,
//     numOfIcecream: 20
// }
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = redux.createStore(rootReducer,applyMiddleware(logger));

console.log(store.getState(), "Initial store values");

const unsubscribe = store.subscribe(()=>{});

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.restockCake(3);

actions.orderIcecream();
actions.orderIcecream();

actions.restockIcecream(2);

// store.dispatch(orderCake());

// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

unsubscribe();

// store.dispatch(orderCake());
// console.log(store.getState(), "Final render state --->");
