import React, { useEffect, useState } from "react";
import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import Organization from "../../model/Organization";

import { Page } from "../../layout";
import PaypalCheckout from "../../component/PaypalCheckout/PaypalCheckout";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100vw",
    height: "auto",
    marginLeft: "-1rem",
  },
}));

const orgPhoneNumber = "555-555-5555";

export default function DonationPage() {
  const classes = useStyles();
  const [paypalEmail, setPaypalEmail] = useState("");

  useEffect(() => {
    Organization.getPaymentSettings().then((settings) => {
      setPaypalEmail(settings.email);
    });
  }, []);

  return (
    <Page>
      <Box margin="0 1rem">
        <Typography variant="h1" align="left" color="textPrimary">
          Donate
        </Typography>

        {/*
        No official image availble yet 
        <img
          className={classes.img}
          alt="Donate"
          src="https://p16cdn4static.sharpschool.com/UserFiles/Servers/Server_79234/Image/Departments/Community%20Services/Volunteer/Asset%201@2x-50.jpg"
        ></img> */}

        <Typography align="left" variant="body1" gutterBottom>
          Help your neighbors by donating money to help cover the cost of food boxes.
        </Typography>
        <Typography align="left" variant="body1" gutterBottom>
          Any bit helps!
        </Typography>
        <Typography align="left" variant="body1" gutterBottom>
          All donations are 100% tax-deductible.
        </Typography>
        <PaypalCheckout />
        <Typography align="left" variant="body1" gutterBottom>
          If you would like to donate using check or a different method, please reach out to our
          volunteers at <a href={`tel:${orgPhoneNumber}`}>{orgPhoneNumber}</a> for further help.
        </Typography>
      </Box>
    </Page>
  );
}

function DonateButton({ children, paypalEmail }) {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
      {/* <!-- Identify your business so that you can collect the payments. --> */}
      <input type="hidden" name="business" value={paypalEmail} />

      {/* <!-- Specify a Donate button. --> */}
      <input type="hidden" name="cmd" value="_donations" />

      {/* <!-- Specify details about the contribution --> */}
      <input type="hidden" name="item_name" value="Friends of the Park" />
      <input type="hidden" name="item_number" value="Fall Cleanup Campaign" />
      <input type="hidden" name="currency_code" value="USD" />

      {/* <!-- Display the payment button. --> */}

      <Button type="submit" variant="contained" color="primary" size="large">
        {children}
      </Button>
      {/* <input
        type="image"
        name="submit"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
        alt="Donate"
      />
      <img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" /> */}
    </form>
  );
}
