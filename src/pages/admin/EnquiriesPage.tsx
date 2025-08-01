import React, { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';

interface Enquiry {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'lost';
  assignedStaff: string;
  date: string;
  followUpDate: string;
  source: string;
}

const mockEnquiries: Enquiry[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    contact: '+1234567890',
    email: 'alex@example.com',
    status: 'new',
    assignedStaff: 'John Doe',
    date: '2024-02-15',
    followUpDate: '2024-02-18',
    source: 'Website',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    contact: '+1234567891',
    email: 'sarah@example.com',
    status: 'contacted',
    assignedStaff: 'Jane Smith',
    date: '2024-02-14',
    followUpDate: '2024-02-17',
    source: 'Social Media',
  },
  {
    id: '3',
    name: 'Mike Brown',
    contact: '+1234567892',
    email: 'mike@example.com',
    status: 'interested',
    assignedStaff: 'John Doe',
    date: '2024-02-13',
    followUpDate: '2024-02-16',
    source: 'Referral',
  },
];

const statusColors = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  interested: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  converted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const EnquiriesPage: React.FC = () => {
  const [enquiries] = useState<Enquiry[]>(mockEnquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [staffFilter, setStaffFilter] = useState('');

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enquiry.contact.includes(searchQuery) ||
                         enquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || enquiry.status === statusFilter;
    const matchesStaff = !staffFilter || enquiry.assignedStaff === staffFilter;
    
    return matchesSearch && matchesStatus && matchesStaff;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enquiries</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all customer enquiries
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" />
          Add Enquiry
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, contact, or email..."
                leftIcon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              options={[
                { value: '', label: 'All Status' },
                { value: 'new', label: 'New' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'interested', label: 'Interested' },
                { value: 'converted', label: 'Converted' },
                { value: 'lost', label: 'Lost' },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="lg:w-48"
            />
            <Select
              options={[
                { value: '', label: 'All Staff' },
                { value: 'John Doe', label: 'John Doe' },
                { value: 'Jane Smith', label: 'Jane Smith' },
                { value: 'Mike Wilson', label: 'Mike Wilson' },
              ]}
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="lg:w-48"
            />
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries List */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Enquiries ({filteredEnquiries.length})
          </h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned Staff
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Follow-up
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {enquiry.name}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Phone size={12} />
                          <span>{enquiry.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Mail size={12} />
                          <span>{enquiry.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[enquiry.status]}>
                        {enquiry.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {enquiry.assignedStaff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        {new Date(enquiry.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        {new Date(enquiry.followUpDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost">
                          Call
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