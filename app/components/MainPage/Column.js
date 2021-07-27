import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Task from './Task';

const Container = styled.div`
  margin: 10px auto;
  padding: 10px;
  width: 30%;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
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
const Column = ({ column, tasks, isDropDisabled }) => {
  console.log(isDropDisabled);
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
Column.propTypes = {
  column: PropTypes.object,
  tasks: PropTypes.array,
  isDropDisabled: PropTypes.bool,
};
export default Column;
