'use client'

import { AmoeDrawer } from "@/components";
import { Button } from "@/components/ui/button/button.component"
import { messages } from "@/shared/constants/messages";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import MuxVideo from '@mux/mux-video-react';
import { useWidth } from "@/hooks";


export function Header({ session }: { session: Session | null }) {
  const { header: {
    headingA,
    headingB,
    headingC,
    subHeading,
    learnMore,
    signUp
  } } = messages;
  // bg-[23%] 

  const [videoLoaded, setVideoLoaded] = useState(false);

  const { width } = useWidth();

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <header>
      <div className="relative">


        {width > 640 ? <MuxVideo
          style={{ minWidth: '100vw', height: '100%', maxWidth: '100%' }}
          playbackId="BGEwuTu7kUeXVzTLZmhkHcmsi1t3VXQu8vrxYIItLCo"
          streamType="on-demand"
          onLoadedData={handleVideoLoaded}
          controls={false}
          autoPlay
          muted
          loop
        />
          :
          // <MuxVideo
          //   style={{ minWidth: '100vw', height: '100%', maxWidth: '100%' }}
          //   playbackId="qQjEtUKAgRKp02MXrIt4kUSFPSI3a8NZQG51a6lvhJJU"
          //   streamType="on-demand"
          //   controls={false}
          //   onLoadedData={handleVideoLoaded}
          //   playsInline
          //   autoPlay
          //   muted
          //   // loop
          // />

          <video
            className="z-80"
            id="background-video"
            loop
            autoPlay
            muted
            onLoadedData={handleVideoLoaded}
            playsInline
            style={{
              position: "relative",
              width: "100%",
              left: 0,
              top: 0,
            }}
          >
            <source src='https://mila-live-bucket.s3.amazonaws.com/header-video/header_mobile_video.MOV' />
          </video>
        }

        {videoLoaded && <div id="content" className="-top-[75px] absolute z-90 sm:left-[231px] sm:top-[286px] flex items-center justify-center">
          <div className="sm:w-[58%] mx-[33px] my-[253px] sm:my-0 sm:mx-0 text-center flex flex-col gap-4 ">
            <div className="font-light text-4xl sm:text-7xl leading-[43px] sm:leading-[64.8px] text-white font-tt-ramillas">
              {headingA} <span className="italic">{headingB}</span> {headingC}
            </div>
            <div className="font-normal text-[18px] text-white leading-[30px] ">
              {subHeading}
            </div>

            {!session && (
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                <Button className="h-[40px]" variant="secondary" asChild>
                  <Link href="/#how-it-works">
                    {learnMore}
                  </Link>
                </Button>
                <Button className="h-[40px]" variant="secondary-outline" asChild>
                  <Link href="/#pricing">
                    {signUp}
                  </Link>
                </Button>

                <AmoeDrawer />
              </div>
            )}
          </div>
        </div>}
      </div>
    </header >
  )
}