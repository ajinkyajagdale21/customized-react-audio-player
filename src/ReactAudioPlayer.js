import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import styles from './ReactAudioPlayer.module.css'

const ReactAudioPlayer = ({
  audioSource,
  autoPlay,
  bgColor,
  textColor,
  border
}) => {
  const [isPlaying, setIsplaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioTime, setAudioTime] = useState({ current: 0, duration: 0 });
  const [audioPresent, setAudioPresent] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioSource) {
      var elem = document.getElementById("myBar");
      elem.style.width = 0;
      setAudioPresent(true);
    }
  }, [audioSource]);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsplaying(false);
    } else {
      audioRef.current.play();
      setIsplaying(true);
    }
  };

  const timeUpdateHadler = (e) => {
    let { currentTime, duration } = e.target;
    if (!isFinite(duration) || isNaN(duration)) {
      duration = 0;
    }
    setAudioTime({ ...audioTime, current: currentTime, duration: duration });
  };

  useEffect(() => {
    if (audioTime && audioTime.duration && audioTime.duration > 0) {
      setAudioPresent(true);
    } else {
      setAudioPresent(false);
    }
    var elem = document.getElementById("myBar");
    // var timeDiff = parseFloat(audioRef.current.currentTime) - parseFloat(audioTime.current)
    elem.style.transition = `width 0.5s ease`;
    var width = (audioTime.current / audioTime.duration) * 100;
    elem.style.width = width + "%";
    if (width === 100) {
      setIsplaying(false);
    }
  }, [audioTime]);

  const formatAudioTime = (time) => {
    let a =
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    return a;
  };

  // const audioInputChangeHandler = (e) => {
  //   audioRef.current.current = e.target.value;
  //   setAudioTime({ ...audioTime, current: e.target.value });
  // };

  const muteHandler = () => {
    setIsMuted(true);
    audioRef.current.defaultMuted = true;
    audioRef.current.muted = true;
  };
  const unMuteHandler = () => {
    setIsMuted(false);
    audioRef.current.defaultMuted = false;
    audioRef.current.muted = false;
  };

  const handler = (mouseDownEvent) => {
    var rect = mouseDownEvent.target.getBoundingClientRect();
    const updateWidth = (mouseEvent) => {
      if (!audioTime || !audioTime.duration || audioTime.duration === 0) {
      }
      var elem = document.getElementById("myBar");
      elem.style.transition = `width 0s`;
      var x = mouseEvent.clientX - rect.left; //x position within the element.
      var x1 = getComputedStyle(document.getElementById("myProgress")).width;
      let a = (parseFloat(x) / parseFloat(x1)) * 100;
      if (a > 100 || a < 0) {
        return;
      }
      var width = a;
      elem.style.width = width + "%";
      audioRef.current.currentTime = (audioTime.duration * width) / 100;
      setAudioTime({
        ...audioTime,
        current: (audioTime.duration * width) / 100
      });
      if (width === 100) {
        setIsplaying(false);
      }
    };
    updateWidth(mouseDownEvent);
    function onMouseMove(mouseMoveEvent) {
      updateWidth(mouseMoveEvent);
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div>
      <div
        className={audioPresent ? styles.player : styles.playerDis}
        style={
          border === "rounded"
            ? {
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: "1.5rem"
              }
            : { backgroundColor: bgColor, color: textColor }
        }
      >
        <audio
          id="audioSrc"
          ref={audioRef}
          src={audioSource}
          autoPlay={autoPlay}
          onLoadedMetadata={timeUpdateHadler}
          onTimeUpdate={timeUpdateHadler}
        />
        <div>
          {isPlaying ? (
            <button
              className={audioPresent ? styles.playBtn : styles.playBtnDis}
              onClick={playSongHandler}
              disabled={audioPresent ? false : true}
              style={{ color: textColor }}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className={audioPresent ? styles.playBtn : styles.playBtnDis}
              onClick={playSongHandler}
              disabled={audioPresent ? false : true}
              style={{ color: textColor }}
            >
              <PlayArrowIcon />
            </button>
          )}
        </div>
        <div className={`d-flex me-3 ${styles.time}`}>
          <span>{formatAudioTime(audioTime.current)}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>{formatAudioTime(audioTime.duration)}</span>
        </div>

        {/* <input
          type="range"
          min={0}
          max={audioTime.duration }
          value={audioTime.current}
          onChange={audioInputChangeHandler}
          id={styles.progressbar}
        /> */}
        <div
          className={audioPresent ? styles.myProgress : styles.myProgressDis}
          id="myProgress"
          onMouseDown={handler}
        >
          <div
            className={styles.myBar}
            id="myBar"
            style={{ backgroundColor: textColor }}
          ></div>
        </div>
        {isMuted ? (
          <button
            onClick={unMuteHandler}
            className={audioPresent ? styles.playBtn : styles.playBtnDis}
            disabled={audioPresent ? false : true}
            style={{ color: textColor }}
          >
            <VolumeOffIcon />
          </button>
        ) : (
          <button
            onClick={muteHandler}
            className={audioPresent ? styles.playBtn : styles.playBtnDis}
            disabled={audioPresent ? false : true}
            style={{ color: textColor }}
          >
            <VolumeUpIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReactAudioPlayer