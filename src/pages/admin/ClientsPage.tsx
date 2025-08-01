import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, Calendar, Phone, Mail } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ClientRegistrationForm } from '../../components/forms/ClientRegistrationForm';

interface Client {
  id: string;
  fullName: string;
  gender: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  remainingDays: number;
  status: 'active' | 'expired' | 'pending';
}

const mockClients: Client[] = [
  {
    id: '1',
    fullName: 'John Doe',
    gender: 'Male',
    phone: '+1234567890',
    email: 'john@example.com',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    remainingDays: 315,
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    gender: 'Female',
    phone: '+1234567891',
    email: 'jane@example.com',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    remainingDays: 25,
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Mike Wilson',
    gender: 'Male',
    phone: '+1234567892',
    email: 'mike@example.com',
    startDate: '2023-12-01',
    endDate: '2024-02-10',
    remainingDays: -5,
    status: 'expired',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  expired: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export const ClientsPage: React.FC = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const expiringClients = clients.filter(client => client.remainingDays > 0 && client.remainingDays <= 30);
  const expiredClients = clients.filter(client => client.remainingDays <= 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your gym members and their subscriptions
          </p>
        </div>
        <Button onClick={() => setIsAddClientModalOpen(true)} className="mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" />
          Add New Member
        </Button>
      </div>

      {/* Alert Cards */}
      {(expiringClients.length > 0 || expiredClients.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expiringClients.length > 0 && (
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      {expiringClients.length} member(s) expiring in 30 days
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Consider reaching out for renewals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {expiredClients.length > 0 && (
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      {expiredClients.length} member(s) have expired
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Follow up for renewals or account updates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, phone, or email..."
                leftIcon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'expired', label: 'Expired' },
                { value: 'pending', label: 'Pending Renewal' },
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

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Clients ({filteredClients.length})
          </h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Membership Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Remaining Days
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
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {client.fullName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {client.gender}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Phone size={12} className="mr-1" />
                          {client.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Mail size={12} className="mr-1" />
                          {client.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          {new Date(client.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          {new Date(client.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        client.remainingDays <= 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : client.remainingDays <= 30 
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {client.remainingDays <= 0 ? 'Expired' : `${client.remainingDays} days`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[client.status]}>
                        {client.status}
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

      {/* Add Client Modal */}
      <Modal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        title="Add New Client"
        size="xl"
      >
        <ClientRegistrationForm onClose={() => setIsAddClientModalOpen(false)} />
      </Modal>
    </div>
  );
};