import { User, Booking } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    profileImage: 'https://i.pravatar.cc/300?img=12',
    joinedDate: '2023-01-15',
    isAdmin: false,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@vehicleapp.com',
    phone: '+1 (555) 999-0000',
    profileImage: 'https://i.pravatar.cc/300?img=33',
    joinedDate: '2022-06-01',
    isAdmin: true,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'B001',
    vehicleId: '1',
    userId: '1',
    vehicleName: 'Tesla Model 3',
    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    bookingType: 'Rental',
    startDate: '2024-12-15',
    endDate: '2024-12-20',
    totalAmount: 2500,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: '2024-12-01T10:30:00Z',
  },
  {
    id: 'B002',
    vehicleId: '5',
    userId: '1',
    vehicleName: 'BMW X5',
    vehicleImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    bookingType: 'Test Drive',
    startDate: '2024-12-10',
    totalAmount: 0,
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: '2024-12-05T14:20:00Z',
  },
  {
    id: 'B003',
    vehicleId: '12',
    userId: '1',
    vehicleName: 'Harley-Davidson Street 750',
    vehicleImage: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
    bookingType: 'Purchase',
    startDate: '2024-11-28',
    totalAmount: 18500,
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: '2024-11-20T09:15:00Z',
  },
  {
    id: 'B004',
    vehicleId: '8',
    userId: '1',
    vehicleName: 'Range Rover Sport',
    vehicleImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    bookingType: 'Rental',
    startDate: '2025-01-05',
    endDate: '2025-01-12',
    totalAmount: 4200,
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: '2024-12-08T16:45:00Z',
  },
];

// For login simulation
export const getCurrentUser = (): User => mockUsers[0];
export const getAdminUser = (): User => mockUsers[1];
