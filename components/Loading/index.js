import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="center-screen">
      <div className="screen">
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};

export default Loading;
