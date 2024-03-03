import { useState } from "react";
import styled from "styled-components";
import "./component.css";

// example of a styled component
const CMDiv = styled.div`
  margin-left: 50%;
  font-weight: bold;
`;

type ContainerMetadata = {
  pod_id: String;
  node: String;
  namespace: String;
  ip_address: String;
  service_account: String;
};

let containerMetadata: ContainerMetadata | undefined = undefined;

async function createContainerMetadata() {
  const response = await fetch("/container", {
    method: "POST",
  });
  containerMetadata = await response.json();
}

function CallAPI() {
  // initialize a variable loadData to false, set it to true if the button below is clicked
  // if loadData is true, display container metadata, otherwise show nothing
  const [loadData, setLoadData] = useState(false);
  return (
    <div>
      <button
        onClick={async () => {
          await createContainerMetadata();
          setLoadData(true);
        }}
      >
        Call API Pod
      </button>
      {loadData ? (
        <CMDiv>
          <header>Container Metadata</header>
          <p>
            Pod id: {containerMetadata?.pod_id}
            <br />
            Node: {containerMetadata?.node}
            <br />
            Namespace: {containerMetadata?.namespace}
            <br />
            IP Address: {containerMetadata?.ip_address}
            <br />
            Service Account: {containerMetadata?.service_account}
            <br />
          </p>
        </CMDiv>
      ) : (
        ""
      )}
    </div>
  );
}

export default CallAPI;
