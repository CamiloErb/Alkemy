import { Skeleton } from "react-skeleton-generator";

const SkeletonMaker = ({
  count,
  height,
  width,
  widthMultiple,
  heightMultiple,
  borderRadius
}) => {
  return (
    <Skeleton.SkeletonThemeProvider animation="opacity" color="#C0C0C0" >
      <Skeleton
        count={count}
        width={width}
        height={height}
        widthMultiple={widthMultiple}
        heightMultiple={heightMultiple}
        borderRadius={borderRadius}

      ></Skeleton>
    </Skeleton.SkeletonThemeProvider>
  );
};

export default SkeletonMaker;
