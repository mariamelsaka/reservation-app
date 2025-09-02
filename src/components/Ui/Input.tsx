import  { forwardRef } from "react"
import type {  Ref } from "react"



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input =forwardRef(({...props}:IProps,ref:Ref<HTMLInputElement>) => {
  return <input
  className={`w-full border rounded-md px-3 py-2 text-base 
              bg-[var(--input-bg)] 
              border-[var(--input-border)] 
              text-[var(--input-text)] 
              placeholder:text-[var(--input-placeholder)] 
              focus:outline-none focus:ring-2 focus:ring-violet-500 
              ${props.className || ''}`}
  ref={ref}
  {...props}
/>

})


export default Input

