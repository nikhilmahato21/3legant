import { useSelector } from "react-redux";
import { Navigate, redirect } from "react-router-dom";

const DashboardLayout = () => {
  const user = useSelector((state) => state.userState.user);

  if (user && user.role === "user") {
    return <Navigate to="/" />;
}
  console.log(user.role);

  return <div>DashboardLayout</div>;
};

export default DashboardLayout;
