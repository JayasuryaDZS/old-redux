const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
    name: "Jayasurya D",
    address: {
        street: "123 Main Street",
        city: "Boston",
        state: "MA"
    }
}

const STREET_UPDATE = "STREET_UPDATE";

const updateStreet = (street) => {
    return {
        type: STREET_UPDATE,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STREET_UPDATE:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            });
        default:
            return state;
    }
}


const store = redux.createStore(reducer);

console.log(store.getState(), "Checking the initial state 39 --->");

// const unsubscribe = store.subscribe(() => console.log(store.getState(), "In the subscribe function -->"));
const unsubscribe = store.subscribe(() => {
    console.log('Updated State ', store.getState())
  })

  store.dispatch(updateStreet('456 Main St'))
// store.dispatch(updateStreet("456 Main street"));

unsubscribe();