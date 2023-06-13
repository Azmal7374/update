import  { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import Logo from '../Shared/Navbar/Logo'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { GrFormAdd } from 'react-icons/gr'
import { AuthContext } from '../../provider/AuthProvider'
import { FaHome, FaUtensils, FaWallet } from 'react-icons/fa'
const InstructorDashboard = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const { user, logOut } = useContext(AuthContext)

  const [isActive, setActive] = useState('false')
  const toggleHandler = event => {
    setToggle(event.target.checked)
  }
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
           <h3>LOGO</h3>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='w-full hidden md:flex py-2 justify-center items-center bg-purple-100 mx-auto   font-bold'>
           <h3>Instructor Dashboard</h3>
            </div>
            <div className='flex flex-col items-center mt-6 -mx-2'>
              <Link to='/dashboard'>
                <img
                  className='object-cover w-24 h-24 mx-2 rounded-full'
                  src={user?.photoURL}
                  alt='avatar'
                  referrerPolicy='no-referrer'
                />
              </Link>
              <Link to='/dashboard'>
                <h4 className='mx-2 mt-2 font-medium text-gray-800  hover:underline'>
                  {user?.displayName}
                </h4>
              </Link>
              <Link to='/dashboard'>
                <p className='mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline'>
                  {user?.email}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
            <NavLink
            to='/dashboard/addaclass'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-purple-400  hover:text-white ${
                isActive ? 'bg-purple-400  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <GrFormAdd className='w-5 h-5' />

            <span className='mx-4 font-medium'>Add A Class</span>
          </NavLink>

          <NavLink
          to='/dashboard/myclasses'
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-purple-400  hover:text-white ${
              isActive ? 'bg-purple-400  text-gray-700' : 'text-gray-600'
            }`
          }
        >
          <FaWallet className='w-5 h-5' />

          <span className='mx-4 font-medium'>My Classes</span>
        </NavLink>
             
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-purple-400  hover:text-white ${
                isActive ? 'bg-purple-400  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FaHome className='w-5 h-5' />

            <span className='mx-4 font-medium'>Home</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-purple-400  hover:text-white transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default  InstructorDashboard;