import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import _ from "lodash";

import { Page } from "../../layout";
import SearchUser from "../../component/SearchUser";

const TypeAheadDemo = () => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <Page template="white" title="Typeahead Demo" spacing={3} isLoading={false}>
      <Box m={1}>
        <SearchUser setValue={setSelectedValue} />
        <Box mt={4} style={{ wordWrap: "wrap", width: "500px" }}>
          {JSON.stringify(selectedValue, null, 4)}
        </Box>
      </Box>
    </Page>
  );
};

export default withRouter(TypeAheadDemo);
