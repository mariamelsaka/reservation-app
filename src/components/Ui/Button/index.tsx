import type { ReactNode ,ButtonHTMLAttributes} from "react";
import "./index.css";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?:string;

}

const Button = ({ children ,className,...props}: IProps) => {
  return <button className={`${className|| ""} bg-[#CF0018] hover:bg-[rgb(222,85,87)] cursor-grab text-white rounded-md px-4 py-2`} {...props}>{children}</button>;
};

export default Button;
