import { useState, useEffect } from "react";
import styled from "styled-components";
import "./component.css";

// a styled div component
const CMTable = styled.table`
  margin: auto;
  width: 50%;
  padding-top: 40px;
  font-weight: bold;
`;

const StyledP = styled.p`
  margin-top: 5%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

type CMRowData = {
  pod_id: String;
  node: String;
  namespace: String;
  ip_address: String;
  service_account: String;
  timestamp: String;
};

let cmTableObj: JSX.Element[] = [];
let isLoading = false;

let errorMsg: String = "Could not load Access Table";

// dynamically create a table of all of the API calls
// to get container metadata
async function getContainerMetadata(): Promise<boolean> {
  isLoading = true;
  try {
    const response = await fetch("/container");
    let cmArr = await response.json();

    // array needs to be emptied, otherwise duplicate entries
    // will be shown if the page is loaded multiple times
    cmTableObj = [];

    // reverse the array to show latest time accessed entries first
    cmArr?.reverse().forEach((cm_table_row: CMRowData) => {
      let { pod_id, node, namespace, ip_address, service_account, timestamp } =
        cm_table_row;
      let dateArr = timestamp.split("T");

      let ymd = dateArr[0].split("-");
      let time = dateArr[1].substring(0, dateArr[1].indexOf("."));

      let year = ymd[0];
      let month = ymd[1];
      let date = ymd[2];

      let fmtTime = `${time} ${month} ${date} ${year}`;

      cmTableObj.push(
        <tr>
          <td>{pod_id}</td>
          <td>{node}</td>
          <td>{namespace}</td>
          <td>{ip_address}</td>
          <td>{service_account}</td>
          <td>{fmtTime}</td>
        </tr>,
      );
    });
    isLoading = false;
    return true;
  } catch (e: unknown) {
    let error: String = "";
    if (e instanceof Error) {
      error = e.message;
    } else if (e instanceof String) {
      error = e;
    }
    errorMsg = `Could not load Access Table ${error === "" ? "" : `: ${error}`}`;
    isLoading = false;
    return false;
  }
}

function CallTable() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getDataAndSetLoading = async () => {
      let succeeded: boolean = await getContainerMetadata();
      if (succeeded) setLoaded(true);
    };
    getDataAndSetLoading();
  });

  return (
    <div>
      {isLoading ? (
        <StyledP>Loading...</StyledP>
      ) : loaded ? (
        <CMTable>
          <tr>
            <th>Pod Id</th>
            <th>Node</th>
            <th>Namespace</th>
            <th>IP Address</th>
            <th>Service Account</th>
            <th>Time Accessed</th>
          </tr>
          {cmTableObj}
        </CMTable>
      ) : (
        <StyledP>{errorMsg}</StyledP>
      )}
    </div>
  );
}
export default CallTable;
