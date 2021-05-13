import React, { useEffect } from "react";
import "./form.css";
import axios from "axios";
import moment from "moment";
import Auth from "./Auth";

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
              onClick={() => requestSort("Day")}
              className={getClassNamesFor("Day")}
            >
              Day
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Month")}
              className={getClassNamesFor("Month")}
            >
              Month
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Year")}
              className={getClassNamesFor("Year")}
            >
              Year
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
              onClick={() => requestSort("StepFour")}
              className={getClassNamesFor("StepFour")}
            >
              StepFour
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepFive")}
              className={getClassNamesFor("StepFive")}
            >
              StepFive
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepSix")}
              className={getClassNamesFor("StepSix")}
            >
              StepSix
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepSeven")}
              className={getClassNamesFor("StepSeven")}
            >
              StepSeven
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("StepEight")}
              className={getClassNamesFor("StepEight")}
            >
              StepEight
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
            <button
              type="button"
              onClick={() => requestSort("ORT")}
              className={getClassNamesFor("ORT")}
            >
              ORT
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Straße")}
              className={getClassNamesFor("Straße")}
            >
              Straße
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
              onClick={() => requestSort("Telefon")}
              className={getClassNamesFor("Telefon")}
            >
              Telefon
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
            <td>{item.Day}</td>
            <td>{item.Month}</td>
            <td>{item.Year}</td>
            <td>{item.Email}</td>
            <td>{item.StepFour}</td>
            <td>{item.StepFive}</td>
            <td>{item.StepSix}</td>
            <td>{item.StepSeven}</td>
            <td>{item.StepEight}</td>
            <td>{item.PLZ}</td>
            <td>{item.ORT}</td>
            <td>{item.Straße}</td>
            <td>{item.Nachname}</td>
            <td>{item.Telefon}</td>

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
                    `https://new-backend-api.herokuapp.com/zinking/create-form-edit/${item._id}`,
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
                    `https://new-backend-api.herokuapp.com/zinking/create-form-edit/${item._id}`,
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
      .get("https://new-backend-api.herokuapp.com/zinking/get-data")
      .then((response) => setFormData(response.data));
    console.log(formData);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Auth>
      <div className="App">
        <h3 style={{ textAlign: "center" }}>Zahnzusatz</h3>
        <ProductTable products={formData} />
      </div>
    </Auth>
  );
}
