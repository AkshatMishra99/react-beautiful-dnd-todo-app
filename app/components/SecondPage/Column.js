/* eslint-disable prettier/prettier */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Task from './Task';

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  width: 45%;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  background-color: ${props =>
    props.isDraggingOver ? 'rgb(255,235,230)' : 'white'};
`;
const Column = ({ column, tasks, index }) => {
  console.log(column);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snap) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snap.isDragging}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(innerProvided, snapshot) => (
              <TaskList
                ref={innerProvided.innerRef}
                {...innerProvided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, ind) => (
                  <Task key={task.id} task={task} index={ind} />
                ))}
                {innerProvided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
Column.propTypes = {
  column: PropTypes.object,
  tasks: PropTypes.array,
  index: PropTypes.number,
};
export default Column;
