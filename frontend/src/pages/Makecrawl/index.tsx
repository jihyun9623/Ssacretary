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

const MakeCrawl = () => {
  const [checked, setChecked] = React.useState(true);
  const [isopen, setIsopen] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const [value, setValue] = React.useState("and");
  const [time, setTime] = React.useState(60);
  const data: any = [];
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
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };
  const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
    console.log(event.target.value);
  };
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
            Make Crawling
          </Userprofilediv1>
          <Formdiv1 style={{ height: "900px", maxWidth:"1000px",boxShadow: "5px 5px 5px 5px grey" }}>
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChange}
                value={url}
                required
                style={{ width: "100%"}}
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
                <FormControlLabel value="and" control={<Radio color="default"/>} label="AND" />
                <FormControlLabel value="or" control={<Radio color="default"/>} label="OR" />
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
                            label={`Keyword${key}`}
                            name="keyword1"
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
                  <MenuItem value={60}>1시간</MenuItem>
                  <MenuItem value={120}>2시간</MenuItem>
                  <MenuItem value={180}>3시간</MenuItem>
                  <MenuItem value={240}>4시간</MenuItem>
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

                <Switch color="default" checked={checked} onChange={handleChange} />
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
                <Switch color="default" checked={checked2} onChange={handleChange2} />
              </div>
            </Keworddiv>
          </Formdiv1>
          <Btn
            style={{ width: "93%", marginTop: "72px",maxWidth:"1032px"}}
            name="MAKE CRAWL"
            onClick={() => console.log("Change")}
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
          <Userprofilediv1>Make Crawling</Userprofilediv1>
          <Formdiv1>
            <div style={{ width: "100%" }}>
              <TextField
                label="URL"
                name="url"
                onChange={onChange}
                value={url}
                required
                style={{ width: "100%"}}
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
                <FormControlLabel value="and" control={<Radio color="default"/>} label="AND" />
                <FormControlLabel value="or" control={<Radio color="default"/>} label="OR" />
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
                            label={`Keyword${key}`}
                            name="keyword1"
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

                <Switch color="default" checked={checked} onChange={handleChange} />
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
                <Switch color="default" checked={checked2} onChange={handleChange2} />
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
