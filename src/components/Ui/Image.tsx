import { memo, useRef, useEffect } from "react";

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className, ...rest }: IProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      img.classList.remove("blur-sm");
    };

    img.addEventListener("load", handleLoad);
    return () => img.removeEventListener("load", handleLoad);
  }, []);

  if (!alt) {
    console.warn("Image missing alt text!");
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className || ""} rounded blur-sm transition-all duration-500`}
      loading="lazy"
      {...rest}
    />
  );
};

export default memo(Image);
