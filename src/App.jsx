import './App.css'
import { GiArrowCursor } from "react-icons/gi";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

function App() {

  return (
    <>
      <div className='relative w-full h-screen overflow-hidden'>
        {/* Controls */}
        <div className='absolute top-0 z-10 w-full'>
          <div className='flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg'>
            <button>
              <GiArrowCursor size={"2rem"} />
            </button>
            <button>
              <RiRectangleLine size={"2rem"} />
            </button>
            <button>
              <FaRegCircle size={"2rem"} />
            </button>
            <button>
              <FaLongArrowAltRight size={"2rem"} />
            </button>
            <button>
              <FaPencilAlt size={"2rem"} />
            </button>
            <button>
              <MdFileDownload size={"2rem"} />
            </button>
          </div>
        </div>
        {/* Canvas */}
       


      </div>
    </>
  )

}

export default App
