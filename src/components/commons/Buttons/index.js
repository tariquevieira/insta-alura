import styled, { css } from 'styled-components';
import get from 'lodash/get';

const ButtonGhost = css`
  color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.color`);
  }};
  background: transparent;
`;
const ButtonDefault = css`
  color: white;
  background-color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.color`);
  }};
  color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.contrastText`);
  }};
`;

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: ${(props) => props.theme.transition};
  ${function (props) {
    if (props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault;
  }}
  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;
