import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from './Card';
import { useAuth } from '../context/AuthContext';

const HomeCards = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAddJobClick = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('Only admin can Add Job');
      return;
    }
    navigate('/add-job');
  };

  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card bg='bg-gray-100 '>
            <h2 className='text-2xl font-bold'>For Developers</h2>
            <p className='mt-2 mb-4'>
              Browse our jobs and start your career today
            </p>
            <Link
              to='/jobs'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Browse Jobs
            </Link>
          </Card>
          <Card bg='bg-indigio-100 '>
            <h2 className='text-2xl font-bold'>For Employers</h2>
            <p className='mt-2 mb-4'>
              List your job to find the perfect developer for the role
            </p>
            <a
              href='/add-job'
              onClick={handleAddJobClick}
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Add Job
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
