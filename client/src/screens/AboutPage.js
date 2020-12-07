import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FAQs from "../faqs";

const useStyles = makeStyles(() => ({
  questionSection: {
    maxWidth: 700,
    margin: "0 auto",
  },
  accordionSummary: {
    color: "green",
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
      <Paper className={classes.questionSection}>
        <Typography variant="h6">FAQs</Typography>
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
                <Typography>Q: {questionText}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>A: {details}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </div>
  );
};

export default AboutPage;
