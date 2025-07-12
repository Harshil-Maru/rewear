import React, { useState } from 'react';
import { Search, Filter, Star, MessageCircle, Heart, ArrowUpDown } from 'lucide-react';

interface BrowsePageProps {
  onViewItem: (itemId: number) => void;
}

export function BrowsePage({ onViewItem }: BrowsePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'tops', label: 'Tops & Shirts' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' }
  ];

  const sizes = [
    { id: 'all', label: 'All Sizes' },
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: 'xxl', label: 'XXL' }
  ];

  const items = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Excellent",
      points: 35,
      image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Sarah M.",
      rating: 4.8,
      distance: "2.3 km",
      category: "tops"
    },
    {
      id: 2,
      title: "Wool Winter Coat",
      brand: "Zara",
      size: "L",
      condition: "Very Good",
      points: 45,
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Alex K.",
      rating: 4.9,
      distance: "1.8 km",
      category: "tops"
    },
    {
      id: 3,
      title: "Summer Floral Dress",
      brand: "H&M",
      size: "S",
      condition: "Good",
      points: 25,
      image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Emma L.",
      rating: 4.7,
      distance: "3.1 km",
      category: "dresses"
    },
    {
      id: 4,
      title: "Classic White Sneakers",
      brand: "Adidas",
      size: "9",
      condition: "Excellent",
      points: 30,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Mike R.",
      rating: 4.6,
      distance: "4.2 km",
      category: "tops"
    },
    {
      id: 5,
      title: "Silk Blouse",
      brand: "Mango",
      size: "M",
      condition: "Very Good",
      points: 28,
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Lisa P.",
      rating: 4.8,
      distance: "1.5 km",
      category: "tops"
    },
    {
      id: 6,
      title: "High-Waisted Jeans",
      brand: "Urban Outfitters",
      size: "S",
      condition: "Good",
      points: 32,
      image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Anna T.",
      rating: 4.5,
      distance: "2.7 km",
      category: "bottoms"
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size.toLowerCase() === selectedSize;
    
    return matchesSearch && matchesCategory && matchesSize;
  });

  return (
            <div className="min-h-screen bg-light py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-dark mb-2">Browse Items</h1>
              <p className="text-gray-600">Discover amazing pre-loved fashion from our community</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for brands, items, or styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sizes.map(size => (
                  <option key={size.id} value={size.id}>{size.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="points-low">Points: Low to High</option>
                <option value="points-high">Points: High to Low</option>
                <option value="distance">Nearest First</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>All Conditions</option>
                    <option>Excellent</option>
                    <option>Very Good</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (Points)</label>
                  <div className="flex space-x-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Any Distance</option>
                    <option>Within 5km</option>
                    <option>Within 10km</option>
                    <option>Within 25km</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-gray-600">{filteredItems.length} items found</span>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onViewItem(item.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {item.distance}
                </div>
                <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {item.points} pts
                </div>
                <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-1">{item.brand} • Size {item.size}</p>
                <p className="text-sm text-secondary font-medium mb-3">Condition: {item.condition}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by {item.user}</span>
                  <div className="flex space-x-2">
                    <button className="text-secondary hover:text-primary font-medium text-sm">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find more items.</p>
          </div>
        )}
      </div>
    </div>
  );
}