import type { ReactNode } from "react";

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children:ReactNode;
}

const Label = ({children,...props}:IProps) => {
  return <label {...props}>{children}</label>
}

export default Label;