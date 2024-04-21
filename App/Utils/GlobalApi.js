import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clun26q2k0t3j07tbxui9dl3c/master";

const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategories = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessList = async () => {
  const query = gql`
    query GetBusinessList {
      businessLists {
        id
        name
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query = gql`
    query GetBusinessListByCategory {
      businessLists(where: { category: { name: "${category}" } }) {
        id
        name
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async ({
  businessId,
  date,
  time,
  userEmail,
  userName,
}) => {
  const mutationQuery = gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked
          businessList: { connect: { id: "${businessId}" } }
          date: "${date}"
          time: "${time}"
          userEmail: "${userEmail}"
          userName: "${userName}"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBookings = async (userEmail) => {
  const query = gql`
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "${userEmail}"}) {
      businessList {
        id
        images {
          url
        }
        name
        contactPerson
        email
        address
        about
      }
      time
      userEmail
      userName
      bookingStatus
      date
      id
    }
  }  
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings,
};
