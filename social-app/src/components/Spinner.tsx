import { FC } from "react";

interface Props {}

const Spinner: FC<Props> = (props): JSX.Element => {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
    </div>
  );
};

export default Spinner;
