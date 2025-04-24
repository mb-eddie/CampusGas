import gas1 from "../assets/images/gas-1.jpg";
import gas2 from "../assets/images/gas-2.jpg";
import gas3 from "../assets/images/gas-3.jpg";
import gas4 from "../assets/images/gas-4.jpg";
import gas5 from "../assets/images/gas-5.jpeg";
import gas6 from "../assets/images/gas-6.jpeg";

interface GasType {
  id: string;
  name: string;
  type: string;
  size: string;
  weight: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export const gasTypes: GasType[] = [
  {
    id: "gas-1",
    name: "Standard LPG",
    type: "LPG",
    size: "Small",
    weight: "6kg",
    price: 3500,
    description:
      "Standard Liquefied Petroleum Gas (LPG) cylinder perfect for small households or student dorms. Great for cooking and heating needs.",
    image: gas1,
    inStock: true,
  },
  {
    id: "gas-2",
    name: "Premium LPG",
    type: "LPG",
    size: "Medium",
    weight: "13kg",
    price: 6500,
    description:
      "Medium-sized Liquefied Petroleum Gas cylinder ideal for regular cooking and heating in apartments and small homes. More economical for regular users.",
    image: gas2,
    inStock: true,
  },
  {
    id: "gas-3",
    name: "Industrial LPG",
    type: "LPG",
    size: "Large",
    weight: "25kg",
    price: 9500,
    description:
      "Large capacity Liquefied Petroleum Gas cylinder for industrial use or large households. Excellent value for high-volume users.",
    image: gas3,
    inStock: true,
  },
  {
    id: "gas-4",
    name: "Portable Butane",
    type: "Butane",
    size: "Mini",
    weight: "3kg",
    price: 2500,
    description:
      "Compact Butane gas cylinder, perfect for camping, portable stoves, and emergency backup. Lightweight and easy to transport.",
    image: gas4,
    inStock: false,
  },
  {
    id: "gas-5",
    name: "Premium Butane",
    type: "Butane",
    size: "Medium",
    weight: "15kg",
    price: 7500,
    description:
      "Higher capacity Butane gas cylinder for regular household use. Provides clean burning gas with high energy output.",
    image: gas5,
    inStock: true,
  },
  {
    id: "gas-6",
    name: "Propane Mix",
    type: "Propane Mix",
    size: "Medium",
    weight: "11kg",
    price: 6000,
    description:
      "Specialized propane mix cylinder for outdoor grilling and heating. Works well in colder temperatures.",
    image: gas6,
    inStock: true,
  },
];

export const getGasTypeById = (id: string): GasType | undefined => {
  return gasTypes.find((gas) => gas.id === id);
};

export default gasTypes;
