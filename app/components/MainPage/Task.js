/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Dehaze as DehazeIcon } from '@material-ui/icons';
const Container = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Task = ({ task, index }) => {
  const isDragDisabled = task.id === 'task-1';
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          <div {...provided.dragHandleProps}>
            <DehazeIcon style={{ marginRight: '8px' }} />
          </div>
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
