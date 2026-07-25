const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2 } = require('../helper/unwrapLPs')

// OIL — Robinhood Chain mainnet (defaults 2026-07-22)
const OIL = '0x1360CaEb5BA22320Ed763622c92F31eD3a36518a'
const GRID = '0x8B2873ca720aCE314c9FEe43D5dD0ddc645E344B'
const AUCTION = '0xB7075F3cB83Dc0aE221fE5D2eF8902CFa47351F6'
const MOTHERLODE = '0x1942C77dC2a97D44B784832085D82409B2EbA313'
const AUTOMINER = '0xf9F8d3BF3D8B577edB12c57DDA8D47473B93E246'
const REWARDS = '0x0e4B19087626C361800Db192cAd7666845F2FA2d'
const VE_STAKING = '0x770e899a7Cc1453B149BD255d937Ab97f3bBffeA'
const FEE_SPLITTER = '0x18DF88f0a187f9625e1ADdf5A7DA47E877b40e9e'
const REFERRAL = '0xacCCba4d475b33D9D49a12BF1DBB8c1bf9407773'
const TREASURY = '0xc0E78670959d544468970B020E9D2062eE8dF22C'
const VOTE_ESCROW = '0x94D07FB3674f5c33a0FCd0d65455e34581C3dDfC'

const NATIVE = ADDRESSES.null

/** Native ETH held in game / reward contracts on behalf of users (round pots, motherlode, autominer deposits, unclaimed ETH, pending ve rewards, fee/referral buffers, treasury buyback float). */
const ETH_TVL_OWNERS = [
  GRID,
  AUCTION,
  MOTHERLODE,
  AUTOMINER,
  REWARDS,
  VE_STAKING,
  FEE_SPLITTER,
  REFERRAL,
  TREASURY,
]

/** OIL locked or accrued to users (ve locks + unclaimed / motherlode / referral OIL). Not LP. */
const OIL_STAKING_OWNERS = [
  VOTE_ESCROW,
  MOTHERLODE,
  REWARDS,
  REFERRAL,
]

async function tvl(api) {
  return sumTokens2({
    api,
    owners: ETH_TVL_OWNERS,
    tokens: [NATIVE],
  })
}

async function staking(api) {
  return sumTokens2({
    api,
    owners: OIL_STAKING_OWNERS,
    tokens: [OIL],
  })
}

module.exports = {
  methodology:
    'TVL sums native ETH held by OIL game and reward contracts on Robinhood Chain: live grid/auction pots, motherlode ETH, autominer deposits, unclaimed winner ETH on the rewards ledger, pending ve staker rewards, fee-splitter and referral ETH buffers, and treasury ETH. Staking counts OIL locked in vote escrow plus OIL accrued to users in motherlode, rewards ledger, and referral.',
  start: '2026-07-22',
  robinhood: {
    tvl,
    staking,
  },
}
