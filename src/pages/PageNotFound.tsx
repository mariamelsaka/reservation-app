import Button from "@components/Ui/Button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12 lg:flex-row">
      {/* Left Side - Texts */}
      <div className="flex flex-col justify-start w-full lg:w-1/2 bg-no-repeat bg-cover text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
          Oops!
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#20B486] mt-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto lg:mx-0">
          We couldn't find the page you're looking for. Check the URL or go back
          to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
          <Link to="/">Go to Homepage</Link>
          <Button
            type="button"
            className="!bg-[#EAFFF9] !text-[#20B486] px-4 py-2 font-medium rounded w-full sm:w-auto"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
