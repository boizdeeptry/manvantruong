import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../Cards/Cards";
import Coin from "../Coins/Coin";
import axios from "axios";
import "./fundedproject.css";
const FundedProject = () => {
  const [dataCards, setDataCards] = useState([]);
  const [visible, setVisible] = useState(8);
  const coins = [
    {
      title: "Total transactions:",
      color: "#F0D042",
      number: 79,
    },
    {
      title: "AVG of block time",
      color: "#31B4D9",
      number: 19.455,
    },
    {
      title: "AVG of ETH/transactions",
      color: "#1F8B24",
      number: "1.10 ETH",
    },
  ];
  // const fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     this.setDataCards({
  //       items: dataCards.concat(Array.from({ length: 8 })),
  //     });
  //   }, 1500);
  // };

  const showMoreItems = () => {
    setVisible((pre) => pre + 8);
  };
  const callApi = async () => {
    const response = await axios.post(
      `http://139.99.62.190:8000/api/v1/fund_projects/filter`,
      {
        page: 1,
        pageSize: 20,
        symbol: "",
        name: "",
        status: "SOLD_OUT",
        totalRaise: [100, 200],
        "personal Allocation": [0.07, 0.08],
      }
    );
    const data = response.data.data.fundProjects;
    console.log(data);
    setDataCards(data);
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <section className="fundedproject">
      <div className="container">
        <div className="fundedproject-container">
          <h1 className="fundedproject-heading">
            2nd largest of Transactions:
          </h1>
          <p className="fundedproject-desc">1.10 ETH</p>
          <div className="fundedproject-avg">
            {coins.map((e, i) => (
              <Coin key={i} data={e} />
            ))}
          </div>
          <div className="fundedproject-cards">
            {/* <div className="fundedproject-filters">
              <input
                type="text"
                placeholder="Search your Funded... "
                className="fundedproject-filter"
              />
              <span className="fundedproject-filter__icon">
                <ion-icon name="search"></ion-icon>
              </span>
            </div> */}
            {/* <InfiniteScroll
              dataLength={dataCards.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            > */}
            <div className="row">
              {dataCards.slice(0, visible).map((e, i) => (
                <div className="column" key={i}>
                  <Cards data={e} />
                </div>
              ))}
            </div>
            {/* </InfiniteScroll> */}
          </div>
          <button className="fundedproject-loadmore" onClick={showMoreItems}>
            See All Funded Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default FundedProject;
