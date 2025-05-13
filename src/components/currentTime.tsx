import { format } from "@formkit/tempo";

const CurrentTime = () => {
  return <h3>{format(new Date(), "full")}</h3>;
};

export default CurrentTime;
