import { CONSTANTS } from "../actions";

export const addList = (title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    }
}

export const editList = (text, listId) => {
    return {
        type: CONSTANTS.EDIT_LIST,
        payload: { text, listId }
    }
}

export const deleteList = (listId) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: { listId }
    }
}

export const sort = (
    droppableStart,
    droppableEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type) => {

    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableStart,
            droppableEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}