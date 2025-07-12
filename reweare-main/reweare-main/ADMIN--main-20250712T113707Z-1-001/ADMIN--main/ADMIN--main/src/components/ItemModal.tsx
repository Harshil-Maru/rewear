import React from 'react';
import { X, Check, Ban, User, Calendar, Tag } from 'lucide-react';
import { Item } from '../types';

interface ItemModalProps {
  item: Item;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ 
  item, 
  onClose, 
  onApprove, 
  onReject, 
  onDelete 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#292929] dark:text-white">Item Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Item Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#292929] dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Category: {item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Condition: {item.condition}</span>
                </div>
              </div>
            </div>

            <div>
              {/* User Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-[#292929] dark:text-white">Listed by</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-[#292929] dark:text-white">{item.user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Submitted on {new Date(item.dateSubmitted).toLocaleDateString()}
                </span>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <p className="text-sm font-medium text-[#292929] dark:text-white mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#d47c08] bg-opacity-10 text-[#d47c08] text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <p className="text-sm font-medium text-[#292929] dark:text-white mb-2">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : item.status === 'approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Approve</span>
            </button>
          )}
          {onReject && (
            <button
              onClick={onReject}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Ban className="w-4 h-4" />
              <span>Reject</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;