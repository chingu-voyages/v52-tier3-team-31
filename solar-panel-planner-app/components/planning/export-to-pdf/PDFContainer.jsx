"use client";
import { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const PDFContainer = ({ requests }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log(requests);
    }
  }, [loaded]);

  return (
    <div>
      {loaded && (
        <PDFViewer className="w-screen h-screen">
          <Document>
            <Page size="A4">
              <Text>{requests[0].address}</Text>
              <View></View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};

export default PDFContainer;
