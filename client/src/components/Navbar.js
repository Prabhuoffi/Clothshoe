// Importing necessary libraries and components
import React, { useState } from 'react';
import { HiMenu, HiX, HiOutlineShoppingCart , HiOutlineLogin  } from 'react-icons/hi';
import logo from '../assets/logo.png'; 
import { Link } from 'react-router-dom'; 
import { useCart } from '../screen/CartContext';

// Defining the Navbar component
const Navbar = () => {
  // State to manage the mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  // Getting the cart count from the custom cart context
  const { cartCount } = useCart();

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-sm"> {/* Navbar container */}
      <div className="mx-auto sm:px-6 lg:px-8"> {/* Centering content */}
        <div className="flex justify-between h-20"> {/* Flex container for alignment */}
          <div className="flex items-center"> {/* Logo container */}
            <img src={logo} alt="Logo" className="h-10 w-auto" /> {/* Logo image */}
          </div>
          <div className="flex justify-center"> {/* Centered navigation links */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8"> {/* Hidden on small screens */}
              <Link to="/" className="text-black inline-flex items-center px-1 pt-1 text-xl font-medium"> {/* Home link */}
                Home
              </Link>
              <Link to="/Collection" className="text-black inline-flex items-center px-1 pt-1 text-xl font-medium"> {/* Collections link */}
                Collections
              </Link>
              <Link to="/About" className="text-black inline-flex items-center px-1 pt-1 text-xl font-medium"> {/* About link */}
                About
              </Link>
              <Link to="/FAQs" className="text-black inline-flex items-center px-1 pt-1 text-xl font-medium"> {/* FAQs link */}
                FAQs
              </Link>
              
            </div>
          </div>
          <div className="flex items-center relative"> {/* Cart and menu button container */}
          <Link to="/login" className="flex  mr-4 items-center text-black hover:text-blue-600"> {/* Login link with icon */}
              <HiOutlineLogin className="text-2xl mr-2" /> {/* Login icon */}
              Login
            </Link>
            <Link to="/add-card" className="relative"> {/* Cart link */}
              <HiOutlineShoppingCart className="text-3xl text-black" /> {/* Cart icon */}
              {cartCount > 0 && ( /* Conditional rendering of cart count badge */
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="sm:hidden text-black focus:outline-none ml-4"> {/* Mobile menu toggle button */}
              {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />} {/* Menu open/close icon */}
            </button>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}> {/* Mobile menu, hidden on larger screens */}
        <div className="pt-2 pb-4 space-y-1"> {/* Mobile menu links */}
          <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-black"> {/* Home link */}
            Home
          </Link>
          <Link to="/Collection" className="block pl-3 pr-4 py-2 text-base font-medium text-black"> {/* Collections link */}
            Collections
          </Link>
          <Link to="/About" className="block pl-3 pr-4 py-2 text-base font-medium text-black"> {/* About link */}
            About
          </Link>
          <Link to="/FAQs" className="block pl-3 pr-4 py-2 text-base font-medium text-black"> {/* FAQs link */}
            FAQs
          </Link>
          <Link to="/add-card" className="pl-3 pr-4 py-2 text-base font-medium text-black flex items-center"> {/* Cart link */}
            <HiOutlineShoppingCart className="text-2xl" /> {/* Cart icon */}
            {cartCount > 0 && ( /* Conditional rendering of cart count badge */
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Exporting the Navbar component
