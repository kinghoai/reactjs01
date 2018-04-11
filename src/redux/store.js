import { createStore } from 'redux';

const defaultState = {
    words: [
        {id: '123', en: 'One', vn: 'Mot', isMemorized: true},
        {id: '124', en: 'Two', vn: 'Hai', isMemorized: false},
        {id: '125', en: 'Three', vn: 'Ba', isMemorized: true},
        {id: '126', en: 'Four', vn: 'Bon', isMemorized: false},
    ],
    shouldShowForm : true,
    filterMode: 'SHOW_ALL',
}

function reducer(state = defaultState, action) {
    if (action.type === 'TOGGLE') {
        return ({...state, shouldShowForm: !state.shouldShowForm});
    }
    if (action.type === 'SET_FILTER_MODE') {
        return ({ ...state, filterMode: action.filterMode });
    }
    if (action.type === 'REMOVE') {
        return ({ ...state, words: state.words.filter(word=> word.id !== action.id) });
    }
    if (action.type === 'TOGGLE_WORD') {
        const words = state.words.map(word => {
            if (word.id !== action.id) return word;
            return { ...word, isMemorized: !word.isMemorized };
        });
        return { ...state, words };
    }
    if (action.type === 'ADD_WORD') {
        return { ...state, words: [action.word, ...state.words], shouldShowForm: false }
    }
    return state;
}

export const store = createStore(reducer);