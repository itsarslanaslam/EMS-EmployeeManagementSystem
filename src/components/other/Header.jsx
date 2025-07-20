import React from 'react'
import Button from '../other/LogoutButton';
import PyramidLoader from '../other/PyramidLoader';
import Loader from '../other/Loader';

const Header = (props) => {
  const employeeName = props.data?.firstname || props.data?.name || 'User';
  const role = props.data?.role || 'employee';

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  return (
    <div className='flex items-center justify-between mb-5'>
      <h1 className='text-2xl font-medium text-left'>Hello!<br />
        <span className='text-3xl font-semibold'> {employeeName} 👋</span>
      </h1>
      {/* Loader: Pyramid for employee, Spinner for admin */}
      <div className='flex justify-center flex-1'>
        {role === 'admin' ? <Loader /> : <PyramidLoader />}
      </div>
      <Button onClick={logOutUser} />
    </div>
  )
}

export default Header