import React, { useState } from 'react';
import { Calendar, Search, DollarSign, CreditCard, Clock, Users, RotateCcw, UserCheck } from 'lucide-react';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('today');
  const [memberFilter, setMemberFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const statsData = [
    {
      title: 'Total Sales',
      value: '$45,230',
      icon: <DollarSign size={24} />,
      color: 'orange' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Payments Collected',
      value: '$38,450',
      icon: <CreditCard size={24} />,
      color: 'green' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Payments Pending',
      value: '$6,780',
      icon: <Clock size={24} />,
      color: 'red' as const,
      trend: { value: 3, isPositive: false },
    },
    {
      title: 'New Clients',
      value: 23,
      icon: <Users size={24} />,
      color: 'blue' as const,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Renewals',
      value: 18,
      icon: <RotateCcw size={24} />,
      color: 'teal' as const,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Check-ins',
      value: 142,
      icon: <UserCheck size={24} />,
      color: 'purple' as const,
      trend: { value: 7, isPositive: true },
    },
  ];

  const snapshotData = {
    followUps: 5,
    appointments: 8,
    classes: 3,
    serviceExpiry: 12,
    ptExpiry: 4,
    upNext: 2,
    birthdays: 3,
    events: 1,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening at your gym today.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <Select
              label="Date Filter"
              options={[
                { value: 'today', label: 'Today' },
                { value: 'last3days', label: 'Last 3 Days' },
                { value: 'last7days', label: 'Last 7 Days' },
                { value: 'lastmonth', label: 'Last Month' },
                { value: 'custom', label: 'Custom Date Range' },
              ]}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="lg:w-48"
            />

            <Select
              label="Member Filter"
              options={[
                { value: '', label: 'All Members' },
                { value: 'john-doe', label: 'John Doe' },
                { value: 'jane-smith', label: 'Jane Smith' },
                { value: 'mike-wilson', label: 'Mike Wilson' },
              ]}
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="lg:w-48"
            />

            <div className="flex-1 lg:max-w-md">
              <Input
                placeholder="Search transactions, members..."
                leftIcon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button>
              Go
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
            onViewMore={() => console.log(`View more for ${stat.title}`)}
          />
        ))}
      </div>

      {/* Right Sidebar Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        John Doe checked in
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New member registered: Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        15 minutes ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Payment received: $89.99
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                <button className="text-sm font-medium text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 pb-2">
                  Snapshot
                </button>
                <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Follow-ups
                </button>
                <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Leaderboard
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(snapshotData).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};