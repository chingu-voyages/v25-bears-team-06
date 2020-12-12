const joinWaitlistMutation = `
  mutation JoinWaitlist(
    $ownershipId: ID!
  ) {
    joinWaitlist (
      ownershipId: $ownershipId
    ) {
      _id
      waitlist {
        _id
      }
    }
  }
`;

const joinWaitlistVariables = ({ ownershipId }) => ({ ownershipId });

const JOIN_WAITLIST = {
  mutation: joinWaitlistMutation,
  variables: joinWaitlistVariables,
};

export default JOIN_WAITLIST;
