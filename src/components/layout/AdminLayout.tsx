import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Modal } from '../ui/Modal';
import { ClientRegistrationForm } from '../forms/ClientRegistrationForm';

export const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="lg:pl-64">
        <Header 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onAddClient={() => setIsAddClientModalOpen(true)}
        />
        
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        title="Add New Client"
        size="xl"
      >
        <ClientRegistrationForm onClose={() => setIsAddClientModalOpen(false)} />
      </Modal>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};