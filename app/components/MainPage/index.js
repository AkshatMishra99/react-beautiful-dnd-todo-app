/**
 *
 * MainPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';
// import PropTypes from 'prop-types';

function MainPage() {
  const [data, setData] = useState({});
  // console.log(data);
  useEffect(() => {
    setData({ ...initialData });
  }, []);
  // console.log(data);
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    setData(dataTemp => ({
      ...dataTemp,
      columns: { ...dataTemp.columns, [newColumn.id]: newColumn },
    }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data &&
        data.columnOrder &&
        data.columnOrder.map(columnID => {
          const column = data.columns[columnID];
          const tasks = column.taskIds.map(taskID => data.tasks[taskID]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
    </DragDropContext>
  );
}

MainPage.propTypes = {};

export default memo(MainPage);
