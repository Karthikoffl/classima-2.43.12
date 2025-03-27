import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

// Custom Components & Functions
import { getTnC } from "../language/stringPicker";
import { COLORS } from "../variables/color";
import { useStateValue } from "../StateProvider";

const { width: screenWidth } = Dimensions.get("window");
const TnCScreen = () => {
  const [{ appSettings, rtl_support, ios }] = useStateValue();
  const [tnCData, setTnCData] = useState(getTnC(appSettings.lng));

  const rtlText = rtl_support && {
    writingDirection: "rtl",
    textAlign: ios ? "justify" : "right",
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainWrap}>
          <View style={styles.imgWrap}>
            <Image
              source={require("../assets/tnc_bg.png")}
              style={styles.img}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: "5%",
            }}
          >
            <Text style={[styles.paraData, rtlText]}>
              Effective Date: 6th December 2024 Welcome to FalconXchange.in!
              These terms and conditions govern your access to and use of our
              website and services. By accessing or using FalconXchange.in, you
              agree to be bound by these terms. If you do not agree with these
              terms, please do not use our services. — 1. General Information
              Owner Details: – Business Name: Sri Aalli Kuzli Enterprise –
              Office Address: No 6/61, 2nd Floor, Avadi Main Road, Sennerkuppam,
              Poonamallee, Chennai – 600056 – Email: falconxchange07@gmail.com
              FalconXchange.in facilitates connections between users for buying,
              selling, and trading goods and services. It also allows users to
              purchase bundled packages to join our **Verified Agency Program**
              via our integrated payment gateway. — 2. Eligibility – You must be
              18 years or older to use FalconXchange.in. – By registering, you
              confirm that all information provided is accurate and that you are
              legally capable of entering into binding agreements. — 3. Verified
              Agency Program – Users may apply to join the Verified Agency
              Program by purchasing one of the bundled packages available
              through our payment gateway. – The payment made for the bundled
              package is non-refundable, except in cases of technical errors or
              service unavailability caused by FalconXchange.in. — 4. Payments –
              All payments are processed through a third-party payment gateway
              integrated into FalconXchange.in. – FalconXchange.in is not
              responsible for any payment failures, unauthorized transactions,
              or technical issues caused by the payment gateway provider. — 5.
              User Responsibilities – Users are solely responsible for the
              content they post on FalconXchange.in. – Users must ensure that
              all goods or services listed comply with applicable laws and
              regulations. – Fraudulent activities, false listings, or any
              misuse of the platform will result in account suspension or
              termination. — 6. Prohibited Activities You may not use
              FalconXchange.in to: – Post or sell illegal, prohibited, or
              restricted goods and services. – Infringe upon the intellectual
              property rights of others. – Misrepresent your identity, goods, or
              services. – Conduct activities that violate applicable laws or
              regulations. — 7. Disclaimer – FalconXchange.in acts as a platform
              to connect buyers and sellers. We do not take part in the
              transaction between users and are not responsible for the quality,
              safety, legality, or delivery of goods and services listed by
              users. – Users interact with others at their own risk. We
              encourage all users to practice caution and due diligence when
              dealing with unknown parties. — 8. Limitation of Liability –
              FalconXchange.in shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from the use of the
              website or services. – Our liability is limited to the amount paid
              by users for the bundled package in cases of disputes related to
              the Verified Agency Program. — 9. Privacy Policy We value your
              privacy. Please refer to our **Privacy Policy** to understand how
              we collect, use, and protect your information. — 10. Modifications
              to Terms FalconXchange.in reserves the right to modify these terms
              and conditions at any time without prior notice. The updated terms
              will be posted on this page, and your continued use of the
              platform constitutes acceptance of the changes. — 11. Governing
              Law These terms and conditions shall be governed by and construed
              in accordance with the laws of India. Any disputes arising from
              these terms will be subject to the jurisdiction of the courts in
              Chennai, Tamil Nadu. — If you have any questions or concerns,
              please contact us at falconxchange07@gmail.com. Sri Aalli Kuzli
              Enterprise No 6/61, 2nd Floor, Avadi Main Road, Sennerkuppam,
              Poonamallee, Chennai – 600056 falconxchange07@gmail.com
            </Text>
            {/* {tnCData.map((_tnc, index) => (
              <View style={styles.tncParaWrap} key={index}>
                {!!_tnc.paraTitle && (
                  <Text style={[styles.paraTitle, rtlText]}>
                    {_tnc.paraTitle}
                  </Text>
                )}
                {!!_tnc.paraData && (
                  <Text style={[styles.paraData, rtlText]}>
                    {_tnc.paraData}
                  </Text>
                )}
              </View>
            ))} */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  img: {
    height: screenWidth * 0.55,
    width: screenWidth * 0.55,
    resizeMode: "contain",
  },
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  mainWrap: {
    paddingVertical: 15,
  },
  paraTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  paraData: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 22,
  },
  tncParaWrap: {
    marginBottom: 20,
    width: "100%",
  },
});

export default TnCScreen;
