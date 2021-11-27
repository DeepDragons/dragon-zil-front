import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Navbar } from 'components/nav-bar';
import Loader from "react-loader-spinner";
import { Text } from 'components/text';
import { Tab } from 'components/tab';
import { IntInput } from 'components/int-input';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { CrowdSale } from 'mixin/crowd-sale';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  justify-content: space-between;
`;
const Main = styled.div`
  height: 70vh;
`;
const Form = styled.form`
  background: ${Colors.Secondary};
  padding: 36px;
  border-radius: 16px;
  max-width: 900px;
  width: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    padding: 10px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;
const InputWrapper = styled.div`
  max-width: 290px;
`;
const BuyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  min-width: 235px;
  padding: 16px;

  div {
    display: flex;
    align-items: center;
  }
`;

const tokens = [
  <Text fontVariant={StyleFonts.FiraSansSemiBold}>
    ZIL
  </Text>,
  <Text fontVariant={StyleFonts.FiraSansSemiBold}>
    ZLP
  </Text>
];

const crowdSale = new CrowdSale();
export const BuyPage: NextPage = () => {
  const storeLocale = useTranslation('store');
  const commonLocale = useTranslation('common');
  const crowdSaleStore = useStore(crowdSale.store);
  const [selected, setSelected] = React.useState(1);
  const [eggs, setEggs] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const amount = React.useMemo(() => {
    if (selected === 0) {
      return Number(crowdSaleStore.zilPrice) / 10**12;
    }

    return Number(crowdSaleStore.zlpPrice) / 10**18;
  }, [crowdSaleStore, selected]);

  const handleBuyEggs = React.useCallback(async() => {
    setLoading(true);
    try {
      if (selected === 0) {
        await crowdSale.buyForZIL(eggs);
      } else {
        await crowdSale.buyForZLP(eggs);
      }
    } catch (err) {
      console.error(err);
      ///
    }
    setLoading(false);
  }, [eggs, selected]);

  React.useEffect(() => {
    crowdSale
      .update()
      .finally(() => null)
  }, []);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {storeLocale.t('title')}
        </title>
        <meta
          property="og:title"
          content={storeLocale.t('title')}
          key="title"
        />
      </Head>
      <Navbar />
      <Main>
        <Form>
          <TitleWrapper>
            <Text
              fontVariant={StyleFonts.FiraSansSemiBold}
              size="24px"
              css="margin-right: 10px;"
            >
              {storeLocale.t('title')}
            </Text>
            <img
              src="/icons/egg.svg"
              alt="egg"
            />
          </TitleWrapper>
          <Wrapper>
            <Tab
              elements={tokens}
              selected={selected}
              onSelected={setSelected}
            >
              {storeLocale.t('choose_token')}
            </Tab>
            <InputWrapper>
              <IntInput
                value={eggs}
                onInput={setEggs}
              >
                {storeLocale.t('number_of_eggs')}
              </IntInput>
            </InputWrapper>
            <BuyButton
              disabled={loading}
              onClick={handleBuyEggs}
            >
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color={Colors.White}
                  height={48}
                  width={40}
                />
              ) : (
                <div>
                  {storeLocale.t('but_for')} {Math.round(amount * eggs)} ${tokens[selected]}
                </div>
              )}
            </BuyButton>
          </Wrapper>
        </Form>
      </Main>
    </Container>
  );
}

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  return {
    props: {
      ...await serverSideTranslations(props.locale || 'en', ['common', 'store']),
    }
  };
};

export default BuyPage;
