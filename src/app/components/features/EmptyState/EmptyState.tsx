import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button'; // Import the Button component
import { Plus } from 'lucide-react'; // Import the Plus icon for the button
import { FilterType } from '../../../types/task';

interface EmptyStateProps {
  filter: FilterType;
  onAddTask: () => void; // Add prop for handling add task action
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter, onAddTask }) => (
  <Card className="p-12 text-center">
    <div className="text-6xl mb-4">📝</div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
    <p className="text-gray-500 mb-4">
      {filter === 'All' ? (
        'Start by creating your first task!'
      ) : (
        `No ${filter.toLowerCase()} tasks available.`
      )}
    </p>
    {filter === 'All' && (
      <Button icon={Plus} size="lg" onClick={onAddTask}>
        Add Task
      </Button>
    )}
  </Card>
);

export default EmptyState;