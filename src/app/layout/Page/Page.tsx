import React, {FC, ReactNode} from "react";
import PropTypes from "prop-types";
import { PageContainer } from "./Page.style";
import Appbar from "../Appbar";

type PageProps = {
  appbar?: ReactNode;
  children: ReactNode;
};
const Page: FC<PageProps> = ({ appbar, children, ...rest  }: PageProps) => {
  return (
    <React.Fragment>
      <Appbar>{appbar}</Appbar>
      <PageContainer role="main" {...rest}>
        {children}
      </PageContainer>
    </React.Fragment>
  );
};

export default Page;
