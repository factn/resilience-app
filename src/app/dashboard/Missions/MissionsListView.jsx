import React from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { H5 } from "../../component";
import { MissionStatus, MissionFundedStatus } from "../../model/schema";
import { MissionName, TimeLocation, Funding } from "./ListComponents";

import _ from "lodash";

const getMuiTheme = (theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      MuiButton: {
        root: {
          textTransform: "capitalize",
        },
      },
      MuiPaper: {
        root: {
          width: "100%",
          backgroundColor: "transparent",
        },
      },
      MuiTableRow: {
        root: {
          backgroundColor: "white",
        },
      },
      MUIDataTableToolbar: {
        root: {
          backgroundColor: "transparent",
        },
      },
      MuiTypography: {
        h5: {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
      },
      MUIDataTable: {
        responsiveScrollMaxHeight: {
          maxHeight: "calc(100vh - 300px) !important",
        },
      },
    },
  });
const config = [
  {
    format: (mission) => ({
      title: mission.title,
      type: mission.type,
      id: mission.id,
    }),
    options: {
      name: "title",
      label: "Mission Name",
      options: { customBodyRender: MissionName },
    },
  },
  {
    format: (mission) => ({
      time: mission.pickUpWindow,
      location: mission.pickUpLocation,
    }),
    options: {
      name: "pickup",
      label: "Pick Up",
      options: { customBodyRender: TimeLocation },
    },
  },
  {
    format: (mission) => ({
      time: mission.deliveryWindow,
      location: mission.deloveryLocation,
    }),
    options: {
      name: "delivery",
      label: "Delivery",
      options: { customBodyRender: TimeLocation },
    },
  },
  {
    format: (mission) => ({
      fundedStatus: mission.fundedStatus,
    }),
    options: {
      name: "funded",
      label: "Funding",
      options: { customBodyRender: Funding },
    },
  },
];

const MissionsListView = ({ missions, ...rest }) => {
  const theme = useTheme();
  const innerTheme = getMuiTheme(theme);

  function formatData(missions) {
    return missions?.map((mission) => {
      let formated = {};
      config.forEach((c) => {
        formated[c.options.name] = c.format(mission);
      });
      return formated;
    });
  }

  const columns = config.map((c) => c.options);

  const options = {
    filterType: "checkbox",
    responsive: "scrollMaxHeight",
    elevation: 0,
  };

  return (
    <MuiThemeProvider theme={innerTheme}>
      <MUIDataTable data={formatData(missions)} columns={columns} options={options} />
    </MuiThemeProvider>
  );
};

export default MissionsListView;
