import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ILoaderProps } from "../types";

const Loader: React.FC<ILoaderProps> = ({ color, size = 20, className }) => {
  return (
    <div className={`${color} ${className}`}>
      <AiOutlineLoading3Quarters size={size} className={`animate-spin`} />
    </div>
  );
};

export default Loader;
