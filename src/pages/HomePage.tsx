import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, CheckCircle, Siren as Fire, Award } from 'lucide-react';
import heroImage from '../assets/images/hero.jpg';
import aboutImage from '../assets/images/about.jpg';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Gas cylinder delivery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4 leading-tight">Gas Cylinder Refills Made Simple</h1>
            <p className="text-xl mb-8 opacity-90">
              Request gas cylinder refills right from your phone. Fast delivery to your campus or home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gas-cylinders" className="btn btn-primary">
                Explore Gas Options
              </Link>
              <Link to="/auth" className="btn btn-outline bg-transparent border-white text-white hover:bg-white/20">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Campus Gas makes it easy to get your gas cylinders refilled in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card p-6 text-center hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fire className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Gas</h3>
              <p className="text-gray-600">
                Select from our range of gas cylinders in different sizes to match your needs.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="card p-6 text-center hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Place Your Order</h3>
              <p className="text-gray-600">
                Submit your refill request and choose from nearby gas stations.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="card p-6 text-center hover:-translate-y-1">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your gas cylinder delivered right to your doorstep quickly and safely.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Campus Gas?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-teal-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Convenience</h3>
                    <p className="text-gray-600">
                      Request gas refills without leaving your residence. Perfect for busy students and staff.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-teal-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Save Time</h3>
                    <p className="text-gray-600">
                      No more waiting in lines or making trips to gas stations. We handle everything for you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-teal-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Quality Service</h3>
                    <p className="text-gray-600">
                      All our partnered stations are verified for quality, safety, and reliability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-teal-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Safety First</h3>
                    <p className="text-gray-600">
                      All cylinders are thoroughly checked for safety before delivery.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/gas-cylinders" className="btn btn-primary">
                  Explore Gas Options
                </Link>
              </div>
            </div>
            
            <div className="relative h-96 lg:h-auto">
              <img 
                src={aboutImage}
                alt="Gas cylinders" 
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and staff who have simplified their gas refills with Campus Gas.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/auth" className="btn bg-white text-teal-600 hover:bg-gray-100">
              Create an Account
            </Link>
            <Link to="/gas-cylinders" className="btn border-2 border-white bg-transparent hover:bg-white/20">
              Browse Gas Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;