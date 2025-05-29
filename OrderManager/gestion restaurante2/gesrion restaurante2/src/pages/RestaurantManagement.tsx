import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { MapPin, Clock, Instagram, Facebook, Phone } from 'lucide-react';

const RestaurantManagement: React.FC = () => {
  const { restaurants, updateRestaurant } = useData();
  const restaurant = restaurants[0]; // For simplicity, we're assuming there's only one restaurant
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(restaurant);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleHoursChange = (idx: number, field: keyof typeof formData.operatingHours[0], value: string | boolean) => {
    const updatedHours = [...formData.operatingHours];
    updatedHours[idx] = { ...updatedHours[idx], [field]: value };
    setFormData({ ...formData, operatingHours: updatedHours });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurant(restaurant.id, formData);
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Restaurant Management</h1>
          <p className="text-gray-600">Manage your restaurant profile and settings</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Edit Restaurant Profile</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (coordinates)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="latitude,longitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Operating Hours</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div className="font-medium text-gray-700">Day</div>
                  <div className="font-medium text-gray-700">Open</div>
                  <div className="font-medium text-gray-700">Close</div>
                  <div className="font-medium text-gray-700">Open?</div>
                </div>
                {formData.operatingHours.map((hour, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 mb-2">
                    <div className="py-2">{hour.day}</div>
                    <input
                      type="time"
                      value={hour.open}
                      onChange={(e) => handleHoursChange(idx, 'open', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    />
                    <input
                      type="time"
                      value={hour.close}
                      onChange={(e) => handleHoursChange(idx, 'close', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    />
                    <div>
                      <input
                        type="checkbox"
                        checked={hour.isOpen}
                        onChange={(e) => handleHoursChange(idx, 'isOpen', e.target.checked)}
                        className="mr-2"
                      />
                      <span>{hour.isOpen ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(restaurant);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-square w-full">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{restaurant.name}</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">{restaurant.address}</span>
                </div>
                {restaurant.instagram && (
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">@{restaurant.instagram}</span>
                  </div>
                )}
                {restaurant.facebook && (
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{restaurant.facebook}</span>
                  </div>
                )}
                {restaurant.whatsapp && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{restaurant.whatsapp}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Clock className="h-5 w-5 text-gray-700 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Operating Hours</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.operatingHours.map((hour, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      hour.isOpen ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{hour.day}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          hour.isOpen
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {hour.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    {hour.isOpen && (
                      <p className="text-gray-600 mt-1">
                        {hour.open} - {hour.close}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default RestaurantManagement;