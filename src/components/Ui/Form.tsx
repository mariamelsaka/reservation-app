import React, { memo } from "react"

import {ReactNode } from "react"
interface IProps extends React.FormHTMLAttributes<HTMLFormElement>{
    children:ReactNode

}
const Form = ({children,...rest}:IProps) => {
  return (
    <>
    <form {...rest}>     
        {React.Children.map(children,(child)=>{
            return <div className="mb-3">
            {child}
            </div>
        })} 

          </form>
    </>
  )
}

export default memo(Form)