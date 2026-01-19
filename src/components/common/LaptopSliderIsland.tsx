"use client";

import { useState } from "react";
import LaptopFrameSlider from "@/components/common/LaptopFrameSlider";

interface Props {
  slides: string[];
  laptopImage: string;
  sliderId?: string;
}

export default function LaptopSliderIsland({
  slides,
  laptopImage,
  sliderId = "laptop",
}: Props) {
  const [activeTab] = useState(0); // future-proof

  return (
    <LaptopFrameSlider
      laptopImage={laptopImage}
      slides={slides}
      sliderId={sliderId}
      active={activeTab === 0}
    />
  );
}