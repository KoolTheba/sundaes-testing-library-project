import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import ScoopOptions from "./ScoopOptions";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

// constants
import { pricePerItem } from "../../constants";

// utility
import { formatCurrency } from "../../utilities";

// custom hook
import { useOrderDetails } from "../../context/OrderDetails";

export default function Options({ optionType }) {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setList(res.data))
      .catch((error) => setError(error.message));
  }, [optionType]);

  const ListComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems =
    list &&
    list.map((item) => (
      <ListComponent key={item.name} name={item.name} image={item.imagePath} />
    ));

  return (
    <>
      <div className="options__wrapper">
        <h2 className="option-type__heading">{optionType}</h2>
        {error && <AlertBanner message={error} />}
        <>
          <h2>{title}</h2>
          <span>{formatCurrency(pricePerItem[optionType])} each</span>
          <span>
            {title} total: {formatCurrency(totals[optionType])}
          </span>
          <div className="list_wrapper">
            <ul>{optionItems}</ul>
          </div>
        </>
      </div>
    </>
  );
}
