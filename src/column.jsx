import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Column = ({
  title,
  quotes,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
}) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {title}
            </Title>
          </Header>
          <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={
              useClone
                ? (provided, snapshot, descriptor) => (
                    <QuoteItem
                      quote={quotes[descriptor.source.index]}
                      provided={provided}
                      isDragging={snapshot.isDragging}
                      isClone
                    />
                  )
                : null
            }
          >
            {(dropProvided, dropSnapshot) => (
              <Wrapper
                style={style}
                isDraggingOver={dropSnapshot.isDraggingOver}
                isDropDisabled={isDropDisabled}
                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                {...dropProvided.droppableProps}
              >
                {internalScroll ? (
                  <ScrollContainer style={scrollContainerStyle}>
                    <InnerList
                      quotes={quotes}
                      title={title}
                      dropProvided={dropProvided}
                    />
                  </ScrollContainer>
                ) : (
                  <InnerList
                    quotes={quotes}
                    title={title}
                    dropProvided={dropProvided}
                  />
                )}
              </Wrapper>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
