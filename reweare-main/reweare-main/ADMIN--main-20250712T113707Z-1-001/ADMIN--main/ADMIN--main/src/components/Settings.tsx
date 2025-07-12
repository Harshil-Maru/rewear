import React, { useState } from 'react';
import { Bell, Shield, Globe, Eye, EyeOff, Check, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    newItemSubmissions: true,
    userReports: true,
    systemAlerts: true,
    weeklyReports: false
  });

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Two-factor authentication state
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Mock password change
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handle2FASetup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      alert('Please enter a 6-digit verification code');
      return;
    }

    // Mock 2FA setup
    setTwoFactorEnabled(true);
    alert('Two-factor authentication enabled successfully!');
    setShow2FAModal(false);
    setVerificationCode('');
  };

  const disable2FA = () => {
    setTwoFactorEnabled(false);
    alert('Two-factor authentication disabled');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#292929] dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure platform settings and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-5 h-5 text-[#d47c08]" />
            <h2 className="text-lg font-semibold text-[#292929] dark:text-white">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#292929] dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-[#d47c08]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-[#d47c08]" />
            <h2 className="text-lg font-semibold text-[#292929] dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { 
                key: 'newItemSubmissions' as const, 
                label: 'New item submissions', 
                description: 'Get notified when users submit new items for approval' 
              },
              { 
                key: 'userReports' as const, 
                label: 'User reports', 
                description: 'Receive alerts for user-reported content' 
              },
              { 
                key: 'systemAlerts' as const, 
                label: 'System alerts', 
                description: 'Important system notifications and updates' 
              },
              { 
                key: 'weeklyReports' as const, 
                label: 'Weekly reports', 
                description: 'Summary of platform activity and statistics' 
              }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#292929] dark:text-white">{setting.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                </div>
                <button 
                  onClick={() => handleNotificationToggle(setting.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[setting.key] ? 'bg-[#d47c08]' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[setting.key] ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-[#d47c08]" />
            <h2 className="text-lg font-semibold text-[#292929] dark:text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p className="font-medium text-[#292929] dark:text-white">Change Password</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update your admin password</p>
            </button>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#292929] dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {twoFactorEnabled ? 'Enabled - Your account is protected' : 'Add an extra layer of security'}
                  </p>
                </div>
                {twoFactorEnabled ? (
                  <button
                    onClick={disable2FA}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={() => setShow2FAModal(true)}
                    className="px-4 py-2 bg-[#d47c08] hover:bg-[#b86907] text-white rounded-lg transition-colors"
                  >
                    Enable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#292929] dark:text-white mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#d47c08] hover:bg-[#b86907] text-white rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#292929] dark:text-white mb-4">Enable Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  1. Download an authenticator app like Google Authenticator or Authy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  2. Scan this QR code with your authenticator app
                </p>
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3. Enter the 6-digit code from your app below
                </p>
              </div>
              <form onSubmit={handle2FASetup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShow2FAModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#d47c08] hover:bg-[#b86907] text-white rounded-lg transition-colors"
                  >
                    Enable 2FA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;