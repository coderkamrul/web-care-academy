// "use client";
// import { useState, useRef, useEffect } from "react";
// import { FaPlay } from "react-icons/fa";
// import { IoIosPause } from "react-icons/io";
// import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
// import { TfiClose } from "react-icons/tfi";

// export default function VideoModal({ videoUrl, isOpen, onClose }) {
//   const iframeRef = useRef(null);
//   const playerRef = useRef(null);
//   const cursorRef = useRef(null);
//   const videoAreaRef = useRef(null);

//   const [progress, setProgress] = useState(0);

//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMuted, setIsMuted] = useState(true);
//   const [showControls, setShowControls] = useState(true);

//   // Auto-hide controls
//   useEffect(() => {
//     if (!isOpen) return;

//     const timer = setTimeout(() => setShowControls(false), 3000);
//     return () => clearTimeout(timer);
//   }, [isOpen]);

//   const getYouTubeId = (url) => {
//     const regExp =
//       /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

//   // Lock scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // Load YouTube API & create player
//   useEffect(() => {
//     if (!isOpen || !videoId) return;

//     const loadYT = () => {
//       if (!window.YT) {
//         const tag = document.createElement("script");
//         tag.src = "https://www.youtube.com/iframe_api";
//         document.body.appendChild(tag);
//         tag.onload = createPlayer;
//       } else {
//         createPlayer();
//       }
//     };

//     const createPlayer = () => {
//       if (playerRef.current) playerRef.current.destroy();

//       playerRef.current = new window.YT.Player(iframeRef.current, {
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           mute: 1,
//           modestbranding: 1,
//         },
//         events: {
//           onReady: (event) => {
//             event.target.playVideo();
//             event.target.mute();
//             setIsMuted(true);
//             setIsPlaying(true);
//           },
//         },
//       });
//     };

//     loadYT();

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.destroy();
//         playerRef.current = null;
//         setIsPlaying(false);
//       }
//     };
//   }, [isOpen, videoId]);

//  // Toggle play
// const togglePlay = (e) => {
//   e.stopPropagation();
//   if (!iframeRef.current) return;

//   if (videoUrl.includes("youtube")) {
//     // YouTube
//     if (!playerRef.current) return;
//     if (isPlaying) playerRef.current.pauseVideo();
//     else playerRef.current.playVideo();
//   } else {
//     // HTML video
//     const videoEl = iframeRef.current;
//     if (isPlaying) videoEl.pause();
//     else videoEl.play();
//   }

//   setIsPlaying(!isPlaying);
// };

// // Toggle mute
// const toggleMute = (e) => {
//   e.stopPropagation();
//   if (!iframeRef.current) return;

//   if (videoUrl.includes("youtube")) {
//     if (!playerRef.current) return;
//     if (isMuted) playerRef.current.unMute();
//     else playerRef.current.mute();
//   } else {
//     const videoEl = iframeRef.current;
//     videoEl.muted = !isMuted;
//   }

//   setIsMuted(!isMuted);
// };


//   // Custom cursor effect
//   useEffect(() => {
//     if (!isOpen) return;

//     const cursor = cursorRef.current;
//     const videoArea = videoAreaRef.current;
//     const controls = document.getElementById("video-controls");

//     const move = (e) => {
//       if (!cursor || !videoArea) return;

//       const rect = videoArea.getBoundingClientRect();
//       const isInside =
//         e.clientX >= rect.left &&
//         e.clientX <= rect.right &&
//         e.clientY >= rect.top &&
//         e.clientY <= rect.bottom;

//       if (isInside) {
//         let inControls = false;

//         if (controls) {
//           const controlsRect = controls.getBoundingClientRect();
//           inControls =
//             e.clientX >= controlsRect.left &&
//             e.clientX <= controlsRect.right &&
//             e.clientY >= controlsRect.top &&
//             e.clientY <= controlsRect.bottom;
//         }

//         if (inControls) {
//           cursor.style.display = "none";
//           videoArea.style.cursor = "auto";
//         } else {
//           cursor.style.display = "flex";
//           cursor.style.left = `${e.clientX}px`;
//           cursor.style.top = `${e.clientY}px`;
//           videoArea.style.cursor = "none";
//         }
//       } else {
//         cursor.style.display = "none";
//         videoArea.style.cursor = "auto";
//       }
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, [isOpen]);

//   // Update progress bar
//   useEffect(() => {
//     let interval;
//     if (isOpen && playerRef.current) {
//       interval = setInterval(() => {
//         const player = playerRef.current;
//         if (player && player.getDuration && player.getCurrentTime) {
//           const duration = player.getDuration();
//           const current = player.getCurrentTime();
//           if (duration > 0) {
//             setProgress((current / duration) * 100);
//           }
//         }
//       }, 200);
//     }
//     return () => clearInterval(interval);
//   }, [isOpen, videoId]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
//       style={{ backdropFilter: "blur(10px)" }}
//       onClick={() => {
//         if (playerRef.current) playerRef.current.pauseVideo();
//         onClose();
//       }}
//     >
//       <div
//         ref={videoAreaRef}
//         className="relative w-11/12 max-w-5xl aspect-video rounded-xl overflow-hidden group bg-black cursor-none"
//         onMouseEnter={() => setShowControls(true)}
//         onMouseLeave={() => setShowControls(false)}
//       >
//         {/* Overlay to block clicks on iframe */}
//         <div className="absolute top-0 left-0 w-full h-full z-10"></div>

