import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import html2canvas from "html2canvas";
const PDFMapExport = () => {
  const mapElement = useMap();
  const [mapDiv, setMapDiv] = useState(null);

  const downloadScreenshot = async () => {
    let canvas = await html2canvas(mapDiv, {
      allowTaint: true,
      useCORS: true,
      logging: true,
    });

    let image = canvas.toDataURL({
      type: "image/jpeg",
      quality: 1.0,
    });

    const a = document.createElement("a");
    a.href = image;
    a.download = "map.jpg";
    a.click();
  };

  useEffect(() => {
    if (!mapElement) return;
    setMapDiv(mapElement.getDiv());
  }, [mapElement]);

  useEffect(() => {
    if (mapDiv) {
      console.log(`Ready to download map as image`);
    }
  }, [mapDiv]);

  return (
    <div>
      <button
        type="button"
        className="btn border-1 border-gray-700"
        onClick={downloadScreenshot}
      >
        Download screenshot
      </button>
    </div>
  );
};

export default PDFMapExport;
