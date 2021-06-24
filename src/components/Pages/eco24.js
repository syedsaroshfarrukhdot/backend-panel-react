import React, { useEffect } from "react";
import "../form.css";
import axios from "axios";
import moment from "moment";
import Auth from "../Auth";

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
    let direction = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
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
    requestSort("createdAt");
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
              onClick={() => requestSort("Nachname")}
              className={getClassNamesFor("Nachname")}
            >
              Nachname
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Vorname")}
              className={getClassNamesFor("Vorname")}
            >
              Vorname
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("DateOfBirth")}
              className={getClassNamesFor("DateOfBirth")}
            >
              DOB
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Email")}
              className={getClassNamesFor("Email")}
            >
              Email
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Telefonnummer")}
              className={getClassNamesFor("Telefonnummer")}
            >
              Telefonnummer
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepOne")}
              className={getClassNamesFor("StepOne")}
            >
              StepOne
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepTwo")}
              className={getClassNamesFor("StepTwo")}
            >
              StepTwo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepThree")}
              className={getClassNamesFor("StepThree")}
            >
              StepThree
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepFour")}
              className={getClassNamesFor("StepFour")}
            >
              StepFour
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Postleitahl")}
              className={getClassNamesFor("Postleitahl")}
            >
              Postleitahl
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Strabe")}
              className={getClassNamesFor("Strabe")}
            >
              Strabe
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("PLZ")}
              className={getClassNamesFor("PLZ")}
            >
              PLZ
            </button>
          </th>
          <th>
            <button type="button">Verlauf</button>
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
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
            <td>{item.Nachname}</td>
            <td>{item.Vorname}</td>
            <td>{item.DateOfBirth}</td>
            <td>{item.Email}</td>
            <td>{item.Telefonnummer}</td>
            <td>{item.StepOne}</td>
            <td>{item.StepTwo}</td>
            <td>{item.StepThree}</td>
            <td>{item.StepFour}</td>
            <td>{item.Postleitahl}</td>
            <td>{item.Strabe}</td>
            <td>{item.PLZ}</td>

            <td>
              <input
                defaultValue={item.Note}
                type="text"
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={async () => {
                  await axios.put(
                    `https://eigenheim-backend.herokuapp.com/eco24/create-form-edit/${item._id}`,
                    { Note: input }
                  );
                  console.log(input);
                }}
              >
                Save
              </button>
            </td>
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
                    `https://eigenheim-backend.herokuapp.com/eco24/create-form-edit/${item._id}`,
                    { Option: option }
                  );
                  console.log(option);
                }}
              >
                Save
              </button>
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

export default function Form() {
  const [formData, setFormData] = React.useState([{}]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    let data = axios
      .get("https://eigenheim-backend.herokuapp.com/eco24")
      .then((response) => setFormData(response.data));
    console.log(formData);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Auth>
      <div className="App">
        <h3 style={{ textAlign: "center" }}>Eco24</h3>
        <ProductTable products={formData} />
      </div>
    </Auth>
  );
}
