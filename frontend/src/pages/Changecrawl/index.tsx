import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppAppBar from "../../views/AppAppBar";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Tagdiv } from "../../components/Tagdiv";
import { Exitbtn } from "../../components/Exitbtn";

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

const ChangeCrawl = () => {
  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [isopen, setIsopen] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [value, setValue] = React.useState("and");
  const [time, setTime] = React.useState(60);
  const [data, setData] = React.useState([
    { keyword: "React" },
    { keyword: "Vue" },
    { keyword: "MySQL" },
    { keyword: "Spring" },
    { keyword: "Node.js" },
  ]);
  const [inputs, setInputs] = useState({
    url: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    keyword4: "",
    keyword5: "",
    keyword6: "",
    keyword7: "",
    keyword8: "",
  });
  const {
    url,
    // keyword1,
    // keyword2,
    // keyword3,
    // keyword4,
    // keyword5,
    // keyword6,
    // keyword7,
    // keyword8,
  } = inputs;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleAdd = () => {
    if (data.length >= 5) {
      window.alert("크롤링 키워드는 5개이상 등록하실 수 없습니다.");
    } else {
      setIsopen(true);
    }

    console.log(isopen);
  };
  const handleExit = () => {
    setIsopen(false);
    console.log(isopen);
  };

  const addTag = () => {
    data.push({ keyword: "JBJ" });
    console.log(data);
    console.log("jbj");
  };
  const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
    console.log(event.target.value);
  };
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
    console.log(event.target.checked);
  };
  const timeChange = (event: any) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };
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
            Change Crawling
          </Userprofilediv1>
          <Formdiv1 style={{ height: "900px" }}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                margin: "24px 0",
              }}
            >
              <RadioGroup
                row
                aria-label="condition"
                defaultValue="and"
                name="row-radio-buttons-group"
                onChange={radioChange}
              >
                <FormControlLabel value="and" control={<Radio />} label="AND" />
                <FormControlLabel value="or" control={<Radio />} label="OR" />
              </RadioGroup>
            </div>
            <Keworddiv style={{ height: "400px" }}>
              {isopen ? (
                <Tagdiv>
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
                <div style={{ height: "100%", width: "100%" }}>
                  {data.length ? (
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {data.map((item, key) => (
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
                            label={`Keyword${key}`}
                            name="keyword"
                            onChange={onChange}
                            value={item.keyword}
                            required
                            style={{ width: "70%" }}
                          ></TextField>
                          <Removebtn onClick={() => console.log("remove")}>
                            <RemoveIcon />
                          </Removebtn>
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
                      ADD 버튼을 눌러 tag를 추가해주세요.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>

            <Addbtn onClick={handleAdd}>
              <AddIcon />
              ADD
            </Addbtn>
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px" }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">주기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={5}>5분</MenuItem>
                  <MenuItem value={10}>10분</MenuItem>
                  <MenuItem value={30}>30분</MenuItem>
                  <MenuItem value={60}>1시간</MenuItem>
                  <MenuItem value={360}>6시간</MenuItem>
                  <MenuItem value={720}>12시간</MenuItem>
                  <MenuItem value={1440}>24시간</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>MAIL Alarm</Alarmdiv>

                <Switch checked={checked} onChange={handleChange} />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>SMS Alarm</Alarmdiv>
                <Switch checked={checked2} onChange={handleChange2} />
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn
            style={{ width: "90%" }}
            name="UPDATE CRAWL"
            onClick={() => console.log("UPDATE")}
          ></Btn>
          <Btn
            style={{
              marginBottom: "24px",
              backgroundColor: "#d62b4b",
              width: "90%",
            }}
            name="DELETE CRAWL"
            onClick={() => console.log("DELETE")}
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
          <Userprofilediv1>Change Crawling</Userprofilediv1>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                margin: "24px 0",
              }}
            >
              <RadioGroup
                row
                aria-label="condition"
                defaultValue="and"
                name="row-radio-buttons-group"
                onChange={radioChange}
              >
                <FormControlLabel value="and" control={<Radio />} label="AND" />
                <FormControlLabel value="or" control={<Radio />} label="OR" />
              </RadioGroup>
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
                      {data.map((item, key) => (
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
                            label={`Keyword${key + 1}`}
                            name="keyword"
                            onChange={onChange}
                            value={item.keyword}
                            required
                            style={{ width: "70%"}}
                          ></TextField>
                          <Removebtn onClick={() => console.log("remove")}>
                            <RemoveIcon />
                          </Removebtn>
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
                      ADD 버튼을 눌러 tag를 추가해주세요.
                    </div>
                  )}
                </div>
              )}
            </Keworddiv>
            <Addbtn onClick={handleAdd}>
              <AddIcon />
              ADD
            </Addbtn>
            <Box
              style={{ alignSelf: "flex-end", marginBottom: "24px" }}
              sx={{ minWidth: 120 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">주기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={timeChange}
                >
                  <MenuItem value={5}>5분</MenuItem>
                  <MenuItem value={10}>10분</MenuItem>
                  <MenuItem value={30}>30분</MenuItem>
                  <MenuItem value={60}>1시간</MenuItem>
                  <MenuItem value={360}>6시간</MenuItem>
                  <MenuItem value={720}>12시간</MenuItem>
                  <MenuItem value={1440}>24시간</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Keworddiv style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>MAIL Alarm</Alarmdiv>

                <Switch checked={checked} onChange={handleChange} />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Alarmdiv>SMS Alarm</Alarmdiv>
                <Switch checked={checked2} onChange={handleChange2} />
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn name="UPDATE CRAWL" onClick={() => console.log("UPDATE")}></Btn>
          <Btn
            style={{ marginBottom: "24px", backgroundColor: "#d62b4b" }}
            name="DELETE CRAWL"
            onClick={() => console.log("DELETE")}
          ></Btn>
        </div>
      </Mobile>
    </div>
  );
};

export default ChangeCrawl;
