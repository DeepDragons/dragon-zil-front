import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Loader from "react-loader-spinner";
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { OpenGraph } from 'components/open-graph';
import { Navbar } from 'components/nav-bar';
import { Container } from 'components/pages/container';
import { Wrapper, PageTitle } from 'components/dragon/styles';

import { DragonAPI, DragonObject } from 'lib/api';
import { FigthPlace } from 'mixin/fight-place';
import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import { ZIlPayToken } from 'mixin/zilpay-token';
import { getPrice } from 'lib/get-price';
import { Contracts } from '@/config/contracts';

const CompareCombatGens = dynamic(import('components/dragon/compare-combat-gens'));
const ChoiceWith = dynamic(import('components/dragon/choice-with'));

type Prop = {
  defended: DragonObject;
}

const backend = new DragonAPI();
const zilPayToken = new ZIlPayToken();
const figthPlace = new FigthPlace();
export const FightStart: NextPage<Prop> = ({ defended }) => {
  const arenaLocale = useTranslation('arena');
  const commonLocale = useTranslation('common');
  const router = useRouter();

  const [attacked, setAttacked] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [needApprove, setNeedApprove] = React.useState(true);

  const amount = React.useMemo(() => {
    return getPrice(defended?.actions);
  }, [defended]);

  const hanldeUpdate = React.useCallback(async() => {
    setLoading(true);
    try {
      const zlp = Number(amount) / 10**18;
      const allow = await zilPayToken.getAllowances(Contracts.FightPlace);
      setNeedApprove(await zilPayToken.calcAllowances(zlp, allow));
    } catch {
      ///
    }
    setLoading(false);
  }, [amount]);

  const handleStartFight = React.useCallback(async() => {
    if (!attacked || !defended) {
      return null;
    }
    setLoading(true);

    try {
      if (needApprove) {
        await zilPayToken.increaseAllowance(Contracts.FightPlace);
      } else {
        await figthPlace.startFight(defended.id, attacked.id);
      }
    } catch {
      //
    }
    setLoading(false);
  }, [defended, attacked, needApprove]);

  React.useEffect(() => {
    hanldeUpdate();
  }, []);

  return (
    <Container>
      <Head>
        <title>
          {commonLocale.t('name')} | {arenaLocale.t('title')} #{defended?.id}
        </title>
        <OpenGraph
          url={`https://dragonzil.xyz/fights/${defended?.id}`}
          title={`${arenaLocale.t('title')} #${defended?.id}`}
          description={`Fight with Dragon #${defended?.id} for ${Number(amount) / 10**18} $ZLP`}
          img={defended?.url}
          alt={`Dragon ID #${defended?.url}`}
          site="@dragons_eth"
          siteName="dragonZIL"
        />
      </Head>
      <Navbar />
      <Wrapper>
        <PageTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="56px"
        >
          {arenaLocale.t('sub_title')} #{router.query.id}
        </PageTitle>
        <PageTitle
          fontVariant={StyleFonts.FiraSansMedium}
          size="21px"
        >
          {commonLocale.t('price')} <span>{Number(amount) / 10**18} $ZLP</span>
        </PageTitle>
      </Wrapper>
      {defended ? (
        <Wrapper>
          <ChoiceWith
            dragon={defended}
            myDragon={attacked}
            color={Colors.Danger}
            btnColor={needApprove ? Colors.LightBlue : Colors.Info}
            icon="arena.svg"
            setDragon={setAttacked}
            onStart={handleStartFight}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : needApprove ?
              arenaLocale.t('approve') : arenaLocale.t('start_btn')}
          </ChoiceWith>
          {attacked ? (
            <CompareCombatGens
              loverDragon={defended}
              myDragon={attacked}
              color={Colors.Danger}
            />
          ) : null}
        </Wrapper>
      ) : null}
    </Container>
  );
};

export const getStaticProps = async (props: GetServerSidePropsContext) => {
  const dragonId = String(props.params && props.params.id);
  const defended = await backend.getDragon(String(dragonId));

  return {
    props: {
      defended,
      ...await serverSideTranslations(props.locale || 'en', ['common', 'arena'])
    }
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      '/fights/id',
    ],
    fallback: true
  }
}

export default FightStart;
