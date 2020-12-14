const leaveWaitlistMutation = `
  mutation LeaveWaitlist(
    $ownershipId: ID!
  ) {
    leaveWaitlist (
      ownershipId: $ownershipId
    ) {
      _id
      waitlist {
        _id
      }
    }
  }
`;

const leaveWaitlistVariables = ({ ownershipId }) => ({ ownershipId });

const LEAVE_WAITLIST = {
  mutation: leaveWaitlistMutation,
  variables: leaveWaitlistVariables,
};

export default LEAVE_WAITLIST;
