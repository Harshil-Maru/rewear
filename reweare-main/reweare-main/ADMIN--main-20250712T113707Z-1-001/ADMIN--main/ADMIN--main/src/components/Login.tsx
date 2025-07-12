import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Register from './Register';
import SocialAuthButtons from './SocialAuthButtons';

const Login: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}...`);
    // In a real application, this would integrate with OAuth providers
    // For demo purposes, we'll show an alert
    alert(`${provider} authentication would be implemented here. For demo, use the email/password form.`);
  };

  if (showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Use admin@rewear.com / admin123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#292929] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#d47c08] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#292929] dark:text-white mb-2">ReWear Admin</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent"
              placeholder="admin@rewear.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#292929] dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#292929] dark:text-white focus:ring-2 focus:ring-[#d47c08] focus:border-transparent pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d47c08] hover:bg-[#b86907] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <SocialAuthButtons
          isLogin={true}
          onGoogleAuth={() => handleSocialAuth('Google')}
          onMicrosoftAuth={() => handleSocialAuth('Microsoft')}
          onAppleAuth={() => handleSocialAuth('Apple')}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Don't have an admin account?
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="text-[#d47c08] hover:text-[#b86907] font-medium transition-colors"
          >
            Create Admin Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Demo credentials: admin@rewear.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;