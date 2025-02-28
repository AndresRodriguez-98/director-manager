import React from 'react';
import logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu'; 
import CloseIcon from '@mui/icons-material/Close';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between p-4 relative">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-40 h-40" />

      {/* Botón del menú */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none z-50">
        {isOpen ? <CloseIcon className='mr-1 mt-2 hover:bg-gray-500' fontSize='medium' /> : <MenuIcon className="mr-2" fontSize='large' />}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-landing-bg shadow-lg p-10">
          <ul className="flex flex-col items-center">
            <li className="mb-2"> <a href="#">Inicio</a> </li>
            <li className="mb-2"> <a href="#">Nosotros</a> </li>
            <li className="mb-2"> <a href="#">Servicios</a> </li>
            <li className="mb-2"> <a href="#">Contacto</a> </li>
          </ul>
        </div>       
      )}
    </div>
  );
};

