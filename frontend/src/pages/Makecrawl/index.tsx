import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Tagdiv } from "../../components/Tagdiv";
import { Exitbtn } from "../../components/Exitbtn";
import { crawlAPI } from "../../utils/axios";
import {
  Userprofilediv1,
  Formdiv1,
  Removebtn,
  Keworddiv,
  Alarmdiv,
  Addbtn,
} from "./style";
import Btn from "../../components/Button";
import {
  Radio,
  Switch,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 613 });
  return isDesktop ? children : null;
};
// const Tablet = ({ children }: any) => {
//   const isTablet = useMediaQuery({ minWidth: 613, maxWidth: 1060 });
//   return isTablet ? children : null;
// };
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 612 });
  return isMobile ? children : null;
};

const MakeCrawl = () => {
  const [checked, setChecked] = React.useState(true);
  const [isopen, setIsopen] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [type, setType] = React.useState("or");
  const [time, setTime] = React.useState(1);
  const [data, setData] = React.useState(["", "", "", "", ""]);
  let keywords: any[] = [];
  const [inputs, setInputs] = useState({
    url: "",
    name: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    keyword4: "",
    keyword5: "",
  });
  const { url, name, keyword1, keyword2, keyword3, keyword4, keyword5 } =
    inputs;
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const makeCrawl = async () => {
    keywords = [];
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");
    keywords.push(keyword1);
    keywords.push(keyword2);
    keywords.push(keyword3);
    keywords.push(keyword4);
    keywords.push(keyword5);
    await crawlAPI
      .addSetting(
        jwt,
        email,
        type,
        keywords,
        url,
        time,
        checked,
        checked2,
        name
      )
      .then(() => {
        window.location.href = "/settingprofile";
      });
  };
  const handleExit = () => {
    setIsopen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
  };
  const timeChange = (event: any) => {
    setTime(event.target.value);
  };
  const tagAdd = () => {};
  return (
    <div>
      {/* {isMobile ? <AppAppBar /> : undefined} */}
      <AppAppBar />
      <Desktop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv1 style={{ fontSize: "24px" }}>
            ????????? ??????
          </Userprofilediv1>
          <Formdiv1
            style={{
              height: "900px",
              maxWidth: "1000px",
              boxShadow: "5px 5px 5px 5px grey",
            }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChange}
                value={url}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div style={{ width: "100%" }}>
              <TextField
                label="??????"
                name="name"
                onChange={onChange}
                value={name}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "medium",
                fontFamily: "Roboto",
                margin: "24px 0",
              }}
            >
              {/* <RadioGroup
                row
                aria-label="condition"
                defaultValue="and"
                name="row-radio-buttons-group"
                onChange={radioChange}
              >
                <FormControlLabel
                  value="and"
                  control={<Radio color="default" />}
                  label="AND"
                />
                <FormControlLabel
                  value="or"
                  control={<Radio color="default" />}
                  label="OR"
                />
              </RadioGroup> */}
              ?????????
            </div>

            <Keworddiv style={{ height: "400px" }}>
              {isopen ? (
                <Tagdiv>
                  <Exitbtn onClick={handleExit}>
                    <ClearIcon></ClearIcon>
                  </Exitbtn>
                  <TextField
                    label="?????????"
                    onChange={tagChange}
                    value={tag}
                    required
                    style={{
                      width: "70%",
                    }}
                  ></TextField>
                  <Addbtn style={{ alignSelf: "center" }} onClick={tagAdd}>
                    <AddIcon />
                    ADD
                  </Addbtn>
                </Tagdiv>
              ) : (
                <div style={{ height: "100%", width: "100%" }}>
                  {data ? (
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {data.map((item: any, key: any) => (
                        <div
                          key={key}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "8px 0",
                          }}
                        >
                          <TextField
                            label={`?????????${key + 1}`}
                            name={`keyword${key + 1}`}
                            onChange={onChange}
                            required
                            style={{ width: "70%" }}
                          ></TextField>
                          {/* <Removebtn onClick={() => console.log("remove")}>
                            <RemoveIcon />
                          </Removebtn> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      onClick={() => console.log(data)}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ADD ????????? ?????? tag??? ??????????????????.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>
            {/* <Addbtn onClick={handleAdd}>
              <AddIcon />
              ADD
            </Addbtn> */}
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px", }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">??????</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={1}>1??????</MenuItem>
                  <MenuItem value={2}>2??????</MenuItem>
                  <MenuItem value={3}>3??????</MenuItem>
                  <MenuItem value={4}>4??????</MenuItem>
                  <MenuItem value={6}>6??????</MenuItem>
                  <MenuItem value={12}>12??????</MenuItem>
                  <MenuItem value={24}>24??????</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none", height:"80px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>?????? ??????</Alarmdiv>

                <Switch
                  color="success"
                  checked={checked}
                  onChange={handleChange}
                />
              </div>

            </Keworddiv>
          </Formdiv1>
          <Btn
            style={{
              width: "93%",
              marginBottom: "48px",
              marginTop: "72px",
              maxWidth: "1032px",
            }}
            name="????????? ??????"
            onClick={makeCrawl}
          ></Btn>
        </div>
      </Desktop>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Userprofilediv1>????????? ??????</Userprofilediv1>
          <Formdiv1>
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChange}
                value={url}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div style={{ width: "100%", marginTop: "12px" }}>
              <TextField
                label="??????"
                name="name"
                onChange={onChange}
                value={name}
                required
                style={{ width: "100%" }}
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                fontWeight: "bold",
                fontStyle: "medium",
                fontFamily: "Roboto",
                margin: "24px 0",
              }}
            >
              {/* <RadioGroup
                row
                aria-label="condition"
                defaultValue="and"
                name="row-radio-buttons-group"
                onChange={radioChange}
              >
                <FormControlLabel
                  value="and"
                  control={<Radio color="default" />}
                  label="AND"
                />
                <FormControlLabel
                  value="or"
                  control={<Radio color="default" />}
                  label="OR"
                />
              </RadioGroup> */}
              ?????????
            </div>
            <Keworddiv style={{}}>
              {isopen ? (
                <Tagdiv
                  style={{
                    width: "90%",
                    height: "400px",
                    zIndex: 2,
                    marginTop: "0px",
                  }}
                >
                  <Exitbtn onClick={handleExit}>
                    <ClearIcon></ClearIcon>
                  </Exitbtn>
                  <TextField
                    label="Keyword"
                    onChange={tagChange}
                    value={tag}
                    required
                    style={{
                      width: "70%",
                      margin: "24px 0",
                    }}
                  ></TextField>
                  <Addbtn
                    style={{ alignSelf: "center" }}
                    onClick={() => console.log("add")}
                  >
                    <AddIcon />
                    ADD
                  </Addbtn>
                </Tagdiv>
              ) : (
                <div>
                  {data.length ? (
                    <div style={{ width: "100%" }}>
                      {data.map((item: any, key: any) => (
                        <div
                          key={key}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "8px 0",
                          }}
                        >
                          <TextField
                            label={`?????????${key + 1}`}
                            name={`keyword${key + 1}`}
                            onChange={onChange}
                            value={item}
                            required
                            style={{ width: "70%" }}
                          ></TextField>
                          {/* <Removebtn onClick={() => console.log("remove")}>
                            <RemoveIcon />
                          </Removebtn> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ADD ????????? ?????? tag??? ??????????????????.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>
            {/* <Addbtn onClick={handleAdd}>
              <AddIcon />
              ADD
            </Addbtn> */}
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px" }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">??????</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={1}>1??????</MenuItem>
                  <MenuItem value={2}>2??????</MenuItem>
                  <MenuItem value={3}>3??????</MenuItem>
                  <MenuItem value={4}>4??????</MenuItem>
                  <MenuItem value={6}>6??????</MenuItem>
                  <MenuItem value={12}>12??????</MenuItem>
                  <MenuItem value={24}>24??????</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none", height:"60px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>?????? ??????</Alarmdiv>

                <Switch
                  color="success"
                  checked={checked}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn
            style={{ marginBottom: "24px" }}
            name="MAKE CRAWL"
            onClick={() => console.log("Change")}
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default MakeCrawl;
