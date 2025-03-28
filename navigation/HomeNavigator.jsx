// import {
//   requestTrackingPermissionsAsync,
//   getTrackingPermissionsAsync,
// } from "expo-tracking-transparency";
import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStateValue } from "../StateProvider";
import { COLORS } from "../variables/color";
import settingsStorage from "../app/settings/settingsStorage";
import { __ } from "../language/stringPicker";
import authStorage from "../app/auth/authStorage";
import api, {
  removeAuthToken,
  setAuthToken,
  setCurrencyLocale,
  setLocale,
} from "../api/client";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Localization from "expo-localization";
import * as SplashScreen from "expo-splash-screen";

import ListingDetailScreen from "../screens/ListingDetailScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DrawerNavigator from "./DrawerNavigator";
import MyListingsScreen from "../screens/MyListingsScreen";
import FavouriteScreen from "../screens/FavoritesScreen";
import ReportScreen from "../screens/ReportScreen";
import MyMembershipScreen from "../screens/MyMembershipScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import FAQScreen from "../screens/FAQScreen";
import HowToSellFastScreen from "../screens/HowToSellFastScreen";
import MoreScreen from "../screens/MoreScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditPersonalDetailScreen from "../screens/EditPersonalDetailScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import TnCScreen from "../screens/TnCScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

import EditListingScreen from "../screens/EditListingScreen";
import SelectLocationScreen from "../screens/SelectLocationScreen";
import SendEmailScreen from "../screens/SendEmailScreen";
import SelectCategoryScreen from "../screens/SelectCategoryScreen";
import StoreDetailsScreen from "../screens/StoreDetailsScreen";
import AllStores from "../screens/AllStores";
import MyStoreScreen from "../screens/MyStoreScreen";
import { routes } from "./routes";
import MembershipsScreen from "../screens/MembershipsScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PromoteScreen from "../screens/PromoteScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import PaymentDetailScreen from "../screens/PaymentDetailScreen";

import { defaultLng } from "../language/stringPicker";

