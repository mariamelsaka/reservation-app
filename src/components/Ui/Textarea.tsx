

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const Textarea = ({...rest }: IProps) => {
  return  <textarea   className={`w-full border rounded-md px-3 py-2 text-base 
              bg-[var(--input-bg)] 
              border-[var(--input-border)] 
              text-[var(--input-text)] 
              placeholder:text-[var(--input-placeholder)] 
              focus:outline-none focus:ring-2 focus:ring-violet-500 
              ${rest.className || ''}`}
  rows={6}{...rest}/>

};

export default Textarea;
