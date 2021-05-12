import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

const DatatablePage = () => {
  const [formData, setFormData] = React.useState([{}]);
  const [tableRow, setTableRow] = React.useState([{}]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    let data = axios
      .get("http://localhost:8080/")
      .then(async (response) => await setFormData(response.data))
      .then(async (response) => await setTableRow(assemblePosts()));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  const assemblePosts = () => {
    let posts = formData.map((post) => {
      return {
        Day: post.Day,
      };
    });

    return posts;
  };

  const data = {
    columns: [
      {
        label: "Day",
        field: "Day",
        sort: "asc",
        width: 150,
      },
    ],
    rows: tableRow,
  };

  return (
    <>
      {console.log("Body Form Data", formData)}
      {console.log("Body Table Row", tableRow)}
      <MDBDataTable scrollX striped bordered data={data} />
    </>
  );
};

export default DatatablePage;
