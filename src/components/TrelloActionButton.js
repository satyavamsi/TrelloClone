import { Button, Card, Icon } from '@material-ui/core';
import React from 'react';
import TextArea from 'react-textarea-autosize';

import { connect } from 'react-redux';
import { addList, addCard } from '../actions';

import styled from 'styled-components';

const AddButton = styled.div`
    :hover  {
        background-color: rgba(0,0,0,0.5) !important;
    }
`

class TrelloActionButton extends React.Component {

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({ formOpen: true })
    }

    closeForm = () => {
        this.setState({ formOpen: false })
    }

    handleInputChange = e => {
        this.setState({ text: e.target.value })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;
        if (text) {
            this.setState({
                text: "",
            })
            dispatch(addList(text))
        }
        return;
    }

    handleAddCard = () => {
        const { dispatch, listId } = this.props;
        const { text } = this.state;
        if (text) {
            this.setState({
                text: "",
            })
            dispatch(addCard(listId, text))
        }
        return;
    }

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add a list ..." : "Add a card ...";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? 'white' : 'white';
        const buttonTextBackground = list ? 'rgba(0,0,0,0.2)' : 'inherit';

        return (
            <AddButton
                onClick={this.openForm}
                style={{
                    ...styles.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor, backgroundColor: buttonTextBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </AddButton>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? 'Enter list title ...' : 'Enter a title for this card ...';
        const buttonTitle = list ? 'Add List' : 'Add Card';

        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px",
                    backgroundColor: 'rgb(191 230 221)'
                }}>
                    <TextArea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: 'none',
                            width: '100%',
                            outline: 'none',
                            overflow: 'hidden',
                            border: 'none',
                            padding: 10,
                            fontSize: 18,
                            backgroundColor: 'rgb(191 230 221)'
                        }} />
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant="contained"
                        style={{
                            color: 'black',
                            backgroundColor: 'rgb(191 230 221)'
                        }}>
                        {buttonTitle}
                    </Button>
                    <Icon onMouseDown={this.closeForm} style={{ marginLeft: 8, cursor: 'pointer', color: 'white' }}>close</Icon>
                </div>
            </div>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const styles = {
    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        minWidth: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center'
    }
}

export default connect()(TrelloActionButton);