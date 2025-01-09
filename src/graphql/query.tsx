import { gql } from '@apollo/client';

export const GET_DISHES = gql`
    query GetDishes {
        dishes {
            name
            type
            price
            image
            description
        }
    }
`;
