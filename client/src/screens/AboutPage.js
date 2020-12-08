import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FAQs from "../faqs";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    marginTop: "-3rem",
    height: "95vh",
    background: `linear-gradient(to bottom right, rgba(0, 0, 10, 0.8), rgba(0, 0, 10, 0.9)), url("/images/hero-image.jpg") no-repeat center center/cover`,
    width: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextContainer: {
    maxWidth: 1200,
    margin: "auto",
    padding: "2rem",
    display: "flex",
    flexFlow: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextLg: {
    [theme.breakpoints.down("xl")]: {
      fontSize: theme.typography.h1.fontSize,
      color: "#fff",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.h2.fontSize,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  heroTextMd: {
    [theme.breakpoints.down("xl")]: {
      fontSize: theme.typography.h5.fontSize,
      color: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.body2.fontSize,
    },
  },
  ctaContainer: {
    marginTop: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.8rem",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
    },
  },
  btnOne: {
    marginRight: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.8rem",
      marginRight: 0,
    },
  },
  btnTwo: {
    marginLeft: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.8rem",
      marginLeft: 0,
    },
  },
  questionInfoContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    maxWidth: 1440,
    margin: "auto",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexFlow: "column nowrap",
    },
  },
  questionSection: {
    marginleft: 10,
    padding: "1rem",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  accordionSummary: {
    color: "green",
  },
  infoSection: {
    margin: "0 auto",
    padding: "1rem",
    marginLeft: "0.5rem",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  const questions = FAQs;

  // set expanded
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (currentAccordion) => (event, isExpanded) => {
    setExpanded(isExpanded ? currentAccordion : false);
  };

  return (
    <div>
      <section className={classes.heroContainer}>
        <div className={classes.heroTextContainer}>
          <Typography gutterBottom className={classes.heroTextLg}>
            {" "}
            Sharing Books Made Easy
          </Typography>
          <Typography className={classes.heroTextMd} gutterBottom>
            Borrow or share books with members of your community.
          </Typography>
          <div className={classes.ctaContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.btnOne}
            >
              Become a Member
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.btnTwo}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <section className={classes.questionInfoContainer}>
        <Paper className={classes.questionSection}>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions (FAQs)
          </Typography>
          {questions.map((question) => {
            const { id, questionText, details } = question;
            return (
              <Accordion
                expanded={expanded === id}
                onChange={toggleExpanded(id)}
                key={id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                  className={classes.accordionSummary}
                >
                  <Typography color="primary">Q: {questionText}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>A: {details}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Paper>
        <Paper className={classes.infoSection}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body1">
            OpenShelf is a site for readers of all ages to share books with one
            another. This project was created as part of a Chingu Voyage.
          </Typography>
        </Paper>
      </section>
    </div>
  );
};

export default AboutPage;
