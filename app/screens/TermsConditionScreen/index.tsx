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

const TermsCondition = props => {
  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>{strings.TERMS_CONDITIONS}</Text>
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
        <Text style={styles.tcL}>
          END USER LICENSE AGREEMENT AND TERMS OF SERVICE &amp; PRIVACY POLICY
        </Text>
        <Text style={styles.DatetcL}>Updated March 3, 2020</Text>
        <Text style={styles.DatetcL}>Last Updated Date: March 3rd, 2020</Text>

        <Text style={styles.tcL}>
          This End User License Agreement and Terms of Service (this “
          <Text style={styles.tcLBold}>EULA</Text>”) is a binding contract
          between you, an individual user (“
          <Text style={styles.tcLBold}>you”</Text>) and Pitch (“
          <Text style={styles.tcLBold}>Pitch</Text>,” “
          <Text style={styles.tcLBold}>we</Text>,” “
          <Text style={styles.tcLBold}>us”</Text>” or “
          <Text style={styles.tcLBold}>our”</Text>”) governing your use of the
          mobile software applications that Pitch makes available for download
          (individually and collectively, the “
          <Text style={styles.tcLBold}>App”</Text>”), the related website
          located at pitch- app.com and any other online properties owned or
          controlled by or on behalf of Pitch (collectively with the App, the
          “Service”).
          <Text style={styles.tcLBold}>
             BY INSTALLING OR OTHERWISE ACCESSING OR USING THE SERVICE, YOU
            AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS
            EULA. IF YOU DO NOT AGREE TO THE TERMS OF THIS EULA, THEN YOU MAY
            NOT USE THE SERVICE. TO HAVE A COPY OF THIS EULA AND PITCH’S PRIVACY
            POLICY SENT TO YOU, CONTACT PITCH AT SUPPORT@PITCHSPORT.COM
          </Text>
        </Text>

        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>Material Terms</Text>: As provided in
          greater detail in this EULA (and without limiting the express language
          of this EULA), you acknowledge the following:
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} you use the service at your sole risk, and you should
          consult with a physician or other health care professional before
          commencing use of the Service;
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} the use of the Service may be subject to separate third
          party terms of service and fees, including, without limitation, your
          mobile network operator’s (the “
          <Text style={styles.tcLBold}>Carrier</Text>”) terms of service and
          fees, including fees charged for data usage and overage, which are
          your sole responsibility;
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} you consent to the collection, use, and disclosure of your
          personally identifiable information in accordance with Pitch’s Privacy
          Policy available at https://www.pitch-app.com/privacy-policy (“
          <Text style={styles.tcLBold}>Privacy Policy</Text>”);
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} we provide the App to you on an “as is” basis without
          warranties of any kind and Pitch’s liability to you is limited;
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} disputes arising between you and Pitch will be resolved by
          binding arbitration. 
          <Text style={styles.tcLBold}>
            BY ACCEPTING THIS EULA, AS PROVIDED IN GREATER DETAIL IN SECTION11
            BELOW, YOU AND PITCH.
          </Text>
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'}{' '}
          <Text style={styles.tcLBold}>
            ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A
            CLASS ACTION;
          </Text>
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'} if you are using the App on an iOS-based device, then you
          agree to and acknowledge the “Notice Regarding Apple,” below; and
        </Text>

        <Text style={styles.tcL}>
          {'\u2022'}{' '}
          <Text style={styles.tcLBold}>
            if you Post (defined in Section 6.a below) any Objectionable Content
            (defined in Section 6.g below) on the Service, then we may – but
            have no obligation to – take any remedial action that we, in our
            sole discretion, deem necessary and/or appropriate under the
            circumstances, such as, without limitation, suspending or
            terminating your Account (defined in Section 3.a below), removing
            all of your User Content (defined in Section 6.a below) from the
            Service and/or reporting you to law enforcement authorities, either
            directly or indirectly.
          </Text>
        </Text>

        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>1. General Terms and Conditions.</Text>
        </Text>

        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Changes to this EULA.</Text> You
          understand and agree that we may change this EULA at any time without
          prior notice; provided that we will endeavor to provide you with prior
          notice of any material changes that may apply to you, including
          through the posting of a revised EULA that you may be required to
          accept in order to continue using the Service. You may read a current,
          effective copy of this EULA at any time by selecting the appropriate
          link on the Service. The revised EULA will become effective at the
          time of posting unless specified otherwise. Any use of the Service
          after the effective date will constitute your acceptance of such
          revised EULA. If you find any change to this EULA or the Service
          unacceptable, then your sole remedy is to stop accessing, browsing,
          and otherwise using the Service. The terms of this EULA will govern
          any updates PITCH provides to you that replace and/or supplement any
          portion of the Service, unless the upgrade is accompanied by a
          separate license or revised EULA, in which case the terms of that
          license or revised EULA will govern. Notwithstanding the preceding
          sentences of this Section 1.a, no revisions to this EULA will apply to
          any dispute between you and Pitch that arose prior to the effective
          date of such revision.
        </Text>

        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Privacy Policy.</Text> Your access to
          and use of the Service is also subject to Pitch’s Privacy Policy, the
          terms and conditions of which are incorporated herein by reference.
        </Text>

        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Jurisdictional Issues.</Text> The
          Service is controlled and operated by Pitch from its offices in the
          State of California. Pitch makes no representation that materials on
          the Service are appropriate, lawful, or available for use in any
          locations other than the United States of America. Those who choose to
          access or use the Service from locations outside the United States of
          America do so on their own initiative and are responsible for
          compliance with local laws, if and to the extent local laws are
          applicable. Access to the Service from jurisdictions where the
          contents or practices of the Service are illegal, unauthorized, or
          penalized is strictly prohibited.
        </Text>

        <Text style={styles.tcL}>
          d. <Text style={styles.tcLBold}>Eligibility.</Text> THE SERVICE IS NOT
          FOR PERSONS UNDER THE AGE OF 13 OR FOR ANY USERS PREVIOUSLY SUSPENDED
          OR REMOVED FROM THE SERVICE BY PITCH. IF YOU ARE UNDER 13 YEARS OF
          AGE, YOU MUST NOT USE OR ACCESS THE SERVICE AT ANY TIME OR IN ANY
          MANNER. Furthermore, by accessing or using the Service, you affirm
          that either you are at least 18 years of age or you have been
          authorized to use the Service by your parent or legal guardian who is
          at least 18 years of age.
        </Text>

        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>2. The Service.</Text>
        </Text>

        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Description.</Text> The Service
          provides you with the opportunity to take workout classes (each, a
          “Class”) and receiving coaching from trainers solely for your personal
          use. Classes are available for a variety of skill levels, for a
          variety of activities, and for varying durations, all to fit your
          particular needs. Not all classes will be available in perpetuity and
          classes are subject to change at any time with or without notice and
          without any liability to you.
        </Text>

        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Mobile Services.</Text> The Service
          will be accessible via a mobile phone, tablet, or other wireless
          device (collectively, “Mobile Services”). Your mobile carrier’s normal
          messaging, data, and other rates and fees will apply to your use of
          the Mobile Services. In addition, downloading, installing, or using
          certain Mobile Services may be prohibited or restricted by your mobile
          carrier, and not all Mobile Services may work with all carriers or
          devices. Therefore, you are solely responsible for checking with your
          mobile carrier to determine if the Mobile Services are available for
          your mobile device(s), what restrictions, if any, may be applicable to
          your use of the Mobile Services, and how much they will cost you.
          Nevertheless, all use of the App and the related Mobile Services must
          be in accordance with this EULA.
        </Text>

        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>3. Registration.</Text>
        </Text>

        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Log-In Credentials.</Text> While you
          may always browse the public-facing portions of the Service without
          registering with us, in order to enjoy the full benefits of the
          Service, you must download the App and register an account with us (an
          “<Text style={styles.tcLBold}></Text>Account”).
        </Text>

        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Account Security.</Text> You are
          responsible for the security of your Account, and are fully
          responsible for all activities that occur through the use of your
          credentials. You agree to notify Pitch immediately at
          support@getPitch.com if you suspect or know of any unauthorized use of
          your log-in credentials or any other breach of security with respect
          to your Account. Pitch will not be liable for any loss or damage
          arising from unauthorized use of your credentials prior to you
          notifying Pitch of such unauthorized use or loss of your credentials.
          Separate log-in credentials may be required to access External Sites
          (defined in Section 8 below).
        </Text>

        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Accuracy of Information.</Text> When
          creating an Account, you will provide true, accurate, current, and
          complete information as Pitch requests. You will update the
          information about yourself promptly, and as necessary, to keep it
          current and accurate. We reserve the right to disallow, cancel,
          remove, or reassign certain usernames and permalinks in appropriate
          circumstances, as determined by us in our sole discretion, and may,
          with or without prior notice, suspend or terminate your Account if
          activities occur on your Account which, in our sole discretion, would
          or might constitute a violation of this EULA, cause damage to or
          impair the Service, infringe or violate any third party rights, damage
          or bring into disrepute the reputation of Pitch, or violate any
          applicable laws or regulations. If messages sent to the e-mail address
          you provide are returned as undeliverable, then Pitch may terminate
          your Account immediately without notice to you and without any
          liability to you or any third party.
        </Text>

        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>4. Subscriptions and Payment.</Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Subscriptions.</Text> To enjoy the
          full benefits of the Service, including, without limitation, to use a
          coached workout, you must purchase a subscription to the Service. If
          you purchase a subscription to the Service, then the following terms
          apply:
        </Text>
        <Text style={styles.tcL}>
          b. 
          <Text style={styles.tcLBold}>
            Automatically Renewable Subscriptions.
          </Text>
           BY PURCHASING A MONTHLY OR ANNUAL SUBSCRIPTION TO THE SERVICE, YOU
          AGREE THAT, ONCE YOUR SUBSCRIPTION EXPIRES, YOUR SUBSCRIPTION WILL
          AUTOMATICALLY RENEW FOR SUCCESSIVE MONTHLY OR ANNUAL PERIODS UNLESS
          AND UNTIL YOU CANCEL YOUR SUBSCRIPTION.
        </Text>
        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Cancellation.</Text> YOU MAY CANCEL
          YOUR SUBSCRIPTION TO THE SERVICE AT ANY TIME, AFTER WHICH PITCH WILL
          NOT RENEW YOUR SUBSCRIPTION. PLEASE CONTACT SUPPORT@GETPITCH.COM TO
          DISPUTE A CHARGE, CANCEL YOUR SUBSCRIPTION, OR REQUEST A REFUND.
        </Text>
        <Text style={styles.tcL}>
          d. <Text style={styles.tcLBold}>Recurring Charges.</Text> YOU
          AUTHORIZE PITCH TO CHARGE THE PAYMENT METHOD THAT OUR PAYMENT
          PROCESSOR HAS ON FILE FOR YOU TO PAY FOR ANY RENEWAL SUBSCRIPTION. YOU
          WILL BE BILLED FOR THE SAME SUBSCRIPTION PLAN (OR THE MOST SIMILAR
          SUBSCRIPTION PLAN, IF YOUR PRIOR PLAN IS NO LONGER AVAILABLE) AT THE
          THEN-CURRENT MONTHLY OR ANNUAL SUBSCRIPTION PRICE PLUS ANY APPLICABLE
          TAXES. WE WILL PROCESS YOUR PAYMENTS FOR ANY RENEWAL SUBSCRIPTION
          USING THE SAME BILLING CYCLE AS YOUR CURRENT SUBSCRIPTION. IN OTHER
          WORDS, IF WE PROCESS YOUR PAYMENT FOR YOUR CURRENT SUBSCRIPTION ON THE
          20TH OF EACH MONTH, THEN WE WILL CONTINUE TO PROCESS YOUR PAYMENT ON
          THAT DAY FOR ANY RENEWAL SUBSCRIPTION. ADDITIONAL TERMS AND CONDITIONS
          MAY APPLY UPON RENEWAL, AND SUBSCRIPTION FEES MAY CHANGE AT ANY TIME,
          TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>5. Intellectual Property Rights.</Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>License.</Text> The Service is
          licensed, not sold, to you for use only under the terms of this
          Agreement. Pitch reserves all rights not expressly granted to you.
          Subject to your complete and ongoing compliance with this Agreement,
          Pitch hereby grants you a personal, limited, revocable,
          non-transferable license to access and use the Service solely for your
          personal, non-commercial use.
        </Text>
        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Content.</Text> Except for User
          Content, the content that Pitch provides to end users on or through
          the Service, including without limitation, any Class (including the
          programming of such Class), text, graphics, photos, software, sound
          recordings (and the musical works embodied therein), and interactive
          features, may be protected by copyright or other intellectual property
          rights and owned by Pitch or its third party licensors (collectively,
          the “Pitch Content”). You may not copy, reproduce, upload, republish,
          broadcast, transmit, retransmit, Post, create derivative works of,
          publicly perform, publicly display, use for commercial purpose or
          distribute any materials from the Service in any way without prior
          express written permission of the copyright owner of such material or
          as otherwise specified in this Agreement or permitted by the Service’s
          intended functionalities. You may not modify or use any materials
          obtained from or available through the Service unless you have
          obtained the applicable copyright owner’s prior express written
          authorization. Pitch owns all design rights, databases, and
          compilation and other intellectual property rights in and to the
          Service, in each case whether registered or unregistered, and all
          related goodwill.
        </Text>
        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Marks.</Text> Pitch trademarks,
          service marks, and logos (the “Pitch Trademarks”) used and displayed
          on the Service are Pitch’s registered and unregistered trademarks or
          service marks. Other product and service names located on the Service
          may be trademarks or service marks owned by third parties (the
          “Third-Party Trademarks,” and, collectively with Pitch Trademarks, the
          “Trademarks”). Except as otherwise permitted by law, you may not use
          the Trademarks to disparage Pitch or the applicable third-party,
          Pitch’s or a third-party’s products or services, or in any manner
          (using commercially reasonable judgment) that may damage any goodwill
          in the Trademarks. You may not use any Trademarks as part of a link to
          or from the Service without Pitch’s prior express written consent. You
          may not remove any Trademarks identifying the ownership or origin of
          any Pitch Content. All goodwill generated from the use of any Pitch
          Trademark will inure solely to Pitch’s benefit.
        </Text>
        <Text style={styles.tcL}>
          d. <Text style={styles.tcLBold}>Restrictions.</Text> Pitch hereby
          reserves all rights not expressly granted to you in this Section 5.
          Accordingly, nothing in this EULA or on the Service will be construed
          as granting to you, by implication, estoppel, or otherwise, any
          additional license rights in and to the Service or any Pitch Content
          or Trademarks located or displayed therein.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>6. User Content.</Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Definition.</Text> “User Content”
          means any content that users upload, post or transmit (collectively,
          “Post”) to or through the Service including, without limitation, any
          text, comments and other works subject to protection under the laws of
          the United States or any other jurisdiction, including, but not
          limited to, patent, trademark, trade secret, and copyright laws, and
          excludes any and all Pitch Content.
        </Text>
        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Screening User Content.</Text> Pitch
          offers end users the ability to submit User Content to or transmit
          User Content through the Service. Pitch does not pre-screen any User
          Content, but reserves the right to remove, disallow, block, or delete
          any User Content in its sole discretion. In addition, we have the
          right – but not the obligation – in our sole discretion to remove,
          disallow, block or delete any User Content (i) that we consider to
          violate this EULA or applicable law or otherwise constitute
          Objectionable Content (as defined below); or (ii) in response to
          complaints from other users or licensors of any Pitch Content, with or
          without notice and without any liability to you. Without limiting the
          preceding sentences of this Section, Pitch also has the right – but
          not the obligation – to take remedial action in connection with any
          Objectionable Content Posted on the Service as described more fully in
          Section 6.g below. Pitch does not guarantee the accuracy, integrity,
          appropriateness, availability, or quality of any User Content, and
          under no circumstances will Pitch be liable in any way for any User
          Content.
        </Text>
        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Intellectual Property Rights.</Text>
           SUBJECT TO ANY THIRD PARTY RIGHTS IN ANY PREEXISTING CONTENT INCLUDED
          WITHIN YOUR USER CONTENT, YOU RETAIN OWNERSHIP OF ANY RIGHTS YOU MAY
          HAVE IN YOUR USER CONTENT AND SUBMITTING YOUR USER CONTENT TO THE
          SERVICE DOES NOT TRANSFER OWNERSHIP OF YOUR RIGHTS.
        </Text>
        <Text style={styles.tcL}>
          d. <Text style={styles.tcLBold}>Licenses to User Content.</Text> You
          hereby grant Pitch an unrestricted, assignable, sublicensable,
          revocable, royalty- free license throughout the universe to reproduce,
          distribute, publicly display, communicate to the public, publicly
          perform (including by means of digital audio transmissions and on a
          through-to-the-audience basis), make available, create derivative
          works from, retransmit from External Sites, and otherwise exploit and
          use (collectively, “Use”) all or any part of all User Content you Post
          to or through the Service by any means and through any media and
          formats now known or hereafter developed, for the purposes of (i)
          advertising, marketing, and promoting Pitch and the Service; (ii)
          displaying and sharing your User Content to other users of the
          Service; and (iii) providing the Service as authorized by this EULA.
          You further grant Pitch a royalty-free license to use your user name,
          image, voice, and likeness to identify you as the source of any of
          your User Content. You must not Post any User Content on or through
          the Service or transmit to Pitch any User Content that you consider to
          be confidential or proprietary. Any User Content posted by you to or
          through the Service or transmitted to Pitch will be considered
          non-confidential and non- proprietary, and treated as such by Pitch,
          and may be used by Pitch in accordance with this EULA without notice
          to you and without any liability to Pitch.
        </Text>
        <Text style={styles.tcL}>
          e. 
          <Text style={styles.tcLBold}>
            You Must Have Rights to the Content You Post.
          </Text>
           You must not Post any User Content to the Service if you are not the
          copyright owner of or are not fully authorized to grant rights in all
          of the elements of the User Content you intend to Post to the Service.
          You represent and warrant that: (i) you own the User Content Posted by
          you on or through the Service or otherwise have the right to grant the
          license set forth in this EULA; (ii) the Posting and Use of your User
          Content on or through the Service does not violate the privacy rights,
          publicity rights, copyrights, contract rights, intellectual property
          rights, or any other rights of any person, including, but not limited
          to, the rights of any person visible in any of your User Content;
          (iii) the Posting of your User Content on the Service will not require
          us to obtain any further licenses from or pay any royalties, fees,
          compensation, or other amounts or provide any attribution to any third
          parties; and (iv) the Posting of your User Content on the Service does
          not result in a breach of contract between you and a third party. You
          agree to pay all monies owing to any person as a result of your
          Posting your User Content on the Service.
        </Text>
        <Text style={styles.tcL}>
          f. 
          <Text style={styles.tcLBold}>Waiver of Rights to User Content.</Text>
           By Posting User Content to or through the Service, you waive any
          rights to prior inspection or approval of any marketing or promotional
          materials related to such User Content. You also waive any and all
          rights of privacy, publicity, or any other rights of a similar nature
          in connection with your User Content, or any portion thereof. To the
          extent any moral rights are not transferable or assignable, you hereby
          waive and agree never to assert any and all moral rights, or to
          support, maintain, or permit any action based on any moral rights that
          you may have in or with respect to any User Content you Post to or
          through the Service.
        </Text>
        <Text style={styles.tcL}>
          g. <Text style={styles.tcLBold}>Objectionable Content.</Text> You are
          not permitted to, and agree not to, Post any User Content to the
          Service that is or could be interpreted to be (i) abusive, bullying,
          defamatory, harassing, harmful, hateful, inaccurate, infringing,
          libelous, objectionable, obscene, offensive, pornographic, shocking,
          threatening, unlawful, violent, vulgar, or in violation of any
          applicable laws (including laws related to speech); or (ii) promoting
          any product, good, or service, or bigotry, discrimination, hatred,
          intolerance, racism, or inciting violence (including suicide)
          (collectively, “Objectionable Content”). The Posting of any
          Objectionable Content may subject you to third party claims and none
          of the rights granted to you in this EULA may be raised as a defense
          against any third party claims arising from your Posting of
          Objectionable Content. You also agree not to use the Service for
          illegal or unlawful purposes. If you encounter any Objectionable
          Content on the Service, then please immediately email Pitch at
          SUPPORT@GETPITCH.COM or inform us through the functionality offered on
          the Service. You acknowledge and agree that Pitch provides you with
          the ability to report Objectionable Content as a courtesy, and Pitch
          has no obligation to remove or take any other action with respect to
          any Objectionable Content on the Service that you report to us.
          However, Pitch in its sole discretion may take any actions it deems
          necessary and/or appropriate against any User who Posts Objectionable
          Content on the Service, including, but not limited to, warning the
          User, suspending or terminating the user’s Account, removing all of
          the user’s User Content Posted on the Service, and/or reporting the
          user to law enforcement or other authorities, either directly or
          indirectly.
        </Text>
        <Text style={styles.tcL}>
          h. <Text style={styles.tcLBold}>No Liability.</Text> For the avoidance
          of doubt, Pitch will not be liable for any unauthorized use of User
          Content by any end user.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>
            7. Restrictions on Use of the Service.
          </Text>
        </Text>
        <Text style={styles.tcL}>
          a. In addition to any other restrictions set forth in this EULA, and
          without limiting those restrictions, when using the Service, you agree
          not to (and not to attempt to):
        </Text>
        <Text style={styles.tcL}>
          i. make unauthorized copies or derivative works of any content made
          available on or through the Service, including, but not limited to,
          Pitch Content;
        </Text>
        <Text style={styles.tcL}>
          ii. use any device, software, or routine to interfere or attempt to
          interfere with the proper working of the Service, or any activity
          conducted on the Service;
        </Text>
        <Text style={styles.tcL}>
          iii. attempt to decipher, decompile, disassemble, or reverse engineer
          any of the software or source code comprising or making up the
          Service;
        </Text>
        <Text style={styles.tcL}>
          iv. delete or alter any material Pitch or any other person or entity
          Posts on the Service;
        </Text>
        <Text style={styles.tcL}>
          v. frame or link to any of the materials or information available on
          the Service;
        </Text>
        <Text style={styles.tcL}>
          vi. alter, deface, mutilate, or otherwise bypass any approved software
          through which the Service is made available;
        </Text>
        <Text style={styles.tcL}>
          vii. use any trademarks, service marks, design marks, logos,
          photographs, or other content belonging to Pitch or obtained from the
          Service;
        </Text>
        <Text style={styles.tcL}>
          viii. access, tamper with, or use non-public areas of the Service,
          Pitch’s (and its hosting company’s) computer systems and
          infrastructure, or the technical delivery systems of Pitch’s
          providers;
        </Text>
        <Text style={styles.tcL}>
          ix. provide any false personal information to Pitch;
        </Text>
        <Text style={styles.tcL}>
          x. create a false identity or impersonate another person or entity in
          any way;
        </Text>
        <Text style={styles.tcL}>
          xi. create a new account with Pitch, without Pitch’s express written
          consent, if Pitch has previously disabled an account of yours;
        </Text>
        <Text style={styles.tcL}>
          xii. solicit, or attempt to solicit, personal information from other
          users of the Service;
        </Text>
        <Text style={styles.tcL}>
          xiii. restrict, discourage, or inhibit any person from using the
          Service, disclose personal information about a third person on the
          Service or obtained from the Service without the consent of that
          person, or collect information about Users of the Service;
        </Text>
        <Text style={styles.tcL}>
          xiv. use the Service to send emails or other communications to persons
          who have requested that you not send them communications;
        </Text>
        <Text style={styles.tcL}>
          xv. use the Service, without Pitch’s express written consent, for any
          commercial or unauthorized purpose, including communicating or
          facilitating any commercial advertisement or solicitation or spamming;
        </Text>
        <Text style={styles.tcL}>
          xvi. gain unauthorized access to the Service, to other users’
          accounts, names, or personally identifiable information, or to other
          computers or websites connected or linked to the Service;
        </Text>
        <Text style={styles.tcL}>
          xvii. Post any virus, worm, spyware, or any other computer code, file,
          or program that may or is intended to disable, overburden, impair,
          damage, or hijack the operation of any hardware, software, or
          telecommunications equipment, or any other aspect of the Service or
          communications equipment and computers connected to the Service;
        </Text>
        <Text style={styles.tcL}>
          xviii. interfere with or disrupt the Service, networks, or servers
          connected to the Service or violate the regulations, policies, or
          procedures of those networks or servers; or
        </Text>
        <Text style={styles.tcL}>
          xix. violate any applicable federal, state, or local laws or
          regulations or the terms of this EULA.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>8. External Sites.</Text> The Service may
          contain links to, or the ability to share information with, third
          party websites (“<Text style={styles.tcLBold}>External Sites</Text>”).
          Pitch does not endorse any External Sites or the content made
          available on such External Sites. All External Sites and any content
          thereon is developed and provided by others. You should contact the
          site administrator or Webmaster for those External Sites if you have
          any concerns regarding such content located on such External Sites.
          Pitch is not responsible for the content of any External Sites and
          does not make any representations regarding the content or accuracy of
          any materials on such External Sites. You should take precautions when
          downloading files from all websites to protect your computer and
          mobile devices from viruses and other destructive programs. If you
          decide to access any External Sites, purchase any content from
          External Sites or subscribe to services offered by such External Site,
          then you do so at your own risk. You agree that Pitch will have no
          liability to you arising from your use, engagement, exposure to, or
          interaction with any External Sites.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>9. Feedback.</Text> While we are
          continually working to develop and evaluate our own product ideas and
          features, we know we don’t have all the answers. We therefore welcome
          your feedback, comments, and suggestions. If you choose to contribute
          by sending Pitch or our employees any ideas for products, services,
          features, modifications, enhancements, content, refinements,
          technologies, content offerings (such as audio, visual, games, or
          other types of content), promotions, strategies, or product/feature
          names, or any related documentation, artwork, computer code, diagrams,
          or other materials (collectively “
          <Text style={styles.tcLBold}>Feedback</Text>”), then regardless of
          what your accompanying communication may say, the following terms will
          apply, so that future misunderstandings can be avoided. Accordingly,
          by sending Feedback to Pitch, you agree that:
        </Text>
        <Text style={styles.tcL}>
          a. Pitch has no obligation to review, consider, or implement your
          Feedback, or to return to you all or part of any Feedback for any
          reason;
        </Text>
        <Text style={styles.tcL}>
          b. Feedback is provided on a non-confidential basis, and Pitch is not
          under any obligation to keep any Feedback you send confidential or to
          refrain from using or disclosing it in any way; and
        </Text>
        <Text style={styles.tcL}>
          c. You irrevocably grant Pitch perpetual and unlimited permission to
          Use the Feedback and derivatives thereof for any purpose and without
          restriction, free of charge and without attribution of any kind,
          including by making, using, selling, offering for sale, importing, and
          promoting commercial products and services that incorporate or embody
          Feedback, whether in whole or in part, and whether as provided or as
          modified.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>
            10. Notice and Procedure for Making Claims of Copyright or Other
            Intellectual Property Infringements.
          </Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Respect of Third Party Rights.</Text>
           Pitch respects the intellectual property of others and takes the
          protection of intellectual property very seriously, and we ask our
          users to do the same. Infringing activity will not be tolerated on or
          through the Service.
        </Text>
        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Repeat Infringer Policy.</Text>
           Pitch’s intellectual property policy is to (i) remove or disable
          access to material that Pitch believes in good faith, upon notice from
          an intellectual property owner or his or her agent, is infringing the
          intellectual property of a third party by being made available through
          the Service; and (ii) remove any User Content uploaded to the Service
          by “repeat infringers.” Pitch considers a “repeat infringer” to be any
          user that has uploaded User Content or Feedback to or through the
          Service and for whom Pitch has received more than two takedown notices
          compliant with the provisions of 17 U.S.C. § 512 with respect to such
          User Content or Feedback. Pitch has discretion, however, to terminate
          the Account of any user after receipt of a single notification of
          claimed infringement or upon Pitch’s own determination.
        </Text>
        <Text style={styles.tcL}>
          c. 
          <Text style={styles.tcLBold}>
            Procedure for Reporting Claimed Infringement.
          </Text>
           If you believe that any content made available on or through the
          Service has been used or exploited in a manner that infringes an
          intellectual property right you own or control, then please promptly
          send a “
          <Text style={styles.tcLBold}>
            Notification of Claimed Infringement
          </Text>
          ” containing the following information to the Designated Agent
          identified below. Your Notification of Claimed Infringement may be
          shared by Pitch with the user alleged to have infringed a right you
          own or control, and you hereby consent to Pitch making such
          disclosure. Your communication must include substantially the
          following:
        </Text>
        <Text style={styles.tcL}>
          i. A physical or electronic signature of a person authorized to act on
          behalf of the owner of the work(s) that has/have been allegedly
          infringed;
        </Text>
        <Text style={styles.tcL}>
          ii. Identification of works or materials being infringed, or, if
          multiple works are covered by a single notification, then a
          representative list of such works;
        </Text>
        <Text style={styles.tcL}>
          iii. Identification of the specific material that is claimed to be
          infringing or to be the subject of infringing activity and that is to
          be removed or access to which is to be disabled, and information
          reasonably sufficient to permit Pitch to locate the material;
        </Text>
        <Text style={styles.tcL}>
          iv. Information reasonably sufficient to permit Pitch to contact you,
          such as an address, telephone number, and, if available, an electronic
          mail address at which you may be contacted;
        </Text>
        <Text style={styles.tcL}>
          v. A statement that you have a good faith belief that the use of the
          material in the manner complained of is not authorized by the
          copyright owner, its agent, or the law; and
        </Text>
        <Text style={styles.tcL}>
          vi. A statement that the information in the notification is accurate,
          and under penalty of perjury, that you are authorized to act on behalf
          of the owner of an exclusive right that is allegedly infringed.
        </Text>
        <Text style={styles.tcL}>
          You should consult with your own lawyer and/or see 17 U.S.C. § 512 to
          confirm your obligations to provide a valid notice of claimed
          infringement.
        </Text>
        <Text style={styles.tcL}>
          d. 
          <Text style={styles.tcLBold}>
            Designated Agent Contact Information.
          </Text>
           Pitch’s designated agent for receipt of Notifications of Claimed
          Infringement (the “
          <Text style={styles.tcLBold}>Designated Agent</Text>”) can be
          contacted at:
        </Text>
        <Text style={styles.tcL}>
          Via E-mail: <Text style={styles.tcLBold}>support@Pitchsport.com</Text>
        </Text>
        <Text style={styles.tcL}>
          Via U.S. Mail: Pitch – 202 Bicknell Avenue, Santa Monica, CA 90405
        </Text>
        <Text style={styles.tcL}>
          e. <Text style={styles.tcLBold}>Counter Notification.</Text> If you
          receive a notification from Pitch that material made available by you
          on or through the Service has been the subject of a Notification of
          Claimed Infringement, then you will have the right to provide Pitch
          with what is called a “Counter Notification.” To be effective, a
          Counter Notification must be in writing, provided to Pitch’s
          Designated Agent through one of the methods identified in Section 10.d
          and include substantially the following information:
        </Text>
        <Text style={styles.tcL}>
          i. A physical or electronic signature of the subscriber;
        </Text>
        <Text style={styles.tcL}>
          ii. Identification of the material that has been removed or to which
          access has been disabled and the location at which the material
          appeared before it was removed or access to it was disabled;
        </Text>
        <Text style={styles.tcL}>
          iii. A statement under penalty of perjury that the subscriber has a
          good faith belief that the material was removed or disabled as a
          result of mistake or misidentification of the material to be removed
          or disabled; and
        </Text>
        <Text style={styles.tcL}>
          iv. The subscriber’s name, address, and telephone number, and a
          statement that the subscriber consents to the jurisdiction of Federal
          District Court for the judicial district in which the address is
          located, or if the subscriber’s address is outside of the United
          States, then for any judicial district in which Pitch may be found,
          and that the subscriber will accept service of process from the person
          who provided notification under Section 10.d above or an agent of such
          person.
        </Text>
        <Text style={styles.tcL}>
          A party submitting a Counter Notification should consult a lawyer or
          see 17 U.S.C. § 512 to confirm the party’s obligations to provide a
          valid counter notification under the Copyright Act.
        </Text>
        <Text style={styles.tcL}>
          f. 
          <Text style={styles.tcLBold}>
            Reposting of Content Subject to a Counter Notification.
          </Text>
           If you submit a Counter Notification to Pitch in response to a
          Notification of Claimed Infringement, then Pitch will promptly provide
          the person who provided the Notification of Claimed Infringement with
          a copy of your Counter Notification and inform that person that Pitch
          will replace the removed User Content or Feedback or cease disabling
          access to it in 10 business days, and Pitch will replace the removed
          User Content or Feedback and cease disabling access to it not less
          than 10, nor more than 14, business days following receipt of the
          Counter Notification, unless Pitch’s Designated Agent receives notice
          from the party that submitted the Notification of Claimed Infringement
          that such person has filed an action seeking a court order to restrain
          the user from engaging in infringing activity relating to the material
          on Pitch’s system or network.
        </Text>
        <Text style={styles.tcL}>
          g. 
          <Text style={styles.tcLBold}>
            False Notifications of Claimed Infringement or Counter
            Notifications.
          </Text>
           The Copyright Act provides that:
        </Text>
        <Text style={styles.tcL}>
          [a]ny person who knowingly materially misrepresents under [Section 512
          of the Copyright Act (17 U.S.C. § 512)] (1) that material or activity
          is infringing, or (2) that material or activity was removed or
          disabled by mistake or misidentification, will be liable for any
          damages, including costs and attorneys’ fees, incurred by the alleged
          infringer, by any copyright owner or copyright owner’s authorized
          licensee, or by a service provider, who is injured by such
          misrepresentation, as the result of [Pitch] relying upon such
          misrepresentation in removing or disabling access to the material or
          activity claimed to be infringing, or in replacing the removed
          material or ceasing to disable access to it.
        </Text>
        <Text style={styles.tcL}>17 U.S.C. § 512(f).</Text>
        <Text style={styles.tcL}>
          Pitch reserves the right to seek damages from any party that submits a
          Notification of Claimed Infringement or Counter Notification in
          violation of the law.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>11. Dispute Resolution.</Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>General.</Text> In the interest of
          resolving disputes between you and Pitch in the most expedient and
          cost effective manner, you and Pitch agree that any dispute arising
          out of or in any way related to this EULA or your use of the App will
          be resolved by binding arbitration. Arbitration is less formal than a
          lawsuit in court. Arbitration uses a neutral arbitrator instead of a
          judge or jury, may allow for more limited discovery than in court, and
          can be subject to very limited review by courts. Arbitrators can award
          the same damages and relief that a court can award. This agreement to
          arbitrate disputes includes all claims arising out of or in any way
          related to this EULA or your use of the App, whether based in
          contract, tort, statute, fraud, misrepresentation, or any other legal
          theory, and regardless of whether a claim arises during or after the
          termination of this EULA. YOU UNDERSTAND AND AGREE THAT, BY ENTERING
          INTO THIS EULA, YOU AND PITCH ARE EACH WAIVING THE RIGHT TO A TRIAL BY
          JURY OR TO PARTICIPATE IN A CLASS ACTION AND THAT THIS AGREEMENT SHALL
          BE SUBJECT TO AND GOVERNED BY THE FEDERAL ARBITRATION ACT.
        </Text>
        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Exceptions.</Text> Notwithstanding
          Section 11.a above, nothing in this EULA will be deemed to waive,
          preclude, or otherwise limit the right of either party to: (i) bring
          an individual action in small claims court; (ii) pursue an enforcement
          action through the applicable federal, state, or local agency if that
          action is available; (iii) seek injunctive relief in aid of
          arbitration from a court of competent jurisdiction; or (iv) to file
          suit in a court of law to address an intellectual property
          infringement claim.
        </Text>
        <Text style={styles.tcL}>
          c. <Text style={styles.tcLBold}>Arbitrator.</Text> Any arbitration
          between you and Pitch will be governed by the Federal Arbitration Act
          and the Commercial Dispute Resolution Procedures and Supplementary
          Procedures for Consumer Related Disputes (collectively, “
          <Text style={styles.tcLBold}>AAA Rules</Text>”) of the American
          Arbitration Association (“<Text style={styles.tcLBold}>AAA</Text>”),
          as modified by this EULA, and will be administered by the AAA. The AAA
          Rules and filing forms are available online at www.adr.org, by calling
          the AAA at 1-800-778-7879, or by contacting Pitch. The arbitrator has
          exclusive authority to resolve any dispute relating to the
          interpretation, applicability, or enforceability of this binding
          arbitration agreement.
        </Text>
        <Text style={styles.tcL}>
          d. <Text style={styles.tcLBold}>Notice; Process.</Text> A party who
          intends to seek arbitration must first send a written notice of the
          dispute to the other party by U.S. Mail (“
          <Text style={styles.tcLBold}>Notice</Text>”). Pitch’s address for
          Notice is: Pitch – 202 Bicknell Avenue, Santa Monica, CA, 90405, Attn:
          Chief Executive Officer. The Notice must: (i) describe the nature and
          basis of the claim or dispute; and (ii) set forth the specific relief
          sought (“<Text style={styles.tcLBold}>Demand</Text>”). The parties
          will make good faith efforts to resolve the claim directly, but if the
          parties do not reach an agreement to do so within 30 days after the
          Notice is received, you or Pitch may commence an arbitration
          proceeding. During the arbitration, the amount of any settlement offer
          made by you or Pitch must not be disclosed to the arbitrator until
          after the arbitrator makes a final decision and award, if any. If the
          dispute is finally resolved through arbitration in your favor with a
          monetary award that exceeds the last written settlement amount offered
          by Pitch prior to selection of an arbitrator, Pitch will pay you the
          highest of the following: (1) the amount awarded by the arbitrator, if
          any; (2) the last written settlement amount offered by Pitch in
          settlement of the dispute prior to the arbitrator’s award; or (3)
          $15,000.
        </Text>
        <Text style={styles.tcL}>
          e. <Text style={styles.tcLBold}>Fees.</Text> If you commence
          arbitration in accordance with this EULA, Pitch will reimburse you for
          your payment of the filing fee, unless your claim is for more than
          $15,000 or as set forth below, in which case the payment of any fees
          will be decided by the AAA Rules. Any arbitration hearing will take
          place at a location to be agreed upon in Los Angeles, California, but
          if the claim is for $15,000 or less, you may choose whether the
          arbitration will be conducted: (i) solely on the basis of documents
          submitted to the arbitrator; (ii) through a non-appearance based
          telephone hearing; or (iii) by an in-person hearing as established by
          the AAA Rules in the county (or parish) of your billing address. If
          the arbitrator finds that either the substance of your claim or the
          relief sought in the Demand is frivolous or brought for an improper
          purpose (as measured by the standards set forth in Federal Rule of
          Civil Procedure 11(b)), then the payment of all fees will be governed
          by the AAA Rules. In that case, you agree to reimburse Pitch for all
          monies previously disbursed by it that are otherwise your obligation
          to pay under the AAA Rules. Regardless of the manner in which the
          arbitration is conducted, the arbitrator must issue a reasoned written
          decision sufficient to explain the essential findings and conclusions
          on which the decision and award, if any, are based. Each party agrees
          that such written decision, and information exchanged during
          arbitration, will be kept confidential except to the extent necessary
          to enforce or permit limited judicial review of the award. The
          arbitrator may make rulings and resolve disputes as to the payment and
          reimbursement of fees or expenses at any time during the proceeding
          and upon request from either party made within 14 days of the
          arbitrator’s ruling on the merits.
        </Text>
        <Text style={styles.tcL}>
          f. <Text style={styles.tcLBold}>No Class Actions.</Text> YOU AND PITCH
          AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
          INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
          PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you
          and Pitch agree otherwise, the arbitrator may not consolidate more
          than one person’s claims, and may not otherwise preside over any form
          of a representative or class proceeding.
        </Text>
        <Text style={styles.tcL}>
          g. 
          <Text style={styles.tcLBold}>
            Modifications to this Arbitration Provision.
          </Text>
           Except as otherwise provided in this EULA, if Pitch makes any future
          change to this arbitration provision, other than a change to Pitch’s
          address for Notice, then you may reject the change by sending us
          written notice within 30 days of the change to Pitch’s address for
          Notice, in which case this arbitration provision, as in effect
          immediately prior to the changes you rejected, will continue to govern
          any disputes between you and Pitch.
        </Text>
        <Text style={styles.tcL}>
          h. <Text style={styles.tcLBold}>Enforceability.</Text> If Section 11.f
          above is found to be unenforceable or if the entirety of this Section
          11 is found to be unenforceable, then the entirety of this Section 11
          will be null and void.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>12. Physical Activity Disclaimer.</Text>
           If you have any medical conditions or are thinking about starting an
          exercise program or engaging in strenuous or unusual physical
          activity, you should consult your doctor first. WITHOUT LIMITATION OF
          ANY OTHER TERMS IN THIS EULA, WE DO NOT MAKE ANY REPRESENTATIONS OR
          WARRANTIES THAT THE APP IS INTENDED TO AND/OR DOES DIAGNOSE, TREAT,
          CURE, OR PREVENT ANY ALLERGIES OR OTHER MEDICAL DISORDERS OR
          CONDITIONS, AND YOU HEREBY ACKNOWLEDGE THIS DISCLAIMER AND THAT WE ARE
          NOT ENGAGED IN PROVIDING YOU WITH A MEDICAL DEVICE, MEDICAL ADVICE
          AND/OR HEALTHCARE SERVICES BY PROVIDING YOU WITH ACCESS TO THE APP.
          You should consult with a licensed medical or fitness professional if
          you have any questions regarding your physical fitness routine. We are
          not responsible in any way for any health problems or injuries,
          including, without limitation, incapacity or death, which may result
          from or be related to your use of or inability to use the App.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>
            13. Limitation of Liability and Disclaimer of Warranties.
          </Text>
           THE FOLLOWING TERMS IN THIS SECTION 13 APPLY TO THE FULLEST EXTENT
          PERMITTED BY LAW:
        </Text>
        <Text style={styles.tcL}>
          a. PITCH, ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS,
          EMPLOYEES, AGENTS, SUPPLIERS AND LICENSORS (COLLECTIVELY, THE
          “PITCH PARTIES”) MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          SERVICE AND ANY CONTENT (INCLUDING CLASSES) AVAILABLE ON THE SERVICE,
          INCLUDING, BUT NOT LIMITED TO, THE ACCURACY, RELIABILITY,
          COMPLETENESS, APPROPRIATENESS, TIMELINESS, OR RELIABILITY THEREOF. THE
          PITCH PARTIES WILL NOT BE SUBJECT TO LIABILITY FOR THE TRUTH,
          ACCURACY, OR COMPLETENESS OF ANY CONTENT ON THE SERVICE OR ANY OTHER
          INFORMATION CONVEYED TO ANY USER, OR FOR ERRORS, MISTAKES, OR
          OMISSIONS THEREIN, OR FOR ANY DELAYS OR INTERRUPTIONS OF THE DATA OR
          INFORMATION STREAM FROM WHATEVER CAUSE. AS A USER, YOU AGREE THAT YOU
          USE THE SERVICE AND ANY CONTENT THEREON AT YOUR OWN RISK. YOU ARE
          SOLELY RESPONSIBLE FOR ALL CONTENT YOU UPLOAD TO THE SERVICE.
        </Text>
        <Text style={styles.tcL}>
          b. THE PITCH PARTIES DO NOT WARRANT THAT THE SERVICE WILL OPERATE
          ERROR FREE, OR THAT THE SERVICE AND ANY CONTENT THEREON (INCLUDING
          GIFTS) ARE FREE OF COMPUTER VIRUSES OR SIMILAR CONTAMINATION OR
          DESTRUCTIVE FEATURES. IF YOUR USE OF THE SERVICE OR ANY CONTENT
          THEREON RESULTS IN THE NEED FOR SERVICING OR REPLACING EQUIPMENT OR
          DATA, THEN NO PITCH PARTY WILL BE RESPONSIBLE FOR THOSE COSTS.
        </Text>
        <Text style={styles.tcL}>
          c. THE SERVICE AND ALL CONTENT THEREON (INCLUDING CLASSES) ARE
          PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT ANY WARRANTIES
          OF ANY KIND. ACCORDINGLY, THE PITCH PARTIES DISCLAIM ALL WARRANTIES,
          INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF TITLE,
          MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTY RIGHTS, AND FITNESS
          FOR PARTICULAR PURPOSE.
        </Text>
        <Text style={styles.tcL}>
          d. IN NO EVENT WILL ANY PITCH PARTY BE LIABLE FOR ANY SPECIAL,
          INDIRECT, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOST
          PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION
          RESULTING FROM, OR IN CONNECTION WITH, THE USE OR INABILITY TO USE THE
          SERVICE AND ANY CONTENT THEREON, WHETHER BASED ON WARRANTY, CONTRACT,
          TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF SUCH
          PITCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          PITCH’S LIABILITY, AND THE LIABILITY OF ANY OTHER PITCH PARTIES, TO
          YOU OR ANY THIRD PARTIES IN ANY CIRCUMSTANCE IS LIMITED TO THE GREATER
          OF THE FEES YOU HAVE PAID US AND U.S. $100.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>14. Third Party Disputes.</Text>
        </Text>
        <Text style={styles.tcL}>
          a. TO THE FULLEST EXTENT PERMITTED BY LAW, ANY DISPUTE YOU HAVE WITH
          ANY THIRD PARTY ARISING OUT OF YOUR USE OF THE SERVICE, INCLUDING, BY
          WAY OF EXAMPLE AND NOT LIMITATION, ANY CARRIER, COPYRIGHT OWNER, OR
          OTHER USER, IS DIRECTLY BETWEEN YOU AND SUCH THIRD PARTY, AND YOU
          IRREVOCABLY RELEASE THE PITCH PARTIES FROM ANY AND ALL CLAIMS, DEMANDS
          AND DAMAGES (ACTUAL AND CONSEQUENTIAL) OF EVERY KIND AND NATURE, KNOWN
          AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH
          DISPUTES.
        </Text>
        <Text style={styles.tcL}>
          b. The owners of any content licensed to Pitch for use on the Service
          are intended beneficiaries of this EULA and shall have the right to
          enforce this EULA against you for any unauthorized use of their
          content in any court of competent jurisdiction. The provisions of
          Section 11 do not apply to any dispute between you and a third party
          licensor of content to Pitch.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>15. Indemnification.</Text> To the
          fullest extent permitted by law, you agree to defend, indemnify, and
          hold harmless the Pitch Parties from and against any claims, actions
          or demands, including, without limitation, reasonable legal and
          accounting fees, arising or resulting from (a) your breach of this
          EULA; (b) your access to, use, or misuse of Pitch Content or the
          Service; or (c) your User Content. Pitch will provide notice to you of
          any such claim, suit, or proceeding. Pitch reserves the right to
          assume the exclusive defense and control of any matter which is
          subject to indemnification under this Section if Pitch believes that
          you are unwilling or incapable of defending Pitch’s interests. In such
          case, you agree to cooperate with any reasonable requests assisting
          Pitch’s defense of such matter at your expense.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>
            16. Term and Termination of the EULA.
          </Text>
        </Text>
        <Text style={styles.tcL}>
          a. <Text style={styles.tcLBold}>Term.</Text> As between you and Pitch,
          the Term of this EULA commences as of your first use of the Service
          and continues until the termination of this EULA by either you or
          Pitch.
        </Text>
        <Text style={styles.tcL}>
          b. <Text style={styles.tcLBold}>Termination.</Text> You may terminate
          this EULA by sending written notification to Pitch at
          support@Pitchsport.com, deleting the App from your mobile device, and
          terminating all other uses of the Service. If you wish to delete any
          of your User Content from the Service, then you may be able to do so
          using the permitted functionalities of the App, but the removal or
          deletion of such User Content will not terminate this EULA. Pitch
          reserves the right, in its sole discretion, to restrict, suspend, or
          terminate this EULA and your access to all or any part of the Service
          at any time without prior notice or liability if you breach any
          provision of this EULA. Pitch may further terminate this EULA for any
          other reason upon ten (10) days’ notice to you using the email address
          associated with your account credentials. Pitch reserves the right to
          change, suspend, or discontinue all or any part of the Service at any
          time without prior notice or liability.
        </Text>
        <Text style={styles.tcL}>
          c. Sections 1, 3.b, 5.b, 5.c, 5.d, 6.d, 6.e, 6.f, 6.h, 7, 9 – 11, 15,
          16.c, and 17 – 20 and all defined terms used therein will survive the
          termination of this EULA indefinitely.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>
            17. Consent to Electronic Communications.
          </Text>
           By using the Service, you consent to receiving certain electronic
          communications from us as further described in the Privacy Policy.
          Please read the Privacy Policy to learn more about your choices
          regarding our electronic communications practices. You agree that any
          notices, agreements, disclosures, or other communications that we send
          to you electronically will satisfy any legal communication
          requirements, including that such communications be in writing.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>18. Miscellaneous.</Text> This EULA is
          governed by the internal substantive laws of the State of California
          without respect to its conflict of laws provisions. You expressly
          agree to submit to the exclusive personal jurisdiction of the state
          and federal courts sitting in Los Angeles California. You agree that
          no joint venture, partnership, employment, or agency relationship
          exists between you and Pitch as a result of this EULA or use of the
          Service. You further acknowledge that by submitting User Content, no
          confidential, fiduciary, contractually implied, or other relationship
          is created between you and Pitch other than pursuant to this EULA. If
          any provision of this EULA is found to be invalid by any court having
          competent jurisdiction, the invalidity of such provision will not
          affect the validity of the remaining provisions of this EULA, which
          will remain in full force and effect. Failure of Pitch to act on or
          enforce any provision of this EULA will not be construed as a waiver
          of that provision or any other provision in this EULA. No waiver will
          be effective against Pitch unless made in writing, and no such waiver
          will be construed as a waiver in any other or subsequent instance.
          Except as expressly agreed by Pitch and you, this EULA constitutes the
          entire agreement between you and Pitch with respect to the subject
          matter hereof, and supersedes all previous or contemporaneous
          agreements, whether written or oral, between the parties with respect
          to the subject matter herein. The Section headings are provided merely
          for convenience and will not be given any legal import. This EULA will
          inure to the benefit of our successors and assigns. You may not assign
          this EULA or any of the rights or licenses granted hereunder, directly
          or indirectly, without the prior express written consent of Pitch.
          This means that in the event you dispose of any device on which you
          have installed the App, such as by sale or gift, you are responsible
          for deleting the App and any Pitch Content from your device prior to
          such disposition. Pitch may assign this EULA, including all its rights
          hereunder, without restriction.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>19. Contact Us.</Text> If you would like
          to contact us in connection with your use of the Service, then please
          refer to the contact information below: by mail at Pitch – 202
          Bicknell Avenue, Santa Monica, CA, and by email at hello@pitch-
          app.com.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>20. Open Source Software.</Text> The App
          contains certain open source software. Each item of open source
          software is subject to its own applicable license terms.
        </Text>
        <Text style={styles.tcL}>
          <Text style={styles.tcLBold}>NOTICE REGARDING APPLE.</Text> You
          acknowledge that this EULA is between you and Pitch only, not with
          Apple, and Apple is not responsible for the App or the content
          thereof. Apple has no obligation whatsoever to furnish any maintenance
          and support services with respect to the App. In the event of any
          failure of the App to conform to any applicable warranty, then you may
          notify Apple and Apple will refund the purchase price for the relevant
          App to you; and, to the maximum extent permitted by applicable law,
          Apple has no other warranty obligation whatsoever with respect to the
          App. Apple is not responsible for addressing any claims by you or any
          third party relating to the App or your possession and/or use of the
          App, including, but not limited to: (i) product liability claims; (ii)
          any claim that the App fails to conform to any applicable legal or
          regulatory requirement; and (iii) claims arising under consumer
          protection or similar legislation. Apple is not responsible for the
          investigation, defense, settlement, and discharge of any third party
          claim that the App or your possession and use of the App infringes
          that third party’s intellectual property rights. You agree to comply
          with any applicable third party terms, when using the App. Apple, and
          Apple’s subsidiaries, are third party beneficiaries of this EULA, and
          upon your acceptance of this EULA, Apple will have the right (and will
          be deemed to have accepted the right) to enforce this EULA against you
          as a third party beneficiary of this EULA. You hereby represent and
          warrant that (i) you are not located in a country that is subject to a
          U.S. Government embargo, or that has been designated by the U.S.
          Government as a “terrorist supporting” country; and (ii) you are not
          listed on any U.S. Government list of prohibited or restricted
          parties. If Pitch provides a translation of the English language
          version of this EULA, the translation is provided solely for
          convenience, and the English version will prevail.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(TermsCondition);

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
    marginTop: 5,
    marginLeft: 10,
    fontSize: 14,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 6,
    marginBottom: 6,
    fontSize: 12,
  },
  tcLBold: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'bold',
    // textTransform: 'capitalize'
  },
  DatetcL: {
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 10,
    fontSize: 12,
  },
});
