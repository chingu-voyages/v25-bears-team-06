const getUserQuery = `
  query GetUserDashboardData {
    getUser {
      email
      displayName
      owns {
        _id
        isAvailable
        book {
          _id
          googleId
          title
          authors
        }
        checkoutData {
          user {
            displayName
          }
          checkoutDate
          dueDate
          returnDate
          condition
        }
      }
      checkedOut {
        _id
        owner {
          displayName
        }
        checkoutData {
          dueDate
        }
        book {
          _id
          googleId
          title
          authors
          publishedDate
        }
      }
      waitlisted {
        _id
        book {
          _id
          googleId
          title
          authors
          publishedDate
          owners {
            _id
            owner {
              _id
              displayName
            }
            isAvailable
          }
        }
        owner {
          displayName
        }
      }
    }
  }
`;

const GET_USER = {
  query: getUserQuery,
};

export default GET_USER;
