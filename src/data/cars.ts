// src/data/cars.ts

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  price: number;
  dailyPrice: number;
  img: string;
  desc: string;
  features: string[];
  transmission: "Auto" | "Manual";
  seats: number;
  fuelType: "Petrol" | "Diesel" | "Hybrid";
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Camry",
    model: "Camry 2024 - Full Option",
    year: 2024,
    price: 150,
    dailyPrice: 150,
    img: "/cars/camry-full.jpg",
    desc: "Premium sedan with full specifications, cruise control included",
    features: ["AC", "Cruise Control", "Power Steering", "Leather Seats", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 2,
    name: "Toyota Camry",
    model: "Camry 2023 - Middle Option",
    year: 2023,
    price: 130,
    dailyPrice: 130,
    img: "/cars/camry-middle.jpg",
    desc: "Mid-range sedan with cruise control, great value",
    features: ["AC", "Cruise Control", "Power Steering", "Power Windows", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 3,
    name: "KIA K5",
    model: "K5 2023",
    year: 2023,
    price: 125,
    dailyPrice: 125,
    img: "/cars/kia-k5.jpg",
    desc: "Stylish sedan with cruise control, smooth handling",
    features: ["AC", "Cruise Control", "Power Steering", "Bluetooth", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 4,
    name: "Toyota Corolla",
    model: "Corolla 2024",
    year: 2024,
    price: 120,
    dailyPrice: 120,
    img: "/cars/corolla-2024.jpg",
    desc: "Reliable sedan with cruise control, excellent fuel economy",
    features: ["AC", "Cruise Control", "ABS", "Bluetooth", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 5,
    name: "Nissan Sunny",
    model: "Sunny 2025 - Indian (Zero KM)",
    year: 2025,
    price: 110,
    dailyPrice: 110,
    img: "/cars/sunny-indian.jpg",
    desc: "Brand new 2025 model, zero kilometers, perfect for budget travelers",
    features: ["AC", "Power Steering", "Electric Windows", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 6,
    name: "Nissan Sunny",
    model: "Sunny 2024 (20,000 km)",
    year: 2024,
    price: 95,
    dailyPrice: 95,
    img: "/cars/sunny-2024.png",
    desc: "Well-maintained 2024 model with 20,000 km, budget-friendly option",
    features: ["AC", "Power Steering", "FM Radio", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 7,
    name: "Nissan Sunny",
    model: "Sunny 2025 - Mexico",
    year: 2025,
    price: 105,
    dailyPrice: 105,
    img: "/cars/sunny-mexico.jpg",
    desc: "2025 model with cruise control, economical and comfortable",
    features: ["AC", "Cruise Control", "Power Steering", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
  {
    id: 8,
    name: "Nissan Kicks",
    model: "Kicks 2024 - Mexico",
    year: 2024,
    price: 130,
    dailyPrice: 130,
    img: "/cars/kicks-mexico.jpg",
    desc: "Modern SUV style with cruise control, spacious and comfortable",
    features: ["AC", "Cruise Control", "Power Steering", "Power Windows", "5-Seater"],
    transmission: "Auto",
    seats: 5,
    fuelType: "Petrol",
  },
];
