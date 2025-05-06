import { Accordion } from "react-bootstrap";
import { TransactionsTotal, DayTheme } from "../App";
import PieChart from "./PieChart";
import { useRef, useEffect, useContext, useState } from "react";
import { formattedCurrency } from "./FormattedCurrency";
import MonthToggle from "./MonthToggle";
import ProgressBarComponent from "./ProgressBarComponent";

const Overview = ({
  mainKey,
  mainAccordionKey,
  setMainAccordionKey,
  currentMonthIndex,
}) => {
  const [total] = useContext(TransactionsTotal);
  const isOpen = mainAccordionKey === mainKey;
  const mainAccordionRef = useRef(null);
  const [dayTheme] = useContext(DayTheme);
  const [cashflow, setCashflow] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const myRefMain = useRef(null);

  const executeScroll = () => {
    setTimeout(() => {
      // console.log("Scroll");

      myRefMain.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }, "200");
  };

  useEffect(() => {
    if (total) {
      const expenses =
        (total.billsSpent || 0) +
        (total.savingsSpent || 0) +
        (total.expenseSpent || 0);
      const income = total.incomeSpent || 0;
      const budget =
        (total.billsBudget || 0) +
        (total.savingsBudget || 0) +
        (total.expenseBudget || 0);

      setTotalExpenses(expenses);
      setCashflow(income - expenses);
      setTotalIncome(income);
      setTotalBudget(budget);
    }
  }, [total, currentMonthIndex]);

  return (
    <div
      className={` max-w-[1400px]  w-full  m-4 p-3  sm:p-4 rounded my-animation ${
        dayTheme ? "overview-category-card-day" : "overview-category-card-night"
      }`}
    >
      <Accordion
        onClick={executeScroll}
        className="accordion-day"
        activeKey={isOpen ? "main" : null}
        onSelect={() => setMainAccordionKey(isOpen ? null : mainKey)}
      >
        <Accordion.Item
          eventKey="main"
          ref={mainAccordionRef}
          className={`my-animation ${
            dayTheme ? "overview-item-day" : "overview-item-night"
          }`}
        >
          <Accordion.Header
            className={`my-animation ${
              dayTheme
                ? "accordion-header-day-overview"
                : "accordion-header-night-overview"
            }`}
          >
            <div className="w-100">
              <div
                className={`flex flex-col mb-2  items-center w-full my-animation ${
                  dayTheme ? "day-text" : "text-white"
                }`}
              >
                <h2 className="text-center sm:text-4xl text-2xl font-bold text-shadow sm:m-4 m-2 ">
                  💼 MONTHLY OVERVIEW
                </h2>
                <div className="my-animation sm:text-center text-left flex  flex-col sm:flex-row justify-evenly items-start sm:items-center w-full gap-2 sm:gap-4 lg:text-xl xs:text-sm">
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">💸</span> Total Expenses:
                    <br />
                    <span className="ml-12 sm:ml-0">
                      {formattedCurrency(totalExpenses)}
                    </span>
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">📊</span> Total Spending Budget:
                    <br />
                    <span className="ml-12 sm:ml-0">
                      {formattedCurrency(totalBudget)}
                    </span>
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">💰</span> Total Income:
                    <br />
                    <span className="ml-12 sm:ml-0">
                      {formattedCurrency(totalIncome)}
                    </span>
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="my-animation text-3xl">💵</span> Cashflow:
                    <br />
                    <span
                      className={`${cashflow < 0 && "pulse"} my-animation ${
                        cashflow > 0
                          ? dayTheme
                            ? "day-text"
                            : "text-white"
                          : "text-red-500"
                      }
                      `}
                    >
                      <span className="ml-12 sm:ml-0">
                        {formattedCurrency(cashflow)}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <ProgressBarComponent whole={totalBudget} part={totalExpenses} />
            </div>
          </Accordion.Header>

          <Accordion.Body
            ref={myRefMain}
            className={`my-animation ${
              dayTheme
                ? "overview-accordion-body-day"
                : "overview-accordion-body-night"
            }`}
          >
            <MonthToggle color={`${dayTheme ? "day-text" : "text-white"}`} />
            <>
              <div className="p-4  rounded shadow-md flex justify-center flex-col items-center">
                {totalExpenses > 0 ? (
                  <PieChart totals={total} />
                ) : (
                  <p
                    className={`${
                      dayTheme ? "day-text" : "text-white"
                    } text-center my-animation`}
                  >
                    No Data for Chart
                  </p>
                )}

                {/* <GetMonthlyCashFlows /> */}
              </div>
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Overview;
