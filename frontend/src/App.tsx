import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import "./styles/theme.css";
import { debounce } from "lodash";
import IconInput from "./components/IconInput";

import { FaSearch } from "react-icons/fa";
import api from "./helpers/api";
import { ArticleObject } from "elasticsearchcase";

function App() {
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<ArticleObject[]>([]);

  useEffect(() => {
    fetch();
  }, [query]);

  const fetch = () => {
    api
      .get(`/search?query=${query}`)
      .then((res) => {
        setItems(res.data.hits.hits);
      })
      .catch((err) => console.log(err));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div className="App">
      <div className="interaction">
        <IconInput
          style={{ borderRadius: "4px", flex: "1 0 10%" }}
          icon={<FaSearch />}
          onChange={debouncedChangeHandler}
          placeholder="I do think that, in some sectors for sure, the tech community needs to grow up."
        />
      </div>

      {items.map((item, index) => {
        return (
          <div key={index} className="user">
            <div className="field">
              <div>
                <div className="author-field">
                  <span>Author: {item._source.author} </span>
                </div>
                <div className="dates">
                  <span>Published: {item._source.crawled_at}</span>
                  <span>Okuma süresi: {item._source.reading_time}</span>
                </div>
                <div className="title-field">
                  <span>{item._source.title}</span>
                </div>
                <div className="name-fields">{item._source.description}</div>
              </div>
              <div className="score">
                <span>Eşleşme Skoru: {item._score}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
