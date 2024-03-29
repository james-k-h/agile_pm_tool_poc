import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';

import { Col, Button, Card, Container } from 'react-bootstrap';
import TaskComponent from './TaskComponent';
import AddTaskModal from './AddTaskModal';

interface BoardSectionProps {
  title: String;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Col
        md={3}
        className="d-flex flex-column p-4 text-center align-items-center "
      >
        <div className="board-section-header d-flex flex-row  ">
          <h3 className="me-auto">{title}</h3>
          {/* <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} /> */}
        </div>
        <Droppable droppableId={title}>
          {(provided) => (
            <Container
              className="p-0 d-flex flex-column h-100 text-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks &&
                tasks.map((task: Task, index: number) => {
                  return (
                    <TaskComponent
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      id={task.id}
                      boardCategory={title}
                      index={index}
                    />
                  );
                })}
              {tasks.length > 0 && (
                <Button className="add-wrapper" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} style={{ padding: '2px' }} />
                  Add Task
                </Button>
              )}
              {tasks.length === 0 && (
                <div className="is-empty d-flex flex-column">
                  <Button className="add-wrapper" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} style={{ padding: '2px' }} />
                    Add Task
                  </Button>
                </div>
              )}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </Col>
      <AddTaskModal
        showModal={showModal}
        handleClose={handleClose}
        boardCategory={title}
      />
    </>
  );
};
export default BoardSection;
