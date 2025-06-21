import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/use_sign_up.js";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-100">
      <div className="border border-primary/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-base-200">
        {/* SIGN UP FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-2.5">
            <ShipWheelIcon className="size-9 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-wider">
              Streamify
            </span>
          </div>

          {error && (
            <div className="alert alert-error shadow-sm">
              <span>{error.response?.data?.message || "Signup failed"}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Create an Account</h2>
              <p className="text-sm text-base-content/70">
                Join Streamify and start your language learning adventure!
              </p>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                  <span className="text-xs leading-tight">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">terms of service</span> and{" "}
                    <span className="text-primary hover:underline">privacy policy</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full shadow-md hover:shadow-lg transition duration-300"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center">
          <div className="max-w-md p-8 text-center space-y-4">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full rounded-xl shadow-lg"
              />
            </div>
            <h2 className="text-xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="opacity-70">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
