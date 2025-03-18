import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, reset } = useForm(); // Use react-hook-form
  const [submitError, setSubmitError] = useState("");

  const signup = async (data) => {
    setSubmitError("");
    // console.log(JSON.stringify(data));
    try {
      const response = await axios.post("http://localhost:3000/users/register", data);
      console.log("Signup successful:", response.data);
      reset(); // Reset form after successful submission
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[34%] max-w-3xl bg-white text-black rounded-2xl p-6 border border-gray-200 shadow-xl">
        <h2 className="mb-2 text-left text-2xl text-[#09090B] font-semibold leading-tight">
          Sign Up
        </h2>
        <p className="mb-5 text-left text-sm text-gray-700">
          Welcome to Stumble! Sign up to get started
        </p>

        {submitError && (
          <p className="mt-3 text-center text-red-500">{submitError}</p>
        )}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-2">
            {/* Name */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="w-full py-2 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                {...register("emailId", { required: true })}
                className="w-full py-2 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full py-2 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-4 w-full gap-2">
            <button
              type="button"
              className="w-full py-2 px-4 text-base font-semibold text-[#09090B] text-opacity-70 bg-white border border-gray-300 rounded-lg shadow-md transition-colors duration-300"
            >
              Back to Home
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 text-base font-semibold text-white bg-[#09090B] hover:bg-[#09090B] rounded-lg shadow-md transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Have an account?{" "}
          <button className="font-medium text-[#09090B] hover:text-[#09090B] focus:outline-none focus:ring-1 focus:ring-black transition-colors duration-200">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
