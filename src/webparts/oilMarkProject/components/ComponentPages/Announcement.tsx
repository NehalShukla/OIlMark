
import {
  AadHttpClient,
  ISPHttpClientOptions,
  MSGraphClient,
  MSGraphClientFactory,
  SPHttpClient,
  SPHttpClientResponse,

} from "@microsoft/sp-http";
import * as React from "react";
import { toast } from "react-toastify";
import { DragNDropIcon } from "../assets/icons";
import {
  bgDC,
  borderColorD0,
  colorf7,
  GrayAB,
  PrimaryColor,
} from "../color/color";
import { Popup } from "../Popup/Popup";
import {
  AnnounceDiv,
  AnnounceMain,
  AnnounceScrollBar,
  ButtonStyle,
  FormMainDiv,
  FormStyle,
  GraphMainDiv,
  ImageStyle,
  PreviousFormStyle,
  TextStyle,
} from "../Style/ComponentStyled";
import {
  ActionDiv,
  Graphs,
  Header,
  Input,
  InputBtn,
  Items,
  TextArea,
  UploadFile,
} from "./Component";


import { SuggestionsHeaderFooterItem, values } from "office-ui-fabric-react";
import Select from "react-dropdown-select";
import { number, string } from "prop-types";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { throttle } from "@microsoft/sp-lodash-subset";
var formID: any;
var fileData = [];
var FileName: any;
var imageUrl: any;
let results: any;


