import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import GasCylinderCard from '../components/gas/GasCylinderCard';
import gasTypes from '../data/gasTypes';

const GasCylindersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<boolean | null>(null);
  
  // Get unique gas types and sizes for filters
  const types = [...new Set(gasTypes.map(gas => gas.type))];
  const sizes = [...new Set(gasTypes.map(gas => gas.size))];
  
  // Filter gas types based on search and filters
  const filteredGasTypes = gasTypes.filter(gas => {
    const matchesSearch = gas.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gas.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || gas.type === selectedType;
    const matchesSize = selectedSize === '' || gas.size === selectedSize;
    const matchesStock = stockFilter === null || gas.inStock === stockFilter;
    
    return matchesSearch && matchesType && matchesSize && matchesStock;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedSize('');
    setStockFilter(null);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Gas Cylinders</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of gas cylinders in various sizes and types. Find the perfect option for your needs.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search gas cylinders..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Filters */}
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Gas Type */}
                <div>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="form-input"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Size */}
                <div>
                  <select 
                    value={selectedSize} 
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="form-input"
                  >
                    <option value="">All Sizes</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                {/* Stock filter */}
                <div>
                  <select 
                    value={stockFilter === null ? '' : stockFilter.toString()}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setStockFilter(null);
                      } else {
                        setStockFilter(e.target.value === 'true');
                      }
                    }}
                    className="form-input"
                  >
                    <option value="">All Stock</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
                
                {/* Reset Button */}
                <div>
                  <button 
                    onClick={resetFilters} 
                    className="btn btn-outline w-full flex justify-center items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gas Cylinders Grid */}
        {filteredGasTypes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
            {filteredGasTypes.map(gasType => (
              <GasCylinderCard key={gasType.id} gasType={gasType} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">No gas cylinders found matching your criteria.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GasCylindersPage;