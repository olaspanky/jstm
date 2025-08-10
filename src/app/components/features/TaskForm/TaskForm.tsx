import { useState, useCallback } from 'react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import TextArea from '../../ui/TextArea/TextArea';
import { TaskFormData } from '../../../types/task';

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    ...initialData,
  });

  const handleSubmit = useCallback(() => {
    if (!formData.title.trim()) return;
    onSubmit(formData);
  }, [formData, onSubmit]);

  const handleChange = useCallback(
    (field: keyof TaskFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  return (
    <div className="space-y-4">
      <Input
        label="Title *"
        value={formData.title}
        onChange={handleChange('title')}
        placeholder="Enter task title..."
        required
      />

      <TextArea
        label="Description"
        value={formData.description}
        onChange={handleChange('description')}
        placeholder="Enter task description..."
        rows={3}
      />

      <Select label="Priority" value={formData.priority} onChange={handleChange('priority')}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </Select>

      <Input label="Due Date" type="date" value={formData.dueDate} onChange={handleChange('dueDate')} />

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;