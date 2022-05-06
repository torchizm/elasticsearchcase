import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import "./styles/theme.css";
import { debounce } from "lodash";
import IconInput from "./components/IconInput";

import { FaSearch, FaTrash } from "react-icons/fa";
import api from "./helpers/api";
import { UserObject, BooleanResponse } from "elasticsearchcase";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import DropDown from "./components/DropDown";
import {
  DropDownItems,
  OrderTypeItems,
  SearchFields,
} from "./helpers/dropDownItems";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<string>(
    "location.timezone.description"
  );
  const [order, setOrder] = useState<string>("_score");
  const [orderType, setOrderType] = useState<string>("desc");
  const [items, setItems] = useState<UserObject[]>([]);

  useEffect(() => {
    fetch();
  }, [query, order, orderType, searchField]);

  const fetch = () => {
    api
      .get(
        `/search?query=${query}&order=${order}&orderType=${orderType}&searchField=${searchField}`
      )
      .then((res) => {
        setItems(res.data.hits.hits);
      })
      .catch((err) => console.log(err));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const handleAddNew = () => {
    api
      .get<BooleanResponse>("/push")
      .then((res) => {
        if (res.data.success) {
          fetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e: MouseEvent<HTMLDivElement>, id: string) => {
    api.delete<BooleanResponse>(`/delete/${id}`).then((res) => {
      if (res.data.success) {
        // TODO REMOVE ITEM FROM DOM
      }
    });
  };

  const handleChangeSort = (selectedItem: string) => {
    setOrder(selectedItem);
  };

  const handleSetOrderType = (orderType: string) => {
    setOrderType(orderType);
  };

  const handleSetSearchField = (searchField: string) => {
    setSearchField(searchField);
  };

  return (
    <div className="App">
      <div className="interaction">
        <DropDown
          onChange={handleSetSearchField}
          items={SearchFields}
          style={{ flex: "1 0 10%", fontSize: "1rem" }}
        />
        <IconInput
          style={{ borderRadius: "4px", flex: "1 0 10%" }}
          icon={<FaSearch />}
          onChange={debouncedChangeHandler}
          placeholder="female"
        />
        <Button onClick={handleAddNew}>Yeni Kişi Ekle</Button>
      </div>
      <div className="interaction">
        <DropDown
          onChange={handleChangeSort}
          items={DropDownItems}
          style={{ flex: "1 0 70%" }}
        />
        <DropDown onChange={handleSetOrderType} items={OrderTypeItems} />
      </div>

      {items.map((item, index) => {
        return (
          <div key={index} className="user">
            <div className="field">
              <img
                loading="lazy"
                src={item._source.picture.medium}
                alt="profile"
              />
              <div>
                <div className="name-fields">
                  <span>{item._source.location.timezone.description}</span>
                </div>
                <div className="name-fields">
                  <span>{item._source.name.title}</span>
                  <span>{item._source.name.first}</span>
                  <span>{item._source.name.last}</span>
                </div>
                <div className="name-fields">
                  <span>{item._source.gender}</span>
                  <span>{item._source.login.username}</span>
                </div>
                <div className="name-fields">
                  <span>{item._source.phone}</span>
                </div>
                <div className="dates">
                  <span>Birth: {item._source.registered.date}</span>
                  <span>Register: {item._source.dob.date}</span>
                </div>
              </div>
              <div className="score">
                <span>Eşleşme Skoru: {item._score}</span>
                <IconButton
                  style={{ backgroundColor: "var(--sunset-orange)" }}
                  size="8px"
                  onClick={(e) => handleDelete(e, item._id)}
                  icon={<FaTrash size={8} />}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
