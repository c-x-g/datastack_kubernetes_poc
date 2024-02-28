import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledUL = styled.ul`
  float: right;
  display: flex;
  list-style-type: none;
`;

const StyledLI = styled.li`
  margin-right: 20px;
  border-style: solid;
  border-radius: 25px;
  border-color: green;
  padding: 10px;
  font-weight: bold;
`;

// rendars a navigation bar component with two links:
// the home page and access table
function NavBar() {
  return (
    <div>
      <StyledUL>
        <StyledLI>
          <NavLink to="/">Home</NavLink>
        </StyledLI>
        <StyledLI>
          <NavLink to="/table">Access Table</NavLink>
        </StyledLI>
      </StyledUL>
    </div>
  );
}

export default NavBar;
