import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useCreateTaskMutation } from '../api/taskApi';
import DatePicker from 'react-datepicker';

function CreateTaskModal({ handleClose, showModal, setTaskList }) {
  const [startDate, setStartDate] = useState(new Date());
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    dueDate: startDate,
    status: '',
  });

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
      await createTask(formData)
        .unwrap()
        .then((res) => {
          setTaskList((prevTasks) => {
            let formDataCopy = { ...formData };
            formDataCopy.id = res.taskId;
            return [...prevTasks, formDataCopy];
          });
          setFormData({
            id: 0,
            name: '',
            description: '',
            dueDate: startDate,
            status: '',
          });
        });
    } catch (err) {
      console.error('Error creating task:', err);
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
          <Modal.Title>New Task</Modal.Title>
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
                name="status"
                onChange={handleChange}
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
              setFormData({
                id: 0,
                name: '',
                description: '',
                dueDate: startDate,
                status: '',
              });
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

export default CreateTaskModal;
