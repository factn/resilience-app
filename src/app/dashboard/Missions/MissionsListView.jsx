import React from "react";
import MUIDataTable from "mui-datatables";
import { useTheme } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MissionName, TimeLocation, Funding } from "./ListComponents";
import { useHistory } from "react-router-dom";
import _ from "../../utils";

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
          display: "none",
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
          maxHeight: "calc(100vh - 250px) !important",
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
      onShowDetails: mission.onShowDetails,
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

const MissionsListView = ({ missions, view }) => {
  const theme = useTheme();
  const innerTheme = getMuiTheme(theme);
  const history = useHistory();

  function formatData(missions) {
    return missions?.map((mission) => {
      let formated = {};
      const onShowDetails = () =>
        history.push({
          search: _.setQueryParam("missionId", mission.id),
        });
      mission.onShowDetails = onShowDetails;
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
  const data = formatData(missions);

  return (
    <MuiThemeProvider theme={innerTheme}>
      <MUIDataTable data={data} columns={columns} options={options} rowsPerPage={100} />
    </MuiThemeProvider>
  );
};

export default MissionsListView;
