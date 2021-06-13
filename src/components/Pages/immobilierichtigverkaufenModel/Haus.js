import React, { useEffect } from "react";
import "../../form.css";
import axios from "axios";
import moment from "moment";
import Auth from "../../Auth";

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
              onClick={() => requestSort("FirstName")}
              className={getClassNamesFor("FirstName")}
            >
              Nachname
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("SurName")}
              className={getClassNamesFor("SurName")}
            >
              Vorname
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Gender")}
              className={getClassNamesFor("Gender")}
            >
              Gender
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
              onClick={() => requestSort("PhoneNumber")}
              className={getClassNamesFor("PhoneNumber")}
            >
              Phone
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("PropertyType")}
              className={getClassNamesFor("PropertyType")}
            >
              Property Type
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("PostalCode")}
              className={getClassNamesFor("PostalCode")}
            >
              Postal Code
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("SellYourProperty")}
              className={getClassNamesFor("SellYourProperty")}
            >
              Sell Your Property
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("Area")}
              className={getClassNamesFor("Area")}
            >
              Area
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("TypeOfHouse")}
              className={getClassNamesFor("TypeOfHouse")}
            >
              Type Of House
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("houseFloors")}
              className={getClassNamesFor("houseFloors")}
            >
              House Floors
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("houseBuiltYear")}
              className={getClassNamesFor("houseBuiltYear")}
            >
              House Built Year
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("houseRooms")}
              className={getClassNamesFor("houseRooms")}
            >
              House Rooms
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("livingSpaceOfHouse")}
              className={getClassNamesFor("livingSpaceOfHouse")}
            >
              Living Space Of House
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("parkingOptions")}
              className={getClassNamesFor("parkingOptions")}
            >
              Parking Options
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
            <td>{item.FirstName}</td>
            <td>{item.SurName}</td>
            <td>{item.Gender}</td>
            <td>{item.Email}</td>
            <td>{item.PhoneNumber}</td>
            <td>{item.PropertyType}</td>
            <td>{item.PostalCode}</td>
            <td>{item.SellYourProperty}</td>
            <td>{item.TypeOfHouse}</td>
            <td>{item.houseFloors}</td>
            <td>{item.houseBuiltYear}</td>
            <td>{item.houseRooms}</td>
            <td>{item.livingSpaceOfHouse}</td>
            <td>{item.parkingOptions}</td>

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
                    `https://eigenheim-backend.herokuapp.com/haus/create-form-edit/${item._id}`,
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
                    `https://eigenheim-backend.herokuapp.com/haus/create-form-edit/${item._id}`,
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
      .get("https://eigenheim-backend.herokuapp.com/haus")
      .then((response) => setFormData(response.data));
    console.log(formData);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Auth>
      <div className="App">
        <h3 style={{ textAlign: "center" }}>Haus</h3>
        <ProductTable products={formData} />
      </div>
    </Auth>
  );
}
