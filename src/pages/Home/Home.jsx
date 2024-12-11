import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineStock } from "react-icons/ai";
import image from "../../assets/notfound.png";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Home({ curr, query }) {
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  const [val, setVal] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true); // Set loading to true when fetch starts

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-9wXcbnfp9P4zkE3CWxMzeE5Y",
        },
      };

      try {
        // Fetch cryptocurrency data
        const cryptoResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
          options
        );
        const cryptoData = await cryptoResponse.json();
        setArr(cryptoData);

        // Fetch exchange rates
        const exchangeResponse = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const exchangeData = await exchangeResponse.json();
        setExchangeRates(exchangeData.rates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchCryptoData();
  }, []);

  const convertPrice = (price) => {
    if (curr === "usd") return price.toFixed(2);
    if (curr === "inr") return (price * (exchangeRates["INR"] || 1)).toFixed(2);
    if (curr === "eur") return (price * (exchangeRates["EUR"] || 1)).toFixed(2);
    return price.toFixed(2); // Default case
  };

  const filteredData = arr.filter((item) => {
    const searchTerm = val || query;
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleBtnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Crypto Insights</h1>
        <p>
          Discover the potential of digital currencies! Dive into various
          cryptocurrencies and boost your financial knowledge.
          <br /> Stay updated on market trends and make informed investment
          decisions with our comprehensive crypto chart.
        </p>
      </div>

      <form className="searchForm" action="" onSubmit={handleBtnSubmit}>
        <input
          type="text"
          value={val}
          placeholder="Search top 100 cryptos..."
          onChange={(e) => setVal(e.target.value)}
        />
        <BsSearch
          onClick={handleBtnSubmit}
          style={{
            backgroundColor: "transparent",
            height: "0.6cm",
            width: "0.8cm",
            padding: "3px",
            borderRadius: "5px",
            color: "white",
          }}
        />
      </form>

      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="cryptotable">
          <div className="tablelayout">
            <p className="rank">Rank</p>
            <p style={{ paddingLeft: "20px" }}>Coin</p>
            <p style={{ textAlign: "center" }}>Price</p>
            <p style={{ textAlign: "end" }}>
              Changes<span style={{ fontSize: "8px", display: "block" }}>(24hr)</span>
            </p>
          </div>
          <div className="cryptolist">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} className="eachlist">
                  <p className="rank">{item.market_cap_rank}</p>
                  <div
                    className="coin-info"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "30px", height: "30px", marginRight: "10px" }}
                    />
                    <p>
                      {item.name} ({item.symbol.toUpperCase()})
                    </p>
                  </div>
                  <p style={{ textAlign: "center" }}>
                    {curr === "usd"
                      ? `$${convertPrice(item.current_price)}`
                      : curr === "inr"
                      ? `₹${convertPrice(item.current_price)}`
                      : curr === "eur"
                      ? `€${convertPrice(item.current_price)}`
                      : `$${convertPrice(item.current_price)}`}
                  </p>
                  <p className="hrchange" style={{ textAlign: "end" }}>
                    {item.price_change_percentage_24h < 0 ? (
                      <>
                        <AiOutlineStock
                          style={{ color: "#FF0305", transform: "scaleX(-1)" }}
                        />
                        <span style={{ color: "#FF0305", display: "block" }}>
                          {item.price_change_percentage_24h.toFixed(4)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <AiOutlineStock style={{ color: "#4DFF07" }} />
                        <span style={{ color: "#4DFF07", display: "block" }}>
                          {item.price_change_percentage_24h.toFixed(4)}%
                        </span>
                      </>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <div className="notfound">
                <img src={image} alt="not found" />
                <h1>Not Found!</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
