import React, { useEffect } from "react";
import "./form.css";
import axios from "axios";
import moment from "moment";
import Auth from "./Auth";
import { withRouter } from "react-router";
import { Button, Modal, Form } from "react-bootstrap";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ModalPage = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Load Data
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" defaultValue={props.Email} />
            <Form.Label>Day</Form.Label>
            <Form.Control type="text" defaultValue={props.Day} />
            <Form.Label>Month</Form.Label>
            <Form.Control type="text" defaultValue={props.Month} />
            <Form.Label>Year</Form.Label>
            <Form.Control type="text" defaultValue={props.Year} />
            <Form.Label>StepFour</Form.Label>
            <Form.Control type="text" defaultValue={props.StepFour} />
            <Form.Label>StepFive</Form.Label>
            <Form.Control type="text" defaultValue={props.StepFive} />
            <Form.Label>StepSix</Form.Label>
            <Form.Control type="text" defaultValue={props.StepSix} />
            <Form.Label>StepSeven</Form.Label>
            <Form.Control type="text" defaultValue={props.StepSeven} />
            <Form.Label>StepEight</Form.Label>
            <Form.Control type="text" defaultValue={props.StepEight} />
            <Form.Label>PLZ</Form.Label>
            <Form.Control type="text" defaultValue={props.PLZ} />
            <Form.Label>ORT</Form.Label>
            <Form.Control type="text" defaultValue={props.ORT} />
            <Form.Label>Straße</Form.Label>
            <Form.Control type="text" defaultValue={props.Straße} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const [input, setInput] = React.useState("");
  const [option, setOption] = React.useState("");

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  useEffect(() => {
    requestSort("Option");
    // GET request using axios inside useEffect React hook
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("createdAt")}
              className={getClassNamesFor("createdAt")}
            >
              Date
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Telefon")}
              className={getClassNamesFor("Telefon")}
            >
              Telefon
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Option")}
              className={getClassNamesFor("Option")}
            >
              Ja/Nein
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("")}
              className={getClassNamesFor("")}
            >
              Show Data
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
            <td>{item.Telefon}</td>
            <td>
              <input
                defaultValue={item.Option}
                type="text"
                onChange={(e) => setOption(e.target.value)}
              ></input>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={async () => {
                  await axios.put(
                    `https://eigenheim-backend.herokuapp.com/zinking/create-form-edit/${item._id}`,
                    { Option: option }
                  );
                  console.log(option);
                }}
              >
                Save
              </button>
            </td>
            <td>
              <ModalPage
                Telefon={item.Telefon}
                Email={item.Email}
                Day={item.Day}
                Month={item.Month}
                Year={item.Year}
                StepFour={item.StepFour}
                StepFive={item.StepFive}
                StepSix={item.StepSix}
                StepSeven={item.StepSeven}
                StepEight={item.StepEight}
                PLZ={item.PLZ}
                ORT={item.ORT}
                PLZ={item.PLZ}
                Straße={item.Straße}
                Nachname={item.Nachname}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const data = async () => {
  return;
};
console.log(data);

export default function FormPhoneNumbers() {
  const [formData, setFormData] = React.useState([{}]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    let data = axios
      .get("https://eigenheim-backend.herokuapp.com/zinking/get-data")
      .then((response) => setFormData(response.data));
    console.log(formData);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Auth>
      <div className="App">
        <h3 style={{ textAlign: "center" }}>Zahnzusatz Phone Number</h3>
        <ProductTable products={formData} />
      </div>
    </Auth>
  );
}
