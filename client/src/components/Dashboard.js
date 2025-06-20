import { useState, useContext, useEffect } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { DayTheme, DateContext } from "../App";
import { FadeContext } from "./FadeContext";
import MonthToggle from "./MonthToggle";
import FadeWrapper from "./FadeWrapper";
import ScrollToTop from "./ScrollToTop";
import QuickTransactionModal from "./QuickTransactionModal";

const Dashboard = ({ contentHeight, refreshFlag, setRefreshFlag }) => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const [dayTheme] = useContext(DayTheme);
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);
  const [dateState] = useContext(DateContext);

  // useEffect(() => {
  //   setTriggerFadeOut(false);
  // }, []);

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      <ScrollToTop />

      <div
        style={{ minHeight: contentHeight }}
        className={`dash-board p-4 flex items-center flex-column relative
       
        ${dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"}`}
      >
        {userName && (
          <h1
            className={`text-center my-animation text-xl sm:text-4xl ${
              dayTheme ? "text-white text-shadow" : "text-white"
            }`}
          >
            Welcome, {userName}!
          </h1>
        )}

        {/* <QuickTransactionModal /> */}

        <MonthToggle color={"text-white"} />

        <Overview
          mainKey="0"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
          dateState={dateState}
        />

        <SubCategoriesWithTransactions
          name="💸 EXPENSES"
          category="expense"
          backgroundColor={dayTheme ? "day-red" : "night-red"}
          mainKey="1"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
          dateState={dateState}
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
        <br />
        <SubCategoriesWithTransactions
          name="🧾 BILLS"
          category="bills"
          backgroundColor={dayTheme ? "day-orange" : "night-orange"}
          mainKey="2"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
        <br />
        <SubCategoriesWithTransactions
          name="🏦 SAVINGS"
          category="savings"
          backgroundColor={dayTheme ? "day-yellow" : "night-yellow"}
          mainKey="3"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
        <br />
        <SubCategoriesWithTransactions
          name="💰 INCOME"
          category="income"
          backgroundColor={dayTheme ? "day-green" : "night-green"}
          mainKey="4"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
          refreshFlag={refreshFlag}
          setRefreshFlag={setRefreshFlag}
        />
      </div>
    </FadeWrapper>
  );
};

export default Dashboard;
