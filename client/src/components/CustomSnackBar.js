import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles(() => {
//  success: {
// //
//  },
// });

const CustomSnackBar = (props) => {
  const { error } = props;
  // const classes = useStyles();

  // const success = setAlert({
  //   open: true,
  //   message: "Book uploaded successfully!",
  //   backgroundColor: "#4caf50",
  // });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  setAlert({
    open: true,
    message: { error },
    backgroundColor: "#f44336",
  });

  return (
    <div>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default CustomSnackBar;
