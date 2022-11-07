import { gql } from "@apollo/client";

export const SubscriptionCart = gql`
  subscription SubscriptionCart {
    toko_order {
      id
      id_product
      jumlah
      product {
        harga
        image
        nama
      }
      total
    }
  }
`;
export const BadgeCart = gql`
  subscription BadgeCart {
    toko_order_aggregate {
      aggregate {
        sum {
          jumlah
          total
        }
      }
    }
  }
`;
