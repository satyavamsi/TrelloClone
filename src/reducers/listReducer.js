import { CONSTANTS } from "../actions";

let listID = 3;
let cardID = 10;

const initialState = [
    {
        title: "TODO",
        id: 'list-0',
        cards: [
            {
                id: 'card-0',
                text: "Create a new table for storing cards data"
            },
            {
                id: 'card-1',
                text: "Create new APIs for inserting and updating cards data"
            }
        ]
    },
    {
        title: "In Progress",
        id: 'list-1',
        cards: [
            {
                id: 'card-2',
                text: "Code Reviews"
            },
            {
                id: 'card-3',
                text: "Setup monitoring tools"
            },
            {
                id: 'card-4',
                text: "Dragging not working in mobile view"
            },
            {
                id: 'card-5',
                text: "Change background color"
            },
            {
                id: 'card-6',
                text: "Setup a dev server for the new developers"
            },
        ]
    },
    {
        title: "Verifying",
        id: 'list-2',
        cards: [
            {
                id: 'card-7',
                text: "Toggle edit is not working in mobile view"
            },
            {
                id: 'card-8',
                text: "Toggle edit is not working in mobile view"
            },
            {
                id: 'card-9',
                text: "Toggle edit is not working in mobile view"
            }
        ]
    }

]

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID++;
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID++;
            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return newState;
        }
        case CONSTANTS.DELETE_CARD: {
            const newList = state.filter(list => list.id === action.payload.listId);
            const newCards = newList[0].cards.filter(card => card.id !== action.payload.cardId);
            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: newCards
                    }
                } else {
                    return list;
                }
            });
            return newState;
        }
        case CONSTANTS.EDIT_LIST: {
            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        title: action.payload.text
                    }
                } else {
                    return list;
                }
            });
            return newState;
        }
        case CONSTANTS.DELETE_LIST: {
            const newState = state.filter(list => list.id !== action.payload.listId);
            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:
            const { droppableStart,
                droppableEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type } = action.payload;
            let newState = [...state];
            if (type === 'list') {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
            } else {
                // In the same list
                if (droppableStart === droppableEnd) {
                    const list = newState.find(list => droppableEnd === list.id);
                    const card = list.cards.splice(droppableIndexStart, 1);
                    list.cards.splice(droppableIndexEnd, 0, ...card);
                } else {
                    const listStart = newState.find(list => droppableStart === list.id);
                    const card = listStart.cards.splice(droppableIndexStart, 1);
                    const listEnd = newState.find(list => droppableEnd === list.id);
                    listEnd.cards.splice(droppableIndexEnd, 0, ...card);
                }
            }
            return newState;
        default:
            return state;
    }
}

export default listReducer