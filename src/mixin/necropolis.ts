import { ZilPayBase } from "mixin/zilpay-base";
import { Contracts } from "config/contracts";
import { pushToList } from "@/store/transactions";

export interface RewardsParams {
  combat: string;
  face: string;
  zlp: string;
  supply: string;
  tokenid: string;
  max: string;
  combatCurve: string;
  faceCurve: string;
  supplyCurve: string;
}

const f0 = BigInt(`0`);
const f1 = BigInt(`10`);
const f2 = BigInt(`100`);
const f4 = BigInt(`10000`);
const f7 = BigInt(`1000000`);
const f6 = BigInt(`10000000`);
const f9 = BigInt(`100000000`);
const f11 = BigInt(`10000000000`);
const f12 = BigInt(`100000000000`);
const f13 = BigInt(`1000000000000`);
const f15 = BigInt(`100000000000000`);
const f16 = BigInt(`1000000000000000`);
const f17 = BigInt(`10000000000000000`);
const f18 = BigInt(`100000000000000000`);
const f19 = BigInt(`1000000000000000000`);
const f20 = BigInt(`10000000000000000000`);
const f21 = BigInt(`100000000000000000000`);
const f23 = BigInt(`10000000000000000000000`);
const f22 = BigInt(`100000000000000000000000`);
const f25 = BigInt(`1000000000000000000000000`);
const f26 = BigInt(`10000000000000000000000000`);
const f27 = BigInt(`100000000000000000000000000`);
const f29 = BigInt(`10000000000000000000000000000`);
const f31 = BigInt(`1000000000000000000000000000000`);
const f33 = BigInt(`100000000000000000000000000000000`);
const f35 = BigInt(`10000000000000000000000000000000000`);
const f37 = BigInt(`1000000000000000000000000000000000000`);
const f39 = BigInt(`100000000000000000000000000000000000000`);
const f41 = BigInt(`10000000000000000000000000000000000000000`);
const f43 = BigInt(`1000000000000000000000000000000000000000000`);

export class Necropolis {
  public zilpay = new ZilPayBase();

  private _getAGen(gens: bigint, f: bigint, s: bigint, last: bigint) {
    return (gens % f) / (f / s) + last;
  }

  private _calcFaceGenes(gens: bigint, s: bigint) {
    const sub = gens % f27;
    const aura = sub / f26;

    const horns = this._getAGen(sub, f25, f1, aura);
    const scales = this._getAGen(sub, f22, f1, horns);
    const spots = this._getAGen(sub, f20, f1, scales);
    const tail = this._getAGen(sub, f18, f1, spots);
    const wings = this._getAGen(sub, f16, f1, tail);
    const body = this._getAGen(sub, f12, f1, wings);
    const eyes = this._getAGen(sub, f9, f1, body);
    const head = this._getAGen(sub, f6, f1, eyes);

    return (head * f19) / s;
  }

  private _calcCombatGens(gens: bigint, s: bigint) {
    const g0 = this._getAGen(gens, f43, f2, f0);
    const g1 = this._getAGen(gens, f41, f2, g0);
    const g2 = this._getAGen(gens, f39, f2, g1);
    const g3 = this._getAGen(gens, f37, f2, g2);
    const g4 = this._getAGen(gens, f35, f2, g3);
    const g5 = this._getAGen(gens, f33, f2, g4);
    const g6 = this._getAGen(gens, f31, f2, g5);
    const g7 = this._getAGen(gens, f29, f2, g6);
    const g8 = this._getAGen(gens, f27, f2, g7);
    const g9 = this._getAGen(gens, f25, f2, g8);
    const g10 = this._getAGen(gens, f23, f2, g9);
    const g11 = this._getAGen(gens, f21, f2, g10);
    const g12 = this._getAGen(gens, f19, f2, g11);
    const g13 = this._getAGen(gens, f17, f2, g12);
    const g14 = this._getAGen(gens, f15, f2, g13);
    const g15 = this._getAGen(gens, f13, f2, g14);
    const g16 = this._getAGen(gens, f11, f2, g15);
    const g17 = this._getAGen(gens, f9, f2, g16);
    const g18 = this._getAGen(gens, f7, f2, g17);
    const g19 = this._getAGen(gens, f4, f2, g18);
    const g20 = this._getAGen(gens, f2, f2, g19);

    return (g20 * f19) / s;
  }

  private _calcAmount(zlp: bigint, supply: bigint, tokenid: bigint, s: bigint) {
    return zlp / ((supply * tokenid) / s);
  }

  public calcRewards(params: RewardsParams) {
    const combat = BigInt(params.combat);
    const face = BigInt(params.face);
    const zlp = BigInt(params.zlp);
    const supply = BigInt(params.supply);
    const tokenid = BigInt(params.tokenid);
    const max = BigInt(params.max);
    const supplyCurve = BigInt(params.supplyCurve);
    const faceCurve = BigInt(params.faceCurve);
    const combatCurve = BigInt(params.combatCurve);
    const faceAmount = this._calcFaceGenes(face, faceCurve);
    const combatAmount = this._calcCombatGens(combat, combatCurve);
    const amount = this._calcAmount(zlp, supply, tokenid, supplyCurve);

    if (amount > max) {
      return max;
    }

    return amount + combatAmount + faceAmount;
  }

  public async getCurve() {
    const field = `curve`;
    const res = await this.zilpay.getSubState(Contracts.Necropolis, field);
    const [faceCurve, combatCurve, maxCurve, supplyCurve] = res.arguments;

    return {
      faceCurve,
      combatCurve,
      maxCurve,
      supplyCurve,
    };
  }

  public async burnForRewards(tokenid: string) {
    const params = [
      {
        vname: `token_id`,
        type: `Uint256`,
        value: tokenid,
      },
    ];
    const gas = {
      gasPrice: `2000`,
      gaslimit: String(5000),
    };
    const transition = `CallRewards`;

    const res = await this.zilpay.call(
      {
        transition,
        params,
        amount: `0`,
        contractAddress: Contracts.Necropolis,
      },
      gas,
    );

    pushToList({
      timestamp: new Date().getTime(),
      name: `Burn Dragon (#${tokenid}) for rewards.`,
      confirmed: false,
      hash: res.ID,
      from: res.from,
    });

    return String(res.ID);
  }
}
