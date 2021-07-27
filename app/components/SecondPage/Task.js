/* eslint-disable prettier/prettier */
import { Dehaze } from '@material-ui/icons';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const IconContainer = styled.div`
  margin-right: 5px;
`;
const Task = ({ task, index }) => {
  console.log(task);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <IconContainer {...provided.dragHandleProps}>
            <Dehaze />
          </IconContainer>
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
};
export default Task;
