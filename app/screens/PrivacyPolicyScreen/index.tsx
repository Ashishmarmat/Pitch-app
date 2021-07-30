import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import {ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';

const PrivacyPolicy = props => {
  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>{strings.PRIVACY_POLICY}</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView style={{paddingHorizontal: 10}}>
        <Text style={styles.tcP}>Privacy Policy</Text>
        <Text style={styles.DatetcL}>Updated March 3, 2020</Text>

        <Text style={styles.tcL}>
          This Privacy Policy (&quot;Policy&quot;) provides information about
          the data that Pitch (&quot;Pitch&quot; or &quot;We&quot;) may collect
          from users of our website (the &quot;Site&quot;) and/or our mobile
          application (the &quot;App&quot;) and how we use and share such
          information. By using the Site or the App, you agree to the terms of
          this Policy. We may change this Policy from time to time, and changes
          are effective upon posting. Please review our Privacy Policy
          regularly. Your continued use of Pitch after changes are posted
          constitutes your agreement to the changes. If you do not agree to the
          terms of this Policy, please discontinue your use of the Site and/or
          App.
        </Text>

        <Text style={styles.tcP}>What Information Do We Collect?</Text>
        <Text style={styles.tcL}>
          Each time you provide or transmit information to us via the Site or
          App, Pitch may obtain and collect personally identifiable information
          about you, including, but not limited to, your name, email address,
          and any other information that may be used to identify you. We may
          also collect information about your IP address, browser type, cookie
          identifiers, Internet Service Provider, referring and exit page,
          operating system, clickstream data, the type of mobile device you use,
          your mobile device&#39;s unique device ID, and your mobile operating
          system. We may track information regarding your use of our Site or
          App, including but not limited to, which classes you have taken and
          timestamps associated with your use of our services. We also track and
          analyze non-identifying and aggregate usage and volume statistical
          information from our visitors and customers. We do not collect any
          Special Categories of Personal Data or Sensitive Data (for example,
          details about your race or ethnicity, religious or philosophical
          beliefs, sexual orientation, political opinions, trade union
          membership, information about your health and genetic and biometric
          data).
        </Text>

        <Text style={styles.tcP}>How is Information Collected?</Text>
        <Text style={styles.tcL}>
          Each time you provide or transmit information to us via the Site or
          App, Pitch may obtain and collect information about you, including,
          but not limited to, your name, email address, and any other
          information that may be used to identify you. For example, and without
          limitation, we may collect such information from you when you create a
          user account on the Site or App or when you contact our support team.
          As you interact with our website, we may automatically collect
          Technical Data about your equipment, browsing actions and patterns,
          through cookies and other similar technologies.
        </Text>

        <Text style={styles.tcP}>
          Cookies, Web Beacons and Other Similar Technologies
        </Text>
        <Text style={styles.tcL}>
          As further described in our Cookie Policy, we use cookies and similar
          technologies (e.g., web beacons, pixels, ad tags and device
          identifiers) to recognize you and/or your device(s) on, off and across
          different Services and devices. We also allow some others to use
          cookies as described in our Cookie Policy. You can control cookies
          through your browser settings and other tools.
        </Text>

        <Text style={styles.tcP}>Children</Text>
        <Text style={styles.tcL}>
          Our Site, App, and services are not directed to children under 13 (or
          under 16 for individuals in the European Union). We will never
          knowingly collect any personally identifiable information about such
          children. If Pitch obtains actual knowledge that it has collected
          personal information about a child under the age of 13 (under 16 in
          the EU), that information will be immediately deleted and will not be
          shared or disclosed to third parties.
        </Text>

        <Text style={styles.tcP}>How Do We Use Your Personal Data?</Text>
        <Text style={styles.tcL}>
          We may use the information we collect from and about you for any of
          the following purposes: (1) to fulfill your requests for classes or
          other products or services; (2) to respond to your inquiries; (3) to
          review Site or App usage and operations; (4) to address problems with
          the Site or App, our business, or our services; (5) to protect the
          security or integrity of the Site or App and our business; (6) to
          monitor the Site and App for compliance with our Terms of Use and the
          law; (7) to help improve our Site, App, or services; and (8) to
          contact you with updates and other informational and promotional
          materials from us or third party marketing offers from our trusted
          partners, as well as from other companies. In addition, Pitch may
          partner with third party advertisers to help deliver advertisements
          through the Site or App relevant to your interests.
        </Text>

        <Text style={styles.tcP}>Sharing Practices</Text>
        <Text style={styles.tcL}>
          We may disclose information collected from and about you as follows:
          (1) to our related companies and service providers, to perform a
          business, professional or technical support function for us; (2) to
          our marketing partners, advertisers or other third parties, who may
          contact you with their own offers; (3) as necessary if we believe that
          there has been a violation of our Terms of Use or of our rights or the
          rights of any third party; (4) to respond to legal process (such as a
          search warrant, subpoena or court order) and provide information to
          law enforcement agencies or in connection with an investigation on
          matters related to public safety, as permitted by law, or otherwise as
          required by law; and (5) in the event that our company or
          substantially all of its assets are acquired, your personal
          information may be one of the transferred assets. We may share
          aggregate, non-personally identifiable information about Website users
          with third parties.
        </Text>

        <Text style={styles.tcP}>Interest-Based Advertising</Text>
        <Text style={styles.tcL}>
          We may partner with ad networks and other ad serving providers
          (&quot;Advertising Providers&quot;) who serve ads on behalf of us and
          others on non-affiliated websites or mobile applications. Some of
          those ads may be personalized, meaning that they are intended to be
          relevant to you based on information Advertising Providers collect
          about your visits to this site and elsewhere over time.
        </Text>
        <Text style={styles.tcLl}>
          You may visit www.aboutads.info to learn more about this type of
          advertising and how to opt-out of this form of advertising by
          companies participating in the Digital Advertising Alliance
          (&quot;DAA&quot;) self-regulatory program. Note that electing to
          opt-out will not stop advertising from appearing in your browser or
          applications. It may make the ads you see less relevant to your
          interests. In addition, note that if you use a different browser or
          erase cookies from your browser, you may need to renew your opt-out
          choice.
        </Text>

        <Text style={styles.tcP}>Apple Health Information</Text>
        <Text style={styles.tcL}>
          In order to provide our services, such as recommending classes you may
          enjoy, we may read and/or write data to the Apple Health database on
          your Apple device with your consent. We will not use this information
          for marketing or advertising purposes or share it with third parties.
        </Text>

        <Text style={styles.tcP}>Opting Out</Text>
        <Text style={styles.tcL}>
          You may &quot;opt-out&quot; of receiving marketing or promotional
          communications from us at any time. Contact us at
          support@Pitchsport.com to unsubscribe.
        </Text>

        <Text style={styles.tcP}>Data Security</Text>
        <Text style={styles.tcL}>
          We maintain reasonable and appropriate measures designed to maintain
          information we collect in a secure manner. We have taken certain
          physical, electronic, and administrative steps to safeguard and secure
          the information we collect from Site visitors and App users. We
          likewise require that our vendors who process data for us, some of
          whom are located outside of the United States, take appropriate
          measures to secure data. Even though we follow reasonable procedures
          to try to protect the information in our possession, no security
          system is perfect and we cannot promise, and you should not expect,
          that your information will be secure in all circumstances.
        </Text>

        <Text style={styles.tcP}>Data Retention</Text>
        <Text style={styles.tcL}>
          We will only retain your personal data for as long as necessary to
          fulfill the purposes we collected it for, including for the purposes
          of satisfying any legal, accounting, or reporting requirements.
        </Text>
        <Text style={styles.tcLl}>
          To determine the appropriate retention period for personal data, we
          consider the amount, nature, and sensitivity of the personal data, the
          potential risk of harm from unauthorized use or disclosure of your
          personal data, the purposes for which we process your personal data
          and whether we can achieve those purposes through other means, and the
          applicable legal requirements.
        </Text>

        <Text style={styles.tcP}>How to Access your Information</Text>
        <Text style={styles.tcL}>
          If you would like to access, update, or delete any information we have
          about you, or exercise any right you might have, please send an email
          to hello@pitch-app.com with your request.
        </Text>

        <Text style={styles.tcP}>Contact Us</Text>
        <Text style={styles.tcL}>
          If you have any questions regarding our Policy, contact us
          hello@pitch-app.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(PrivacyPolicy);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(17),
    height: scale(17),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  lineView: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEBEB',
  },
  touchableMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 13,
  },
  nameTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontWeight: '600',
    marginLeft: 5,
  },
  logoutBtnMainView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  logoutTouchableBtn: {
    height: scale(40),
    width: '100%',
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutTextStyle: {
    color: '#FF4242',
  },
  tcP: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  DatetcL: {
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 10,
    fontSize: 12,
  },
  tcLl: {
    marginLeft: 10,
    // marginTop: 3,
    marginBottom: 10,
    fontSize: 12,
  },
});
