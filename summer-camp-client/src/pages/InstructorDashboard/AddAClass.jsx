import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddAClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { handleSubmit, register, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        // console.log(imageResponse)
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url;
          const { name,instructorName, instructorEmail, seats, price, status} = data;
          const newItem = {
            name,
            image: imgURL,
            seats: parseFloat(seats),
            price: parseFloat(price),
            instructorName,
            instructorEmail,
            status,
            
          };
          console.log(newItem);
          axiosSecure.post("/class", newItem).then((data) => {
            console.log("After posting new Class", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="w-full ">
    <Helmet>
     Sports Academic | Add A Class
    </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="px-10">
        <div className="form-control  w-full  ">
          <label className="label">
            <span className="label-text font-semibold">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", {
              required: "true",
              maxLength: 120,
            })}
            className="p-3  rounded-md w-full  "
          />
        </div>

        <div className="form-control my-4  ">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            {...register("image", {
              required: "true",
            })}
            type="file"
            className="file-input file-input-bordered w-full  "
          />
        </div>

      <div className="flex gap-10">
      
      <div className="form-control  w-full  ">
      <label className="label">
        <span className="label-text font-semibold">Instructor Name</span>
      </label>
      <input
        defaultValue={user?.displayName}
        type="text"
        placeholder="Instructor Name"
        {...register("instructorName", {
          required: "true",
          maxLength: 120,
        })}
        className="p-3  rounded-md w-full  "
      />
    </div>

    <div className="form-control  w-full  ">
      <label className="label">
        <span className="label-text font-semibold">Instructor Email</span>
      </label>
      <input
        defaultValue={user?.email}
        type="email"
        placeholder="Instructor Email"
        {...register("instructorEmail", {
          required: "true",
          maxLength: 120,
        })}
        className="p-3  rounded-md w-full  "
      />
    </div>
      </div>

      <div className="flex gap-10">
      
      <div className="flex gap-4">
      <div className="form-control   ">
        <label className="label">
          <span className="label-text font-semibold">Available Seats</span>
        </label>
        <input
          type="number"
          {...register("seats", {
            required: "true",
          })}
          placeholder="Available Seats"
          className="p-3  rounded-md  w-full    "
        />
      </div>
    </div>

    <div className="flex gap-4">
      <div className="form-control   ">
        <label className="label">
          <span className="label-text font-semibold"> Price</span>
        </label>
        <input
          type="number"
          {...register("price", {
            required: "true",
          })}
          placeholder=" Price"
          className="p-3  rounded-md  w-full    "
        />
      </div>
    </div>
      </div>

      <div className="form-control  w-full  ">
      <label className="label">
        <span className="label-text font-semibold">Class Status</span>
      </label>
      <input
        defaultValue="pending"
        type="text"
        placeholder="Class Status"
        {...register("status", {
          required: "true",
          maxLength: 20,
        })}
        className="p-3  rounded-md w-full  "
      />
    </div>

       
        <input
        className=" h-12 bg-purple-500 text-white  w-32 flex justify-center items-center btn-sm mt-4 mx-auto"
        type="submit"
        value="Add Item"
      />
      </form>
    </div>
  );
};

export default AddAClass;
