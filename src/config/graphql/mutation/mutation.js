import { gql } from "@apollo/client";

export const CreateCartProduct = gql`
  mutation CreateCartProduct(
    $id_product: Int
    $jumlah: numeric
    $total: numeric
  ) {
    insert_toko_order_one(
      object: { id_product: $id_product, jumlah: $jumlah, total: $total }
    ) {
      id
      product {
        image
        nama
        harga
      }
    }
  }
`;

export const DeleteCartProduct = gql`
  mutation DeleteCartProduct($id: Int!) {
    delete_toko_order_by_pk(id: $id) {
      id
    }
  }
`;

export const DeleteAllCart = gql`
  mutation DeleteAllCart {
    delete_toko_order(where: {}) {
      affected_rows
    }
  }
`;

export const UpdateCartProduct = gql`
  mutation UpdateCartProduct($id: Int!, $jumlah: numeric, $total: numeric) {
    update_toko_order_by_pk(
      pk_columns: { id: $id }
      _set: { jumlah: $jumlah, total: $total }
    ) {
      id
      id_product
      jumlah
      total
    }
  }
`;
