import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <ShoppingBag className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold">CampusGas</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              The easiest way for university students and staff to get gas
              cylinder refills delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gas-cylinders"
                  className="hover:text-teal-500 transition"
                >
                  Gas Cylinders
                </Link>
              </li>
              <li>
                <Link
                  to="/request-refill"
                  className="hover:text-teal-500 transition"
                >
                  Request Refill
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="hover:text-teal-500 transition"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-500 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500 transition">
                  Safety Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500 transition">
                  Refill Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                <span>Campus Gas, University Road</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-2" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-2" />
                <span>info@campusgas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} CampusGas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
