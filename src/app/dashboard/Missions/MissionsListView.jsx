import React from "react";
import MUIDataTable from "mui-datatables";
import { useTheme } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TimeLocationCard from "./component/TimeLocationCard";
import MissionTypeCard from "./component/MissionTypeCard";
import StatusCard from "./component/StatusCard";
import { useHistory } from "react-router-dom";
import _ from "../../utils";

const getMuiTheme = (theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        },
      },
      MuiButton: {
        root: {
          textTransform: "capitalize",
        },
      },
      MuiPaper: {
        root: {
          width: "100%",
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
      status: mission.status,
      title: mission.title,
      type: mission.type,
      id: mission.id,
    }),
    options: {
      name: "type",
      label: "Mission Type",
      options: { customBodyRender: MissionTypeCard },
    },
  },
  {
    format: (mission) => ({
      status: mission.status,
      time: mission.pickUpWindow,
      location: mission.pickUpLocation,
    }),
    options: {
      name: "pickup",
      label: "Pick Up",
      options: { customBodyRender: TimeLocationCard },
    },
  },
  {
    format: (mission) => ({
      time: mission.deliveryWindow,
      location: mission.deliveryLocation,
      status: mission.status,
    }),
    options: {
      name: "delivery",
      label: "Delivery",
      options: { customBodyRender: TimeLocationCard },
    },
  },
  {
    format: (mission) => ({
      id: mission.id,
      status: mission.status,
      isReady: mission.isReady,
      fundedStatus: mission.fundedStatus,
      onShowDetails: mission.onShowDetails,
    }),
    options: {
      name: "allStatus",
      label: "Status",
      options: { customBodyRender: StatusCard },
    },
  },
];

const sort = (view) => {
  if (view === "inPlanning") {
    return (data, colIndex, order) => {
      // only status search for now
      if (colIndex == 3) {
        let sorted = _.orderBy(data, (row) => row.data[0].status, [order]);
        return sorted;
      }

      return data;
    };
  }

  return (data, colIndex, order) => {
    return data;
  };
};
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
    customSort: sort(view),
  };
  const data = formatData(missions);

  return (
    <MuiThemeProvider theme={innerTheme}>
      <MUIDataTable data={data} columns={columns} options={options} rowsPerPage={100} />
    </MuiThemeProvider>
  );
};

export default MissionsListView;
