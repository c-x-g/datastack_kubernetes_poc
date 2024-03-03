import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledUL = styled.ul`
  float: right;
  display: flex;
  list-style-type: none;
  margin-top: 3vh;
`;

const StyledLI = styled.li`
  margin-right: 20px;
  border-style: solid;
  border-radius: 25px;
  border-color: green;
  text-decoration: none;
  height: 50px;
  width: 200px;
  text-align: center;
  background-color: blue;
  padding: 0;
`;

const StyledHeader = styled.h1`
  background-color: #00bfff;
  height: 10vh;
  margin: 0;
`;

const NavLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "white",
  fontFamily: "sans-serif",
  fontWeight: "normal",
  fontSize: "85%",
  position: "relative", // this appears to be a default property, deleting it here won't change the layout
};

// rendars a navigation bar component with two links:
// the home page and access table
function NavBar() {
  return (
    <StyledHeader>
      <div>
        <StyledUL>
          <StyledLI>
            <NavLink style={NavLinkStyle} to="/">
              Home
            </NavLink>
          </StyledLI>
          <StyledLI>
            <NavLink style={NavLinkStyle} to="/table">
              Access Table
            </NavLink>
          </StyledLI>
        </StyledUL>
      </div>
    </StyledHeader>
  );
}

export default NavBar;
