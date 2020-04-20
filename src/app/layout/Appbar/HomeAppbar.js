import React from "react";
import { Link } from "react-router-dom";
import { AppbarContainer, AppbarDefault, LogoContainer } from "../../layout/Appbar/Appbar.style";
import { ReactComponent as Logo } from "../../../img/logo.svg";
import { StyledLink } from "./Home.style";

const HomeAppbar = (props) => {
    return (
        <AppbarContainer role="navigation">
            <AppbarDefault>
                <LogoContainer>
                    <Link to="/" aria-label="Go to home">
                        <Logo title="MutualAidLogo" role="img" />
                    </Link>
                </LogoContainer>
                <StyledLink to="/">About Resilience App</StyledLink>
            </AppbarDefault>
        </AppbarContainer>
    );
}

export default HomeAppbar;
