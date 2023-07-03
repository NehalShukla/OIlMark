import * as React from "react";
import { useState } from "react";
import { LeftArrowicon, RightArrowicon } from "../assets/icons";
import { colorFF, PrimaryColor } from "../color/color";
import {
  PageIconStyle,
  PageNoStyle,
  PaginationDiv
} from "../Style/ComponentStyled";
import { OutlineBtn } from "./Component";

export const Pagination = ({
  getFunction,
  setCustomData,
  totalLength,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(10);
  const [noOfpages, setNoOfpages] = useState(1);
  const [startIndex, setStateIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(3);
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > noOfpages) rightSide = noOfpages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          setCurrentPage(number);

          getFunction(number, maxPages);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < noOfpages) {
      setCurrentPage(currentPage + 1);
      getFunction(currentPage + 1, maxPages);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getFunction(currentPage + 1, maxPages);
    }
  };

  const setPageNumber = (CustomerData) => {
    setMaxPages(CustomerData);
    getFunction(currentPage, CustomerData);
  };
  const getPaginatedData = (field) => {
    var splicedArray = [];
    const startIndex = currentPage * maxPages - maxPages;
    setStateIndex(startIndex + 1);
    const endIndex = startIndex + maxPages;
    setEndIndex(endIndex);
    const count = Math.ceil(field.length / maxPages);
    setNoOfpages(count);
    for (let index = 0; index < count; index++) {
      var value = field.slice(startIndex, endIndex);
      splicedArray.push(value);
    }
    return splicedArray;
  };

  React.useEffect(() => {
    if (getFunction.length > 0) {
      const data = getPaginatedData(getFunction);
      var pageIndex = currentPage - 1;
      var fieldss = data[pageIndex];
      setCustomData(fieldss);
    }
    else{
      setCustomData([]);
    }
  }, [currentPage, maxPages, getFunction]);
  const paginationRender = (
    <div>
      <PaginationDiv className="df-sb mt10 mr10 paginationwidth">
        <div className=" fw500 f-sz16 colorTtxt">
          Showing {startIndex}-{endIndex} of {totalLength} results
        </div>
        <PageIconStyle className="df g10 mt10 f-sz600">
          <div onClick={prevPage}>
            {" "}
            <OutlineBtn
              onClick={prevPage}
              className="df-c borderRadius8"
              icon={<LeftArrowicon />}
              bg={colorFF}
              color={PrimaryColor}
              padding={"4px 6px"}
              height={"28px"}
            />{" "}
          </div>
          <PageNoStyle className="fw df-ac g15">{items}</PageNoStyle>
          <div onClick={nextPage}>
            <OutlineBtn
              onClick={nextPage}
              className="df-c borderRadius8"
              icon={<RightArrowicon />}
              bg={colorFF}
              color={PrimaryColor}
              padding={"3px 5px"}
              height={"28px"}
            />{" "}
          </div>
        </PageIconStyle>
      </PaginationDiv>
    </div>
  );
  return paginationRender;
};
