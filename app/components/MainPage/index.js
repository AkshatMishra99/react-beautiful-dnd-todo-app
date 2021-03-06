/**
 *
 * MainPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from './Column';
// import PropTypes from 'prop-types';
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
function MainPage() {
  const [data, setData] = useState({});
  const [home, setHome] = useState(0);
  // console.log(data);
  useEffect(() => {
    setData({ ...initialData });
  }, []);
  // console.log(data);
  const onDragStart = start => {
    const { source } = start;
    const homeIndex = data.columnOrder.indexOf(source.droppableId);
    setHome(homeIndex);
  };

  const onDragEnd = result => {
    setHome(null);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
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
  console.log(home);
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      // onDragUpdate={onDragUpdate}
    >
      <Container>
        {data &&
          data.columnOrder &&
          data.columnOrder.map((columnID, ind) => {
            const column = data.columns[columnID];
            const tasks = column.taskIds.map(taskID => data.tasks[taskID]);
            const isDropDisabled = ind < home;
            console.log(ind, home, ind < home);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
              />
            );
          })}
      </Container>
    </DragDropContext>
  );
}

MainPage.propTypes = {};

export default memo(MainPage);
