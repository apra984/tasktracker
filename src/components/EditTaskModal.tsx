import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useUpdateTaskMutation } from '../api/taskApi';
import DatePicker from 'react-datepicker';

function EditTaskModal({ handleClose, task, setTaskList, showModal }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [formData, setFormData] = useState(task);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTask(formData)
        .unwrap()
        .then(() => {
          setTaskList((prevTasks) => {
            let updatedList = [...prevTasks];
            let taskIndex = updatedList.findIndex((t) => t.id === task.id);
            updatedList[taskIndex] = formData;
            return updatedList;
          });
        });
    } catch (err) {
      console.error('Error updating task:', err);
    }
    handleClose();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add a name.."
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <br />
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add a description.."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <br />
              <Form.Label>Due Date</Form.Label>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                />
              </div>
              <br />
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="status"
                defaultValue={task.status}
                onChange={handleChange}
                name="status"
              >
                <option>Select task status..</option>
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {isLoading ? <Spinner /> : <>Save</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTaskModal;
