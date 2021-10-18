import React from "react";
import SkeletonMaker from "../../tools/SkeletonMaker/SkeletonMaker";

export const HeroCardSkeleton = () => {
  return (
    <div className="col-md-4">
      <SkeletonMaker
        count={3}
        heightMultiple={["2em", "27em", "2.5em"]}
        widthMultiple={["100%", "100%", "100%"]}
      />
    </div>
  );
};
