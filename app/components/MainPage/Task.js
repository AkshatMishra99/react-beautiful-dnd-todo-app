import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
const Container = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
);
Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
};
export default Task;
