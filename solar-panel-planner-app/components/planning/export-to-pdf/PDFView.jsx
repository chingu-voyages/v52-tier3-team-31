"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  Image,
  View,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import AdminGoogleMap from "@/components/AdminGoogleMap";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

Font.register({
  family: "Inter-400",
  src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50qjIw2boKoduKmMEVuLyfMZg.ttf",
});
Font.register({
  family: "Inter-700",
  src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ujIw2boKoduKmMEVuFuYMZg.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    fontFamily: "Inter-400",
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 25,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Inter-700",
  },

  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  map: {
    width: "480px",
    marginHorizontal: "auto",
    marginVertical: 15,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "pink",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const tableStyles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    margin: 20,
    textAlign: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
    margin: 2,
  },
  headerRow: {
    fontFamily: "Inter-700",
  },
  order: {
    width: "20%",
    fontFamily: "Inter-700",
  },
  orderNumber: {
    width: "20%",
    fontSize: "18px",
  },
  time: {
    width: "20%",
    textAlign: "left",
  },
  timeText: {
    fontSize: "18px",
  },
  detailsContainer: {
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  details: {
    width: "60%",
  },
  detailsAddress: {
    // width: "50%",
    fontFamily: "Inter-700",
  },
});

const PDFView = ({ date, requests, map }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    console.log("====> PDFView");
    if (map) {
      let imageData = sessionStorage.getItem("map-image");
      if (imageData) {
        console.log(`Found image data in sessionStorage`);
        setImageData(imageData);
        // setImageData("data:image/png;base64," + imageData);
        console.log(`Should print map with data : ${imageData}`);
      }
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log(
        `Date: ${date} / Requests : ${requests.length} /Show map ${map}`
      );
      console.log(`${sessionStorage.getItem("map-image")}`);
    }
  }, [loaded]);

  const downloadImageFromSessionStorage = () => {
    let imageData = sessionStorage.getItem("map-image");
    const a = document.createElement("a");
    a.href = imageData;
    a.download = "map.png";
    a.click();
  };

  return (
    <div>
      {loaded && (
        <PDFViewer className="w-screen h-screen">
          <Document>
            <Page style={styles.page} debug={false}>
              <Text style={styles.header} fixed>
                BrightGrid : Solar Panel Inspections
              </Text>
              <Text style={styles.title}>Vist Schedule : {date}</Text>
              {map && imageData && <Image src={imageData} style={styles.map} />}
              <View style={tableStyles.tableContainer}>
                <View style={[tableStyles.row, tableStyles.headerRow]}>
                  <Text style={tableStyles.order} wrap>
                    Visit{"\n"}Order
                  </Text>
                  <Text style={tableStyles.time}>Scheduled Time</Text>
                  <Text style={{ width: "50%" }}>Resident Details</Text>
                </View>
                {requests.map((request, index) => {
                  return (
                    <View style={tableStyles.row} key={index} wrap={false}>
                      <Text
                        style={[tableStyles.order, tableStyles.orderNumber]}
                      >
                        {index + 1}
                      </Text>
                      <Text style={[tableStyles.time, tableStyles.timeText]}>
                        {dayjs(request.scheduledDate).format("h:mm A")}
                      </Text>
                      <View style={tableStyles.detailsContainer}>
                        <Text style={tableStyles.details}>{request.name}</Text>
                        <Text style={tableStyles.details}>{request.phone}</Text>
                        <Text style={tableStyles.detailsAddress}>
                          {request.address}
                        </Text>
                      </View>
                      <Text style={tableStyles.remarks}></Text>
                    </View>
                  );
                })}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};

export default PDFView;
