import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { useStyles } from "./NavigationDrawer.style";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToApp from "@material-ui/icons/ExitToApp";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PanTool from "@material-ui/icons/PanTool";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { PrivateComponent, Popup } from "../../component";
import {
  Container,
  Typography,
  ListItemIcon,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

export default function TemporaryDrawer() {
  const firebase = useFirebase();
  const history = useHistory();
  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
  });

  const [missionTypeModal, setMissionTypeModal] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSignOut = () => {
    firebase.logout();
    history.push("/");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/missions" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Volunteer needed" />
          </ListItem>
        </Link>
        <PrivateComponent>
          <Link to="/user/profile" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItem>
          </Link>
        </PrivateComponent>
        <PrivateComponent>
          <Link to="/missions/volunteered" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Volunteered Missions" />
            </ListItem>
          </Link>
        </PrivateComponent>
        <PrivateComponent>
          <span onClick={() => setMissionTypeModal(true)} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PanTool classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Create Mission" />
            </ListItem>
          </span>
        </PrivateComponent>
        <PrivateComponent>
          <Link to="/missions/created" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="My Requests" />
            </ListItem>
          </Link>
        </PrivateComponent>
        <PrivateComponent>
          <Link to="/status" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="My Status" />
            </ListItem>
          </Link>
        </PrivateComponent>
        <PrivateComponent>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToApp classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </PrivateComponent>
      </List>
    </div>
  );

  const MissionTypeModal = () => (
    <Popup open={missionTypeModal} handleClose={() => setMissionTypeModal(false)} btnText="close">
      <Container align="center">
        <Typography align="center" variant="h1">
          Choose a mission type
        </Typography>
        <StyledButton
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => {
            setMissionTypeModal(false);
            history.push(`/missions/new/food`);
          }}
        >
          food
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => {
            setMissionTypeModal(false);
            history.push(`/missions/new/pharmacy`);
          }}
        >
          pharmacy
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => {
            setMissionTypeModal(false);
            history.push(`/missions/new/errand`);
          }}
        >
          errand
        </StyledButton>
      </Container>
    </Popup>
  );

  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      {missionTypeModal && <MissionTypeModal />}
      <Button
        aria-label="Menu"
        classes={{ root: classes.root, label: classes.label }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
