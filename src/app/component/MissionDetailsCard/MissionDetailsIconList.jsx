import React from "react";
import PropTypes from "prop-types";

import { Body2 } from "../";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "25px",
    width: "25px",
    marginBottom: theme.spacing(0.5),
  },
  contentTypography: {
    paddingLeft: theme.spacing(0.5),
  },
}));

/**
 * Component for displaying a list with text and icons
 *
 * @component
 */
const MissionDetailsIconList = ({ contentItems, outerClass }) => {
  const classes = useStyles();
  return (
    <Grid container className={outerClass} alignItems="flex-start">
      {contentItems.map((contentItem, index) => {
        const Icon = contentItem.icon;
        const avatarImage = contentItem.avatar?.image;
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
              {Icon && <Icon color="primary" />}
              {avatarImage && (
                <Avatar className={classes.avatar} alt="Volunteer" src={avatarImage} />
              )}
            </Grid>
            <Grid item xs={11}>
              {content}
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

MissionDetailsIconList.propTypes = {
  /**
   * content to display in the icon list
   */
  contentItems: PropTypes.array,
  /**
   * style class for outer container
   */
  outerClass: PropTypes.string,
};

export default MissionDetailsIconList;
