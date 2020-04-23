import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

import AboutImage1 from "../../../img/AboutImage1.png";
import { ReactComponent as Logo } from "../../../img/logo.svg";
import { Body1, H1, H4 } from "../../component";
import { Page } from "../../layout";

const useStyles = makeStyles((theme) => ({
  AboutUsContainer: {
    padding: "30px",
  },
  HeaderContainer: {
    height: "210px",
    backgroundImage: `url(${AboutImage1})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  TitleLabel: {
    color: theme.color.black,
    fontSize: "36px",
  },
  ContentLabel: {
    fontSize: "18px",
    textAlign: "left",
    marginTop: "24px",
    fontWeight: 300,
  },
  MutualAidWorldLogo: {
    padding: "16px 0",
  },
  MutualAidLogo: {
    width: "60px",
  },
  MutualAidLogoLabel: {
    fontSize: "24px",
    color: theme.color.darkBlue,
  },
  LearnMoreLinkLabel: {
    color: theme.color.black,
    fontWeight: 400,
    fontSize: "20px",
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Page>
      <Grid container className={classes.HeaderContainer} />
      <Grid container className={classes.AboutUsContainer}>
        <H1 className={classes.TitleLabel}>About Us</H1>
        <Body1 className={classes.ContentLabel}>
          The Resilience app was created to help people coordinate the distribution of food and aid.
          It’s a tool to manage the needs of the community and connect with volunteers who can help
          fulfill those needs.
        </Body1>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.MutualAidWorldLogo}
        >
          <Logo className={classes.MutualAidLogo} title="MutualAidLogo" role="img" />
          <H1 className={classes.MutualAidLogoLabel}>MutualAid.World</H1>
        </Grid>
        <Grid>
          <Link to="/">
            <H4 className={classes.LearnMoreLinkLabel}>Learn more</H4>
          </Link>
        </Grid>
      </Grid>
      {/* <Box p={2}>
        <Typography variant="h2">About us</Typography>
      </Box>
      <Divider light />
      <Box p={3}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis leo elit, id
          scelerisque felis congue nec. Vestibulum faucibus congue justo, eget volutpat massa
          imperdiet convallis. Fusce rutrum, sapien aliquet fermentum facilisis, ligula lacus
          pretium magna, a hendrerit tellus massa eu eros. Cras id nisl ut mauris luctus imperdiet.
          Aliquam vestibulum mollis luctus. Proin vel rutrum nibh. Vivamus ullamcorper purus
          consectetur est consectetur, in tempus felis cursus. Mauris malesuada ante vel magna
          aliquam luctus. Morbi quis lobortis est, at tincidunt diam. Ut vitae justo lectus. Aenean
          sodales ullamcorper risus, a congue tortor auctor ut. Cras quis molestie dui. Mauris at
          leo nec lacus finibus luctus. Curabitur purus enim, ultricies vitae ligula in, accumsan
          efficitur augue. Vestibulum tincidunt tortor lectus, et eleifend risus euismod at. Cras
          ornare dui nunc, et molestie diam ornare ultricies. Phasellus vel est felis. Mauris rutrum
          odio a neque accumsan, nec vulputate tortor facilisis. Donec sit amet fermentum augue.
          Quisque elit mauris, fringilla vitae fermentum a, finibus vitae enim. Nunc at mattis
          augue. Mauris sollicitudin eget mi vitae malesuada. Duis ut consequat nibh. Aenean
          volutpat neque ex, nec venenatis odio luctus eget. Mauris ut rhoncus erat. Praesent
          consequat, tellus quis auctor elementum, ipsum mi ultricies magna, eget laoreet metus
          risus eget nisl. Integer tristique efficitur accumsan. Fusce varius tortor et dignissim
          fermentum. Aliquam bibendum nisi vel vulputate sollicitudin. Sed sollicitudin dapibus
          sapien id maximus. Integer semper est vel interdum fringilla. Fusce sed velit sed tortor
          tincidunt varius. Suspendisse a diam ut sem semper dapibus nec ut erat. Nunc in suscipit
          ligula. Nunc orci quam, semper ac tortor id, porttitor iaculis velit. Proin in consequat
          nunc, ut pharetra leo. Maecenas sit amet finibus sapien, sed efficitur dui. Vestibulum eu
          lacinia nisi. Etiam eget rutrum mauris. Aliquam facilisis dui turpis. Nullam quis risus et
          turpis rhoncus viverra. Suspendisse facilisis at sapien semper pretium. Pellentesque sit
          amet leo ut justo feugiat feugiat sed non velit. Nunc feugiat velit id leo condimentum,
          non interdum metus dictum. In a mauris enim. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </Typography>
      </Box> */}
    </Page>
  );
};

export default AboutPage;
