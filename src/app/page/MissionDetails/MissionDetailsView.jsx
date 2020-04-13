import React from "react";

import { Button, H3, H5, Body2 } from "../../component";
import {
  Grid,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import { color } from "../../../theme";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import cameraImage from "../../../img/placeholderBackground.svg";

import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import MapView from "../../component/MapView";
import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";
import { missionStatusLabel } from "../../../constants";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
  goBackIcon: {
    fontSize: 32,
    fill: color.deepPurple,
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardHeader: {
    paddingBottom: theme.spacing(1),
  },
  subheader: {
    marginTop: theme.spacing(0.3),
  },
  contentTypography: {
    paddingLeft: theme.spacing(0.5),
  },
  image: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  missionTypeText: {
    paddingTop: theme.spacing(0.5),
  },
  deliveryDetailsHeader: {
    paddingTop: theme.spacing(1),
    fontWeight: 600,
  },
  deliveryDetails: {
    marginTop: theme.spacing(0.5),
  },
}));

// const useStyles = makeStyles((theme) => ({
//   content: {
//     margin: theme.spacing(1),
//     marginBottom: theme.spacing(8),
//   },
//   textContainer: {
//     marginTop: theme.spacing(1),
//     paddingLeft: theme.spacing(1),
//   },
//   unassignedText: {
//     fontWeight: 600,
//     letterSpacing: "0.2px",
//     color: color.darkPink,
//   },
//   inProgressText: {
//     fontWeight: 600,
//     letterSpacing: "0.2px",
//     color: color.darkOrange,
//   },
//   volunteerIcon: {
//     marginTop: theme.spacing(0.25),
//     fontSize: 20,
//   },
//   volunteerText: {
//     marginTop: theme.spacing(0.15),
//     marginLeft: theme.spacing(0.2),
//   },
//   avatar: {
//     marginTop: theme.spacing(0.25),
//     height: "25px",
//     width: "25px",
//   },
//   avatarText: {
//     marginTop: theme.spacing(0.4),
//     marginLeft: theme.spacing(0.5),
//   },
//   imageContainer: {
//     marginTop: theme.spacing(1),
//     padding: 0,
//   },
//   missionTypeText: {
//     marginTop: theme.spacing(0.4),
//     fontWeight: 500,
//   },
//   detailsHeader: {
//     fontWeight: 600,
//   },
//   detailsIcon: {
//     marginTop: theme.spacing(0.2),
//     marginRight: theme.spacing(1),
//   },
//   detailsText: {
//     marginTop: theme.spacing(0.2),
//   },
//   divider: {
//     border: "solid 1px #D4D5D9",
//   },
// }));

const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);

const MissionDetailsIconList = ({ contentItems, classes, outerClass }) => (
  <Grid container className={outerClass} alignItems="flex-start">
    {contentItems.map((contentItem, index) => {
      const Icon = contentItem.icon;
      const content = contentItem.content.map((content, index) => {
        return (
          <Body2
            key={`content-item-txt-${index + 1}`}
            color="textPrimary"
            style={content.style}
            className={classes.contentTypography}
          >
            {content.text}
          </Body2>
        );
      });

      return (
        <React.Fragment key={`content-item-${index + 1}`}>
          <Grid item xs={1}>
            {Icon !== undefined ? <Icon color="primary" /> : null}
          </Grid>
          <Grid item xs={11}>
            {content}
          </Grid>
        </React.Fragment>
      );
    })}
  </Grid>
);

const MissionDetailsContent = ({ mission, classes }) => (
  <Grid container alignItems="center">
    <H5 align="left" color="textSecondary">
      Mission Type
    </H5>
    <Body2 align="left" className={classes.missionTypeText} color="textPrimary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus nibh quis erat
      condimentum, vitae porttitor neque tempus.
    </Body2>
  </Grid>
);

