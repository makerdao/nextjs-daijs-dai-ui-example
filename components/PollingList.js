import React, { Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@makerdao/ui-components-core';

import theme from '../theme';
// import { toSlug, eq, formatRound, add } from '../utils/misc';
import { uuidv4 } from 'uuidv4';
import useMaker from '../hooks/useMaker';
const ethers = require('ethers');

// You may or may not want to get rid of the following styling
// stuff, but I included it from the gov portal to minimize
// the complexity in getting this component transplanted here

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

const PollingList = () => {
  const { maker } = useMaker();
  let polls, symbolicVoting;
  const START_TIME = new Date('6/26/2020 15:00 GMT').getTime();
  const END_TIME = new Date('6/29/2020 15:00 GMT').getTime();
  const DOCUMENT_LINK = `https://raw.githubusercontent.com/makerdao/community/master/governance/polls/Base%20Rate%20Adjustment%20-%20May%2025%2C%202020.md`;

  // You may be better off using the SDK function here
  function createPoll() {
    symbolicVoting.createPoll(START_TIME, END_TIME, uuidv4(), DOCUMENT_LINK); // random id for the hash
  }
  
  useEffect(() => {
    if (maker) {
      symbolicVoting = maker.service('smartContract').getContract('POLLING');
      console.log(symbolicVoting);
      const pollingService = maker.service('govPolling');

      // The following functions do not actually work yet, but
      // this bit may help with Ian's WIP stuff trying to do the same thing.
      // Also see the following functionality in the pollingService:
      // https://github.com/makerdao/dai.js/blob/b270a3fb119d84a1f96c2dd45608343666bbbd78/packages/dai-plugin-governance/src/GovPollingService.js#L48

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
    }
  }, []);

  return (
    <Fragment>
      <StyledButton
        onClick={() => createPoll()}
      >
        Create Poll
      </StyledButton>
      <RiseUp key={ polls ? polls.toString() : '...' }>
        {
          polls
            ? polls.map(poll => (
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
            ))
          : '...'
        }
      </RiseUp>
    </Fragment>
  );
};

export default PollingList;