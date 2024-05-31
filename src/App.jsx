import './App.css'
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { Layer, Rect, Stage } from "react-konva";
import { useRef, useState } from "react";
import { ACTIONS } from "./constants";

function App() {
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#000000");
  const strokeColor="#000000"

  function onPointerMove() { }
  function onPointerUp() { }
  function onPointerDown() { }

  function handleExport() {
    const url = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <div className='relative w-full h-screen overflow-hidden'>
        {/* Controls */}
        <div className='absolute top-0 z-10 w-full'>
          <div className='flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg'>
            <button className={
              action == ACTIONS.SELECT
                ? "bg-slate-300	 p-1 rounded"
                : "p-1 hover:bg-slate-100 rounded"
            }
              onClick={() => setAction(ACTIONS.SELECT)}
            >
              <GiArrowCursor size={"2rem"} />
            </button>
            <button className={
              action == ACTIONS.RECTANGLE
                ? "bg-slate-300	 p-1 rounded"
                : "p-1 hover:bg-slate-100 rounded"
            }
              onClick={() => setAction(ACTIONS.RECTANGLE)}
            >
              <RiRectangleLine size={"2rem"} />
            </button>
            <button className={
              action == ACTIONS.CIRCLE
                ? "bg-slate-300	 p-1 rounded"
                : "p-1 hover:bg-slate-100 rounded"
            }
              onClick={() => setAction(ACTIONS.CIRCLE)}
            >
              <FaRegCircle size={"2rem"} />
            </button>
            <button className={
              action == ACTIONS.ARROW
                ? "bg-slate-300	 p-1 rounded"
                : "p-1 hover:bg-slate-100 rounded"
            }
              onClick={() => setAction(ACTIONS.ARROW)}
            >
              <FaLongArrowAltRight size={"2rem"} />
            </button>
            <button className={
              action == ACTIONS.SCRIBBLE
                ? "bg-slate-300	 p-1 rounded"
                : "p-1 hover:bg-slate-100 rounded"
            }
              onClick={() => setAction(ACTIONS.SCRIBBLE)}
            >
              <FaPencilAlt size={"2rem"} />
            </button>
            <button>
              <input className="w-6 h-6" type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </button>

            <button onClick={handleExport}>
              <MdFileDownload size={"2rem"} />
            </button>
          </div>
        </div>
        {/* Canvas */}
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerDown={onPointerDown}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              fill="#ffffff"
              id="bg"
            />
          </Layer>
        </Stage>


      </div>
    </>
  )

}

export default App;
