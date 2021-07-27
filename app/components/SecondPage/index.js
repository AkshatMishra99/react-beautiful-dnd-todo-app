/**
 *
 * SecondPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import initialData from './initial-data';
// import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
function SecondPage() {
  const [data, setData] = useState({});
  useEffect(() => {
    setData({ ...initialData });
  }, []);
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData(dataTemp => ({ ...dataTemp, columnOrder: newColumnOrder }));
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      setData(dataTemp => ({
        ...dataTemp,
        columns: { ...dataTemp.columns, [newColumn.id]: newColumn },
      }));
      return;
    }
    // Moving from one list to Another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    setData(dataTemp => ({
      ...dataTemp,
      columns: {
        ...dataTemp.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {data.columnOrder &&
              data.columnOrder.map((columnId, ind) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                return (
                  <Column
                    column={column}
                    key={column.id}
                    index={ind}
                    tasks={tasks}
                  />
                );
              })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

SecondPage.propTypes = {};

export default memo(SecondPage);