//         {videoUrl && videoUrl.includes("youtube") ? (
//           <div ref={iframeRef} className="w-full h-full z-0"></div>
//         ) : (
//           <video
//             src={videoUrl}
//             ref={iframeRef} // can still use same ref for consistency
//             className="w-full h-full object-cover z-0"
//             autoPlay
//             muted={isMuted}
//             loop
//           />
//         )}

//         {/* Controls */}
//         <div
//           id="video-controls"
//           className={`absolute bottom-4 left-0 px-4 flex gap-2 z-20 w-full justify-between transition-transform duration-500 ${
//             showControls ? "translate-y-0" : "lg:translate-y-18"
//           }`}
//         >
//           {/* Video Progress Bar */}
//           <div className="absolute left-0 -top-5 w-full h-1 bg-black/30 z-30">
//             <div
//               className="h-full bg-[#d0ff71] transition-all duration-200"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <button
//             onClick={togglePlay}
//             className="bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center cursor-pointer rounded-full"
//           >
//             {isPlaying ? (
//               <IoIosPause className="w-4 h-4" />
//             ) : (
//               <FaPlay className="w-3 h-3" />
//             )}
//           </button>
//           <button
//             onClick={toggleMute}
//             className="bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
//           >
//             {isMuted ? (
//               <HiSpeakerXMark className="w-4 h-4" />
//             ) : (
//               <HiSpeakerWave className="w-3 h-3" />
//             )}
//           </button>
//         </div>

//         {/* Custom cursor */}
//         <div
//           ref={cursorRef}
//           className="fixed pointer-events-none hidden w-24 h-24  rounded-full bg-[#d0ff71] flex items-center justify-center z-[9999] text-white -translate-x-1/2 -translate-y-1/2"
//         >
//           <TfiClose className="w-6 h-6 text-black" />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";

export default function VideoModal({ videoUrl, isOpen, onClose }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const cursorRef = useRef(null);
  const videoAreaRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Load YouTube API
  useEffect(() => {
    if (!isOpen || !youtubeId) return;

    const loadYT = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        tag.onload = createPlayer;
      } else createPlayer();
    };

    const createPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: youtubeId,
        playerVars: { autoplay: 1, controls: 0, mute: 1, modestbranding: 1 },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.mute();
            setIsMuted(true);
            setIsPlaying(true);
          },
        },
      });
    };

    loadYT();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        setIsPlaying(false);
      }
    };
  }, [isOpen, youtubeId]);

  // Toggle play
  const togglePlay = (e) => {
    e.stopPropagation();
    if (youtubeId && playerRef.current) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
      setIsPlaying(state !== 1);
    }
  };

  // Toggle mute
  const toggleMute = (e) => {
    e.stopPropagation();
    if (youtubeId && playerRef.current) {
      if (isMuted) playerRef.current.unMute();
      else playerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  // Auto-hide controls
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Custom cursor
  useEffect(() => {
    if (!isOpen) return;
    const cursor = cursorRef.current;
    const videoArea = videoAreaRef.current;
    const controls = document.getElementById("video-controls");

    const move = (e) => {
      if (!cursor || !videoArea) return;
      const rect = videoArea.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        let inControls = false;
        if (controls) {
          const controlsRect = controls.getBoundingClientRect();
          inControls =
            e.clientX >= controlsRect.left &&
            e.clientX <= controlsRect.right &&
            e.clientY >= controlsRect.top &&
            e.clientY <= controlsRect.bottom;
        }

        if (inControls) {
          cursor.style.display = "none";
          videoArea.style.cursor = "auto";
        } else {
          cursor.style.display = "flex";
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
          videoArea.style.cursor = "none";
        }
      } else {
        cursor.style.display = "none";
        videoArea.style.cursor = "auto";
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isOpen]);

  // Progress bar
  useEffect(() => {
    let interval;
    if (isOpen && youtubeId && playerRef.current) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player && player.getDuration && player.getCurrentTime) {
          const duration = player.getDuration();
          const current = player.getCurrentTime();
          if (duration > 0) setProgress((current / duration) * 100);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isOpen, youtubeId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(10px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (playerRef.current) playerRef.current.pauseVideo();
          onClose();
        }
      }}
    >
      <div
        ref={videoAreaRef}
        className="relative w-11/12 max-w-5xl aspect-video rounded-xl overflow-hidden group bg-black cursor-none"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Overlay div on top of iframe */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          onClick={()=>onClose()}
        ></div>

        <div ref={iframeRef} className="w-full h-full z-0"></div>

        {/* Controls */}
        <div
          id="video-controls"
          className={`absolute bottom-4 left-0 px-4 flex gap-2 z-20 w-full justify-between transition-transform duration-500 ${
            showControls ? "translate-y-0" : "lg:translate-y-18"
          }`}
        >
          <div className="absolute left-0 -top-5 w-full h-1 bg-black/30 z-30">
            <div
              className="h-full bg-[#d0ff71] transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center cursor-pointer rounded-full"
          >
            {isPlaying ? (
              <IoIosPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-3 h-3" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
          >
            {isMuted ? (
              <HiSpeakerXMark className="w-4 h-4" />
            ) : (
              <HiSpeakerWave className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className="fixed pointer-events-none hidden w-24 h-24 rounded-full bg-[#d0ff71] flex items-center justify-center z-[9999] text-white -translate-x-1/2 -translate-y-1/2"
        >
          <TfiClose className="w-6 h-6 text-black" />
        </div>
      </div>
    </div>
  );
}
