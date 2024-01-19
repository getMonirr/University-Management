/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authAPI";
import { IUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Logging in...");

      const res = await login(data).unwrap();

      const user = jwtDecode(res?.data?.accessToken) as IUser;
      dispatch(setUser({ user, token: res?.data?.accessToken }));

      console.log(user);

      toast.success("Login success!", { id: toastId, duration: 2000 });

      navigate(`/${user.role}/dashboard`);

      console.log(data);
    } catch (error) {
      toast.error((error as any)?.data?.message, { duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput name="id" type="text" label="ID" />
        <PHInput name="password" type="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
