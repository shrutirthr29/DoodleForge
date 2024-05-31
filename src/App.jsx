import './App.css'
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { Layer, Stage} from "react-konva";
import { useRef, useState } from "react";
import { ACTIONS } from "./constants";

function App() {
  const stageRef = useRef();
  const [action, setAction]=useState(ACTIONS.SELECT);
  const [fillColor, setFillColor]=useState();

  function onPointerMove(){}
  function onPointerUp(){}
  function onPointerDown(){}
  
  function handleExport(){}
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
              onChange={(e)=> setFillColor(e.target.value)}
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
          <Layer></Layer>
        </Stage>


      </div>
    </>
  )

}

export default App;
