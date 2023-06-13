import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../share/SocialLogin/SocialLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
const Login = () => {
 
  const [disabled,setDisabled] = useState(true)
  const [show, setShow] = useState(false)
  const {signIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

   

    const onSubmit =(data) =>{
         

         signIn(data.email, data.password)
         .then(result => {
          const user = result.user;
          console.log(user)
          Swal.fire({
            title:  'User Login Successfully!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          navigate(from, {replace: true});
         })
    }
   
    return (
      <>
      <Helmet>
      <title> Sports Academic | Login</title>
      </Helmet>

      <div className=" w-96 mx-auto bg-slate-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            
    
      <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email" {...register("email", {required: true})} name="email" placeholder="email" className="p-3 border border-purple-500 outline-none rounded-md" />
      {errors.email && <span className="text-red-600">email is required</span>}
    </div>
      <div className="form-control relative">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type={show ? "text" : "password"} {...register("password", {
            required:true, 
            minLength:6, 
            maxLength:20,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
        })} name="password" placeholder="password" className="p-3 border border-purple-500 outline-none rounded-md"/>
        <p className='absolute bottom-20 left-72 '  onClick={() => setShow(!show)}>
        <small>
        {
            show ? <span><FontAwesomeIcon  icon={faEyeSlash} /></span> : <span><FontAwesomeIcon icon={faEye} /></span>
        }
        </small>
        </p>
        {
            errors.password?.type === 'required' && <p className="text-red-600">password is required</p>
        }
        {
            errors.password?.type === 'minLength' && <p className="text-red-600">password must be 6 characters</p>
        }
        {
            errors.password?.type === 'maxLength' && <p className="text-red-600">password must be less than 20 character</p>
        }
        {
            errors.password?.type === 'pattern' && <p className="text-red-600">password must have one upper case one lower case, one number and one special characters</p>
        }
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>

   
      <div className="form-control mt-6">
      <input className="btn bg-purple-500 hover:bg-purple-600 text-white" type="submit" value="Login"></input>
      </div>
    </form>
    <p className="ml-8"><small>New Here? <Link to='/signup'>Create an Account</Link></small></p>
    <SocialLogin></SocialLogin>
      
    </div>
      
      </>
    );
};

export default Login;