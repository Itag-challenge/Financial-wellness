"use client";
import Spline from "@splinetool/react-spline";

interface SplineWrapperProps {
  scene: string;
  style?: React.CSSProperties;
}

export default function SplineWrapper({ scene, style }: SplineWrapperProps) {
  return <Spline scene={scene} style={style} />;
}