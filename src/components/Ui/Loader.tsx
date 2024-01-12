import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loader: FC = () => {
  const renderLoaders = () => {
    const loaders = [];
    for (let i = 0; i < 16; i++) {
      loaders.push(
        <div className="col-md-6 col-lg-3 mt-4" key={i}>
          <Stack spacing={1}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem" }}
              width={300}
              height={30}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem" }}
              width={300}
              height={30}
            />
            <Skeleton variant="rounded" width={100} height={30} />
          </Stack>
        </div>
      );
    }
    return loaders;
  };
  return <div className="row">{renderLoaders()}</div>;
};

export default Loader;
