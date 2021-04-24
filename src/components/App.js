import React, { Component } from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions'
import styled from 'styled-components';

import { Dialog, DialogContent, Avatar, Divider } from '@material-ui/core';
import avatar from '../avatar.png'

const ListContainer = styled.div`
    display: flex;
    flex-direction: row
`;

class App extends Component {

  state = { intro: true };

  setIntro = () => {
    this.setState({ intro: false })
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))

  }

  render() {
    const { lists } = this.props;
    const { intro } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Dialog classes={{ paper: 'app_dialog' }} open={intro}>

          <DialogContent classes={{ root: 'app_dialog_content' }} >
            <div className="app_avatar">
              <Avatar alt="Satya Vamsi" classes={{ root: 'app_avatar_image' }} src={avatar} />
              <p className="app_profile_name">Satya Vamsi</p>
              <p className="app_intro_description">
                I am a full stack developer skilled in React.js,  Node.js and PostgreSQL.
              Experience in building end-to-end web applications using PostgreSQL, React, Material-UI, Express.js  <br /><br />
              Check out my profile <a className="app_profile_link" href="https://www.linkedin.com/in/satyavamsi/" target="_blank">here</a>
                <Divider style={{ backgroundColor: '#fff', margin: 20 }} />
              This Trello Clone is built using React.js, Material-UI and React-Beautiful-DND.
          </p>
            </div>
            <button onClick={this.setIntro} className="app_button">
              Lets Go!!
          </button>
          </DialogContent>
        </Dialog>
        <div className="app">
          <div className="appNav">
            <h2 style={{ color: 'white', marginLeft: 20, letterSpacing: 1.5 }}>Trello Clone</h2>
            <a href="https://github.com/satyavamsi/TrelloClone" target="_blank">Github</a>
          </div>
          <div className="appContainer">
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                  {lists.map((list, i) => <TrelloList listId={list.id} key={list.id} title={list.title} index={i} cards={list.cards} />)}
                  {provided.placeholder}
                  <TrelloActionButton list />
                </ListContainer>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps, null)(App);
