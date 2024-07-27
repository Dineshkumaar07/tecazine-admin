import React, { useState, useEffect } from "react";

const Viewer = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        "https://tecazine-server.onrender.com/documents"
      );
      const data = await response.json();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  };

  const downloadDocument = (blobName) => {
    window.location.href = `https://tecazine-server.onrender.com/download/${encodeURIComponent(
      blobName
    )}`;
  };

  return (
    <div className="h-full flex flex-col p-5 font-poppins">
      <div className="">
        <h1 className="font-bold text-3xl  ">Tecazine Responses</h1>
        {!loading && (
          <ul className="mt-9 ">
            {documents.map((document) => (
              <li
                key={document}
                className=" p-3 m-2 rounded-md flex items-center cursor-pointer "
              >
                <div className="px-9 flex sm:flex-row flex-col sm:items-center sm:w-1/2 sm:justify-between gap-3 border-2 p-2 rounded-md hover:bg-purple-200 flex-grow lg:flex-none">
                  {document}
                  <button
                    onClick={() => downloadDocument(document)}
                    className="bg-purple-600 px-3 py-2 text-white rounded-lg "
                  >
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {loading && (
          <div className="h-[90svh] flex items-center justify-center">
            Loading Responses.....
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewer;
