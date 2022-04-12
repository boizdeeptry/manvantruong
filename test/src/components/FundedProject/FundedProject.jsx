import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input, Slider } from "antd";
import Cards from "../Cards/Cards";
import Coin from "../Coins/Coin";
import { callApi } from "../api/fundedProjectApi";
import "./fundedproject.css";
import { getBlockTotal } from "../../service/apiTransaction";
const FundedProject = () => {
  const [dataCards, setDataCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [avgBlockTime, setAvgBlockTime] = useState(0)
  const [secondMaxTx, setSecondMaxTx] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [avgEthTransaction, setAvgEthTransaction] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 8,
  });
  const coins = [
    {
      title: "Total transactions:",
      color: "#F0D042",
      number: totalTransactions,
    },
    {
      title: "AVG of block time",
      color: "#31B4D9",
      number: avgBlockTime,
    },
    {
      title: "AVG of ETH/transactions",
      color: "#1F8B24",
      number: `${avgEthTransaction} ETH`,
    },
  ];
  const fetchData = async (filters) => {
    const { data } = await callApi(filters);
    setDataCards(data.data.fundProjects);
    setTotalRecord(data.data.totalRecords);
  };
  
  const fetchTransaction = async () => {
    let a = await getBlockTotal()
    setTotalTransactions(a.totalTransactions)
    setAvgBlockTime(a.avgBlockTime);
    setSecondMaxTx(a.secondMaxArr)
    setAvgEthTransaction(a.avgEth.toFixed(3))
}
 
  const loadMore = async () => {
    setCurrentPage(currentPage + 1);
    const { data } = await callApi({
      ...filters,
      pageSize: 4,
      page: currentPage + 1,
    });
    if (data.statusCode === 1) {
      setDataCards([...dataCards, ...data.data.fundProjects]);
    }
  };

  const handleClear = async () => {
    const clearFilter = {
      page: 1,
      pageSize: 8,
    };
    const { data } = await callApi(clearFilter);
    if (data.statusCode === 1) {
      setDataCards(data.data.fundProjects);
    }
    setFilters(clearFilter);
  };

  const handleFilter = async () => {
    const { data } = await callApi(filters);
    if (data.statusCode === 1) {
      setDataCards(data.data.fundProjects);
    }
  };

  useEffect(() => {
    fetchTransaction();
    fetchData(filters);
  }, [filters]);
  return (
    <section className="fundedproject">
      <div className="container">
        <div className="fundedproject-container">
          <h1 className="fundedproject-heading">
            2nd largest of Transactions:
          </h1>
          <p className="fundedproject-desc">{secondMaxTx} ETH</p>
          <div className="fundedproject-avg">
            {coins.map((e, i) => (
              <Coin key={i} data={e} />
            ))}
          </div>
          <div className="fundedproject-cards">
            <div className="fundedproject-cards-input">
              <Input
                placeholder="Name"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    name: e.target.value.toLowerCase(),
                  });
                }}
              />
              <Input
                placeholder="Symbol"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    symbol: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                placeholder="Status"
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    status: e.target.value,
                  });
                }}
              />
            </div>
            <div className="funded-cards-slider">
              <p>Total Raise:</p>
              <Slider
                range={{ draggableTrack: true }}
                min={100}
                max={200}
                defaultValue={[20, 50]}
                onAfterChange={(e) => {
                  setFilters({
                    ...filters,
                    totalRaise: e,
                  });
                }}
              />
              <p>Personal Allocation:</p>
              <Slider
                range={{ draggableTrack: true }}
                defaultValue={[0, 0.09]}
                onAfterChange={(e) => {
                  setFilters({
                    ...filters,
                    personalAllocation: e,
                  });
                }}
              />
            </div>
            <div className="funded-cards-btn">
              <button
                className="funded-cards-btn-filter"
                onClick={handleFilter}
              >
                Filter
              </button>
              <button className="funded-cards-btn-clear" onClick={handleClear}>
                Clear
              </button>
            </div>
            <InfiniteScroll
              style={{ overflow: "hidden" }}
              dataLength={dataCards.length}
              next={loadMore}
              hasMore={true}
            >
              <div className="row">
                {dataCards.map((e, i) => (
                  <div className="column" key={i}>
                    <Cards data={e} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          <button className="fundedproject-loadmore" onClick={loadMore}>
            See All Funded Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default FundedProject;
