import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      category
      image
      gallery
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      image
    }
  }
`;

export const GET_HOME_DATA = gql`
  query GetHomeData {
    products {
      id
      name
      price
      category
      image
    }
    categories {
      id
      name
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      category
      image
      gallery
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: String!) {
    productsByCategory(categoryId: $categoryId) {
      id
      name
      price
      description
      category
      image
      gallery
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      status
      createdAt
    }
  }
`;
