import { useRef } from "react";
import { Player } from "@lordicon/react";
import addIcon from "../assets/add_icon.json";

function AddIcon() {
  const playerRef = useRef(null);

  return (
    <Player
      ref={playerRef}
      icon={addIcon}
      size={24}
      colors="primary:#000000,secondary:#000000"
      onMouseEnter={() => playerRef.current?.playFromBeginning()}
      onMouseLeave={() => playerRef.current?.playFromBeginning()}
    />
  );
}

export default AddIcon;
