import { Card, Badge } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import EditTaskModal from './EditTaskModal';
import { useState } from 'react';

function TaskCard({ task, onDelete, setTaskList }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <>
      <Card className="p-2 mb-1 d-flex flex-row justify-content-between">
        <div className="flex-grow-1" onClick={handleShow}>
          {task.name}
        </div>
        <div>
          <Badge bg="secondary" className="me-4">
            {task.status}
          </Badge>
          <BsTrash
            size={20}
            color="red"
            className="trash-icon"
            onClick={handleDelete}
          />
        </div>
      </Card>
      <EditTaskModal
        task={task}
        handleClose={handleClose}
        showModal={showModal}
        setTaskList={setTaskList}
      />
    </>
  );
}

export default TaskCard;
