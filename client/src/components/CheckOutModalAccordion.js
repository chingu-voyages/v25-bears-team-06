import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  availItem: {
    backgroundColor: theme.palette.success.main,
    marginBottom: "0.3rem",
    borderRadius: 5,
  },
  notAvailItem: {
    backgroundColor: theme.palette.error.main,
    marginBottom: "0.3rem",
    borderRadius: 5,
  },

  ownerName: {
    paddingLeft: "0.7rem",
  },
}));

export default function CheckOutModalAccordion({
  owner,
  expanded,
  toggleExpanded,
  handleModalAccordion,
}) {
  const classes = useStyles();
  const { accordionSummaryButton, accordionDetails } = handleModalAccordion(
    owner,
  );
  return (
    <Grid key={owner._id} item xs={12}>
      <Accordion
        expanded={expanded === owner._id}
        onChange={toggleExpanded(owner._id)}
      >
        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
          <Grid
            item
            container
            xs={12}
            className={
              owner.isAvailable ? classes.availItem : classes.notAvailItem
            }
            alignItems="center"
          >
            <Grid item xs={8} sm={9}>
              <Typography className={classes.ownerName}>
                {owner.owner.displayName}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              {accordionSummaryButton}
            </Grid>
          </Grid>
        </AccordionSummary>
        {/* accordion expanded details below  */}
        {accordionDetails && (
          <AccordionDetails>{accordionDetails}</AccordionDetails>
        )}
      </Accordion>
    </Grid>
  );
}
