import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setList(res.data))
      .catch((error) => setError(error.message));
  }, [optionType]);

  const ListComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const optionItems =
    list &&
    list.map((item) => (
      <ListComponent key={item.name} name={item.name} image={item.imagePath} />
    ));

  return (
    <>
      <div className="options__wrapper">
        <h2>{optionType}</h2>
        {error && <AlertBanner message={error} />}
        {!error && list && (
          <>
            <h4>$2.00 each</h4>
            <h4>{`${optionType} total: $amount`}</h4>
            <div className="list_wrapper">
              <ul>{optionItems}</ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
