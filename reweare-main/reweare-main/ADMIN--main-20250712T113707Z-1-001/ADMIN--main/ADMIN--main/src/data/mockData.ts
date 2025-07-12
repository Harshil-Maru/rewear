import { User, Item, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Diya Sarvaiya',
    email: 'diya.sarvaiya@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    joinDate: '2024-01-15',
    status: 'active',
    itemsListed: 12,
    swapsCompleted: 8
  },
  {
    id: '2',
    name: 'Harshil Maru',
    email: 'harshil.maru@email.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
    joinDate: '2024-02-20',
    status: 'active',
    itemsListed: 6,
    swapsCompleted: 4
  },
  {
    id: '3',
    name: 'Mahek Maru',
    email: 'mahek.maru@email.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    joinDate: '2024-03-10',
    status: 'active',
    itemsListed: 3,
    swapsCompleted: 1
  },
  {
    id: '4',
    name: 'Ayush Mittal',
    email: 'ayush.mittal@email.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
    joinDate: '2024-04-05',
    status: 'active',
    itemsListed: 8,
    swapsCompleted: 5
  },
  {
    id: '5',
    name: 'Aryan Singh',
    email: 'aryan.singh@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    joinDate: '2024-05-10',
    status: 'active',
    itemsListed: 5,
    swapsCompleted: 2
  },
  {
    id: '6',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150',
    joinDate: '2024-06-12',
    status: 'active',
    itemsListed: 7,
    swapsCompleted: 3
  },
  {
    id: '7',
    name: 'Riya Shah',
    email: 'riya.shah@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    joinDate: '2024-07-18',
    status: 'active',
    itemsListed: 4,
    swapsCompleted: 2
  },
  {
    id: '8',
    name: 'Karan Mehta',
    email: 'karan.mehta@email.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150',
    joinDate: '2024-08-22',
    status: 'active',
    itemsListed: 6,
    swapsCompleted: 4
  },
  {
    id: '9',
    name: 'Sneha Desai',
    email: 'sneha.desai@email.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=150',
    joinDate: '2024-09-30',
    status: 'active',
    itemsListed: 5,
    swapsCompleted: 1
  }
];

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a perfect fit. Great for layering in any season.',
    category: 'Jackets',
    size: 'L',
    condition: 'Excellent',
    images: ['https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?w=300'],
    user: mockUsers[0], // Diya Sarvaiya
    status: 'approved',
    dateSubmitted: '2024-12-11',
    tags: ['denim', 'classic', 'versatile']
  },
  {
    id: '2',
    title: 'Embroidered Ethnic Kurta',
    description: 'Beautiful hand-embroidered kurta with traditional motifs. Perfect for festive occasions.',
    category: 'Ethnic Wear',
    size: 'M',
    condition: 'Like New',
    images: ['https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=300'],
    user: mockUsers[1], // Harshil Maru
    status: 'pending',
    dateSubmitted: '2024-12-10',
    tags: ['ethnic', 'embroidered', 'festive']
  },
  {
    id: '3',
    title: 'Graphic Print T-Shirt',
    description: 'Comfortable cotton t-shirt with a unique graphic design. Perfect for casual outings.',
    category: 'Tops',
    size: 'M',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?w=300'],
    user: mockUsers[2], // Mahek Maru
    status: 'approved',
    dateSubmitted: '2024-12-09',
    tags: ['casual', 'graphic', 'cotton']
  },
  {
    id: '4',
    title: 'Designer Silk Saree',
    description: 'Elegant silk saree with intricate zari work. Ideal for special occasions and celebrations.',
    category: 'Ethnic Wear',
    size: 'Free Size',
    condition: 'Excellent',
    images: ['https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=300'],
    user: mockUsers[3], // Ayush Mittal
    status: 'approved',
    dateSubmitted: '2024-12-08',
    tags: ['silk', 'designer', 'traditional']
  },
  {
    id: '5',
    title: 'Warm Winter Hoodie',
    description: 'Cozy fleece hoodie perfect for cold weather. Features a comfortable fit and warm lining.',
    category: 'Outerwear',
    size: 'L',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?w=300'],
    user: mockUsers[4], // Aryan Singh
    status: 'pending',
    dateSubmitted: '2024-12-07',
    tags: ['winter', 'hoodie', 'warm']
  },
  {
    id: '6',
    title: 'Crisp Formal Shirt',
    description: 'Professional cotton formal shirt with a modern cut. Perfect for office wear and formal events.',
    category: 'Formal Wear',
    size: 'M',
    condition: 'Like New',
    images: ['https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?w=300'],
    user: mockUsers[5], // Priya Patel
    status: 'approved',
    dateSubmitted: '2024-12-06',
    tags: ['formal', 'professional', 'cotton']
  },
  {
    id: '7',
    title: 'Floral Skater Dress',
    description: 'Adorable skater dress with a beautiful floral pattern. Perfect for summer days and casual events.',
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    images: ['https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=300'],
    user: mockUsers[6], // Riya Shah
    status: 'approved',
    dateSubmitted: '2024-12-05',
    tags: ['dress', 'floral', 'summer']
  },
  {
    id: '8',
    title: 'Soft Woolen Scarf',
    description: 'Luxurious woolen scarf with a soft texture. Provides excellent warmth and style during winter.',
    category: 'Accessories',
    size: 'One Size',
    condition: 'Like New',
    images: ['https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?w=300'],
    user: mockUsers[7], // Karan Mehta
    status: 'pending',
    dateSubmitted: '2024-12-04',
    tags: ['wool', 'scarf', 'winter']
  },
  {
    id: '9',
    title: 'Comfortable Cargo Pants',
    description: 'Practical cargo pants with multiple pockets. Made from durable fabric, perfect for outdoor activities.',
    category: 'Bottoms',
    size: '32',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?w=300'],
    user: mockUsers[8], // Sneha Desai
    status: 'approved',
    dateSubmitted: '2024-12-03',
    tags: ['cargo', 'practical', 'outdoor']
  }
];

export const mockStats: DashboardStats = {
  totalUsers: 2847,
  totalItems: 12456,
  pendingItems: 89,
  swapsCompleted: 5623,
  monthlyGrowth: 12.5,
  activeUsers: 1897
};