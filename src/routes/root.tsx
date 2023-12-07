import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function ErrorPage() {

  const location = useLocation();
  
  const error = location.state && location.state.error;

  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1">
        <i>{error?.statusText || error?.message}</i>
      </Typography>
    </div>
  );
}