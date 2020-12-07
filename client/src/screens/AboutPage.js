import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core/";
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
    // backgroundColor: "yellow",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextLg: {
    color: "#fff",
  },
  heroTextMd: { color: "#fff" },
  questionInfoContainer: {
    display: "flex",
    flexFlow: "column-reverse nowrap",
    maxWidth: 1200,
    margin: "auto",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row nowrap",
    },
  },
  ctaContainer: {
    // backgroundColor: "orange",
    margin: "1.5rem auto",
  },
  btnOne: {
    marginRight: "1rem",
  },
  btnTwo: {
    // backgroundColor: "#222",
    marginLeft: "1rem",
  },
  questionSection: {
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: theme.palette.primary.dark,
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  accordionSummary: {
    color: "green",
  },
  infoSection: {
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: theme.palette.primary.light,
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
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
          <Typography variant="h1" gutterBottom className={classes.heroTextLg}>
            {" "}
            Sharing Books Made Easy
          </Typography>
          <Typography variant="h4" className={classes.heroTextMd} gutterBottom>
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
        <Paper className={classes.infoSection}>
          <Typography>Info Section</Typography>
        </Paper>
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
      </section>
    </div>
  );
};

export default AboutPage;
