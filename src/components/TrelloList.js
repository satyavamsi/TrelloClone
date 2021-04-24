import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TrelloActionButton from './TrelloActionButton';
import TrelloCard from './TrelloCard';
import styled from 'styled-components';
import { Button, Dialog, DialogActions, DialogContent, Icon, Slide, TextField, Tooltip, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { editList, deleteList } from '../actions';

const ListContainer = styled.div`
    background-color: #1d1d2369;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
`
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide mountOnEnter unmountOnExit direction="up" ref={ref} {...props} />;
});
class TrelloList extends React.Component {
    state = {
        editMode: false,
        text: this.props.title,
        deleteMode: false
    }

    handleEdit = () => {
        const { text } = this.state;
        const { dispatch, listId } = this.props;
        if (text) {
            dispatch(editList(text, listId));
        }
        this.toggleEdit();
    }

    handleDelete = () => {
        const { dispatch, listId } = this.props;
        dispatch(deleteList(listId));
        this.toggleDelete();
    }

    handleOnChange = e => {
        this.setState({ text: e.target.value })
    }

    toggleEdit = () => {
        this.setState({ editMode: !this.state.editMode, text: this.props.title })
    }

    toggleDelete = () => {
        this.setState({ deleteMode: !this.state.deleteMode })
    }

    render() {
        const { title, cards, listId, index } = this.props;
        const { editMode, text, deleteMode } = this.state;
        return (
            <Draggable draggableId={String(listId)} index={index}>
                {provided => (
                    <ListContainer
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}>
                        <Droppable droppableId={String(listId)}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {editMode ? <TextField
                                            autoFocus
                                            variant="filled"
                                            value={text}
                                            onChange={this.handleOnChange}
                                        /> :
                                            <h4 style={{ color: 'white', letterSpacing: 0.8 }}>{title.toUpperCase()}</h4>}
                                        {editMode ?
                                            <div>
                                                <Tooltip title="Save" placement="top">
                                                    <Icon onClick={this.handleEdit} style={{ marginRight: 4, color: '#c2e8ff', cursor: 'pointer' }}>check</Icon>
                                                </Tooltip>
                                                <Tooltip onClick={this.toggleEdit} title="Close" placement="top">
                                                    <Icon style={{ color: '#ff5757e8', cursor: 'pointer' }}>close</Icon>
                                                </Tooltip>
                                            </div> :
                                            <div>
                                                <Tooltip title="Edit" placement="top">
                                                    <Icon onClick={this.toggleEdit} style={{ marginRight: 4, color: '#c2e8ff', cursor: 'pointer' }}>edit</Icon>
                                                </Tooltip>
                                                <Tooltip title="Delete" placement="top">
                                                    <Icon onClick={this.toggleDelete} style={{ color: '#ff5757e8', cursor: 'pointer' }}>delete</Icon>
                                                </Tooltip>
                                            </div>}
                                    </div>

                                    {cards.map((card, i) => <TrelloCard key={card.id} text={card.text} listId={listId} cardId={card.id} index={i} />)}
                                    {provided.placeholder}
                                    <TrelloActionButton listId={listId} />
                                </div>
                            )}
                        </Droppable>
                        {deleteMode &&
                            <Dialog
                                TransitionComponent={Transition} open={deleteMode} onClose={this.toggleDelete}>
                                <DialogContent>
                                    <Typography variant="subtitle1">Are you sure you want to delete list <span style={{ fontWeight: 'bold' }}>{title.toUpperCase()}</span>?</Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button style={{ backgroundColor: '#ff5757e8', color: 'white' }} onClick={this.handleDelete} variant="contained">Yes</Button>
                                    <Button style={{ backgroundColor: 'rgb(115 202 181)', color: 'white' }} onClick={this.toggleDelete} variant="contained">No</Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </ListContainer>
                )}
            </Draggable>
        );
    }
}

export default connect()(TrelloList);