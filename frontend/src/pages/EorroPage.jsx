// ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
     <div className='backdrop-blur-lg  p-10 flex-col space-y-6'>
      <h1 className='text-5xl'>404 - LOST IN SPACE</h1>
      <p className='text-2xl'>Sorry, the page you are looking for does not exist.</p>
      <Link to='/' className='btn'> Home </Link>
     </div>
    </div>
  );
};

export default ErrorPage;