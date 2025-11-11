
const carBrands = ['Tesla', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Lexus'];
const bikeBrands = ['Harley-Davidson', 'Ducati', 'Yamaha', 'Kawasaki', 'Honda', 'Suzuki', 'Royal Enfield', 'BMW'];
const truckBrands = ['Ford', 'Chevrolet', 'Ram', 'GMC', 'Toyota', 'Nissan'];
const suvBrands = ['Range Rover', 'Jeep', 'Cadillac', 'BMW', 'Mercedes-Benz', 'Audi', 'Volvo', 'Lexus'];

const colors = ['Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Pearl White', 'Midnight Blue', 'Crimson Red'];
const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL', 'Seattle, WA', 'Boston, MA', 'San Francisco, CA'];

const carFeatures = [
  'Apple CarPlay & Android Auto',
  'Adaptive Cruise Control',
  'Lane Keeping Assist',
  'Panoramic Sunroof',
  'Heated & Ventilated Seats',
  'Premium Sound System',
  'Wireless Charging',
  'Blind Spot Monitoring',
  '360° Camera System',
  'Keyless Entry & Start',
  'Ambient Lighting',
  'Head-Up Display',
];

const bikeFeatures = [
  'ABS Braking System',
  'Traction Control',
  'LED Headlights',
  'Digital Instrument Cluster',
  'Ride Modes',
  'Quick Shifter',
  'Cruise Control',
  'USB Charging Port',
];

const generateVehicleDescription = (brand: string, model: string, type: string): string => {
  const descriptions = [
    `Experience luxury and performance with this stunning ${brand} ${model}. Perfect for those who demand excellence.`,
    `This ${brand} ${model} combines cutting-edge technology with timeless design. A true masterpiece.`,
    `Discover the thrill of driving with this exceptional ${brand} ${model}. Engineered for perfection.`,
    `The ${brand} ${model} redefines what a ${type.toLowerCase()} should be. Premium comfort meets superior performance.`,
    `Step into sophistication with this immaculate ${brand} ${model}. Every detail crafted to perfection.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateMockVehicles = (): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  let id = 1;

  // Generate 10 Cars
  for (let i = 0; i < 10; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const model = `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`;
    const year = 2020 + Math.floor(Math.random() * 5);

    vehicles.push({
      id: String(id++),
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      type: 'Car',
      condition: ['New', 'Used', 'Certified Pre-Owned'][Math.floor(Math.random() * 3)],
      price: 30000 + Math.floor(Math.random() * 120000),
      rentalPricePerDay: 100 + Math.floor(Math.random() * 400),
      fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'][Math.floor(Math.random() * 4)],
      transmission: ['Automatic', 'Manual', 'CVT'][Math.floor(Math.random() * 3)],
      mileage: Math.floor(Math.random() * 50000),
      seatingCapacity: 4 + Math.floor(Math.random() * 4),
      color: colors[Math.floor(Math.random() * colors.length)],
      description: generateVehicleDescription(brand, model, 'Car'),
      features: carFeatures.sort(() => 0.5 - Math.random()).slice(0, 6 + Math.floor(Math.random() * 4)),
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      ],
      available: Math.random() > 0.2,
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: 4 + Math.random(),
      reviews: 10 + Math.floor(Math.random() * 200),
    });
  }

  // Generate 8 SUVs
  for (let i = 0; i < 8; i++) {
    const brand = suvBrands[Math.floor(Math.random() * suvBrands.length)];
    const model = `${['Explorer', 'Defender', 'Escalade', 'X', 'GLE', 'Q'][Math.floor(Math.random() * 6)]}${Math.floor(Math.random() * 9) + 1}`;
    const year = 2020 + Math.floor(Math.random() * 5);

    vehicles.push({
      id: String(id++),
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      type: 'SUV',
      condition: ['New', 'Used', 'Certified Pre-Owned'][Math.floor(Math.random() * 3)],
      price: 50000 + Math.floor(Math.random() * 150000),
      rentalPricePerDay: 150 + Math.floor(Math.random() * 500),
      fuelType: ['Petrol', 'Diesel', 'Hybrid'][Math.floor(Math.random() * 3)],
      transmission: ['Automatic', 'Semi-Automatic'][Math.floor(Math.random() * 2)],
      mileage: Math.floor(Math.random() * 40000),
      seatingCapacity: 5 + Math.floor(Math.random() * 3),
      color: colors[Math.floor(Math.random() * colors.length)],
      description: generateVehicleDescription(brand, model, 'SUV'),
      features: carFeatures.sort(() => 0.5 - Math.random()).slice(0, 7 + Math.floor(Math.random() * 5)),
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      ],
      available: Math.random() > 0.15,
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: 4.2 + Math.random() * 0.8,
      reviews: 15 + Math.floor(Math.random() * 180),
    });
  }

  // Generate 6 Bikes/Motorcycles
  for (let i = 0; i < 6; i++) {
    const brand = bikeBrands[Math.floor(Math.random() * bikeBrands.length)];
    const model = `${['Street', 'Sport', 'Cruiser', 'Ninja', 'R', 'S'][Math.floor(Math.random() * 6)]} ${Math.floor(Math.random() * 1000) + 300}`;
    const year = 2020 + Math.floor(Math.random() * 5);
    const isBike = Math.random() > 0.3;

    vehicles.push({
      id: String(id++),
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      type: isBike ? 'Bike' : 'Motorcycle',
      condition: ['New', 'Used'][Math.floor(Math.random() * 2)],
      price: 8000 + Math.floor(Math.random() * 35000),
      rentalPricePerDay: 50 + Math.floor(Math.random() * 200),
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: Math.floor(Math.random() * 20000),
      seatingCapacity: Math.random() > 0.5 ? 1 : 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      description: generateVehicleDescription(brand, model, isBike ? 'Bike' : 'Motorcycle'),
      features: bikeFeatures.sort(() => 0.5 - Math.random()).slice(0, 4 + Math.floor(Math.random() * 4)),
      images: [
        'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800',
      ],
      available: Math.random() > 0.2,
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: 4.1 + Math.random() * 0.9,
      reviews: 8 + Math.floor(Math.random() * 120),
    });
  }

  // Generate 4 Trucks
  for (let i = 0; i < 4; i++) {
    const brand = truckBrands[Math.floor(Math.random() * truckBrands.length)];
    const model = `${['F-', 'Silverado ', 'Tundra ', 'Titan '][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 300) + 150}`;
    const year = 2019 + Math.floor(Math.random() * 6);

    vehicles.push({
      id: String(id++),
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      type: 'Truck',
      condition: ['New', 'Used', 'Certified Pre-Owned'][Math.floor(Math.random() * 3)],
      price: 35000 + Math.floor(Math.random() * 70000),
      rentalPricePerDay: 120 + Math.floor(Math.random() * 300),
      fuelType: ['Petrol', 'Diesel'][Math.floor(Math.random() * 2)],
      transmission: ['Automatic', 'Manual'][Math.floor(Math.random() * 2)],
      mileage: Math.floor(Math.random() * 60000),
      seatingCapacity: Math.random() > 0.5 ? 5 : 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      description: generateVehicleDescription(brand, model, 'Truck'),
      features: [...carFeatures, 'Towing Package', 'Bed Liner', '4WD System'].sort(() => 0.5 - Math.random()).slice(0, 6 + Math.floor(Math.random() * 3)),
      images: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800',
      ],
      available: Math.random() > 0.25,
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: 4 + Math.random() * 0.9,
      reviews: 12 + Math.floor(Math.random() * 90),
    });
  }

  // Generate 2 Vans
  for (let i = 0; i < 2; i++) {
    const brand = ['Mercedes-Benz', 'Ford', 'Chevrolet', 'Toyota'][Math.floor(Math.random() * 4)];
    const model = `${['Sprinter', 'Transit', 'Express', 'Sienna'][Math.floor(Math.random() * 4)]}`;
    const year = 2020 + Math.floor(Math.random() * 5);

    vehicles.push({
      id: String(id++),
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      type: 'Van',
      condition: ['New', 'Used'][Math.floor(Math.random() * 2)],
      price: 28000 + Math.floor(Math.random() * 50000),
      rentalPricePerDay: 90 + Math.floor(Math.random() * 250),
      fuelType: ['Petrol', 'Diesel', 'Hybrid'][Math.floor(Math.random() * 3)],
      transmission: 'Automatic',
      mileage: Math.floor(Math.random() * 45000),
      seatingCapacity: 7 + Math.floor(Math.random() * 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      description: generateVehicleDescription(brand, model, 'Van'),
      features: ['Sliding Doors', 'Rear Climate Control', 'Cargo Space', ...carFeatures].sort(() => 0.5 - Math.random()).slice(0, 7),
      images: [
        'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      ],
      available: Math.random() > 0.3,
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: 4 + Math.random() * 0.8,
      reviews: 10 + Math.floor(Math.random() * 70),
    });
  }

  return vehicles.sort((a, b) => b.rating - a.rating);
};

export const mockVehicles = generateMockVehicles();
