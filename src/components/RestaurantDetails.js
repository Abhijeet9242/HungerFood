import React, { useEffect, useState } from "react";
import "./RestaurantDetails.css";

const RestaurantDetails = () => {
  const [data, setData] = useState([]);

  //function for fetch

  const fetchFun = async () => {
    let ans = await fetch(" http://localhost:8000/fooddata");
    let res = await ans.json();
    return res;
  };

  const getData = async () => {
    // let ans = await fetch(" http://localhost:8000/fooddata");
    // let res = await ans.json();
    // console.log(res);
    let res = await fetchFun();
    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSort = async (val) => {
    // let ans = await fetch(" http://localhost:8000/fooddata");
    // let res = await ans.json();

    let res = await fetchFun();
    // console.log(res);
    if (val === "asc") {
      let result = res.sort((a, b) => {
        return a.cost_for_one - b.cost_for_one;
      });
      setData(result);
    } else if (val === "dsc") {
      let result = res.sort((a, b) => {
        return b.cost_for_one - a.cost_for_one;
      });
      setData(result);
    }
  };

  //rating filter

  const handleRating = async (val) => {
    // let ans = await fetch(" http://localhost:8000/fooddata");
    // let res = await ans.json();
    let res = await fetchFun();

    if (val === "3star") {
      let result = res
        .filter((rati) => {
          return rati.rating <= 3.0;
        })
        .sort((a, b) => {
          return b.rating - a.rating;
        });
      setData(result);
    } else if (val === "4star") {
      let result = res
        .filter((rati) => {
          return rati.rating <= 4.0;
        })
        .sort((a, b) => {
          return b.rating - a.rating;
        });
      setData(result);
    } else if (val === "5star") {
      let result = res
        .filter((rati) => {
          return rati.rating <= 5.0;
        })
        .sort((a, b) => {
          return b.rating - a.rating;
        });
      setData(result);
    }
  };

  //payment

  const checkPayment = async (val) => {
    let res = await fetchFun();
    if (val === "card") {
      let result = res.filter((item) => {
        return item.payment_method.card === true;
      });
      setData(result);
    } else if (val === "cash") {
      let result = res.filter((item) => {
        return item.payment_method.cash === true;
      });
      setData(result);
    }
    if (val === "upi") {
      let result = res.filter((item) => {
        return item.payment_method.upi === true;
      });
      setData(result);
    } else if (val === "all") {
      let result = res.filter((item) => {
        return (
          item.payment_method.upi === true &&
          item.payment_method.cash &&
          item.payment_method.card
        );
      });
      setData(result);
    }
  };

  return (
    <>
      <div className="container">
        {/* <h1 className="heading">Hunger Food</h1> */}
        <div className="btndiv">
          <div>
            <h3>sorting by price</h3>
            <button onClick={() => handleSort("asc")}>sort Low to High</button>
            <button onClick={() => handleSort("dsc")}>sort High to Low</button>
          </div>
          <div>
            <h3>rating</h3>
            <button onClick={() => handleRating("3star")}>3 star</button>
            <button onClick={() => handleRating("4star")}>4 star</button>
            <button onClick={() => handleRating("5star")}>5 star</button>
          </div>
          <div>
            <h3>Payment</h3>
            <button onClick={() => checkPayment("card")}>Card</button>
            <button onClick={() => checkPayment("cash")}>Cash</button>
            <button onClick={() => checkPayment("upi")}>upi</button>
            <button onClick={() => checkPayment("all")}>All</button>
          </div>
        </div>

        <div className="rightcont"></div>
        <div className="smallcont">
          {data.map((item, i) => (
            <div key={i} className="box">
              <div className="boximg">
                <img src={item.image} alt="image" />
              </div>

              <div className="boxinfo">
                <div className="desc">
                  <h3 className="resnam">{item.restaurant_name}</h3>
                  <span className="cat">
                    {item.category[0]}, {item.category[1]}, {item.category[2]}
                  </span>
                  <span>
                    <p className="coststl">Cost for One ₹{item.cost_for_one}</p>
                    <p className="coststl">
                      {" "}
                      Cost for Two ₹{item.cost_for_two}
                    </p>
                  </span>

                  <div>
                    Payment Accepted
                    <span>{item.payment_method.card ? " card" : ""}</span>
                    <span>{item.payment_method.cash ? " cash" : ""}</span>
                    <span>{item.payment_method.upi ? " upi" : ""}</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="rati">{item.rating}</span>
                  <h5 className="vot">votes {item.votes}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
