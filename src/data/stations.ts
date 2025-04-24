import station1 from "../assets/images/station-1.jpg";
import station2 from "../assets/images/station-2.jpeg";
import station3 from "../assets/images/station-3.jpeg";
import station4 from "../assets/images/station-4.jpeg";
import station5 from "../assets/images/station-5.jpeg";

export interface Station {
  id: string;
  name: string;
  location: string;
  distance: number; // in kilometers
  rating: number;
  deliveryFee: number;
  estimatedDeliveryTime: string; // in minutes
  isOpen: boolean;
  phone: string;
  image: string;
}

export const stations: Station[] = [
  {
    id: "station-1",
    name: "Campus Gas Express",
    location: "University Main Road",
    distance: 0.8,
    rating: 4.8,
    deliveryFee: 60,
    estimatedDeliveryTime: "15-20",
    isOpen: true,
    phone: "+254 700 123 456",
    image: station1,
  },
  {
    id: "station-2",
    name: "GasMart Central",
    location: "Downtown, 3rd Street",
    distance: 1.5,
    rating: 4.5,
    deliveryFee: 60,
    estimatedDeliveryTime: "20-30",
    isOpen: true,
    phone: "+254 701 234 567",
    image: station2,
  },
  {
    id: "station-3",
    name: "Student Gas Supply Co.",
    location: "Near University Hostels",
    distance: 0.5,
    rating: 4.2,
    deliveryFee: 60,
    estimatedDeliveryTime: "10-15",
    isOpen: true,
    phone: "+254 702 345 678",
    image: station3,
  },
  {
    id: "station-4",
    name: "Peak Gas Services",
    location: "Hilltop Mall",
    distance: 2.3,
    rating: 4.9,
    deliveryFee: 60,
    estimatedDeliveryTime: "25-40",
    isOpen: true,
    phone: "+254 703 456 789",
    image: station4,
  },
  {
    id: "station-5",
    name: "Budget Gas Station",
    location: "Eastern Suburbs",
    distance: 3.2,
    rating: 3.8,
    deliveryFee: 60,
    estimatedDeliveryTime: "35-50",
    isOpen: false,
    phone: "+256 704 567 890",
    image: station5,
  },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find((station) => station.id === id);
};

export default stations;
