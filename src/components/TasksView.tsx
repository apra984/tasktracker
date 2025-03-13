import TaskCard from './TaskCard';
import { useDeleteTaskMutation } from '../api/taskApi';
import { Spinner } from 'react-bootstrap';

function TasksView({ taskList, setTaskList, isLoading }) {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id).unwrap();
      setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        taskList?.map((t, i) => (
          <>
            <TaskCard
              key={i}
              task={t}
              onDelete={handleDeleteTask}
              setTaskList={setTaskList}
            />
          </>
        ))
      )}
      {taskList.length == 0 && (
        <div>
          <em>No tasks available.</em>
        </div>
      )}
    </>
  );
}

export default TasksView;
