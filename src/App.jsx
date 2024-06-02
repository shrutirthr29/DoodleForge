import './App.css'
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { Layer, Rect, Stage, Circle, Arrow, Line } from "react-konva";
import { useRef, useState } from "react";
import { ACTIONS } from "./constants";
import { v4 as uuidv4 } from "uuid";

function App() {
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#000000");
  const [rectangles, setRectangles] = useState([])
  const [circles, setCircles] = useState([])
  const [arrows, setArrows] = useState([])
  const [scribbles, setScribbles] = useState([])

  const strokeColor = "#000000"
  const isDrawing = useRef();
  const currentShapeId = useRef();


  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isDrawing.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [...rectangles, {
          id,
          x,
          y,
          height: 20,
          width: 20,
          fillColor,
        },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [...circles, {
          id,
          x,
          y,
          radius: 20,
          fillColor,
        },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [...arrows, {
          id,
          points: [x,y,x+20,y+20],
          fillColor,
        },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [...scribbles, {
          id,
          points: [x,y],
          fillColor,
        },
        ]);
        break;
    }
  }
  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isDrawing.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => rectangles.map((rectangle) => {
          if (rectangle.id === currentShapeId.current) {
            return {
              ...rectangle,
              width: x - rectangle.x,
              height: y - rectangle.y,
            };
          }
          return rectangle;
        })
      );
      break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => circles.map((circle) => {
          if (circle.id === currentShapeId.current) {
            return {
              ...circle,
              radius: ((y - circle.y)**2 + (x - circle.x)**2)**0.5,
            };
          }
          return circle;
        })
      );
      break;
      case ACTIONS.ARROW:
        setArrows((arrows) => arrows.map((arrow) => {
          if (arrow.id === currentShapeId.current) {
            return {
              ...arrow,
              points:[arrow.points[0], arrow.points[1], x, y],
            };
          }
          return arrow;
        })
      );
      break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => scribbles.map((scribble) => {
          if (scribble.id === currentShapeId.current) {
            return {
              ...scribble,
              points:[...scribble.points, x, y],
            };
          }
          return scribble;
        })
      );
      break;
    }
  }
  function onPointerUp() {
    isDrawing.current = false;
  }

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

            {rectangles.map((rectangle) => (
              <Rect
                key={rectangle.id}
                x={rectangle.x}
                y={rectangle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={rectangle.fillColor}
                height={rectangle.height}
                width={rectangle.width}
              />
            ))}
            {circles.map((circle) => (
              <Circle
                key={circle.id}
                radius={circle.radius}
                x={circle.x}
                y={circle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={circle.fillColor}
              />
            ))}
            {arrows.map((arrow) => (
              <Arrow
                key={arrow.id}
                points={arrow.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={arrow.fillColor}
              />
            ))}
            {scribbles.map((scribble) => (
              <Line
                key={scribble.id}
                lineCap="butt"
                lineJoin="bevel"
                points={scribble.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={scribble.fillColor}
              />
            ))}
          </Layer>
        </Stage>


      </div>
    </>
  )

}

export default App;
