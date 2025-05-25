import type { OutletContext } from "@/types/outletContext";
import { useOutletContext } from "react-router";

const Homepage = () => {
  const { userId } = useOutletContext<OutletContext>();
  return <p className="text-2xl font-semibold">{userId}</p>;
};

export default Homepage;
