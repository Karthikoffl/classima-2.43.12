import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
  Dimensions,
} from "react-native";

// Vector Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Custom Components & Functions
import { COLORS } from "../variables/color";
import { useStateValue } from "../StateProvider";
import { getPrivacyPolicy } from "../language/stringPicker";

const { width: deviceWidth } = Dimensions.get("window");
const PrivacyPolicyScreen = () => {
  const [{ appSettings, rtl_support, ios }] = useStateValue();
  const [privacyPolicyData, setPrivacyPolicyData] = useState(
    getPrivacyPolicy(appSettings.lng)
  );

  const rtlText = rtl_support && {
    writingDirection: "rtl",
    textAlign: ios ? "justify" : "right",
  };
  const rtlView = rtl_support && {
    flexDirection: "row-reverse",
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainWrap}>
          <View style={styles.bgImgWrap}>
            <Image
              source={require("../assets/pp_bg.png")}
              style={styles.bgImg}
            />
          </View>
          <View style={styles.detailWrap}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              Effective Date: 6th December 2024 Welcome to FalconXchange.in! At
              FalconXchange, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy outlines
              how we collect, use, disclose, and safeguard your information when
              you use our website. By accessing or using FalconXchange.in, you
              agree to the terms of this Privacy Policy. If you do not agree,
              please refrain from using our services. — 1. Information We
              Collect 1.1. Personal Information When you register on
              FalconXchange.in or purchase bundled packages, we may collect: –
              Name, email address, and phone number – Billing and payment
              information (e.g., credit card details processed via a third-party
              payment gateway) – Address or location details, if provided 1.2.
              Non-Personal Information We may collect non-personal information,
              including: – IP address, browser type, and operating system –
              Pages visited, time spent on the website, and other analytics data
              — 2. How We Use Your Information 2.1. Personal Information We use
              your personal information to: – Facilitate registration and
              account creation – Process payments for bundled packages – Provide
              customer support and respond to your inquiries – Send updates
              regarding your account, transactions, and promotional offers 2.2.
              Non-Personal Information We use non-personal information to: –
              Analyze website usage and improve our services – Enhance user
              experience through website customization — 3. Sharing of
              Information 3.1. Third-Party Services We may share your personal
              information with trusted third-party service providers, including:
              – Payment gateways to process transactions – Analytics providers
              to monitor and improve our website 3.2. Legal Requirements We may
              disclose your information to comply with legal obligations,
              enforce our terms, or protect the rights, safety, and property of
              FalconXchange.in, its users, or others. — 4. Cookies and Tracking
              Technologies We use cookies and similar tracking technologies to
              improve user experience, monitor website performance, and deliver
              personalized content. You can manage or disable cookies through
              your browser settings. — 5. Data Security We implement appropriate
              technical and organizational measures to protect your personal
              information against unauthorized access, loss, or misuse. However,
              no system can guarantee 100% security. Please ensure the
              confidentiality of your login credentials. — 6. User Rights You
              have the right to: – Access, update, or delete your personal
              information – Withdraw your consent for specific uses of your
              information – Opt-out of promotional emails by following the
              unsubscribe link To exercise these rights, please contact us at
              falconxchange07@gmail.com. — 7. Third-Party Links FalconXchange.in
              may contain links to third-party websites. We are not responsible
              for the privacy practices or content of these external sites. — 8.
              Retention of Information We retain your personal information for
              as long as necessary to provide services, comply with legal
              obligations, resolve disputes, and enforce agreements. — 9.
              Changes to This Policy FalconXchange.in reserves the right to
              modify this Privacy Policy at any time. Changes will be updated on
              this page, and continued use of the platform constitutes
              acceptance of the revised policy. — 10. Contact Us If you have any
              questions or concerns about this Privacy Policy or how we handle
              your information, please contact us at: Sri Aalli Kuzli Enterprise
              No 6/61, 2nd Floor, Avadi Main Road, Sennerkuppam, Poonamallee,
              Chennai – 600056 Email: falconxchange07@gmail.com
            </Text>
            {/* {privacyPolicyData.paras.map((_para, index) => (
              <View key={index} style={styles.descriptionParaWrap}>
                {!!_para.paraTitle && (
                  <Text style={[styles.paraTitle, rtlText]}>
                    {_para.paraTitle}
                  </Text>
                )}
                {_para.paraType === "para" ? (
                  <Text style={[styles.paraDetail, rtlText]}>
                    {_para.paraDetail}
                  </Text>
                ) : (
                  <View style={styles.bulletParaWrap}>
                    {_para.paraDetail.map((_bullet, index) => (
                      <View key={index} style={[styles.bulletWrap, rtlView]}>
                        <MaterialCommunityIcons
                          name="circle-medium"
                          size={15}
                          color="black"
                        />
                        <Text style={styles.bulletDetail}>{_bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {!!privacyPolicyData.link && !!privacyPolicyData.linkedPara.length && (
              <View style={styles.linkedParaWrap}>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {privacyPolicyData.linkedPara[0]}
                  <Text
                    style={styles.linkedText}
                    onPress={() => {
                      Linking.openURL(privacyPolicyData.link);
                    }}
                  >
                    {privacyPolicyData.linkedPara[1]}
                  </Text>
                  {privacyPolicyData.linkedPara[2]}
                </Text>
              </View>
            )} */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.35 * 1.5,
    resizeMode: "contain",
  },
  bgImgWrap: {
    width: deviceWidth,
    height: deviceWidth * 0.35 * 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  bulletDetail: {
    paddingHorizontal: 5,
    fontSize: 14,
    lineHeight: 22,
  },
  bulletParaWrap: {
    width: "100%",
    textAlign: "justify",
  },
  bulletWrap: {
    flexDirection: "row",
    marginRight: 5,
    alignItems: "center",
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  descriptionParaWrap: {
    marginBottom: 15,
    paddingRight: 5,
  },
  detailWrap: {
    width: "100%",
  },
  linkedParaWrap: {
    marginBottom: 10,
  },
  linkedText: {
    color: COLORS.blue,
    fontSize: 14,
    lineHeight: 22,
  },
  paraDetail: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 22,
  },
  paraTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mainWrap: {
    paddingHorizontal: "3%",
    paddingVertical: 15,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text_dark,
    marginBottom: 10,
  },
  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PrivacyPolicyScreen;
