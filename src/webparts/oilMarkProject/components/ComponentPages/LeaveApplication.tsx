// import * as React from "react";
// import { GrayAB, PrimaryColor } from "../color/color";
// import {
//   ButtonStyle,
//   LeaveHeader,
//   MainLeaveDiv,
// } from "../Style/ComponentStyled";
// import {
//   Header,
//   Input,
//   InputBtn,
//   InputDropDownLeave,
//   NoOfDays,
//   TextArea,
// } from "./Component";
// import {
//   SPHttpClient,
//   SPHttpClientResponse,
//   ISPHttpClientOptions,
// } from "@microsoft/sp-http";
// import dateFormat from "dateformat";
// import { toast } from "react-toastify";
// import * as moment from "moment";
// export const LeaveApplication = (props) => {
  // const [application, setApplication] = React.useState({
  //   ApplicantName: "",
  //   LeaveFrom: "",
  //   LeaveTo: "",
  //   Reason: "",
  //   TodayDate: "",
  //   Type: "Sick Leave",
  //   WorkingDaysNo: null,
  // });
  // const Data = [
  //   {
  //     key: 1,
  //     Typename: "Sick Leave",
  //   },
  //   {
  //     key: 2,
  //     Typename: "Annual leave",
  //   },
  //   {
  //     key: 3,
  //     Typename: "Half Day",
  //   },
  //   {
  //     key: 4,
  //     Typename: "Others",
  //   },
  // ];
  // const TodayDate1 = () => {
  //   let TodayVar = dateFormat(new Date(), "dd-mm-yyyy");
  //   setApplication({ ...application, TodayDate: TodayVar });
  // };
  // React.useEffect(() => {
  //   TodayDate1();
  // }, [application.TodayDate]);
  // var calculateBusinessDays = (z: any, e: any) => {
  //   //Initiallize variables
    
  //   var day1 = moment(z);
  //   var day2 = moment(e);
  //   var adjust = 0;

  //   // if (day1.dayOfYear() === day2.dayOfYear() && day1.year() === day2.year()) {
  //   //   return 0;
  //   // }

  //   //Check if second date is before first date to switch
  //   if (day2.isBefore(day1)) {
  //     day2 = moment(z);
  //     day1 = moment(e);
  //   }

  //   //Check if first date starts on weekends
  //   if (day1.day() === 6) {
  //     //Saturday
  //     //Move date to next week monday
  //     day1.day(8);
  //   } else if (day1.day() === 0) {
  //     //Sunday
  //     //Move date to current week monday
  //     day1.day(1);
  //   }

  //   //Check if second date starts on weekends
  //   if (day2.day() === 6) {
  //     //Saturday
  //     //Move date to current week friday
  //     day2.day(5);
  //   } else if (day2.day() === 0) {
  //     //Sunday
  //     //Move date to previous week friday
  //     day2.day(-2);
  //   }

  //   var day1Week = day1.week();
  //   var day2Week = day2.week();

  //   //Check if two dates are in different week of the year
  //   if (day1Week !== day2Week) {
  //     //Check if second date's year is different from first date's year
  //     if (day2Week < day1Week) {
  //       day2Week += day1Week;
  //     }
  //     //Calculate adjust value to be substracted from difference between two dates
  //     adjust = -2 * (day2Week - day1Week);
  //   }
  //   var WorkingdaysLeave = day2.diff(day1, "days") + adjust + 1;
  //   if (WorkingdaysLeave < 1) {
  //     WorkingdaysLeave = 0;
  //   }
  //   setApplication({
  //     ...application,
  //     WorkingDaysNo: WorkingdaysLeave,
  //     LeaveTo: e,
  //   });
  // };
  // const checkAllValidationOfLeaveForm = () => {
    
  //   if (application.ApplicantName === "") {
  //     return toast.warning("Please fill the Applicant Name");
  //   }

  //   if (application.LeaveFrom === "") {
  //     return toast.warning("Please fill the Leave from Date");
  //   }
  //   if (application.LeaveTo === "") {
  //     return toast.warning("Please fill the Leave to Date");
  //   }
  //   if (application.Reason === "") {
  //     return toast.warning("Please fill the Leave Reason");
  //   }
  //   if (application.WorkingDaysNo === "") {
  //     return toast.warning("Please fill the Number of working days");
  //   }
  //   // mainFunctionForWorkingDays();

  //   CreateLeaveApplication();
  // };
  // const cancelLeaveData = (e: any) => {
  //   setApplication({
  //     ...application,
  //     ApplicantName: "",
  //     LeaveFrom: "",
  //     LeaveTo: "",
  //     Reason: "",
  //     TodayDate: "",
  //     Type: "Sick Leave",
  //     WorkingDaysNo: "",
  //   });
  // };
  // const DatePick = (data: any, key: any) => {
  //   setApplication((d: any) => ({ ...d, [key]: data }));
  // };
  // const WorkingDays = (e) => {
    
  //   calculateBusinessDays(application.LeaveFrom, e.target.value);
  // };
  // const CreateLeaveApplication = () => {
    
  //   let responsehttp: any;

  //   let restApiurl: string =
  //     props.siteUrl + "/_api/web/lists/getByTitle('LeaveApplication')/items";
  //   const body: string = JSON.stringify({
  //     Title: application.ApplicantName,
  //     ApplicantName: application.ApplicantName,
  //     LeaveFrom: application.LeaveFrom,
  //     LeaveTo: application.LeaveTo,
  //     LeaveType: application.Type,
  //     Reason: application.Reason,
  //     NoOfWorkingDays: application.WorkingDaysNo,
  //   });
  //   const options: ISPHttpClientOptions = {
  //     headers: {
  //       Accept: "application/json;odata=nometadata",
  //       "content-type": "application/json;odata=nometadata",
  //       "odata-version": "",
  //     },
  //     body: body,
  //   };
  //   props.spHttpClient
  //     .post(restApiurl, SPHttpClient.configurations.v1, options)

  //     .then((response: SPHttpClientResponse) => {
  //       if (response.ok) {
  //         response.json().then((results: any) => {
  //           return toast.success("Form Submitted Successfully");
  //         });
  //         setApplication({
  //           ...application,
  //           ApplicantName: "",
  //           LeaveFrom: "",
  //           LeaveTo: "",
  //           Reason: "",
  //           TodayDate: "",
  //           Type: "Sick Leave",
  //           WorkingDaysNo: "",
  //         });
  //       }
  //     })
  //     .catch((error: any) => {
  //       // console.log(error);
  //       return toast.error("Something went wrong");
  //     });
  // };
  // return (
    // <div>
    //   <div>
    //     <div>
    //       <div>
    //         <Header text={"Leave Application"} />
    //       </div>

    //       <MainLeaveDiv>
    //         <LeaveHeader className="bgColor fw600 f-sz14">
    //           Application Date:
    //           <span className="colortxt"> {application.TodayDate}</span>
    //         </LeaveHeader>
    //         <div className="p20">
    //           <Input
    //             text={"Applicant Name"}
    //             type={"text"}
    //             width={"98.5%"}
    //             value={application.ApplicantName}
    //             classNameLabel="mt10"
    //             className={"mediaInputLeave"}
    //             onChange={(e: any) =>
    //               setApplication({
    //                 ...application,
    //                 ApplicantName: e.target.value,
    //               })
    //             }
    //           />
    //           <Input
    //             text={"Leave from"}
    //             type={"date"}
    //             width={"98.5%"}
    //             classNameLabel="mt20 mediaInputLeave"
    //             value={application.LeaveFrom}
    //             className={"mediaInputLeave"}
    //             onChange={(e: any) =>
    //               setApplication({ ...application, LeaveFrom: e.target.value })
    //             }
    //           />
    //           <Input
    //             text={"Leave to"}
    //             type={"date"}
    //             width={"98.5%"}
    //             value={application.LeaveTo}
    //             classNameLabel="mt20 mediaInputLeave"
    //             className={"mediaInputLeave"}
    //             onChange={(e: any) => {
    //               WorkingDays(e);
    //             }}
    //           />
    //           <NoOfDays
    //             text={"Number of working days"}
    //             value={application.WorkingDaysNo}
    //             classNameLabel="mt20"
    //           />
    //           <InputDropDownLeave
    //             text={"Types"}
    //             style={{ backgroundColor: "red" }}
    //             value={application.Type}
    //             classNameLabel="mt20 mediaInputLeave"
    //             Data={Data}
    //             onChange={(e: any) =>
    //               setApplication({ ...application, Type: e.target.value })
    //             }
    //           />
    //           <TextArea
    //             text={"Reason"}
    //             type={"text"}
    //             height={"90px"}
    //             width={"99.4%"}
    //             value={application.Reason}
    //             className={"mediaInputLeaveReason"}
    //             onChange={(e: any) =>
    //               setApplication({ ...application, Reason: e.target.value })
    //             }
    //           />
    //           <ButtonStyle className="mt20 g10">
    //             <InputBtn
    //               btn={"Cancel"}
    //               color={GrayAB}
    //               width={"122px"}
    //               onClick={cancelLeaveData}
    //             />
    //             <InputBtn
    //               btn={"Submit"}
    //               color={PrimaryColor}
    //               width={"120px"}
    //               context={props.context}
    //               siteUrl={props.siteUrl}
    //               description={""}
    //               spHttpClient={props.spHttpClient}
    //               pageContext={props.pageContext}
    //               onClick={checkAllValidationOfLeaveForm}
    //             />
    //           </ButtonStyle>
    //         </div>
    //       </MainLeaveDiv>
    //     </div>
    //   </div>
    // </div>
//   );
// };
import * as React from "react";

function LeaveApplication() {
  React.useEffect(() => {
    const URL =
      //"https://forms.office.com/Pages/ResponsePage.aspx?id=2rfcvKgD-E6QZFsYMdyVEjfKdBTkBO5Lr8p0sBbLUKlUQ0JRQlVHM1hONjJFSTUzN1VWVVNQWVpaVS4u";
   "https://forms.office.com/Pages/ResponsePage.aspx?id=K-sQScDDP0mqpEckxlFhbgsec_9ye0VPoqqpMOImbn9UMjMxR0xYN0xXVFBBM1dER1ZXNkI0OEVNVi4u";
      window.open(URL);
  });

  return <></>;
}

export default LeaveApplication;