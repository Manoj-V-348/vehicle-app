export type VehicleType = 'Car' | 'Bike' | 'Truck' | 'SUV' | 'Van' | 'Motorcycle';
export type VehicleCondition = 'New' | 'Used' | 'Certified Pre-Owned';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT' | 'Semi-Automatic';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type RentalDuration = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  condition: VehicleCondition;
  price: number;
  rentalPricePerDay: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  mileage: number;
  seatingCapacity: number;
  color: string;
  description: string;
  features: string[];
  images: string[];
  available: boolean;
  location: string;
  rating: number;
  reviews: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  joinedDate: string;
  isAdmin: boolean;
}

export interface Booking {
  id: string;
  vehicleId: string;
  userId: string;
  vehicleName: string;
  vehicleImage: string;
  bookingType: 'Purchase' | 'Rental' | 'Test Drive';
  startDate: string;
  endDate?: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
  createdAt: string;
}

export interface FilterOptions {
  type?: VehicleType[];
  condition?: VehicleCondition[];
  fuelType?: FuelType[];
  transmission?: TransmissionType[];
  priceRange?: {
    min: number;
    max: number;
  };
  yearRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
}
