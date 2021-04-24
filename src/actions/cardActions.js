import { CONSTANTS } from "../actions";

export const addCard = (listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { listId, text }
    }
}

export const deleteCard = (listId, cardId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { listId, cardId }
    }
}