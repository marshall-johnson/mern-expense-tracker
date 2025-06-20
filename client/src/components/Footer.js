import React, { useContext } from "react";
import { DayTheme } from "../App";

const Footer = ({ ref }) => {
  const [dayTheme] = useContext(DayTheme);

  return (
    <footer
      id="footer"
      ref={ref}
      className={`footer ${
        dayTheme ? "day-footer" : "night-footer"
      } py-4 px-2 mt-10 shadow-inner`}
    >
      <div className=" mx-auto text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className={`link ${
            dayTheme ? "day-footer-link" : "night-footer-link"
          }`}
          href="https://github.com/marshall-johnson/"
          target="_blank"
          rel="noreferrer"
        >
          Marshall Johnson
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
