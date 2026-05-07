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
      video
      discountPrice
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
      video
      discountPrice
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
      video
      discountPrice
    }
    products {
      id
      name
      price
      category
      image
      discountPrice
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
      video
      discountPrice
    }
  }
`;
