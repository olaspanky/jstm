import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import { Filter } from 'lucide-react';
import { FilterType } from '../../../types/task';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters: FilterType[] = ['All', 'Pending', 'Completed'];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter size={20} className="text-gray-600" />
        <span className="font-medium text-gray-700">Filter Tasks</span>
      </div>
      <div className="flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default FilterBar;