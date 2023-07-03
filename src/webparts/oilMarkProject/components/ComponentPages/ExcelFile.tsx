import * as React from "react";

function CreditApplication() {
  React.useEffect(() => {
    const URL =
   //"https://forms.office.com/Pages/ResponsePage.aspx?id=2rfcvKgD-E6QZFsYMdyVEtVYD2KGpMZMox-RqA8IucBUNVM2M01TRlQxMEwyTEsyTUgySUREUzVHRy4u";
    "https://forms.office.com/Pages/ResponsePage.aspx?id=K-sQScDDP0mqpEckxlFhbgsec_9ye0VPoqqpMOImbn9UM0RVUFgxU1pSOEczSUVBRFlXVkZNMVIxVC4u";
      window.open(URL);
  });

  return <></>;
}

export default CreditApplication;
