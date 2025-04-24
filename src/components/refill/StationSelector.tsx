import React from "react";
import {
  MapPin,
  Star,
  Clock,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Station } from "../../data/stations";

interface StationSelectorProps {
  stations: Station[];
  selectedStationId: string | null;
  onSelectStation: (stationId: string) => void;
}

const StationSelector: React.FC<StationSelectorProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select a Gas Station</h3>

      {stations.map((station) => {
        const isSelected = selectedStationId === station.id;

        return (
          <div
            key={station.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              isSelected
                ? "border-teal-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            } ${!station.isOpen && "opacity-75"}`}
          >
            <button
              type="button"
              className="w-full text-left"
              onClick={() => station.isOpen && onSelectStation(station.id)}
              disabled={!station.isOpen}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Station info */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{station.name}</h4>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {station.location} ({station.distance} km)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="font-semibold">
                        {station.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{station.estimatedDeliveryTime} mins</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <CreditCard className="h-4 w-4 mr-1" />
                      <span>
                        KES {station.deliveryFee.toLocaleString()} delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-end">
                  {station.isOpen ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <XCircle className="h-5 w-5 mr-1" />
                      <span>Closed</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default StationSelector;
