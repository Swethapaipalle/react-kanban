import React, { useState } from 'react';
import styled from '@emotion/styled';
import { columnsFromBackend } from './Config';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 200px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const Column = styled.div`
  margin: 50px 400px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #e5f0ed;
  background: rgb(80 183 223 / 98%);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
  font-size:26px;
  margin: 0 auto;
`;

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (item, columns, setColumns) => {

    if (!item.destination) return;
    const { source, destination } = item;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={(item) => onDragEnd(item, columns, setColumns)}
    >
      <Container>
        <Column>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <Task key={item} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            );
          })}
        </Column>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
