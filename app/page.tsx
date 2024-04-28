"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { vaultData, wastlandersData } from "./constant";
import { motion, useAnimation } from "framer-motion";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [category, setCategory] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const allData = useMemo(() => {
    return [vaultData, wastlandersData];
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: scrolled ? -allData[category].length * 50 : 0,
      transition: { duration: 0.7 },
    });
  }, [scrolled, allData, category, controls]);
  return (
    <main className="flex flex-1 h-screen w-screen justify-between">
      <div className="absolute h-[90%] w-full z-0">
        <Image
          src="https://m.media-amazon.com/images/A/V1/A83f7RAT9t0FN6E2NmPlCRr3rdpuC64Jnb/HoHFr5N9ccRSaHf8fiqYiw7Cyp31XzQ80zMWBY6qSg2SffwySwBDPHJ2gFYheIbBdbrfMGa8I+v4LnhRlKTmDKSWEqa3BjN6jtSgB+LHpqK+yRN7FaulWebwn+fS5+/P013SQlFIkT1vpHVKc+D3nYHYFL1cWpRckHiVf/88V+DJ8HbA4N7tsHy+mSHm7wq2mrX/Q+nGaSkxHCasIzRcJTUCu0nQ7omBaSrAz3qH0bKjm/UiGpkjAz7F8+XEuXcZosc8vpEO/xrJe4zsY4Vl312DJZSIQIwzn/CfYBP8RwtoPz00CTQ==_/eyJidWNrZXQiOiJwdi1zdGFybGlnaHQtY29udGVudGRiLW1lZGlhLXByb2QtdXMtZWFzdC0xIiwib2JqZWN0S2V5IjoidXBsb2Fkcy8yMDI0LTAzLTEzL2RiZDczMWNkLWY0YzctNDk3OS05YTMwLTQyY2NkOGY5MDY4ZC5qcGciLCJleHBpcmVEYXRlVGltZSI6IjI1MjQ2MzY3OTkiLCJzdHlsZUNvZGUiOiJfU1gxNjAwXyJ9"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div
        className="absolute h-[90%] w-full z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      />

      <div className="flex z-10 h-[90%] pt-20 pb-10 w-[50%] overflow-hidden">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-1 flex-col pl-20">
            <div className="space-x-2">
              <button
                className={twMerge(
                  "p-4 rounded-full border-2 border-white min-w-40",
                  category === 0 ? "bg-white " : "bg-black"
                )}
                onClick={() => {
                  setSelectedIndex(0);
                  setCategory(0);
                  if (category !== 0) {
                    controls.set({
                      x: 0,
                    });
                    setScrolled(false);
                  }
                }}
              >
                <p
                  className={twMerge(
                    "font-medium text-xl",
                    category === 0 ? "text-black" : "text-white"
                  )}
                >
                  Vault Dwellers
                </p>
              </button>
              <button
                className={twMerge(
                  "p-4 rounded-full border-2 border-white min-w-40",
                  category === 1 ? "bg-white " : "bg-black"
                )}
                onClick={() => {
                  setSelectedIndex(0);
                  setCategory(1);
                  if (category !== 1) {
                    controls.set({
                      x: 0,
                    });
                    setScrolled(false);
                  }
                }}
              >
                <p
                  className={twMerge(
                    "font-medium text-xl",
                    category === 1 ? "text-black" : "text-white"
                  )}
                >
                  Wastlanders
                </p>
              </button>
            </div>
            <h1 className="my-4 font-bold text-3xl text-white">
              {allData[category][selectedIndex].name}
            </h1>

            <h2 className="font-thin pr-14 text-white">
              {allData[category][selectedIndex].description}
            </h2>
          </div>
          <div className="flex flex-row flex-grow-0 w-full relative pl-20 ">
            {scrolled ? (
              <motion.div
                className="absolute w-10 bg-black left-0 z-40 top-0 bottom-0 opacity-50 flex justify-center items-center"
                whileHover={{ opacity: 0.8 }}
                onClick={() => setScrolled(false)}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  color="white"
                  fontSize={"40"}
                />
              </motion.div>
            ) : null}

            <motion.div
              className="flex flex-row flex-grow-0 w-full"
              animate={controls}
            >
              {allData[category].map((card, index) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={twMerge(
                    "flex flex-shrink-0 h-28 w-28 relative m-1 border-2",
                    selectedIndex === index ? "border-white" : "border-black"
                  )}
                  onClick={() => setSelectedIndex(index)}
                  transition={{ duration: 0.2 }}
                  key={index}
                >
                  <Image
                    src={allData[category][index].thumbnail}
                    alt="Background Image"
                    layout="fill"
                    quality={100}
                  />
                </motion.div>
              ))}
            </motion.div>
            {scrolled ? null : (
              <motion.div
                className="absolute w-10 bg-black right-0 z-40 top-0 bottom-0 opacity-50 flex justify-center items-center"
                whileHover={{ opacity: 0.8 }}
                onClick={() => setScrolled(true)}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color="white"
                  fontSize={"40"}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="flex  h-[90%] z-10 p-1 w-[48%]">
        <motion.div
          className="relative w-full h-full"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          key={selectedIndex}
        >
          <Image
            src={allData[category][selectedIndex].url}
            alt="Background Image"
            layout="fill"
            quality={100}
          />
        </motion.div>
      </div>
    </main>
  );
}
