import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Task from './Task';

const Container = styled.div`
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;
const Column = ({ column, tasks }) => (
  //   console.log(tasks);

  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {provided => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </Container>
);
Column.propTypes = {
  column: PropTypes.object,
  tasks: PropTypes.array,
};
export default Column;
