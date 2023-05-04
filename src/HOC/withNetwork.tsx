import { ReactComponentElement, ReactElement } from "react";
import useNetwork from "../hooks/useNetwork";
import NoNetwork from "../components/NoNetwork";

function withNetwork(Component: React.ComponentType) {
  return (props: any) => {
    const isOnline = useNetwork();

    if (isOnline) return <Component {...props} />;

    return <NoNetwork />;
  };
}

export default withNetwork;
