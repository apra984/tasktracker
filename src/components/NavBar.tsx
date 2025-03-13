import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CreateTaskModal from './CreateTaskModal';

function NavBar({ handleModalClose, handleModalShow, showModal, setTaskList }) {
  return (
    <div className="clearfix">
      <Navbar expand="lg" className="bg-body-tertiary mb-2">
        <Container>
          <Navbar.Brand href="#home">TaskTracker v1.0</Navbar.Brand>
          <Button className="primary" onClick={handleModalShow}>
            Create New Task
          </Button>
          <CreateTaskModal
            handleClose={handleModalClose}
            showModal={showModal}
            setTaskList={setTaskList}
          />
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
