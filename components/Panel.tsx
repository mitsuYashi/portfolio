import { css } from "@emotion/react";
import React from "react";

type props = {
  numprops: number;
  fontNum: number;
};

const panel = css`
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px solid #3a3a4539;
  box-sizing: border-box;

  color: #3a3a45;
  font-size: 32px;
  text-align: center;
  border-radius: 5px;
`;

const panelFont = [
  "",
  "Neonderthaw",
  "'Courier New', Courier, monospace",
  "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
  "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
]

const backColor = ["#fff6c2", "#fff4b8", "#fff2a0", "#fff098", "#fff886", "#fff674", "#fff462", "#fff250", "#fff038", "#ffee26", "#ff7373"];

const Panel: React.FC<props> = ({ numprops, fontNum }) => {

  const choiceBackColor = (num: number): string => {
    let ret = "";
    // console.log(num);
    num === 2 ? ret = backColor[0] :
    num === 4 ? ret = backColor[1] :
    num === 8 ? ret = backColor[2] :
    num === 16 ? ret = backColor[3] :
    num === 32 ? ret = backColor[4] :
    num === 64 ? ret = backColor[5] :
    num === 128 ? ret = backColor[6] :
    num === 256 ? ret = backColor[7] :
    num === 512 ? ret = backColor[8] :
    num === 1024 ? ret = backColor[9] :
    num === 2048 ? ret = backColor[10] :
    "";
    return ret;
  }

  return (
    <div>
      {
        numprops === 0 ? 
        <div css={panel} />
        :
        <div css={panel} style={{backgroundColor: choiceBackColor(numprops),
           fontFamily: panelFont[fontNum]
          }}>{numprops}</div>
      }
    </div>
  );
};

export default Panel;
