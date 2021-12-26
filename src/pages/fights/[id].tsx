import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import Loader from "react-loader-spinner";
import { useStore } from "effector-react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { OpenGraph } from "components/open-graph";
import { Navbar } from "components/nav-bar";
import { Container } from "components/pages/container";
import { Wrapper, PageTitle } from "components/dragon/styles";
import { NoCache } from "components/no-cache";
import { WaitFightModal } from "components/modals/wait-fight-result";

import { DragonAPI, DragonObject } from "lib/api";
import { FigthPlace } from "mixin/fight-place";
import { ZIlPayToken } from "mixin/zilpay-token";
import { getPrice } from "lib/get-price";
import { $wallet } from "store/wallet";
import { StyleFonts } from "@/config/fonts";
import { Colors } from "@/config/colors";
import { Contracts } from "@/config/contracts";
import { $arena, updateArena, resetArena } from "@/store/arena";

const CompareCombatGens = dynamic(
  import(`components/dragon/compare-combat-gens`),
);
const ChoiceWith = dynamic(import(`components/dragon/choice-with`));

type Prop = {
  defended: DragonObject | null;
};

const backend = new DragonAPI();
const zilPayToken = new ZIlPayToken();
const figthPlace = new FigthPlace();
export var FightStart: NextPage<Prop> = function ({ defended }) {
  const arenaLocale = useTranslation(`arena`);
  const commonLocale = useTranslation(`common`);
  const router = useRouter();

  const wallet = useStore($wallet);
  const arena = useStore($arena);
  const [attacked, setAttacked] = React.useState<DragonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [needApprove, setNeedApprove] = React.useState(true);
  const [waitResult, setWaitResult] = React.useState(
    arena?.with === defended?.id,
  );

  const amount = React.useMemo(() => getPrice(defended?.actions), [defended]);
  const defendedName = React.useMemo(() => {
    if (!defended || !defended.name) {
      return ``;
    }

    return `- ${defended.name}`;
  }, [defended]);

  const hanldeUpdate = React.useCallback(async () => {
    setLoading(true);
    try {
      const allow = await zilPayToken.getAllowances(Contracts.FightPlace);
      setNeedApprove(!zilPayToken.isAllow(amount, allow));
    } catch {
      ///
    }
    setLoading(false);
  }, [amount]);

  const handleStartFight = React.useCallback(async () => {
    if (!attacked || !defended) {
      return null;
    }
    setWaitResult(true);
    setLoading(true);
    resetArena();

    try {
      if (needApprove) {
        await zilPayToken.increaseAllowance(Contracts.FightPlace);

        setNeedApprove(false);
      } else {
        const hash = await figthPlace.startFight(defended.id, attacked.id);
        updateArena({
          hash,
          amount,
          who: String(attacked.id),
          with: String(defended.id),
        });
      }
    } catch {
      resetArena();
      setWaitResult(false);
    }
    setLoading(false);
  }, [defended, attacked, needApprove, amount]);

  React.useEffect(() => {
    hanldeUpdate();
  }, [wallet, hanldeUpdate]);

  return (
    <Container>
      {defended && arena && waitResult ? (
        <WaitFightModal
          show={waitResult}
          defended={defended}
          onClose={() => router.push(`/fights`)}
        />
      ) : null}
      <Head>
        <title>
          {commonLocale.t(`name`)}
          {` `}
          |
          {arenaLocale.t(`title`)}
          {` `}
          #
          {defended?.id}
        </title>
        <OpenGraph
          url={`https://dragonzil.xyz/fights/${defended?.id}`}
          title={`${arenaLocale.t(`title`)} #${defended?.id} ${defendedName}`}
          description={`Fight with Dragon #${defended?.id} for ${
            Number(amount) / 10 ** 18
          } $ZLP`}
          img={defended?.url}
          alt={`Dragon ID #${defended?.url}`}
          site="@dragons_eth"
          siteName="dragonZIL"
        />
        <NoCache />
      </Head>
      <Navbar />
      <Wrapper>
        <PageTitle fontVariant={StyleFonts.FiraSansBold} size="56px">
          {arenaLocale.t(`sub_title`)}
          {` `}
          #
          {router.query.id}
        </PageTitle>
        <PageTitle fontVariant={StyleFonts.FiraSansMedium} size="21px">
          {commonLocale.t(`price`)}
          {` `}
          <span>
            {Number(amount) / 10 ** 18}
            {` `}
            $ZLP
          </span>
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
            ) : needApprove ? (
              arenaLocale.t(`approve`)
            ) : (
              arenaLocale.t(`start_btn`)
            )}
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
  if (props.res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    props.res.setHeader(`Cache-Control`, `no-store`);
  }

  const dragonId = String(props.params && props.params.id);
  const defended = await backend.getDragon(String(dragonId));

  return {
    props: {
      defended,
      ...(await serverSideTranslations(props.locale || `en`, [
        `common`,
        `arena`,
      ])),
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  return {
    paths: [`/fights/id`],
    fallback: true,
  };
}

export default FightStart;
