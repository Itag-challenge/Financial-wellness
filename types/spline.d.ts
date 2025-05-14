declare module "@splinetool/react-spline" {
  import React from "react";

  interface SplineProps {
    scene: string;
    className?: string;
  }

  const Spline: React.FC<SplineProps>;

  export default Spline;
}

declare module "@splinetool/react-spline/react-spline.js" {
  import { FC } from "react";

  interface SplineProps {
    scene: string;
    className?: string;
  }

  const Spline: FC<SplineProps>;
  export default Spline;
}