import rtlSupportedLng from "../language/rtlSupoortedLng.json";
import ChatScreenSingle from "../screens/ChatScreenSingle";
import ForgotPassScreen from "../screens/ForgotPassScreen";
import OTPVerificationScreen from "../screens/OTPVerificationScreen";
import MyDocumentsScreen from "../screens/MyDocumentsScreen";
import PrivacynSafetyScreen from "../screens/PrivacynSafetyScreen";
import HiddenListings from "../screens/HiddenListings";
import BlockedUsers from "../screens/BlockedUsers";
import { miscConfig } from "../app/services/miscConfig";
import { admobConfig } from "../app/services/adMobConfig";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const [{ user, auth_token, appSettings, config }, dispatch] = useStateValue();
  const [userSet, setUserSet] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [configUpdated, setConfigUpdated] = useState(false);
  const [notiConfig, setNotiConfig] = useState([]);
  const [deviceLocale, setDeviceLocale] = useState(
    Localization.locale.slice(0, 2)
  );

  // const getATT = async () => {
  //   const { granted, status } = await getTrackingPermissionsAsync();
  //   if (!granted || !status === "granted") {
  //     const { status: statusReq } = await requestTrackingPermissionsAsync();
  //     if (!statusReq === "granted") {
  //       Alert.alert("", __("adMobTexts.appDisabledAlert", appSettings.lng), [
  //         {
  //           text: __("adMobTexts.okButton", appSettings.lng),
  //           onPress: () => {
  //             return;
  //           },
  //         },
  //       ]);
  //     }
  //   }
  // };

  useEffect(() => {
    // if (admobConfig?.admobEnabled) {
    //   getATT();
    // }
    restoreSettings();
    restoreUser();
    updateConfigData();
  }, []);

  const restoreUser = async () => {
    const storedUser = await authStorage.getUser();
    if (!storedUser) return;
    dispatch({
      type: "SET_AUTH_DATA",
      data: {
        user: JSON.parse(storedUser).user,
        auth_token: JSON.parse(storedUser).jwt_token,
      },
    });
    setUserSet(true);
  };
  const updateChatBadge = () => {
    setAuthToken(auth_token);
    api.get("my/chat").then((res) => {
      if (res.ok) {
        removeAuthToken();
        const badgeNumber = res.data.filter(
          (_chat) => _chat.is_read == 0 && user.id != _chat.source_id
        ).length;

        if (badgeNumber) {
          dispatch({
            type: "SET_CHAT_BADGE",
            chat_badge: badgeNumber,
          });
        }
      } else {
        removeAuthToken();
        // Error updating chat info
      }
    });
  };
  const restoreSettings = async () => {
    const storedSettings = await settingsStorage.getAppSettings();
    if (!storedSettings) {
      if (
        rtlSupportedLng.includes(defaultLng) &&
        !rtlSupportedLng.includes(deviceLocale)
      ) {
        dispatch({
          type: "SET_RTL_SUPPORT",
          rtl_support: true,
        });
      }
      setLocale(defaultLng);
      setSettingsUpdated(true);
      return;
    }
    const parsedSettings = JSON.parse(storedSettings);
    if (Object.keys(parsedSettings).length) {
      if (parsedSettings?.notifications) {
        setNotiConfig(parsedSettings.notifications);
      }
      if (
        parsedSettings?.lng &&
        rtlSupportedLng.includes(parsedSettings.lng) &&
        !rtlSupportedLng.includes(deviceLocale)
      ) {
        dispatch({
          type: "SET_RTL_SUPPORT",
          rtl_support: true,
        });
      }
      setLocale(parsedSettings?.lng || defaultLng);
      if (parsedSettings?.dynamic_currency) {
        setCurrencyLocale(parsedSettings.dynamic_currency);
      }
      dispatch({
        type: "SET_SETTINGS",
        appSettings: { ...appSettings, ...parsedSettings },
      });
      setSettingsUpdated(true);
    }
  };

  useEffect(() => {
    setLocale(appSettings?.lng || defaultLng);
  }, [appSettings.lng]);
  useEffect(() => {
    setCurrencyLocale(appSettings.dynamic_currency);
  }, [appSettings.dynamic_currency]);

  // Send push token to server

  useEffect(() => {
    if (settingsUpdated && configUpdated) {
      if (miscConfig?.enablePushNotification) {
        registerForPushNotificationsAsync().then((token) =>
          sendPushToken(token)
        );
      }
      hideSplash();
    } else {
      return;
    }
  }, [settingsUpdated, configUpdated]);

  const hideSplash = async () => {
    await SplashScreen.hideAsync();
  };

  const sendPushToken = (pt) => {
    // return;
    if (user && auth_token) {
      setAuthToken(auth_token);
    }
    let nCon = [];
    if (notiConfig?.length) {
      notiConfig.map((_item) => {
        if (config.pn_events.includes(_item)) {
          nCon.push(_item);
        }
      });
    }
    api
      .post("push-notification/add-device", {
        push_token: pt,
        events: nCon,
      })
      .then((res) => {
        if (!res?.ok) {
          console.log(
            __("alerts.notificationRegistrationFail", appSettings.lng),
            res.data
          );
        }
      })
      .then(() => {
        if (user) {
          removeAuthToken();
        }
      });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert(__("alerts.notificationPermission", appSettings.lng));
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert(__("alerts.simulatorAlert", appSettings.lng));
    }
    dispatch({
      type: "SET_PUSH_TOKEN",
      push_token: token,
    });
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    // alert(token);
    return token;
  };

  // chat badge update call
  useEffect(() => {
    if (!userSet) return;
    updateChatBadge();
  }, [userSet]);

  const updateConfigData = () => {
    api
      .get("config")
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: "SET_CONFIG",
            config: res.data,
          });
        } else {
          // TODO add error storing
        }
      })
      .then(() => setConfigUpdated(true));
  };

  if (settingsUpdated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: __("headerBackButtonTitle", appSettings.lng),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 50,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name={routes.drawerNavigator}
          component={DrawerNavigator}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.listingDetailScreen}
          component={ListingDetailScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name={routes.sendEmailScreen}
          component={SendEmailScreen}
          options={{
            title: __("screenTitles.sendEmailScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.contactUsScreen}
          component={ContactUsScreen}
          options={{
            title: __("screenTitles.contactUsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.reportScreen}
          component={ReportScreen}
          options={{ title: __("screenTitles.reportScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.chatScreen}
          component={ChatScreen}
          options={{ title: __("screenTitles.chatScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.chatScreenSingle}
          component={ChatScreenSingle}
          options={{
            title: __("screenTitles.chatScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.selectLocationScreen}
          component={SelectLocationScreen}
          options={{
            title: __("screenTitles.selectLocationScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.settingsScreen}
          component={SettingsScreen}
          options={{
            title: __("screenTitles.settingsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.loginScreen}
          component={LoginScreen}
          options={{
            title: __("screenTitles.loginScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.signUpScreen}
          component={SignUpScreen}
          options={{
            title: __("screenTitles.signUpScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.forgotPassScreen}
          component={ForgotPassScreen}
          options={{
            title: __("screenTitles.forgotPassScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.myListingsScreen}
          component={MyListingsScreen}
          options={{
            title: __("screenTitles.myListingsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.myMembershipScreen}
          component={MyMembershipScreen}
          options={{
            title: __("screenTitles.myMembershipScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.favouriteScreen}
          component={FavouriteScreen}
          options={{
            title: __("screenTitles.favoritesScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.myProfileScreen}
          component={MyProfileScreen}
          options={{
            title: __("screenTitles.myProfileScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.fAQScreen}
          component={FAQScreen}
          options={{ title: __("screenTitles.fAQScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.howToSellFastScreen}
          component={HowToSellFastScreen}
          options={{
            title: __("screenTitles.howtoSellFastScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.moreScreen}
          component={MoreScreen}
          options={{ title: __("screenTitles.moreScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.aboutAppScreen}
          component={AboutAppScreen}
          options={{
            title: __("screenTitles.aboutAppScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.selectcategoryScreen}
          component={SelectCategoryScreen}
          options={{
            title: __("screenTitles.selectCategoryScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.privacyPolicyScreen}
          component={PrivacyPolicyScreen}
          options={{
            title: __("screenTitles.privacyPolicyScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.tnCScreen}
          component={TnCScreen}
          options={{ title: __("screenTitles.tNCScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.editPersonalDetailScreen}
          component={EditPersonalDetailScreen}
          options={{
            title: __("screenTitles.editPersonalDetailScreen", appSettings.lng),
            header: () => null,
          }}
        />
        <Stack.Screen
          name={routes.editListingScreen}
          component={EditListingScreen}
          options={{
            title: __("screenTitles.editListingScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.storeDetailsScreen}
          options={{
            header: () => null,
            title: __("screenTitles.storeDetailsScreen", appSettings.lng),
          }}
          component={StoreDetailsScreen}
        />
        <Stack.Screen
          name={routes.allStoresScreen}
          component={AllStores}
          options={{ title: __("screenTitles.allStores", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.myStoreScreen}
          component={MyStoreScreen}
          options={{ title: __("screenTitles.myStoreScreen", appSettings.lng) }}
        />
        <Stack.Screen
          name={routes.membershipsScreen}
          component={MembershipsScreen}
          options={{
            title: __("screenTitles.membershipsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.paymentMethodScreen}
          component={PaymentMethodScreen}
          options={{
            title: __("screenTitles.paymentMethodScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.promoteScreen}
          component={PromoteScreen}
          options={{
            title: __("screenTitles.promoteScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.paymentsScreen}
          component={PaymentsScreen}
          options={{
            title: __("screenTitles.paymentsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.paymentDetailScreen}
          component={PaymentDetailScreen}
          options={{
            title: __("screenTitles.paymentDetailScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.oTPScreen}
          component={OTPVerificationScreen}
          options={{
            title: __("screenTitles.oTPScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.documentsScreen}
          component={MyDocumentsScreen}
          options={{
            title: __("screenTitles.documentsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.privacynSafetyScreen}
          component={PrivacynSafetyScreen}
          options={{
            title: __("screenTitles.privacynSafetyScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.hiddenListingsScreen}
          component={HiddenListings}
          options={{
            title: __("screenTitles.hiddenListingsScreen", appSettings.lng),
          }}
        />
        <Stack.Screen
          name={routes.blockedUsersScreen}
          component={BlockedUsers}
          options={{
            title: __("screenTitles.blockedUsersScreen", appSettings.lng),
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bg_splash,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/logo_header.png")}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
            backgroundColor: "#2696BE",
          }}
        />
      </View>
    );
  }
};

export default HomeNavigator;
