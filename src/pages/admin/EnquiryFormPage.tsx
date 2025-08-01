import React, { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';

export const EnquiryFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    status: 'new',
    assignedStaff: '',
    followUpDate: '',
    comments: '',
    interests: '',
    budget: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Enquiry form submitted:', formData);
    navigate('/admin/enquiries');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/enquiries')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Enquiry</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manually add a new customer enquiry to the system
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Enquiry Details
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <Select
                  label="Source"
                  options={[
                    { value: '', label: 'Select Source' },
                    { value: 'website', label: 'Website' },
                    { value: 'social-media', label: 'Social Media' },
                    { value: 'referral', label: 'Referral' },
                    { value: 'walk-in', label: 'Walk-in' },
                    { value: 'advertisement', label: 'Advertisement' },
                    { value: 'other', label: 'Other' },
                  ]}
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Enquiry Details */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Enquiry Management
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Status"
                  options={[
                    { value: 'new', label: 'New' },
                    { value: 'contacted', label: 'Contacted' },
                    { value: 'interested', label: 'Interested' },
                    { value: 'converted', label: 'Converted' },
                    { value: 'lost', label: 'Lost' },
                  ]}
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                />
                <Select
                  label="Assigned Staff"
                  options={[
                    { value: '', label: 'Select Staff Member' },
                    { value: 'john-doe', label: 'John Doe' },
                    { value: 'jane-smith', label: 'Jane Smith' },
                    { value: 'mike-wilson', label: 'Mike Wilson' },
                  ]}
                  value={formData.assignedStaff}
                  onChange={(e) => handleInputChange('assignedStaff', e.target.value)}
                  required
                />
                <Input
                  label="Follow-up Date"
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => handleInputChange('followUpDate', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Areas of Interest"
                  placeholder="e.g., Weight training, Cardio, Yoga"
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                />
                <Input
                  label="Budget Range"
                  placeholder="e.g., $50-100/month"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments & Notes
              </label>
              <textarea
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                placeholder="Add any additional notes or comments about this enquiry..."
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/admin/enquiries')}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save size={16} className="mr-2" />
                Save Enquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};