export const Announcement = (props) => {

  // Date: 09/03/23 Comment Added by Deepak End

  const [SelectedOneDriveData, SetSelectedOneDriveData] = React.useState([]);
  const [SelectedDocumentData, SetSelectedDocumentData] = React.useState([]);
  const [modalIsOpen, setModelIsOpen] = React.useState(false);
  const [AnnouncePopup, SetAnnouncePopup] = React.useState(false);
  const [Delete, setDelete] = React.useState(false);
  const [border, setBorder] = React.useState(false);
  const [AnnouncementData, setAnnouncementData] = React.useState<any>([]);
  const [SelectedEditData, setSelectedEditData] = React.useState([]);
  const [SelectedDeleteId, setSelectedDeleteId] = React.useState("");
  const [updateAnn, setUpdateAnn] = React.useState(false);
  const [Announcement, SetAnnouncement] = React.useState({
    Title: "",
    handleFile: "",
    AnnouncementType: "",
    CreatedDateTime: "",
  });
 
  React.useEffect(() => {
    AnnouncementTableData();
    hideedit();
    CurrentuserRecord();
    SharedFiles();

  }, []);

  const CurrentuserRecord = () => {
try{
  debugger;
    props.context.aadHttpClientFactory
      .getClient("https://graph.microsoft.com")
      .then((client: AadHttpClient) => {
        return client

          .get(
            `https://graph.microsoft.com/v1.0/me/drive/root/children/recordings?$expand=children($select=id,displayName,name,webUrl)`,
            AadHttpClient.configurations.v1
          );
      })
      .then(response => {
        /////////
        if(!response.ok){
if(response.status ===404)
{
  throw new Error('Resource not found')
}
else{
  throw new Error("Request failed with status"+response.status)
}

        }
        //////////
        return response.json();
      })

      .then(json => {
        var results = json.children
        console.log(json);
        SetSelectedDocumentData(results);
       
      })

      .catch(error => {
        console.error(error);
      });
    }
    catch(error){
      console.error(error.Message);
    }
  };



  const SharedFiles = () => {
try{
  debugger;
    props.context.aadHttpClientFactory
      .getClient("https://graph.microsoft.com")
      .then((client: AadHttpClient) => {
        return client

          .get(
            `https://graph.microsoft.com/v1.0/me/drive/sharedWithMe/`,

            AadHttpClient.configurations.v1
          );
      })
      .then(response => {
              /////////
              if(!response.ok){
                if(response.status ===404)
                {
                  throw new Error('Resource not found')
                }
                else{
                  throw new Error("Request failed with status"+response.status)
                }
                
                        }
                        //////////
        return response.json();
      })
      .then(json => {


        var results_onrdrive = json.value

        console.log("SharedFile...............", results_onrdrive);

        SetSelectedOneDriveData(results_onrdrive);

      })
      .catch(error => {
        console.error(error);
      });
    }
    catch(error){
      console.error(error.Message);
    }
  }




  const hideedit = async () => {
    document.getElementById("Page.SiteFooter.internal.03025612-a400-4804-a78e-e1493200a43b").style.display = "none";
  }

  const EditAnnouncementData = (SelectedId: any) => {

    let filteredData = AnnouncementData.filter((filteredData: any) => {
      return filteredData.Id === SelectedId;
    });
    setSelectedEditData(filteredData);
    imageUrl = filteredData[0].AttachmentFiles[0].ServerRelativeUrl;
    SetAnnouncement({
      ...Announcement,
      Title: filteredData[0].Title,
      handleFile: filteredData[0].imageUrl,
      AnnouncementType: filteredData[0].AnnouncementType,

    });
    SetAnnouncePopup(true);
  };

  const checkValiAnnoun = () => {
    if (Announcement.Title === "") {
      return toast.warning("Title can't empty");
    } else if (fileData.length == 0) {
      return toast.warning("Please upload file");
    } else if (Announcement.Title !== "" && fileData.length !== 0) {
      CreateAnnouncement();
    }
  };


  const cancelAnnouncementData = () => {
    setUpdateAnn(false);
    fileData = [];
    SetAnnouncement({
      ...Announcement,
      Title: "",
      handleFile: "",
      AnnouncementType: "",
    });
  };
  const CreateAnnouncement = async () => {
    const date = new Date(Date());
    const dateFormat: any = {
      // weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const DateCurrent = date.toLocaleString("en-US", dateFormat);

    let restApiurl: string =
      props.siteUrl + "/_api/web/lists/getByTitle('Announcement')/items";

    const body: string = JSON.stringify({
      Title: Announcement.Title,
      AnnouncementType: Announcement.AnnouncementType,
      CreatedDateTime: DateCurrent,
    });
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };
    props.spHttpClient
      .post(restApiurl, SPHttpClient.configurations.v1, options)

      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response.json().then((results: any) => {
            formID = results.Id;

            AttachmentData(formID);
            // console.log("results", results);
            setUpdateAnn(false);
          });
        } else {
          toast.error("Title Allowed 255 character length only");
        }
      })
      .catch((error: any) => {
        // console.log(error);
      });
  };
  const AttachmentData = async (Id: any) => {
    await props.spHttpClient
      .post(
        `${props.siteUrl}/_api/web/lists/getByTitle('Announcement')/items(${Id})/AttachmentFiles/add(FileName='${fileData[0].name}')`,

        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "content-type": "application/json;odata=nometadata",
            "odata-version": "",
          },
          body: fileData[0],
        }
      )
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response.json().then((results: any) => {
            // console.log(results);
            toast.success("Announcement record created successfully");
            fileData = [];
            AnnouncementTableData();
            SetAnnouncement({
              ...Announcement,
              Title: "",
              handleFile: "",
              AnnouncementType: "",
            });
          });
        } else
          response.json().then((responseJSON) => {
            // console.log(responseJSON);
            toast.error("Something went wrong!!!");
          });
      })
      .catch((error: any) => {
        // console.log(error);
      });
  };



  const handleChange = (e: any) => {
    

    fileData = [];
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    fileData.push(e.target.files[0]);
    FileName = fileData[0].name;

    reader.onload = (e: any) => {
      const fileUploaded = e.target.result;
      SetAnnouncement({ ...Announcement, handleFile: fileUploaded });

    };
    setUpdateAnn(true);
    // hideedit();

  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (e: any) => {
    hiddenFileInput.current.click();

  };
  const AnnouncementTableData = async () => {
    let restApiurl: string =
      props.siteUrl +
      "/_api/web/lists/getByTitle('Announcement')/items?$select=AttachmentFiles/ServerRelativeUrl,Title,AnnouncementType,Id,CreatedDateTime&$expand=AttachmentFiles";
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": "",
      },
    };

    return new Promise<string>(async (resolve, reject) => {
      props.spHttpClient
        .get(restApiurl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response.json().then((results: any) => {
              setAnnouncementData(results.value);
              console.log(results.value);
            });
          } else
            response.json().then((responseJSON) => {
              console.log(responseJSON);
              toast.error("Something went wrong!!!");
            });
        });
    });
  };



  function componentdidmount() {
    // throw new Error("Function not implemented.");

    CurrentuserRecord();

  }

  // Date:10/03/23 Comment Added by Deepak Start

  //    function GetAllUsersDetails() {
  //     
  //    props.context.aadHttpClientFactory
  //      .getClient("https://graph.microsoft.com")
  //      .then((client: AadHttpClient) => {
  //        return client

  //         .get(
  //           `https://graph.microsoft.com/v1.0/me/drive/root/children/recordings?$expand=children($select=id,displayName,name,webUrl)`,
  //           AadHttpClient.configurations.v1
  //          );
  //      })
  //      .then(response => {
  //        return response.json();
  //      })
  //      .then(json => {

  //       var results = json.children
  //             console.log(json);

  //                SetSelectedDocumentData(results );  

  //    // Prepare the output array
  //   //  var users: Array<IUserItem> = new Array<IUserItem>();

  //   //  console.log(json);

  //    // Map the JSON response to the output array
  //   //  json.value.map((item: any) => {
  //   //    users.push( {
  //   //      displayName: item.displayName,
  //   //      mail: item.mail,
  //   //      userPrincipalName: item.userPrincipalName,
  //   //    });
  //   //  });

  //    // Update the component state accordingly to the result
  //   //  this.setState(
  //   //    {
  //   //      users: users,
  //   //    }
  //   //  );
  //  })
  //  .catch(error => {
  //    console.error(error);
  //  });

  // }

  // Date:10/03/23 Comment Added by Deepak End

  // function AllData() {
  //   
  //   var _spPageContextInfo = this;

  //   var CurrentUserDetails1 =  props.context.pageContext;
  //   var objHeaders1 = {
  //     type: "GET",
  //     headers: {

  //       "Accept": "application/json; odata=verbose",
  //       'odata-version': ''
  //     }
  //   }

  //     // fetch("https://pandey17.sharepoint.com/sites/OilMarkProjectRakesh/_api/web/lists/getbytitle('Documents')/items?$select=EncodedAbsUrl,File/Name,RecordByPerson/EMail&$expand=File,RecordByPerson",
  //    fetch("https://pandey17.sharepoint.com/sites/OilMarkProjectRakesh/_api/web/lists/getbytitle('Documents')/items?$select=EncodedAbsUrl,File/Name&$expand=File",
  //     objHeaders1).then(function (response) {
  //       console.log(objHeaders1);-
  //       return response.json()
  //     })
  //     .then(function (json) {

  //       var results = json.d.results;
  //       console.log(json);

  //          SetSelectedDocumentData(results);


  //       //  if( CurrentUserDetails1._user.email  == results.RecordByPerson.EMail)
  //       //  {

  //       //   SetSelectedDocumentData(results);

  //       //   alert("Test");
  //       //  }

  //     })
  //   error: (function (ex) {
  //     alert("ErrorMessage : " + ex);
  //   })
  // }


  return (
    <>
      <div>
        <div>
          <Header text={"Announcement"} />
        </div>
        <FormMainDiv className="df g30 pt15">
          <FormStyle className="p25">
            <Input
              text={"Title"}
              type={"text"}
              width={"96%"}
              bg={colorf7}
              onChange={(e: any) =>
                SetAnnouncement({ ...Announcement, Title: e.target.value })
              }
              border={border}
              value={AnnouncePopup === true ? "" : Announcement.Title}
            />

            <div className="mt30">
              <UploadFile
                text={"Attach File"}
                icon={<DragNDropIcon />}
                onChange={handleChange}
                onClick={handleClick}
                hiddenFileInput={hiddenFileInput}
                FileName={FileName}
                updateAnn={updateAnn}
                handleFile={Announcement.handleFile}
              />
            </div>
            <TextArea
              text={"Type your Announcement"}
              type={"textarea"}
              height={"129px"}
              width={"99%"}
              border={border}
              value={AnnouncePopup === true ? "" : Announcement.AnnouncementType}
              onChange={(e: any) =>
                SetAnnouncement({
                  ...Announcement,
                  AnnouncementType: e.target.value,
                })
              }
            />
            <ButtonStyle className="mt20 g10">
              <InputBtn
                btn={"Cancel"}
                color={GrayAB}
                width={"122px"}
                onClick={() => cancelAnnouncementData()}
                borderRadius={"3px"}
              />
              <InputBtn
                btn={"Create"}
                color={PrimaryColor}
                width={"120px"}
                borderRadius={"3px"}
                onClick={() => checkValiAnnoun()}
              />
            </ButtonStyle>
          </FormStyle>
          <PreviousFormStyle>
            <TextStyle className="p20 fw600 f-sz20">
              Previous Announcement
            </TextStyle>
            <AnnounceScrollBar className="p20">
              {AnnouncementData.map((item: any, index: any) => {
                return (
                  <AnnounceDiv className="df borderstyle df-sb " key={index}>
                    <AnnounceMain className="df g15 testing">
                      <ImageStyle>
                        <img
                          src={item.AttachmentFiles[0].ServerRelativeUrl}
                          alt="Mobilimg"
                          className="imgStyle"
                        />
                      </ImageStyle>
                      <div className="dg-customer r-gap">
                        <div className="fw colorBlack f-sz16 ">{item.Title}</div>
                        <div className="PrevAnnounce_Desc">
                          <pre className="fw500 media415-mt20 fw5000 fwfont">{item.AnnouncementType}</pre>
                          
                        </div>
                        <div className="f-sz12 fw600 TxtColor media415-mt10">
                          {item.CreatedDateTime}
                        </div>
                      </div>
                    </AnnounceMain>
                    <div className="media415-mt10 media415-mb10">
                      <ActionDiv
                        editClick={() => EditAnnouncementData(item.Id)}
                        deleteClick={() => {
                          setDelete(true), setSelectedDeleteId(item.Id);
                        }}
                      />
                    </div>
                  </AnnounceDiv>
                );
              })}
            </AnnounceScrollBar>
          </PreviousFormStyle>
        </FormMainDiv>

        {/* Date: 28/2/23 Section Added by Deepak for show recording */}

        <div className="Announcement_OneDrive_Recordings">
          <div className="Announcement_OneDrive_Headings f-sz20 fw600 bVfHFP1">OneDrive Recordings!</div>
          <div className="Announcement_OneDrive_Inner ">

            {SelectedDocumentData.length > 0 ? SelectedDocumentData.map((item: any, index: any) => {
              const myArray = item.webUrl.split("/Documents");
              const tenantArray = myArray[0].split("/");
              const tenant = tenantArray[tenantArray.length - 1];
              const str = "/_layouts/15/stream.aspx?id=/personal/" + tenant + "/Documents";
              return (
                <div className="oneDrive_Recordss">
                  <div>
                    <iframe src={myArray[0] + str + myArray[1]} className="Announcement_onedrive"></iframe>
                  </div>


                  <div>
                    <a href={myArray[0] + str + myArray[1]} target="_blank">Click here to view Recording!</a>
                  </div>
                </div>
              )

            }) : ''}

            {SelectedOneDriveData.length > 0 ? SelectedOneDriveData.map((item: any, index: any) => {
              const myArray = item.webUrl.split("/Documents");
              const tenantArray = myArray[0].split("/");
              const tenant = tenantArray[tenantArray.length - 1];
              const str = "/_layouts/15/stream.aspx?id=/personal/" + tenant + "/Documents";
              return (
                <div className="oneDrive_Recordsss">
                  <div>
                    <iframe src={myArray[0] + str + myArray[1]} className="Announcement_onedrive"></iframe>
                  </div>
                  <div>
                    <a href={myArray[0] + str + myArray[1]} target="_blank">Click here to view Recording!</a>
                  </div>
                </div>
              )
            }) : ''}
         
          </div>
        </div>

         <div>
          {/* Date 21/3/2023 */}
         {/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		//id: 'b3d1439b-b54e-49a8-a70f-69507679624d',
		//embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=b3d1439b-b54e-49a8-a70f-69507679624d',
    id: 'f61fa064-8088-45a0-a7f4-f1115b27fa67', 
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f61fa064-8088-45a0-a7f4-f1115b27fa67',
		accessToken: '<Access Token>',
		tokenType: models.TokenType.Embed,
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "report-style-class" }

	getEmbeddedComponent = { (embeddedReport) => {
	//	this.report = embeddedReport as Report;
	}}
/> */}

