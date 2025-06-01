import { Ellipse } from "@/ui/shapes";

interface LoadingDataProps {
  text: string;
}

const LoadingData = ({ text }: LoadingDataProps) => {
  return (
    <div className="animate-in fade-in-30 flex flex-col items-center justify-center space-y-3 py-4 duration-300">
      <Ellipse className="animate-spin" width={20} height={20} />
      <p>{text}</p>
    </div>
  );
};

export default LoadingData;
