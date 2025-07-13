import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, Heart, MessageCircle, Package, User, Shield, Truck } from 'lucide-react';

interface ItemDetailPageProps {
  itemId: number | null;
  onBack: () => void;
}

export function ItemDetailPage({ itemId, onBack }: ItemDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);

  // Mock item data - in real app, this would be fetched based on itemId
  const item = {
    id: 1,
    title: "Vintage Denim Jacket",
    brand: "Levi's",
    size: "M",
    condition: "Excellent",
    points: 35,
    description: "This classic Levi's denim jacket is a timeless piece that never goes out of style. Made from high-quality denim with authentic vintage wash. Features original brass buttons and classic fit. Perfect for layering or wearing as a statement piece. Has been well-maintained and shows minimal signs of wear.",
    category: "Outerwear",
    color: "Blue",
    material: "100% Cotton Denim",
    tags: ["vintage", "classic", "denim", "casual"],
    images: [
      "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    uploader: {
      name: "Sarah M.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.8,
      totalSwaps: 23,
      memberSince: "March 2024",
      location: "San Francisco, CA",
      responseTime: "Usually responds within 2 hours"
    },
    availability: "available", // available, pending, swapped
    datePosted: "2 days ago",
    views: 34,
    likes: 8,
    swapPreferences: "Looking for summer dresses in size M or casual sneakers size 8"
  };

  const similarItems = [
    {
      id: 2,
      title: "Classic Denim Jacket",
      brand: "Gap",
      points: 28,
      image: "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 3,
      title: "Vintage Leather Jacket",
      brand: "Zara",
      points: 42,
      image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const getAvailabilityStatus = () => {
    switch (item.availability) {
      case 'available':
        return { text: 'Available', color: 'text-primary bg-orange-100' };
      case 'pending':
        return { text: 'Swap Pending', color: 'text-yellow-600 bg-yellow-100' };
      case 'swapped':
        return { text: 'Already Swapped', color: 'text-gray-600 bg-gray-100' };
      default:
        return { text: 'Unknown', color: 'text-gray-600 bg-gray-100' };
    }
  };

  const status = getAvailabilityStatus();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Browse</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <p className="text-xl text-gray-600">{item.brand}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                  {status.text}
                </span>
                <div className="text-2xl font-bold text-primary">{item.points} points</div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{item.views} views</span>
                <span>•</span>
                <span>{item.likes} likes</span>
                <span>•</span>
                <span>Posted {item.datePosted}</span>
              </div>
            </div>

            {/* Item Specifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 font-medium">{item.size}</span>
                </div>
                <div>
                  <span className="text-gray-500">Condition:</span>
                  <span className="ml-2 font-medium">{item.condition}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium">{item.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Color:</span>
                  <span className="ml-2 font-medium">{item.color}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Material:</span>
                  <span className="ml-2 font-medium">{item.material}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Swap Preferences */}
            {item.swapPreferences && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Swap Preferences</h3>
                <p className="text-gray-700 bg-orange-50 p-4 rounded-lg">{item.swapPreferences}</p>
              </div>
            )}

            {/* Action Buttons */}
            {item.availability === 'available' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center space-x-2"
                >
                  <Package className="h-5 w-5" />
                  <span>Request Swap</span>
                </button>
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Redeem with {item.points} Points
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Message Owner</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Uploader Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">About the Owner</h3>
          <div className="flex items-start space-x-6">
            <img
              src={item.uploader.avatar}
              alt={item.uploader.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{item.uploader.name}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{item.uploader.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{item.uploader.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {item.uploader.memberSince}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{item.uploader.totalSwaps} successful swaps</span>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-gray-600">{item.uploader.responseTime}</span>
              </div>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
              View Profile
            </button>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Similar Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.map(similarItem => (
              <div key={similarItem.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img src={similarItem.image} alt={similarItem.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{similarItem.title}</h4>
                  <p className="text-gray-600 mb-2">{similarItem.brand}</p>
                  <div className="text-primary font-semibold">{similarItem.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            <p className="text-gray-600 mb-4">
              Send a swap request to {item.uploader.name} for their {item.title}.
            </p>
            <textarea
              placeholder="Write a message about what you'd like to swap..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
              rows={4}
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary transition-colors">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}