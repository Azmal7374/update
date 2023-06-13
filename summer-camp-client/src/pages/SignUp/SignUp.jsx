import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../share/SocialLogin/SocialLogin";
import { toast } from "react-toastify";

const SignUp = () => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const { createUser, updateUserProfile} = useContext(AuthContext)

    

    const onSubmit = data =>{
        
         if(data.password !== data.confirmPassword){
         return toast('password Does Not Match')
         }
         createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
              const savedUser = {name: data.name, email: data.email, photo:data.photoURL,role:'student'}
               fetch('http://localhost:5000/users',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(savedUser)
               })
               .then(res => res.json())
               .then(data => {
                 if(data.insertedId){
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Created Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/')
                 }
               })
             
            })
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    console.log(watch("example"));

    return (
    <>
    <Helmet>
    <title> Sports Academic | Sign Up</title>
    </Helmet>
    <div className=" w-96 mx-auto bg-slate-100">
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" {...register("name", {required: true})} name="name" placeholder="name" className="p-3 border border-purple-500 outline-none rounded-md " />
      {errors.name && <span className="text-purple-500">name is required</span>}
    </div>
    <div className="form-control">
    <label className="label">
      <span className="label-text">Photo URL</span>
    </label>
    <input type="text" {...register("photoURL", {required: true})}   placeholder="Photo URL" className="p-3 border border-purple-500 rounded-md" />
    {errors.photoURL && <span className="text-purple-500">Photo URL is required</span>}
  </div>
    <div className="form-control">
    <label className="label">
      <span className="label-text">Email</span>
    </label>
    <input type="email" {...register("email", {required: true})} name="email" placeholder="email" className="p-3 border border-purple-500 outline-none rounded-md" />
    {errors.email && <span className="text-purple-500">email is required</span>}
  </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type="password" {...register("password", {
          required:true, 
          minLength:6, 
          maxLength:20,
          pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
      })} name="password" placeholder="password" className="p-3 border border-purple-500 outline-none rounded-md"/>
      {
          errors.password?.type === 'required' && <p className="text-purple-500">password is required</p>
      }
      {
          errors.password?.type === 'minLength' && <p className="text-red-600">password must be 6 characters</p>
      }
      {
          errors.password?.type === 'maxLength' && <p className="text-red-600">password must be less than 20 character</p>
      }
      {
          errors.password?.type === 'pattern' && <p className="text-purple-500">password must have one upper case one lower case, one number and one special characters</p>
      }
     
    </div>

    <div className="form-control">
    <label className="label">
      <span className="label-text">Confirm Password</span>
    </label>
    <input type="password" {...register("confirmPassword", {
        required:true, 
        minLength:6, 
        maxLength:20,
        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
    })} name="confirmPassword" placeholder="confirm password" className="p-3 border border-purple-500 outline-none rounded-md" />
    {
        errors.confirmPassword?.type === 'required' && <p className="text-purple-500">password is required</p>
    }
    {
        errors.confirmPassword?.type === 'minLength' && <p className="text-purple-500">password must be 6 characters</p>
    }
    {
        errors.confirmPassword?.type === 'maxLength' && <p className="text-purple-500">password must be less than 20 character</p>
    }
    {
        errors.confirmPassword?.type === 'pattern' && <p className="text-purple-500">password must have one upper case one lower case, one number and one special characters</p>
    }
   
  </div>
    <div className="form-control">
    <input className="btn bg-purple-500 hover:bg-purple-600 text-white" type="submit" value="Sign Up"></input>
    </div>
  </form>
  <p className="ml-8"><small>Already have an account <Link to='/login'>Login</Link></small></p>
  <SocialLogin></SocialLogin>
      
  </div>
    
    </>
    );
};

export default SignUp;