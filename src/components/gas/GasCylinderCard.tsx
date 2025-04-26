import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Info, AlertCircle } from 'lucide-react';
import { GasType } from '../../types/GasType';

interface GasCylinderCardProps {
  gasType: GasType;
}

const GasCylinderCard: React.FC<GasCylinderCardProps> = ({ gasType }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={gasType.image} 
          alt={gasType.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {!gasType.inStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 text-xs font-semibold">
            Out of Stock
          </div>
        )}
        <div className="absolute bottom-0 left-0 bg-amber-600 text-white py-1 px-3">
          {gasType.weight}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{gasType.name}</h3>
          <span className="text-lg font-bold text-amber-600">KES {gasType.price.toLocaleString()}</span>
        </div>
        
        <div className="mb-2 flex items-center">
          <span className="text-sm bg-gray-100 rounded-full px-2 py-1 mr-2">
            {gasType.type}
          </span>
          <span className="text-sm bg-gray-100 rounded-full px-2 py-1">
            {gasType.size}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {gasType.description}
        </p>
        
        <div className="mt-auto">
          {gasType.inStock ? (
            <Link 
              to={`/request-refill/${gasType.id}`}
              className="btn btn-primary w-full mb-2"
            >
              <Flame className="h-4 w-4 mr-2" />
              Request Refill
            </Link>
          ) : (
            <button className="btn bg-gray-300 text-gray-600 cursor-not-allowed w-full mb-2" disabled>
              <AlertCircle className="h-4 w-4 mr-2" />
              Out of Stock
            </button>
          )}
          
          <Link 
            to={`/gas-cylinders/${gasType.id}`}
            className="btn btn-outline w-full text-sm"
          >
            <Info className="h-4 w-4 mr-2" />
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GasCylinderCard;