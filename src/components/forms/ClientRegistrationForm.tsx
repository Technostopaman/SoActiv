import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { User, Phone, Mail, MapPin, UserCheck, Calendar } from 'lucide-react';

interface ClientRegistrationFormProps {
  onClose: () => void;
}

export const ClientRegistrationForm: React.FC<ClientRegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+1',
    contactNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelation: '',
    salesRep: '',
    memberManager: '',
    trainer: '',
    attendanceId: '',
    clubId: '',
    gstNo: '',
    notifications: {
      sms: true,
      email: true,
      push: true,
      whatsapp: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter full name"
            leftIcon={<User size={16} />}
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
          />
          
          <div className="flex space-x-2">
            <Select
              label="Country Code"
              options={[
                { value: '+1', label: '+1 (US)' },
                { value: '+44', label: '+44 (UK)' },
                { value: '+91', label: '+91 (IN)' },
              ]}
              value={formData.countryCode}
              onChange={(e) => handleInputChange('countryCode', e.target.value)}
              className="w-32"
            />
            <Input
              label="Contact Number"
              placeholder="Phone number"
              leftIcon={<Phone size={16} />}
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              required
              className="flex-1"
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="Enter email address"
            leftIcon={<Mail size={16} />}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />

          <Select
            label="Gender"
            options={[
              { value: '', label: 'Select Gender' },
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            required
          />

          <Input
            label="Date of Birth"
            type="date"
            leftIcon={<Calendar size={16} />}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            required
          />

          <Input
            label="Address"
            placeholder="Enter address"
            leftIcon={<MapPin size={16} />}
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Contact Name"
            placeholder="Emergency contact name"
            leftIcon={<UserCheck size={16} />}
            value={formData.emergencyContactName}
            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            required
          />
          <Input
            label="Contact Number"
            placeholder="Emergency contact number"
            leftIcon={<Phone size={16} />}
            value={formData.emergencyContactNumber}
            onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)}
            required
          />
          <Select
            label="Relationship"
            options={[
              { value: '', label: 'Select Relationship' },
              { value: 'parent', label: 'Parent' },
              { value: 'spouse', label: 'Spouse' },
              { value: 'sibling', label: 'Sibling' },
              { value: 'friend', label: 'Friend' },
              { value: 'other', label: 'Other' },
            ]}
            value={formData.emergencyContactRelation}
            onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Staff Assignment */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Staff Assignment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Sales Rep"
            options={[
              { value: '', label: 'Select Sales Rep' },
              { value: 'john-doe', label: 'John Doe' },
              { value: 'jane-smith', label: 'Jane Smith' },
            ]}
            value={formData.salesRep}
            onChange={(e) => handleInputChange('salesRep', e.target.value)}
            required
          />
          <Select
            label="Member Manager"
            options={[
              { value: '', label: 'Select Member Manager' },
              { value: 'mike-wilson', label: 'Mike Wilson' },
              { value: 'sarah-brown', label: 'Sarah Brown' },
            ]}
            value={formData.memberManager}
            onChange={(e) => handleInputChange('memberManager', e.target.value)}
            required
          />
          <Select
            label="Trainer (Optional)"
            options={[
              { value: '', label: 'Select Trainer' },
              { value: 'alex-johnson', label: 'Alex Johnson' },
              { value: 'emma-davis', label: 'Emma Davis' },
            ]}
            value={formData.trainer}
            onChange={(e) => handleInputChange('trainer', e.target.value)}
          />
        </div>
      </div>

      {/* Club Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Club Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Attendance ID"
            placeholder="Generate or enter ID"
            value={formData.attendanceId}
            onChange={(e) => handleInputChange('attendanceId', e.target.value)}
            required
          />
          <Input
            label="Club ID"
            placeholder="Enter club ID"
            value={formData.clubId}
            onChange={(e) => handleInputChange('clubId', e.target.value)}
            required
          />
          <Input
            label="GST Number (Optional)"
            placeholder="Enter GST number"
            value={formData.gstNo}
            onChange={(e) => handleInputChange('gstNo', e.target.value)}
          />
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(formData.notifications).map(([type, enabled]) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => handleNotificationChange(type, e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Register Client
        </Button>
      </div>
    </form>
  );
};