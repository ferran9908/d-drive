import styled from 'styled-components'

export const StyledTable = styled.table.attrs({
    className: 'w-full overflow-hidden text-black bg-white rounded-lg shadow-lg',
})`
  width: 100%;
  overflow: hidden;
  color: black;
  background: white;
  border-radius: 10px;

  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  tr:nth-child(odd) {
    background-color: rgba(242, 242, 242, 0.5);
    // background-color: #B3CCE9;
  }

  td {
    border-right: 3px solid #fff;
  }

  td:first-child {
    width: 50%;
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
  }
`