import { Form, Link, redirect, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    

    try {
      const response = await customFetch.post("/auth/login/", data);
      store.dispatch(loginUser(response.data));
      const { role } = response.data;
       console.log(response.data);
           
      // Store token (e.g., in local storage or context)

      toast.success("logged in successfully");
      // Check the role of the user and redirect accordingly
      if (role === "admin") {
        return redirect("/dashboard");
      } else {
        return redirect("/");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="nikxx@gmail.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="123456"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
