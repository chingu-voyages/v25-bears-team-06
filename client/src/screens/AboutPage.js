import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ShareIcon from "@material-ui/icons/Share";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import PublicIcon from "@material-ui/icons/Public";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";

// FAQs
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
    margin: "1rem auto",
    paddingTop: "1rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      flexFlow: "column-reverse nowrap",
    },
  },
  questionSection: {
    marginleft: 10,
    padding: "1rem",
    width: "40%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginleft: 0,
      marginTop: "1rem",
      padding: 0,
    },
  },
  accordionSummary: {
    color: "green",
  },
  aboutSection: {
    margin: "0 auto",
    padding: "1rem",
    marginLeft: "0.5rem",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
      padding: 0,
    },
  },
  infographicContainer: {
    color: "#fff",
    alignContent: "center",
    textAlign: "center",
    marginTop: "1rem",
  },
  infoLight: {
    backgroundColor: theme.palette.primary.light,
    padding: "1rem 1.5rem 2rem",
  },
  infoDark: {
    backgroundColor: theme.palette.primary.dark,
    padding: "1rem 1.5rem 2.5rem",
  },
  iconLight: {
    color: theme.palette.primary.dark,
    padding: "1rem",
    fontSize: "3rem",
    alignSelf: "center",
  },
  iconDark: {
    color: theme.palette.secondary.main,
    padding: "1rem",
    fontSize: "3rem",
    alignSelf: "center",
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
              component={Link}
              to="/signup"
            >
              Become a Member
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.btnTwo}
              href="#questionInfoContainer"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <section
        className={classes.questionInfoContainer}
        id="questionInfoContainer"
      >
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
                  <Typography color="primary">{questionText}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{details}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Paper>
        <Paper className={classes.aboutSection}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" gutterBottom>
            OpenShelf is a site for readers of all ages to share books with one
            another. This project was created as part of a Chingu Voyage.
            <br />
            We conducted a survey to find out what people think of sharing books
            with members of their communities. The infographic below shares some
            of the findings.
          </Typography>
          <Grid container className={classes.infographicContainer}>
            {/* ROW 1 */}
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoLight}
            >
              <PersonPinCircleIcon className={classes.iconLight} />
              <Typography variant="body2">
                A central and convenient pickup / dropoff location is important.
                Most respondents (68%) are willing to meet in person.
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoDark}
            >
              <LocalLibraryIcon className={classes.iconDark} />
              <Typography variant="body2">
                84% are interested in borrowing books from others in their
                community, <br /> while 79% are willing to loan their books to
                others.
              </Typography>
            </Grid>
            {/* ROW 2  */}
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoDark}
            >
              <ShareIcon className={classes.iconDark} />
              <Typography variant="body2">
                Of those who are willing to share their books, around 60% want
                it returned to them. Others are happy to let it circulate more.
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoLight}
            >
              <FindInPageIcon className={classes.iconLight} />
              <Typography variant="body2">
                Most people search by title or author.
              </Typography>
            </Grid>
            {/* ROW 3 */}
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoLight}
            >
              <PublicIcon className={classes.iconLight} />
              <Typography variant="body2">
                {" "}
                The ability to search for books they are interested in is very
                important to most. That&apos;s why anyone can search our
                database, even before signing up.
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              direction="column"
              className={classes.infoDark}
            >
              <HourglassFullIcon className={classes.iconDark} />
              <Typography variant="body2">
                Three weeks. <br /> The period most consider a fair amount of
                time for borrowing books.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </section>
    </div>
  );
};

export default AboutPage;
