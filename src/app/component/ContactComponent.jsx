import React from "react";
import PropTypes from "prop-types";
import { useOrganization } from "../model";

/**
 * Contact component - email or phone link depending
 */
const ContactComponent = ({ prefix }) => {
  const org = useOrganization();
  console.log(org);
  if (org?.contactPhoneNumber) {
    return (
      <span>
        {prefix}
        <a href={`tel:${org?.contactPhoneNumber}`}>{org?.contactPhoneNumber}</a>
      </span>
    );
  }
  if (org?.contactEmail) {
    return (
      <span>
        {prefix}
        <a href={`mailto:${org?.contactEmail}`}>{org?.contactEmail}</a>
      </span>
    );
  }
};

ContactComponent.propTypes = {
  prefix: PropTypes.string,
};

export default ContactComponent;