const MissionDetailsPickUpDeliveryHeader = ({ header, classes }) => (
  <Body2 align="left" className={classes.deliveryDetailsHeader} color="textPrimary">
    {header}
  </Body2>
);

const MissionDetailsPage = ({
  mission,
  volunteers,
  volunteerForMission,
  markMissionAsCompleted,
  userUnverifiedPopupOpen,
  setUserUnverifiedPopupOpen,
  cords,
  history,
}) => {
  const classes = useStyles();
  const status = mission.status ? titleCase(missionStatusLabel[mission.status]) : null;

  const subheaderItems = [
    {
      icon: PersonIcon,
      content: [{ text: status }],
    },
    {
      icon: AttachMoneyIcon,
      content: [{ text: "Funded by donations" }],
    },
  ];

  const pickUpDetails = [
    {
      icon: LocationOnIcon,
      content: [{ text: "123 Strawberry Ln, VA 22201" }],
    },
    {
      icon: ScheduleIcon,
      content: [{ text: "1:30 PM" }],
    },
  ];

  const deliveryDetails = [
    {
      icon: LocationOnIcon,
      content: [{ text: "123 Strawberry Ln, VA 22201" }],
    },
    {
      icon: ScheduleIcon,
      content: [{ text: "2:30 - 3:30 PM" }],
    },
    {
      icon: PersonIcon,
      content: [
        { text: "John Doe" },
        {
          text: "(123) 456-7890",
          style: {
            fontWeight: 600,
            textDecoration: "underline",
          },
        },
      ],
    },
  ];

  return (
    <Grid className={classes.content} direction="column" container>
      <Grid align="left" item>
        <ArrowBackIcon
          align="left"
          className={classes.goBackIcon}
          onClick={() => history.push(`/missions`)}
        />
      </Grid>
      <Grid>
        <Card align="left">
          <CardHeader
            title="Mission Title"
            titleTypographyProps={{ variant: "h3", component: "span", color: "textPrimary" }}
            subheader={
              <MissionDetailsIconList
                outerClass={classes.subheader}
                contentItems={subheaderItems}
                classes={classes}
              />
            }
            className={classes.cardHeader}
          />
          <CardMedia image={cameraImage} title="Mission image" className={classes.image} />
          <CardContent className={classes.cardContent}>
            <MissionDetailsContent classes={classes} />
            <MissionDetailsPickUpDeliveryHeader header="Pick Up Details" classes={classes} />
            <MissionDetailsIconList
              outerClass={classes.deliveryDetails}
              contentItems={pickUpDetails}
              classes={classes}
            />
            <MissionDetailsPickUpDeliveryHeader header="Delivery Details" classes={classes} />
            <MissionDetailsIconList
              outerClass={classes.deliveryDetails}
              contentItems={deliveryDetails}
              classes={classes}
            />
          </CardContent>
          <CardActions>
            <StyledButton
              color="primary"
              variant="contained"
              disableElevation
              onClick={volunteerForMission}
            >
              Accept Mission
            </StyledButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>

    // <>
    //   <Box className={classes.content}>
    //     <Card className={classes.textContainer}>
    //       <H3 align="left" color="textPrimary">
    //         Mission Title - Lorem ipsu
    //       </H3>
    //       {mission.status === "todo" ? (
    //         <>
    //           <Body2 align="left" className={classes.unassignedText}>
    //             &bull; UNASSIGNED
    //           </Body2>
    //           <Grid container>
    //             <Grid item>
    //               <PersonIcon
    //                 className={classes.volunteerIcon}
    //                 style={{ fill: color.vibrantPurple }}
    //               />
    //             </Grid>
    //             <Grid item>
    //               <Body2 align="left" color="textPrimary" className={classes.volunteerText}>
    //                 Looking for volunteer
    //               </Body2>
    //             </Grid>
    //           </Grid>
    //         </>
    //       ) : (
    //         <>
    //           <Body2 align="left" className={classes.inProgressText}>
    //             &bull; IN PROGRESS
    //           </Body2>
    //           <Grid container>
    //             <Grid item>
    //               <Avatar
    //                 className={classes.avatar}
    //                 alt="Volunteer"
    //                 src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg"
    //               />
    //             </Grid>
    //             <Grid item>
    //               <Body2 align="left" color="textPrimary" className={classes.avatarText}>
    //                 {/* {volunteers[0].displayName} */}
    //               </Body2>
    //             </Grid>
    //           </Grid>
    //         </>
    //       )}
    //     </Card>
    //     <Card className={classes.imageContainer}>
    //       <img src={cameraImage} alt="Mission" className={classes.image} />
    //     </Card>
    //     <Card className={classes.textContainer}>
    //       <H5 align="left" color="textSecondary">
    //         Mission Type
    //       </H5>
    //       <Body2 align="left" className={classes.missionTypeText} color="textPrimary">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus nibh quis erat
    //         condimentum, vitae porttitor neque tempus.
    //       </Body2>
    //     </Card>
    //     <Card className={classes.textContainer}>
    //       <Body2 align="left" className={classes.detailsHeader} color="textPrimary">
    //         Pick up Details
    //       </Body2>
    //       <Grid container>
    //         <Grid item>
    //           <LocationOnIcon
    //             className={classes.detailsIcon}
    //             style={{ fill: color.vibrantPurple }}
    //           />
    //         </Grid>
    //         <Grid item>
    //           <Body2 align="left" color="textPrimary" className={classes.detailsText}>
    //             123 Strawberry Ln, VA 22201
    //           </Body2>
    //         </Grid>
    //       </Grid>
    //       <Grid container>
    //         <Grid item>
    //           <ScheduleIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
    //         </Grid>
    //         <Grid item>
    //           <Body2 align="left" color="textPrimary" className={classes.detailsText}>
    //             1:30 PM
    //           </Body2>
    //         </Grid>
    //       </Grid>
    //     </Card>
    //     <Card className={classes.textContainer}>
    //       <Body2 align="left" className={classes.detailsHeader} color="textPrimary">
    //         Delivery Details
    //       </Body2>
    //       <Grid container>
    //         <Grid item>
    //           <LocationOnIcon
    //             className={classes.detailsIcon}
    //             style={{ fill: color.vibrantPurple }}
    //           />
    //         </Grid>
    //         <Grid item>
    //           <Body2 align="left" color="textPrimary" className={classes.detailsText}>
    //             123 Strawberry Ln, VA 22201
    //           </Body2>
    //         </Grid>
    //       </Grid>
    //       <Grid container>
    //         <Grid item>
    //           <ScheduleIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
    //         </Grid>
    //         <Grid item>
    //           <Body2 align="left" color="textPrimary" className={classes.detailsText}>
    //             2:30 PM
    //           </Body2>
    //         </Grid>
    //       </Grid>
    //       <Grid container>
    //         <Grid item>
    //           <PersonIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
    //         </Grid>
    //         <Grid item>
    //           <Body2 align="left" color="textPrimary" className={classes.detailsText}>
    //             John Doe
    //           </Body2>
    //         </Grid>
    //       </Grid>
    //     </Card>
    //     <hr className={classes.divider} />
    //     <Card>
    //       <Grid>
    //         {mission.status === "todo" ? (
    //           <Button text="Accept Mission" onClick={() => volunteerForMission(mission.id)} />
    //         ) : (
    //           <Button text="Mark Mission as Completed" onClick={markMissionAsCompleted} />
    //         )}
    //       </Grid>

    //       <Typography variant="body1">{mission.details}</Typography>
    //     </Card>
    //   </Box>
    //   <UserPhoneUnverifiedPopup
    //     open={userUnverifiedPopupOpen}
    //     handleClose={() => setUserUnverifiedPopupOpen(false)}
    //   />
    // </>
  );
};
export default MissionDetailsPage;
