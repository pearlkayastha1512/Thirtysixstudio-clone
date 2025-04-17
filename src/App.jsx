import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect,useState,useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function App() {
  const[showCanvas, setShowCanvas]= useState((false));
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(()=>{
    const locomotiveScroll = new LocomotiveScroll();
  },[]);
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  return (
    <>
    <span ref={growingSpan} className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"></span>
    <div className="w-full relative min-h-screen  text-white font-['Helvetica_Now_Display']">
      {showCanvas && data[0].map((canvasdets,index)=>(
        <Canvas key={index} details={canvasdets}/>
      ))}
      <div className="w-full z-[1] h-screen ">
      <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="text-container  px-[20%] w-full">
          <div className = "text w-[50%]">
            <h3 className="text-4xl leading-[1.5]">
            At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
            </h3>
            <p className="text-lg w-[80%] mt-10 font-normal">
            We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
           </p>
           <p className="text-md mt-10">scroll</p>
          </div>
          </div>
          <div className="overflow-x-hidden w-full">
          <div className="w-full absolute bottom-0 left-0">
            <h1 ref={headingref} className="text-[17rem] font-normal tracking-tight leading-none pl-5">
              thirtysixstudios</h1>
          </div>
          </div>
          
        

      </div>
    </div>
    <div className="w-full relative h-screen text-white mt-32 px-10">
    {showCanvas && data[1].map((canvasdets,index)=>(
        <Canvas key={index} details={canvasdets}/>
      ))}
      <div>
    </div>
      <h1 className="text-8xl">What we do</h1>
      <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
      We aim to elevate digital production in the advertising space, bringing your ideas to life.
  </p>
  <img 
  className="w-[80%] mt-10"
  src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />

    </div>
    
    </>
  );
}

export default App;