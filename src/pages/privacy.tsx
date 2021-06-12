import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  max-width: 900px;
`;

export const Privacy: NextPage = () => (
  <Container>
    <Navbar />
    <Text
      fontVariant={StyleFonts.FiraSansBold}
      fontColors={Colors.White}
      size="114px"
    >
      Privacy Policy
    </Text>
    <Wrapper>
      <Text fontColors={Colors.Muted}>
        We at RIKA LLC (“RIKA LLC,” “we,” or “us”) believe that your privacy is a fundamental right. We have written this privacy policy (this “Policy”) to reflect our values, and to clearly describe what information we collect from you when you use our custom-developed smart contracts to own eggs, which can then be seen and visualized on a website (dragonzil.xyz) that users can interact with (the “Site”), as well as how we protect and use that information. The smart contracts and the Site are collectively referred to in this Policy as the “Dragons ZIL Application”. By using the Dragons ZIL, you agree that we can disclose, collect, use, and process your information as described in this Policy. This Policy only applies to the Dragons ZIL Application, and not to any other websites, products or services you may be able to access or link to via the Dragons ZIL Application.
      </Text>
      <br />
      <Text fontColors={Colors.Muted}>
        While our principles will not change, the Dragons ZIL Application will change over time, and this Policy will change to reflect that evolution. If we make changes, we will notify you by revising the date at the top of this Policy. In some cases, if we make significant changes, we may give you additional notice by adding a statement to our homepage, or by sending you an email notification. We encourage you to review this Policy periodically to stay informed about our practices.
      </Text>
      <br />
      <Text fontColors={Colors.Muted}>
        Information Collection
      </Text>
      <Text fontColors={Colors.Primary}>
        Information We Don’t Collect
      </Text>
      <Text fontColors={Colors.Muted}>
        We do not collect any other personally-identifiable information about you, unless you give it to us directly: by filling out a form, creating an account, giving us written feedback, communicating with us via third party social media sites, or otherwise communicating with us via the Dragons ZIL Application or any other means. We do not collect any payment information from you, other than your ZIlPay wallet address.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        Information We Do Collect
      </Text>
      <Text fontColors={Colors.Muted}>
        We will ask you to provide us with your email address, and your ZILereum wallet address.
      </Text>
      <Text fontColors={Colors.Muted}>
        Information Usage
      </Text>
      <Text fontColors={Colors.Primary}>
        Information Processing
      </Text>
      <Text fontColors={Colors.Muted}>
        Depending on where you are located, your information may need to be transferred to different servers around the world as part of using the Dragons ZIL Application. You acknowledge that, as part of making the Dragons ZIL Application available to you, we may transfer your information to or maintain your information on computers located outside of your state, province, country, or other governmental jurisdiction, where the privacy laws may not be as protective as those in your jurisdiction. If you are located outside of the United States and you choose to provide your information to us, you agree that we have the right to transfer your information to the United States and process it there. By using the Dragons ZIL Application, or by otherwise providing any information to us, you consent to the processing and transfer of that information in and to the United States, and other countries.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        What We Don’t Do With Information We Collect
      </Text>
      <Text fontColors={Colors.Muted}>
        We do not share any information that directly identifies you with any third party, except in the following limited cases: As required to comply with applicable law or regulation, or to comply with law enforcement; To respond to claims and/or legal process; To prevent behavior that is (or that we think may be) illegal or unZILical; To help ensure the safety of the public or an individual; To protect our rights or our property, or to enforce ourTerms of Use; With your consent, or at your request or direction; or As otherwise set forth in this Policy.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        What We Do With Information We Collect
      </Text>
      <Text fontColors={Colors.Muted}>
        We use the information we collect in the following ways:
      </Text>
      <ul>
        <li>
          <Text fontColors={Colors.Muted}>
            To improve the Dragons ZIL Application;
          </Text>
        </li>
        <li>
          <Text fontColors={Colors.Muted}>
            To analyze trends for how the Dragons ZIL Application is being used;
          </Text>
        </li>
        <li>
          <Text fontColors={Colors.Muted}>
            To help personalize your experience of the Dragons ZIL Application;
          </Text>
        </li>
      </ul>
      <Text fontColors={Colors.Muted}>
        If you gave us your contact information, we will use it to send you data as part of making the Dragons ZIL Application available to you. We may also use that information to contact you to send you technical notices, updates, confirmations, security alerts, to provide support to you, to tell you about other products and services that we think might interest you, or to respond to your comments or questions.
      </Text>
      <Text fontColors={Colors.Muted}>
        We may share the information we collect with third parties who need to access it in order to do work on our behalf, including doing things like helping us make the Dragon ZIL Application available, or providing analytics services for us. We work hard to ensure that these third parties only access and use your information as necessary to perform their functions. We will create aggregations and anonymizations that contain your information in a way that does not directly identify you. We may use and/or share those aggregations and anonymizations for a variety of purposes related to the Dragons ZIL Application, or our company and its business.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        Our Policy Towards Children
      </Text>
      <Text fontColors={Colors.Muted}>
        The Dragons ZIL Application is not intended for use by children under the age of 13. If you are the parent or guardian of a child under the age of 13 and you become aware that your child has provided personally identifiable information to us without your and their consent, contact us at hello@dragonsZIL.com. If we become aware that a child under the age of 13 has provided us with their personally identifiable information, we will remove that information from our files.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        Information Security
      </Text>
      <Text fontColors={Colors.Muted}>
        We take safeguarding your information seriously. We will take reasonable administrative, physical, and electronic measures to help protect your information from loss, theft, misuse, unauthorized access, disclosure, alteration or destruction. All that said, no mZILod of transmitting or storing information over the Internet is completely secure. With that in mind, we cannot guarantee the absolute security of your information.
      </Text>
      <br />
      <Text fontColors={Colors.Primary}>
        Contact Us
      </Text>
      <a href="https://t.me/Deep_Dragons">
        <Text fontColors={Colors.Primary}>
          Telegram
        </Text>
      </a>
    </Wrapper>
  </Container>
);

export default Privacy;
