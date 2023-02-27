import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  min-height: 77px;
  border-radius: 5px;
  max-width: 200px;
  background: #6ccbf482;
  margin-top: 10px;
`;

const Task = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Info>
            <p>{item.Task}</p>
          </Info>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

