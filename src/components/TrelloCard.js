import { Card, CardContent, Icon, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { deleteCard } from '../actions';

const CardContainer = styled.div`
    margin-bottom: 8px;
`

class TrelloCard extends React.Component {
    handleDelete = () => {
        const { dispatch, listId, cardId } = this.props;
        dispatch(deleteCard(listId, cardId));
    }
    render() {
        const { text, listId, cardId, index } = this.props;
        return (
            <Draggable draggableId={cardId} index={index}>
                {(provided) => (
                    <CardContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Card style={{
                            backgroundColor: 'rgb(191 230 221)',
                            color: 'black',
                            position: 'relative'
                        }}>
                            <CardContent>
                                <Typography gutterBottom>
                                    {text}
                                </Typography>
                                <Tooltip title="Delete" placement="top" arrow>
                                    <Icon onClick={this.handleDelete} style={{ color: 'rgb(117 80 80 / 51%)', position: 'absolute', right: 2, bottom: 2, fontSize: 20, cursor: 'pointer' }}>delete</Icon>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </CardContainer>
                )
                }
            </Draggable >
        );
    }
}

export default connect()(TrelloCard);