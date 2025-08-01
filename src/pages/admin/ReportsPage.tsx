import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { StatsCard } from '../../components/dashboard/StatsCard';

export const ReportsPage: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState('monthly');

  const reportData = {
    totalClients: 425,
    activeClients: 387,
    newJoins: 45,
    renewals: 32,
    ptClientsPerTrainer: {
      'John Doe': 15,
      'Jane Smith': 12,
      'Mike Wilson': 18,
      'Sarah Brown': 14,
    },
    totalProfit: 125000,
    revenue: 145000,
    expenses: 20000,
  };

  const monthlyData = [
    { month: 'Jan', revenue: 12000, expenses: 3000, newMembers: 25 },
    { month: 'Feb', revenue: 14500, expenses: 3200, newMembers: 32 },
    { month: 'Mar', revenue: 13800, expenses: 2800, newMembers: 28 },
    { month: 'Apr', revenue: 15200, expenses: 3500, newMembers: 35 },
    { month: 'May', revenue: 16800, expenses: 3800, newMembers: 42 },
    { month: 'Jun', revenue: 18200, expenses: 4000, newMembers: 48 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyze your gym's performance and growth
          </p>
        </div>
        <Select
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          className="mt-4 sm:mt-0 w-48"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clients"
          value={reportData.totalClients}
          icon={<Users size={24} />}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Clients"
          value={reportData.activeClients}
          icon={<Activity size={24} />}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="New Joins"
          value={reportData.newJoins}
          icon={<TrendingUp size={24} />}
          color="orange"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Renewals"
          value={reportData.renewals}
          icon={<Calendar size={24} />}
          color="teal"
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Financial Summary
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</span>
                <span className="text-lg font-semibold text-green-600">
                  ${reportData.revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</span>
                <span className="text-lg font-semibold text-red-600">
                  ${reportData.expenses.toLocaleString()}
                </span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Net Profit</span>
                <span className="text-xl font-bold text-orange-600">
                  ${reportData.totalProfit.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Performance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Month
                    </th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Revenue
                    </th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Expenses
                    </th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      New Members
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 text-sm text-gray-900 dark:text-white">
                        {data.month}
                      </td>
                      <td className="py-2 text-sm text-right text-green-600">
                        ${data.revenue.toLocaleString()}
                      </td>
                      <td className="py-2 text-sm text-right text-red-600">
                        ${data.expenses.toLocaleString()}
                      </td>
                      <td className="py-2 text-sm text-right text-blue-600">
                        {data.newMembers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainer Performance */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            PT Clients per Trainer
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(reportData.ptClientsPerTrainer).map(([trainer, clients]) => (
              <div key={trainer} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {trainer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Personal Trainer
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      {clients}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      clients
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Membership Distribution
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Basic Plan</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Premium Plan</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">VIP Plan</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Peak Hours
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">6:00 - 9:00 AM</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">6:00 - 9:00 PM</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">12:00 - 2:00 PM</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">60%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};