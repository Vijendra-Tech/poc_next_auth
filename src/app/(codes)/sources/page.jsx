"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FolderClosed, Folder } from "lucide-react";
import { covertName } from "@/utils/util";
import Link from "next/link";

function Sources() {
  const [files, setFiles] = useState([]);
  const [currentFileContent, setCurrentFileContent] = useState("");
  const [srcDirectory, setSrcDirectory] = useState([]);
  const [dirName, setDirName] = useState("");

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Vijendra-Tech/poc_code-mirror/contents",
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
            },
            next: {
              revalidate: 60,
            },
          }
        );

        if (!response?.ok) {
          console.log("Error in Api response");
        }

        const json = await response.json();
        setFiles(json);
        console.log("response", json);

        return parseInt(json["stargazers_count"]).toLocaleString();
      } catch (error) {}
    };
    getCodes();
  }, []);
  const handleClick = (file) => {
    if (file.type === "file") {
      fetch(file.download_url)
        .then((response) => response.text())
        .then((data) => {
          setCurrentFileContent(data);
        });
    }
  };

  const loadSrcFiles = async (dir) => {
    setDirName(dir);
    try {
      const response = await fetch(
        `https://api.github.com/repos/Vijendra-Tech/poc_code-mirror/contents/${dir}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response?.ok) {
        console.log("Error in Api response");
      }

      const json = await response.json();
      setSrcDirectory(json);
      console.log("response", json);
    } catch (error) {}
  };

  const renderSrcDirectory = useCallback(() => {
    return (
      <>
        <p className="text-white flex justify-center ">{dirName}</p>
        <hr />
        {srcDirectory.map((file) => (
          <div key={file.sha} className="p-2 text-white">
            <a href={file.html_url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </div>
        ))}
      </>
    );
  }, [srcDirectory, dirName]);

  const renderDirectory = (directory) => {
    return (
      <div key={directory.sha}>
        <h2>{directory.name}</h2>
        <div>
          {directory?.children?.map((child) =>
            child.type === "file" ? (
              <div key={child.sha} className="text-white p-2">
                <a
                  className="cursor-pointer"
                  rel="noopener noreferrer"
                  onClick={() => handleClick(child)}
                >
                  {child.name}
                </a>
              </div>
            ) : child.type === "dir" ? (
              <div key={child.sha} className="text-white">
                <a
                  className="cursor-pointer"
                  rel="noopener noreferrer"
                  onClick={() => loadSrcFiles(child.name)}
                >
                  <span className="flex flex-row pl-2 items-center">
                    <span>
                      <Folder className="w-4 h-4" color="blue" />
                    </span>
                    <span> {child.name}</span>
                  </span>
                </a>
              </div>
            ) : (
              renderDirectory(child)
            )
          )}
        </div>
      </div>
    );
  };
  const renderFiles = () => {
    const root = {
      type: "dir",
      name: "/",
      children: files,
    };

    return renderDirectory(root);
  };

  return (
    <>
      <div className="mt-20  min-h-screen">
        <Link
          href="/"
          className={covertName("", "absolute mt-20 left-4 md:top-8 md:left-8")}
        >
          Back
        </Link>
        <div className="mt-30 flex items-center justify-center p-10">
          <h6 className="rounded-md  p-5 w-96">
            NEXT Js + NEXT-Auth+React
          </h6>
        </div>
        <div className="grid grid-cols-2- grid-flow-col gap-0 min-h-screen">
          <div className="bg-black w-60 min-h-full overflow-y-auto h-full">
            <div className="rounded-br-lg bg-gray-50 h-10 text-black">
              <span className="flex flex-row">
                <span>
                  <FolderClosed className="h-8 w-8" />
                </span>
                <span className="ml-1 mt-1">
                  <p className="text-black">Files</p>
                </span>
              </span>
            </div>
            {renderFiles()}
            <hr />
            {srcDirectory && renderSrcDirectory()}
          </div>
          <div className="bg-white min-h-full" style={{ width: "45rem" }}>
            {currentFileContent && (
              <div className="min-w-full shadow bg-white text-left font-bold text-black overflow-y-auto h-full">
                <h2 className="h-9 bottom-10 flex justify-center border border-b-4 ">
                  Current File Contents:
                </h2>
                <pre className="p-4">{currentFileContent}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sources;
