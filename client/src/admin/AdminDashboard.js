import React, { useState, useEffect } from 'react';
import { getShoes, addShoe, updateShoe, deleteShoe } from '../api/api';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';
import Sidebar from '../components/Sidebar';
import CustomerDetails from './CustomerDetails';

function AdminDashboard() {
  const [shoes, setShoes] = useState([]);
  const [currentShoe, setCurrentShoe] = useState(null);
  const [activeSection, setActiveSection] = useState('shoes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    setLoading(true);
    try {
      const res = await getShoes();
      setShoes(res.data);
    } catch (error) {
      console.error('Failed to fetch shoes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (shoe) => {
    if (currentShoe) {
      await updateShoe(currentShoe._id, shoe);
    } else {
      await addShoe(shoe);
    }
    fetchShoes();
    setCurrentShoe(null);
  };

  const handleEdit = (shoe) => {
    setCurrentShoe(shoe);
  };

  const handleDelete = async (id) => {
    await deleteShoe(id);
    fetchShoes();
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    switch (activeSection) {
      case 'shoes':
        return <ShoeForm currentShoe={currentShoe} onSave={handleSave} />;
      case 'shoesList':
        return (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">Shoe List</h2>
            <ShoeList shoes={shoes} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        );
      default:
        return (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">Customer List</h2>
            <CustomerDetails shoes={shoes} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen max-w-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto bg-white max-w-screen p-4 sm:p-8 rounded-md shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
