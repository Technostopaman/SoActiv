import React from 'react';
import { Settings, Building, Users, Bell, Palette, Database } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SetupPage: React.FC = () => {
  const setupSections = [
    {
      title: 'Branch Configuration',
      description: 'Configure gym locations, facilities, and branch-specific settings',
      icon: <Building className="w-6 h-6" />,
      status: 'Not Configured',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Trainer Levels',
      description: 'Set up trainer certifications, levels, and specializations',
      icon: <Users className="w-6 h-6" />,
      status: 'Configured',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Notification Settings',
      description: 'Configure email, SMS, and push notification preferences',
      icon: <Bell className="w-6 h-6" />,
      status: 'Partially Configured',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Theme & Branding',
      description: 'Customize colors, logos, and branding elements',
      icon: <Palette className="w-6 h-6" />,
      status: 'Configured',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Database Backup',
      description: 'Configure automated backups and data retention policies',
      icon: <Database className="w-6 h-6" />,
      status: 'Not Configured',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'General Settings',
      description: 'Configure general application settings and preferences',
      icon: <Settings className="w-6 h-6" />,
      status: 'Configured',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your gym management system settings and preferences
        </p>
      </div>

      {/* Setup Overview */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Setup Progress
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Configuration Progress</span>
                <span>67%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">4 of 6 sections</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">configured</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {setupSections.map((section, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${section.bgColor}`}>
                  <div className={section.color}>
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${section.color}`}>
                      {section.status}
                    </span>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Database className="w-8 h-8 text-gray-600" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Settings className="w-8 h-8 text-gray-600" />
              <span className="text-sm">System Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Users className="w-8 h-8 text-gray-600" />
              <span className="text-sm">User Permissions</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Bell className="w-8 h-8 text-gray-600" />
              <span className="text-sm">Notifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Information
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Application Version</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Database Version</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">PostgreSQL 14.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Backup</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2 hours ago</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Storage Used</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2.4 GB / 10 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">99.9%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};