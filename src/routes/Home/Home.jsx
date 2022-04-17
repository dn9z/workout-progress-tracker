import './Home.scss'
import { useRef, useState } from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import importedData from "../../mockdata";
import { Outlet } from "react-router-dom";

const Home = () => {
  const data = useRef(importedData);
  const [showForm, setShowForm] = useState(true);

  return (
    <>
      <div className="home-left">
        <List />
      </div>
      <div className="home-right">
          <div className="primary-tiles">Overview</div>
          <div className="secondary-tiles">
            <div className="tile">Item1</div>
            <div className="tile">Item2</div>
            <div className="tile">Item3</div>
            <div className="tile">Item4</div>
          </div>
      </div>

      {/* <Form/> */}
    </>
  );
};

export default Home;
