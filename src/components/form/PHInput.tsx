import { Input } from "antd";
import { Controller } from "react-hook-form";

interface IPHInputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
}

const PHInput = ({ name, type, label, placeholder }: IPHInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        render={({ field }) => (
          <Input {...field} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
};

export default PHInput;
