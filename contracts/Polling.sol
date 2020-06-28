pragma solidity >=0.5.0;

import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";

contract PollingEvents is BaseRelayRecipient {
    event PollCreated(
        address indexed creator,
        uint256 blockCreated,
        uint256 indexed pollId,
        uint256 startDate,
        uint256 endDate,
        string multiHash,
        string url
    );

    event PollWithdrawn(
        address indexed creator,
        uint256 blockWithdrawn,
        uint256 pollId
    );

    event Voted(
        address indexed voter,
        uint256 indexed pollId,
        uint256 indexed optionId
    );
}

contract PollingEmitter is PollingEvents {
    uint256 public npoll;

    function createPoll(uint256 startDate, uint256 endDate, string calldata multiHash, string calldata url)
        external
    {
        uint256 startDate_ = startDate > now ? startDate : now;
        require(endDate > startDate_, "polling-invalid-poll-window");
        emit PollCreated(
            _msgSender(),
            block.number,
            npoll,
            startDate_,
            endDate,
            multiHash,
            url
        );
        require(npoll < uint(-1), "polling-too-many-polls");
        npoll++;
    }

    function setTrustedForwarder(address _trustedForwarder) public {
        trustedForwarder = _trustedForwarder;
    }

    function withdrawPoll(uint256 pollId)
        external
    {
        emit PollWithdrawn(_msgSender(), block.number, pollId);
    }

    function vote(uint256 pollId, uint256 optionId)
        external
    {
        emit Voted(_msgSender(), pollId, optionId);
    }
}