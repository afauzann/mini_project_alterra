import { gql } from "@apollo/client";

export const GetListProduct = gql`
  query GetListProduct {
    toko_product {
      deskripsi
      harga
      id
      image
      nama
    }
  }
`;

export const GetProductDetail = gql`
  query GetProductDetail($id: Int!) {
    toko_product_by_pk(id: $id) {
      deskripsi
      harga
      id
      image
      nama
      stok
      author
    }
  }
`;

export const GetCart = gql`
  query GetCart {
    toko_order {
      id
      id_product
      jumlah
      product {
        harga
        image
        nama
      }
    }
  }
`;

export const FilterProduct = gql`
  query FilterProduct($genre: String) {
    toko_product(where: { genre: { _eq: $genre } }) {
      genre
      nama
      harga
      image
      id
    }
  }
`;

export const ListCarousel = gql`
  query ListCarousel {
    toko_product(limit: 4) {
      image
      nama
      id
      harga
    }
  }
`;

export const PaginationProduct = gql`
  query PaginationProduct($offset: Int!, $limit: Int!) {
    toko_product(offset: $offset, limit: $limit) {
      id
      image
      nama
      harga
    }
  }
`;
