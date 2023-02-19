import styled from "styled-components";
import sliderIcon from "../assets/slider-icon.inline.svg";
import sectionIcon from "../assets/section-icon.inline.svg";
import editIcon from "../assets/edit-icon.inline.svg";

export const SliderIconStyled = styled(sliderIcon)`
  cursor: ew-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto -4.5px;
`

export const SectionIconStyled = styled(sectionIcon)`
  cursor: pointer;
  width: 26px;
  height: 26px;
  background: ${props => props.checked ? "#ECEDF4" : "none"};
  padding: 4px;
  border-radius: 8px;
  
  &:hover {
    background: #ECEDF4;
  }
  
`

export const EditIconStyled = styled(editIcon)`
  cursor: pointer;
  flex: none;
  
  width: 20px;
  height: 20px;
  
`