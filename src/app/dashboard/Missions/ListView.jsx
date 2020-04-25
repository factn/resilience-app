import { useTheme } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";

import ListItem from "./ListItem";

const getMuiTheme = (theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          verticalAlign: "baseline",
          padding: "0px",
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
          backgroundColor: "transparent",
        },
        // this contain the search field
        left: {
          //padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
          //margin: theme.spacing(2),
          //border: "1px solid lightgrey",
          //borderRadius: theme.spacing(0.5),
        },
        actions: {
          // remove all the toolbar action
          // we only display the search field now
          display: "none",
        },
      },
      MUIDataTableSearch: {
        clearIcon: {
          // remove the closed action for the search field
          display: "none",
        },
        searchText: {
          flex: 1,
        },
      },
      MUIDataTable: {
        paper: {
          height: "100%",
        },
        responsiveScrollMaxHeight: {
          maxHeight: "calc(100vh - 240px) !important",
        },
      },
      // remove all the padding from the list
      MuiToolbar: {
        gutters: {
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        },
      },
      MuiTablePagination: {
        selectRoot: {
          marginRight: theme.spacing(1),
        },
      },
      MuiOutlinedInput: {
        input: {
          padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        },
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    border: "1px solid transparent",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  isSelected: {
    borderColor: theme.palette.primary.main,
  },
  arrowRightWrapper: {
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
    position: "absolute",
  },
}));

const columns = [
  {
    name: "mission",
    label: "Mission",
    options: {
      customBodyRender: ListItem,
      customHeadRender: () => null,
    },
  },
];
const tableOptions = {
  filterType: "checkbox",
  responsive: "scrollMaxHeight",
  elevation: 0,
  rowsPerPage: 100,
  pagination: false,
  selectableRows: "none",
  customFooter: () => null,

  print: false,
  download: false,
  filter: false,
  viewColumns: false,
  searchOpen: true,
  searchPlaceholder: "Search for missions",
};

const MissionsListView = ({ missions, selectedMission, setDetailsMission, setSelectedMission }) => {
  const theme = useTheme();
  const innerTheme = getMuiTheme(theme);

  const classes = useStyles(innerTheme);

  // need format [{mission: data}, {mission: data}]
  const data = missions.map((mission) => ({
    mission: {
      mission,
      classes,
      selectedMission,
      setSelectedMission,
      setDetailsMission,
    },
  }));

  return (
    <MuiThemeProvider theme={innerTheme}>
      <MUIDataTable data={data} columns={columns} options={tableOptions} rowsPerPage={100} />
    </MuiThemeProvider>
  );
};

export default MissionsListView;