{/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
		id: '<Report Id>',
		embedUrl: '<Embed Url>',
		accessToken: '<Access Token>',
		tokenType: models.TokenType.Embed,
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "report-style-class" }

	getEmbeddedComponent = { (embeddedReport) => {
		//this.report = embeddedReport as Report;
    window.report = embeddedReport;
	}}
/> */}
{/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual and qna
	//	id: 'b3d1439b-b54e-49a8-a70f-69507679624d', 
	//	embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=b3d1439b-b54e-49a8-a70f-69507679624d',
  id: 'f61fa064-8088-45a0-a7f4-f1115b27fa67', 
	embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f61fa064-8088-45a0-a7f4-f1115b27fa67',
  
		accessToken: undefined,    // Keep as empty string, null or undefined
		tokenType: models.TokenType.Embed
	}}
/> */}
          {/* <GraphMainDiv className="df g20 fw600"> */}
            {/* <Graphs
              title={"SALES PERFORMANCE"}
              text={"REVENUE BY MONTH"}
              color={PrimaryColor}
              bg={bgDC}
              width={"auto"}
              height={"18.81px"}
              borderColor={borderColorD0}
              padding={"5px"}
              href="https://app.powerbi.com/reportEmbed?reportId=b3d1439b-b54e-49a8-a70f-69507679624d&autoAuth=true&ctid=4910eb2b-c3c0-493f-aaa4-4724c651616e
              "
            /> */}
            {/* <Graphs
              title={"REGION PERFORMANCE"}
              text={"REVENUE BY CATEGORY"}
              color={PrimaryColor}
              bg={bgDC}
              width={"auto"}
              height={"18.81px"}
              borderColor={borderColorD0}
              padding={"5px"}
            /> */}
          {/* </GraphMainDiv> */}
          {/* <GraphMainDiv className="df g20 fw600">
            <Graphs
              title={"SALES PERFORMANCE"}
              text={"REVENUE BY MONTH"}
              color={PrimaryColor}
              bg={bgDC}
              width={"auto"}
              height={"18.81px"}
              borderColor={borderColorD0}
              padding={"5px"}
            />
            <Graphs
              title={"REGION PERFORMANCE"}
              text={"REVENUE BY MONTH"}
              color={PrimaryColor}
              bg={bgDC}
              width={"auto"}
              height={"18.81px"}
              borderColor={borderColorD0}
              padding={"5px"}
            />
          </GraphMainDiv> */}
        </div> 
      </div>

      <Popup
        modalIsOpen={modalIsOpen}
        setModelIsOpen={setModelIsOpen}
        ModelWidth={"80%"}
        text={"Edit Announcement"}
        DeleteAnnouncement={Delete}
        setDelete={setDelete}
        DeleteText={"Delete"}
        OnClickCancle={() => setModelIsOpen(false)}
        onClickSubmit={""}
        SetAnnouncePopup={SetAnnouncePopup}
        AnnouncePopup={AnnouncePopup}
        editWidth={"410px"}
        AnounccedTableData={SelectedEditData}
        FileName={FileName}
        context={props.context}
        siteUrl={props.siteUrl}
        description={""}
        SelectedId={SelectedDeleteId}
        spHttpClient={props.spHttpClient}
        pageContext={props.pageContext}
        imgUrl={imageUrl}
        CallAnnouncemnetData={AnnouncementTableData}
        Announcement={Announcement}
        SetAnnouncement={SetAnnouncement}

      />
    </>

  );

};

function componentDidMount() {
  throw new Error("Function not implemented.");
};

