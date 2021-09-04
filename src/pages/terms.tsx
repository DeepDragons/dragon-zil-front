import React from 'react';
import styled from 'styled-components';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';

import { Navbar } from 'components/nav-bar';
import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  max-width: 900px;
`;

export const Terms: NextPage = () => {
  const termsLocale = useTranslation('terms');
  const commonLocale = useTranslation('common');

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {termsLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={`${commonLocale.t('name')} | ${termsLocale.t('title')}`}
          key="title"
        />
      </Head>
      <Navbar />
      <Text
        fontVariant={StyleFonts.FiraSansBold}
        fontColors={Colors.White}
        size="114px"
      >
        {termsLocale.t('title')}
      </Text>
      <Wrapper>
        <Text fontColors={Colors.Muted}>
          Dragons ZIL is a distributed application that runs on the ZIlliqa blockchain. It uses custom developed ZIlliqa smart contracts (each, a “Smart Contract”) to enable users to battle, own, breed, sire, and buy digital and fictional dragons. These dragons can be seen and visualized on a website that the user can interact with (the “Site”). The Smart Contracts and the Site are collectively referred to in these Terms as the “Dragons ZIL Application”. Upon launch of the full game, the date of which is to be decided, of the Dragons ZIL Application, users will be able to view their dragons and use the Smart Contracts to buy eggs from the Dragons ZIL Application and/or buy, breed, and battle dragons with users on the Dragons ZIL Application.
        </Text>
        <Text fontColors={Colors.Muted}>
          RIKA LLC (“RIKA LLC,” “we,” or “us”) is making the Dragons ZIL Application available to you. Before using the Dragons ZIL Application, the Smart Contracts, or the Site, you will need to agree to these Terms of Use (these “Terms"). PLEASE READ THESE TERMS WITH CARE BEFORE YOU USE THE Dragons ZIL APPLICATION, THE SMART CONTRACTS, OR THE SITE. THESE TERMS GOVERN YOUR USE OF THE Dragons ZIL APPLICATION, THE SMART CONTRACTS, AND THE SITE, UNLESS WE HAVE EXECUTED A DISTINCT AND UNIQUE WRITTEN AGREEMENT WITH YOU FOR THAT PURPOSE. WE ARE ONLY WILLING TO MAKE THE Dragons ZIL APPLICATION, THE SMART CONTRACTS, AND THE SITE AVAILABLE TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING THE Dragons ZIL APPLICATION, THE SMART CONTRACTS, THE SITE, OR ANY PART OF THEM, YOU ARE CONFIRMING THAT YOU UNDERSTAND AND AGREE TO ALL OF THESE TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF, IN WHICH CASE “YOU” WILL MEAN THAT ENTITY. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT ACCEPT ALL OF THE TERMS OUTLINED, THEN WE ARE UNWILLING TO MAKE THE Dragons ZIL APPLICATION, THE SMART CONTRACTS, OR THE SITE AVAILABLE TO YOU.
        </Text>
        <Text fontColors={Colors.Primary}>
          I1. The Dragons ZIL
        </Text>
        <Text fontColors={Colors.Muted}>
          A. We utilize ZIlliqa Smart Contracts to have users interact with dragons in the Dragons ZIL Application. dragons will be available in the form of eggs on the launch of the Dragons ZIL Application egg presale. Eggs sold from the Dragons ZIL Application to users are sold on a dedicated egg sale page (the “Egg Sale Page”) and will increase in price with each egg sold from the Egg Sale Page. So each egg sold from the Egg Sale Page will be more expensive than the preceding egg sold from the Egg Sale Page. Eggs will eventually hatch digitally and turn into dragons.
        </Text>
        <Text fontColors={Colors.Muted}>
          B. Users will be able to interact with dragons on the Dragons ZIL Application in a variety of ways. These ways are still being developed and are yet to be fully decided upon. By buying eggs or dragons, you understand that you consent to the risk that you may not agree with the decisions made by the developers of the Dragons ZIL Application regarding its game mechanics, rules, sale of eggs, and anything else related to the Dragons ZIL Application.
        </Text>
        <Text fontColors={Colors.Primary}>
          2. The Dragons ZIL Application
        </Text>
        <Text fontColors={Colors.Muted}>
          A. Transactions that take place on the Dragons ZIL Application are confirmed and managed via the ZIlliqa blockchain. You understand that your ZIlliqa public address will be made publicly visible whenever you engage in a transaction on the Dragons ZIL Application.
        </Text>
        <Text fontColors={Colors.Muted}>
          B. We neither own nor control Google Chrome, MetaMask, the ZIlliqa network, or any other third party site, product, or service that you might visit, access, or use for the purpose of enabling you to use the various features provided by the Dragons ZIL Application. We will not be liable for the acts or omissions of any such third parties, nor will we be liable for any damage that you may suffer as a result of interacting with any such third parties.
        </Text>
        <Text fontColors={Colors.Muted}>
          C. You must provide accurate and complete registration information when you create an account for the Dragons ZIL Application. You are responsible for the security of your MetaMask wallet (and other ZIlliqa wallets) and for any and all use of your account, whZILer you knew about the use or not. If you become aware of any unauthorized use of your password or of your account, you agree to notify us immediately at hello@dragonsZIL.com.
        </Text>
        <Text fontColors={Colors.Muted}>
          D. It is possible for you to interact with the Dragons ZIL Application Smart Contracts via the ZIlliqa network, without using the Dragons ZIL Application as a portal. The process for doing this can be complex. If you do not know how to do this, we recommend using the Site.
        </Text>
        <Text fontColors={Colors.Primary}>
          3. Fees and Payment
        </Text>
        <Text fontColors={Colors.Muted}>
          A. If you elect to purchase eggs on the Egg Sale Page in the Dragons ZIL Application, any financial transactions that you engage in will be conducted through the ZIlliqa network. We will have no insight into or control over these transactions or payments, nor do we have the ability to reverse any transactions. Additionally, we will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage in through the Dragons ZIL Application, or independently using the Smart Contracts.
        </Text>
        <Text fontColors={Colors.Muted}>
          B. ZIlliqa requires the payment of a transaction fee for every transaction that occurs on the ZIlliqa network. This fee funds the network of computers that run the decentralized ZIlliqa network. Because of this, you will still need to pay this fee for each transaction that occurs via the ZIlliqa network- even if you interact directly with the ZIlliqa network without using the Dragons ZIL Application as a portal.
        </Text>
        <Text fontColors={Colors.Muted}>
          C. As between us, you will be solely responsible to pay any and all sales, use, value-added and other taxes, duties, and assessments (except taxes on our net income) now or hereafter claimed or imposed by any governmental authority (collectively, “Taxes”) associated with your use of the Dragons ZIL Application (including, without limitation, any Taxes that may become payable as the result of your ownership, transfer, or breeding of any of your Dragons ZIL or eggs). Except for income taxes levied on RIKA LLC, you: (i) will pay or reimburse us for all national, federal, state, local or other taxes and assessments of any jurisdiction, including value added taxes and taxes as required by international tax treaties, customs or other import or export taxes, and amounts levied in lieu thereof based on charges set, services performed or payments made hereunder, as are now or hereafter may be imposed under the authority of any national, state, local or any other taxing jurisdiction; and (ii) shall not be entitled to deduct the amount of any such taxes, duties or assessments from payments made to us pursuant to these Terms.
        </Text>
        <Text fontColors={Colors.Primary}>
          4. Ownership; Restrictions
        </Text>
        <Text fontColors={Colors.Muted}>
          A. You acknowledge and agree that we (or, as applicable, our licensors) own all legal right, title and interest in and to all elements of the Dragons ZIL Application, and all intellectual property rights therein. The visual interfaces, graphics (including, without limitation, all art and drawings associated with the dragons), systems, design, mZILods, computer code, software, services, “look and feel”, organization, information, compilation of the content, code, data, and all other elements of the Dragons ZIL Application (collectively, the “Nimbus Assets”) are owned by RIKA LLC, and are protected by copyright, trade dress, patent, and trademark laws, international conventions, other relevant intellectual property and proprietary rights, and applicable laws. All Nimbus Assets are the copyrighted property of RIKA LLC or its licensors, and all trademarks, service marks, and trade names contained in the Nimbus Assets are proprietary to RIKA LLC or its licensors. Except as expressly set forth herein, your use of the Dragons ZIL Application does not grant you ownership of or any other rights with respect to any content, code, data, or other materials that you may access on or through the Dragons ZIL Application. We reserve all rights in and to the Nimbus Assets not expressly granted to you in the Terms. For the sake of clarity, you understand and agree: (i) that your “purchase” of an egg, whZILer via the Dragons ZIL Application or otherwise, does not give you any rights or licenses in or to the Nimbus Assets (including, without limitation, our copyright in and to the art and drawings associated with that egg and resulting monster) other than those expressly contained in these Terms; and (ii) that you do not have the right to reproduce, distribute, or otherwise commercialize the Nimbus Assets (including, without limitation, our copyright in and to the art and drawings associated with that egg and/or monster) in any way without our prior written consent in each case, which we may withhold in our sole and absolute discretion.
        </Text>
        <Text fontColors={Colors.Muted}>
          B. You agree that you are responsible for your own conduct while accessing or using the Dragons ZIL Application, and for any consequences thereof. You agree to use the Dragons ZIL Application only for purposes that are legal, proper and in accordance with these Terms and any applicable laws or regulations. By way of example, and not as a limitation, you may not, and may not allow any third party to: (i) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent, obscene, or otherwise objectionable content; (ii) distribute viruses, worms, defects, Trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature; (iii) impersonate another person (via the use of an email address or otherwise); (iv) upload, post, transmit or otherwise make available through the Dragons ZIL Application any content that infringes the intellectual proprietary rights of any party; (v) use the Dragons ZIL Application to violate the legal rights (such as rights of privacy and publicity) of others; (vi) engage in, promote, or encourage illegal activity; (vii) interfere with other users’ enjoyment of the Dragons ZIL Application; (viii) exploit the Dragons ZIL Application for any unauthorized commercial purpose; (ix) modify, adapt, translate, or reverse engineer any portion of the Dragons ZIL Application; (x) remove any copyright, trademark or other proprietary rights notices contained in or on the Dragons ZIL Application or any part of it; (xi) reformat or frame any portion of the Dragons ZIL Application; (xii) display any content on the Dragons ZIL Application that contains any hate-related or violent content or contains any other material, products or services that violate or encourage conduct that would violate any criminal laws, any other applicable laws, or any third party rights; (xiii) use any robot, spider, site search/retrieval application, or other device to retrieve or index any portion of the Dragons ZIL Application or the content posted on the Dragons ZIL Application, or to collect information about its users for any unauthorized purpose; (xiv) create user accounts by automated means or under false or fraudulent pretenses; or (xv) access or use the Dragons ZIL Application for the purpose of creating a product or service that is competitive with any of our products or services.
        </Text>
        <Text fontColors={Colors.Muted}>
          C. You may choose to submit bug reports, comments, ideas or other feedback about the Dragons ZIL Application, including without limitation about how to improve the Dragons ZIL Application (collectively, “Feedback”). By submitting any Feedback, you agree that we are free to use such Feedback at our discretion and without additional compensation to you, and to disclose such Feedback to third parties (whZILer on a non-confidential basis, or otherwise). You hereby grant us a perpetual, irrevocable, non exclusive, worldwide license under all rights necessary for us to incorporate and use your Feedback for any purpose.
        </Text>
        <Text fontColors={Colors.Primary}>
          5. Termination
        </Text>
        <Text fontColors={Colors.Muted}>
          You may terminate these Terms at any time by canceling your account on the Dragons ZIL Application and discontinuing your access to and use of the Dragons ZIL Application. You will not receive any refunds if you cancel your account, or otherwise terminate these Terms. You agree that we, in our sole discretion and for any or no reason, may terminate these Terms and suspend and/or terminate your account(s) for the Dragons ZIL Application. You agree that any suspension or termination of your access to the Dragons ZIL Application may be without prior notice, and that we will not be liable to you or to any third party for any such suspension or termination. If we terminate these Terms or suspend or terminate your access to or use of the Dragons ZIL Application due to your breach of these Terms or any suspected fraudulent, abusive, or illegal activity, then termination of these Terms will be in addition to any other remedies we may have at law or in equity. Upon any termination or expiration of these Terms, whZILer by you or us, you may no longer have access to information that you have posted on the Dragons ZIL Application or that is related to your account, and you acknowledge that we will have no obligation to maintain any such information in our databases or to forward any such information to you or to any third party. Sections 2.B and 3 through 14 will survive the termination or expiration of these Terms for any reason.
        </Text>
        <Text fontColors={Colors.Primary}>
          6. Disclaimer of Warranties
        </Text>
        <Text fontColors={Colors.Muted}>
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE Dragons ZIL APPLICATION IS AT YOUR SOLE RISK, AND THAT THE Dragons ZIL APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHZILER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING THE Dragons ZIL APPLICATION AND ANY PART OF IT (INCLUDING, WITHOUT LIMITATION, THE SITE, ANY SMART CONTRACT, OR ANY EXTERNAL WEBSITES), INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR ACCESS TO OR USE OF THE Dragons ZIL APPLICATION WILL MEET YOUR REQUIREMENTS, (II) YOUR ACCESS TO OR USE OF THE Dragons ZIL APPLICATION WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERROR, (III) USAGE DATA PROVIDED THROUGH THE Dragons ZIL APPLICATION WILL BE ACCURATE, OR (III) THE Dragons ZIL APPLICATION OR ANY CONTENT, SERVICES, OR FEATURES MADE AVAILABLE ON OR THROUGH THE Dragons ZIL APPLICATION ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </Text>
        <Text fontColors={Colors.Primary}>
          7. Limitation of Liability
        </Text>
        <Text fontColors={Colors.Muted}>
          B. YOU ACKNOWLEDGE AND AGREE THAT WE HAVE MADE THE Dragons ZIL APPLICATION AVAILABLE TO YOU AND ENTERED INTO THESE TERMS IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN, WHICH REFLECT A REASONABLE AND FAIR ALLOCATION OF RISK BETWEEN THE PARTIES AND FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN US. WE WOULD NOT BE ABLE TO PROVIDE THE Dragons ZIL APPLICATION TO YOU WITHOUT THESE LIMITATIONS.
        </Text>
        <Text fontColors={Colors.Primary}>
          8. Indemnification
        </Text>
        <Text fontColors={Colors.Muted}>
          You agree to hold harmless and indemnify RIKA LLC and its subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability, loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost, and attorneys’ fees arising out of or in any way related to (i) your breach of these Terms, or (ii) your violation of applicable laws, rules or regulations in connection with your access to or use of the Dragons ZIL Application.
        </Text>
        <Text fontColors={Colors.Primary}>
          9. External Websites
        </Text>
        <Text fontColors={Colors.Muted}>
          The Dragons ZIL Application may include hyperlinks to other websites or resources (collectively, “External Websites”), which are provided solely as a convenience to our users. We have no control over any External Websites. You acknowledge and agree that we are not responsible for the availability of any External Websites, and that we do not endorse any advertising, products or other materials on or made available from any External Websites. Furthermore, you acknowledge and agree that we are not liable for any loss or damage which may be incurred as a result of the availability or unavailability of the External Websites, or as a result of any reliance placed by you upon the completeness, accuracy or existence of any advertising, products or other materials on, or made available from, any External Websites.
        </Text>
        <Text fontColors={Colors.Primary}>
          10. Children
        </Text>
        <Text fontColors={Colors.Muted}>
          You affirm that you are over the age of 13, as the Dragons ZIL Application is not intended for children under 13. IF YOU ARE 13 OR OLDER BUT UNDER THE AGE OF 18, OR THE LEGAL AGE OF MAJORITY WHERE YOU RESIDE IF THAT JURISDICTION HAS AN OLDER AGE OF MAJORITY, THEN YOU AGREE TO REVIEW THESE TERMS WITH YOUR PARENT OR GUARDIAN TO MAKE SURE THAT BOTH YOU AND YOUR PARENT OR GUARDIAN UNDERSTAND AND AGREE TO THESE TERMS. YOU AGREE TO HAVE YOUR PARENT OR GUARDIAN REVIEW AND ACCEPT THESE TERMS ON YOUR BEHALF. IF YOU ARE A PARENT OR GUARDIAN AGREEING TO THE TERMS FOR THE BENEFIT OF A CHILD OVER 13, THEN YOU AGREE TO AND ACCEPT FULL RESPONSIBILITY FOR THAT CHILD’S USE OF THE Dragons ZIL APPLICATION, INCLUDING ALL FINANCIAL CHARGES AND LEGAL LIABILITY THAT HE OR SHE MAY INCUR.
        </Text>
        <Text fontColors={Colors.Primary}>
          11. Changes to the Terms
        </Text>
        <Text fontColors={Colors.Muted}>
          We may make changes to the Terms from time to time. When we make changes, we will make the updated Terms available on the Dragons ZIL Application and update the “Last Updated” date at the beginning of these Terms accordingly. Please check these Terms periodically for changes. Any changes to the Terms will apply on the date that they are made, and your continued access to or use of the Dragons ZIL Application after the Terms have been updated will constitute your binding acceptance of the updates.
        </Text>
        <Text fontColors={Colors.Primary}>
          12. Changes to the Dragons ZIL Application
        </Text>
        <Text fontColors={Colors.Muted}>
          We are constantly innovating the Dragons ZIL Application to help provide the best possible experience. You acknowledge and agree that the form and nature of the Dragons ZIL Application, and any part of it, may change from time to time without prior notice to you, and that we may add new features and change any part of the Dragons ZIL Application at any time without notice.
        </Text>
        <Text fontColors={Colors.Primary}>
          13. Privacy Policy
        </Text>
        <Text fontColors={Colors.Muted}>
          Our Privacy Policy describes the ways we collect, use, store and disclose your personal information, and is hereby incorporated by this reference into these Terms. You agree to the collection, use, storage, and disclosure of your data in accordance with our Privacy Policy.
        </Text>
        <Text fontColors={Colors.Primary}>
          14. General
        </Text>
        <Text fontColors={Colors.Muted}>
          These Terms constitute the entire legal agreement between you and RIKA LLC, govern your access to and use of the Dragons ZIL Application, and completely replace any prior or contemporaneous agreements between the parties related to your access to or use of the Dragons ZIL Application, whZILer oral or written. There are no third party beneficiaries to these Terms. The parties are independent contractors, and nothing in these Terms create any agency, partnership, or joint venture. The language in these Terms will be interpreted as to its fair meaning, and not strictly for or against any party. You may not assign any or your rights or obligations under these Terms, whZILer by operation of law or otherwise, without our prior written consent. We may assign our rights and obligations under these Terms in our sole discretion to an affiliate, or in connection with an acquisition, sale or merger. Should any part of these Terms be held invalid or unenforceable, that portion shall be construed consistent with applicable law and the remaining portions will remain in full force and effect. Our failure to enforce any provision of these Terms will not be deemed a waiver of such provision, nor of the right to enforce such provision. These Terms will be governed by and construed in accordance with the laws of the State of New York, U.S.A., without regard to the choice-of-law principles thereof. The United Nations Convention on Contracts for the International Sale of Goods shall not apply to this agreement. Any action taken towards RIKA LLC that is seeking legal or equitable relief arising out of or relating to these Terms will be brought only in the courts of the State of New York or the United States Court for the District of New York. RIKA LLC may take legal action against anybody violating these Terms in whichever way and/or jurisdiction RIKA LLC sees fit. RIKA LLC will not be liable for any failure or delayed performance of our obligations that result from any condition beyond our reasonable control, including, but not limited to, governmental action, acts of terrorism, earthquake, fire, flood, acts of God, labor conditions, power failures, Internet disturbances, or acts or omissions of third parties. You agree that we may provide you with notices (including, without limitation those regarding changes to these Terms) by email, regular mail, or postings on the Site. By providing us with your email address, you consent to our using the email address to send you any notices required by law in lieu of communication by postal mail.
        </Text>
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'terms'])
    }
  };
};

export default Terms;
