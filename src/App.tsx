import { useEffect, useState } from 'react';
import TasksView from './components/TasksView';
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { useGetTasksQuery } from './api/taskApi';

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { data: tasks, error, isLoading } = useGetTasksQuery('');
  const [taskList, setTaskList] = useState(tasks || []);

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks);
    }
  }, [tasks]);

  return (
    <>
      <Container fluid>
        <NavBar
          handleModalClose={handleClose}
          handleModalShow={handleShow}
          showModal={showModal}
          setTaskList={setTaskList}
        ></NavBar>
        <TasksView
          taskList={taskList}
          setTaskList={setTaskList}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}

export default App;
