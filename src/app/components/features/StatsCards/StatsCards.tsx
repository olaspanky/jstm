import { TaskStats } from '../../../types/task';
import { theme } from '../../../utils/theme';
import { List, CheckCircle, Clock } from 'lucide-react'; // Import icons from lucide-react

interface StatsCardsProps {
  stats: TaskStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    {/* Total Tasks Card */}
    <div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center gap-3">
        <List className="w-8 h-8 text-blue-500" />
        <div>
          <div className="text-3xl font-semibold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-500 font-medium">Total Tasks</div>
        </div>
      </div>
    </div>

    {/* Completed Tasks Card */}
    <div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-500" />
        <div>
          <div className="text-3xl font-semibold text-gray-800">{stats.completed}</div>
          <div className="text-sm text-gray-500 font-medium">Completed</div>
        </div>
      </div>
    </div>

    {/* Pending Tasks Card */}
    <div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center gap-3">
        <Clock className="w-8 h-8 text-orange-500" />
        <div>
          <div className="text-3xl font-semibold text-gray-800">{stats.pending}</div>
          <div className="text-sm text-gray-500 font-medium">Pending</div>
        </div>
      </div>
    </div>
  </div>
);

export default StatsCards;