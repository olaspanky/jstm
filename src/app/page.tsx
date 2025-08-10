"use client"
import { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import useTasks from './hooks/useTasks';
import taskUtils from './utils/taskUtils';
import { theme } from './utils/theme';
import { Task, FilterType } from './types/task';
import Card from './components/ui/Card/Card';
import Button from './components/ui/Button/Button';
import Modal from './components/ui/Modal/Modal';
import StatsCards from './components/features/StatsCards/StatsCards';
import FilterBar from './components/features/FilterBar/FilterBar';
import TaskItem from './components/features/TaskItem/TaskItem';
import TaskForm from './components/features/TaskForm/TaskForm';
import TaskDetails from './components/features/TaskDetails/TaskDetails';
import EmptyState from './components/features/EmptyState/EmptyState';
import { TaskFormData } from './types/task';

interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view' | null;
  task: Task | null;
}

const TaskManager: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [filter, setFilter] = useState<FilterType>('All');
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: null, task: null });

  const filteredTasks = useMemo(() => taskUtils.filterTasks(tasks, filter), [tasks, filter]);
  const stats = useMemo(() => taskUtils.getTaskStats(tasks), [tasks]);

  const openModal = useCallback((mode: ModalState['mode'], task: Task | null = null) => {
    setModalState({ isOpen: true, mode, task });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, mode: null, task: null });
  }, []);

const handleAddTask = useCallback(
  (taskData: TaskFormData) => {
    addTask(taskData); // ✅ Now valid
    closeModal();
  },
  [addTask, closeModal]
);


 const handleEditTask = useCallback(
  (taskData: TaskFormData) => {
    if (!modalState.task) return;

    updateTask(modalState.task.id, taskData);
    closeModal();
  },
  [updateTask, modalState.task, closeModal]
);


  const handleDeleteTask = useCallback(
    (id: string) => {
      deleteTask(id);
      if (modalState.task?.id === id) closeModal();
    },
    [deleteTask, modalState.task?.id, closeModal]
  );

  const renderModalContent = () => {
    const { mode, task } = modalState;
    switch (mode) {
      case 'create':
        return <TaskForm onSubmit={handleAddTask} onCancel={closeModal} />;
      case 'edit':
        return <TaskForm initialData={task!} onSubmit={handleEditTask} onCancel={closeModal} isEditing />;
      case 'view':
        return <TaskDetails task={task!} onEdit={(t) => openModal('edit', t)} onToggle={toggleComplete} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    const { mode } = modalState;
    switch (mode) {
      case 'create':
        return 'Create New Task';
      case 'edit':
        return 'Edit Task';
      case 'view':
        return 'Task Details';
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradients.primary} p-4 text-black`}>
      <div className="max-w-4xl mx-auto">
        <Card className={theme.spacing.section}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Olakareem's Task Manager</h1>
              <p className="text-gray-600">Organize your work and stay productive</p>
            </div>
            <Button icon={Plus} size="lg" onClick={() => openModal('create')}>
              Add Task
            </Button>
          </div>
          <StatsCards stats={stats} />
        </Card>

        <div className={theme.spacing.section}>
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        </div>

       <div className="space-y-4 z-10">
  {filteredTasks.length === 0 ? (
    <EmptyState filter={filter} onAddTask={() => openModal('create')} />
  ) : (
    filteredTasks.map((task) => (
     <TaskItem
  key={task.id}
  task={task}
  onEdit={(t) => openModal('edit', t)}
  onDelete={handleDeleteTask}
  onToggle={toggleComplete}
  onView={(t) => openModal('view', t)}
/>
    ))
  )}
</div>

        <Modal isOpen={modalState.isOpen} onClose={closeModal} title={getModalTitle()}>
          {renderModalContent()}
        </Modal>
      </div>
    </div>
  );
};

export default TaskManager;