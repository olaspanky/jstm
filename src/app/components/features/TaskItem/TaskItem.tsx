import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import Badge from '../../ui/Badge/Badge';
import { Check, Edit3, Trash2, Calendar, Clock } from 'lucide-react';
import taskUtils from '../../../utils/taskUtils';
import { Task } from '../../../types/task';
import { theme } from '../../../utils/theme';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onView: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggle, onView }) => {
  const priorityConfig = taskUtils.getPriorityConfig(task.priority);
  const isOverdue = taskUtils.isOverdue(task.dueDate, task.completed);

  return (
    <Card className={`${task.completed ? 'opacity-75' : ''} ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex items-start gap-4">
        <Button
          variant={task.completed ? 'success' : 'secondary'}
          size="sm"
          icon={Check}
          onClick={() => onToggle(task.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold cursor-pointer hover:text-indigo-600 ${theme.transitions} ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
                onClick={() => onView(task)}
              >
                {task.title}
              </h3>
              {task.description && <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>}

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge className={`${priorityConfig.color} ${priorityConfig.bg}`}>
                  {task.priority} Priority
                </Badge>
                {task.dueDate && (
                  <span
                    className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}
                  >
                    <Calendar size={14} />
                    {taskUtils.formatDate(task.dueDate)}
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <Clock size={14} />
                  Created {taskUtils.formatDate(task.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={Edit3} onClick={() => onEdit(task)} />
              <Button variant="ghost" size="sm" icon={Trash2} onClick={() => onDelete(task.id)} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;