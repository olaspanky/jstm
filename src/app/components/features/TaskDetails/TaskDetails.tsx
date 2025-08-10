import Button from '../../ui/Button/Button';
import Badge from '../../ui/Badge/Badge';
import { Calendar, Clock } from 'lucide-react';
import taskUtils from '../../../utils/taskUtils';
import { Task } from '../../../types/task';

interface TaskDetailsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onEdit, onToggle }) => {
  const priorityConfig = taskUtils.getPriorityConfig(task.priority);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
        {task.description && <p className="text-gray-600">{task.description}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700">Status:</span>
          <Badge variant={task.completed ? 'success' : 'warning'}>
            {task.completed ? 'Completed' : 'Pending'}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700">Priority:</span>
          <Badge className={`${priorityConfig.color} ${priorityConfig.bg}`}>{task.priority}</Badge>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-gray-600">Due: {taskUtils.formatDate(task.dueDate)}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Clock size={16} className="text-gray-500" />
          <span className="text-gray-600">Created: {taskUtils.formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={() => onEdit(task)} className="flex-1">
          Edit Task
        </Button>
        <Button
          variant={task.completed ? 'warning' : 'success'}
          onClick={() => onToggle(task.id)}
          className="flex-1"
        >
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;