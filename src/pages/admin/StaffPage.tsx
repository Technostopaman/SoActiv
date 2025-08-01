import React, { useState } from 'react';
import { Plus, Search, Filter, User, Phone, Calendar, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';

interface Staff {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'John Doe',
    designation: 'Senior Trainer',
    phone: '+1234567890',
    email: 'john@soactiv.com',
    joiningDate: '2023-06-15',
    salary: 45000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    designation: 'Receptionist',
    phone: '+1234567891',
    email: 'jane@soactiv.com',
    joiningDate: '2023-08-20',
    salary: 32000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    designation: 'Personal Trainer',
    phone: '+1234567892',
    email: 'mike@soactiv.com',
    joiningDate: '2023-09-10',
    salary: 38000,
    status: 'active',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const StaffPage: React.FC = () => {
  const [staff] = useState<Staff[]>(mockStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || member.designation.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesStatus = !statusFilter || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your gym staff and their information
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            Mark Attendance
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {staff.length}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {staff.filter(s => s.status === 'active').length}
                </p>
              </div>
              <User className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trainers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {staff.filter(s => s.designation.toLowerCase().includes('trainer')).length}
                </p>
              </div>
              <User className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Payroll</p>
                <p className="text-2xl font-bold text-teal-600">
                  ${staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, phone, email, or designation..."
                leftIcon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              options={[
                { value: '', label: 'All Roles' },
                { value: 'trainer', label: 'Trainers' },
                { value: 'receptionist', label: 'Receptionists' },
                { value: 'manager', label: 'Managers' },
              ]}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="lg:w-48"
            />
            <Select
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="lg:w-48"
            />
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Staff ({filteredStaff.length})
          </h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {member.designation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Phone size={12} className="mr-1" />
                          {member.phone}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={12} className="mr-1" />
                        {new Date(member.joiningDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                        <DollarSign size={12} className="mr-1" />
                        {member.salary.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[member.status]}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};