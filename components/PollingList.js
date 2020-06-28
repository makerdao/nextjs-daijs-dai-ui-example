import React, { Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@makerdao/ui-components-core';

import theme from '../theme';
// import { toSlug, eq, formatRound, add } from '../utils/misc';
import { uuidv4 } from 'uuidv4';
import useMaker from '../hooks/useMaker';
const ethers = require('ethers');

const riseUp = keyframes`
0% {
  opacity: 0;
  transform: translateY(15px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const RiseUp = styled.div`
  animation: ${riseUp} 0.75s ease-in-out;
`;

const SubHeading = styled.p`
  color: ${theme.text.darker_default};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  flex: none;
  position: relative;
`;

const Body = styled.p`
  font-size: 16px;
  line-height: 26px;
  height: 52px;
  color: #546978;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProposalDetails = styled.div`
  max-width: 59%;
  flex-direction: column;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 16%;
  right: 2%;
`;

const Content = styled.div`
  display: flex;
`;

const proposalWrapperHeight = 200;

const BannerLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
  font-weight: bold;
`;


const fadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const FadeIn = styled.div`
  animation: ${fadeIn} 0.75s forwards;
`;
const SmallMediumText = styled.p`
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: left;
  line-height: 2;
  font-size: 14px;
  color: ${theme.text.dim_grey};
`;
const Black = styled.span`
  color: ${theme.text.default};
`;

const Strong = styled(Black)`
  color: ${theme.text.default};
  font-weight: bold;
`;

// export const VotingWeightBanner = ({ accountsFetching, activeAccount }) => {
//   if (accountsFetching || !activeAccount) return <Padding />;

//   // mkr in wallet + mkr locked in chief (including mkr locked via a vote proxy)
//   const pollVotingPower = add(
//     activeAccount.proxy.votingPower,
//     activeAccount.mkrBalance
//   );

//   if (activeAccount.hasProxy) {
//     return <VoterStatus />;
//   } else {
//     return (
//       <FadeIn>
//         <SmallMediumText>
//           <Strong>Connected wallet: </Strong>
//           <Black>{formatRound(pollVotingPower, 4)} MKR</Black>{' '}
//         </SmallMediumText>
//       </FadeIn>
//     );
//   }
// };

const PollingList = () => {
  const { maker } = useMaker();
  let polls;

  useEffect(() => {
    const symbolicVoting = maker.service('smartContract').getContract('SYMBOLIC_VOTING');
    console.log(symbolicVoting);
    const logs = ethers
    // getDefaultProvider(<network_name>) for anything besides mainnet
      .getDefaultProvider("kovan")
      .getLogs({
        ...symbolicVoting.filters.PollCreated(),
        fromBlock: 0,
        toBlock: 'latest'
      });

    polls = logs
      .map(log => symbolicVoting.interface.parseLog(log))
      .map(({ args: { creator, pollId, startDate, endDate, multiHash, url } }) => ({
        creator,
        pollId: pollId.toString(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        multiHash,
        url
      }));
    
    polls.sort((a, b) => b.startDate - a.startDate);
  }, []);

  const START_TIME = new Date('6/26/2020 15:00 GMT').getTime();
  const END_TIME = new Date('6/29/2020 15:00 GMT').getTime();
  const DOCUMENT_LINK = `https://raw.githubusercontent.com/makerdao/community/master/governance/polls/Base%20Rate%20Adjustment%20-%20May%2025%2C%202020.md`;

  function createPoll() {
    symbolicVoting.createPoll(START_TIME, END_TIME, uuidv4(), DOCUMENT_LINK); // random id for the hash
  }

  return (
    <Fragment>
      <StyledButton
        onClick={() => createPoll()}
      >
        Create Poll
      </StyledButton>
      <RiseUp key={polls.toString()}>
        {polls.map(poll => (
          <div>
            <div>
              <ProposalDetails>
                <SubHeading>{poll.title}</SubHeading>
                <Body
                  dangerouslySetInnerHTML={{
                    __html: poll.summary
                  }}
                />
                <div>
                  <Fragment>
                      <StyledButton>Vote on Proposal</StyledButton>
                  </Fragment>
                </div>
              </ProposalDetails>
            </div>
          </div>
        ))}
      </RiseUp>
    </Fragment>
  );
};

export default PollingList;