import React, { useEffect, useState, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const InputText = ({ label, value, handlerFunc }) => {
  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tickHandler = () => {
    handlerFunc(inputValue);
    setFocus(false);
  };

  const crossHandler = () => {
    setInputValue(value);
    setFocus(false);
  };

  return (
    <div
      ref={inputRef}
      className={`flex ${isTab ? "flex-row" : "flex-col"} space-x-1 ${
        isTab ? "items-center" : "items-start"
      }`}
    >
      <p className="font-bold text-gray-600">{label}</p>
      <div
        className={`flex ${
          !focus ? "hover:border-2 hover:rounded-md" : ""
        } py-1 px-2 space-x-1`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          id={label}
          ref={inputRef}
          {...(focus ? { autoFocus: true } : {})}
          className={`py-1 px-2 focus:shadow-outline-blue`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={(e) => setFocus(true)}
        />
        {!focus && hover && (
          <div className="flex items-center">
            <MdModeEdit />
          </div>
        )}
        {focus && (
          <div className="flex items-center space-x-2">
            <TiTick
              className="border-2 rounded-3xl bg-blue-400 text-white items-center cursor-pointer"
              onClick={tickHandler}
            />
            <RxCrossCircled
              className="cursor-pointer"
              onClick={crossHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputText;
