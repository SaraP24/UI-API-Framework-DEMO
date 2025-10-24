export const BASE_URL: string = "https://petstore.swagger.io/v2";

export const Routes = {
    // Pet endpoints
    PET_CREATE: '/pet',
    PET_GET_BY_ID: '/pet/{petId}',
    PET_UPDATE: '/pet',
    PET_DELETE: '/pet/{petId}',
    PET_FIND_BY_STATUS: '/pet/findByStatus',
    PET_FIND_BY_TAGS: '/pet/findByTags',
    PET_UPLOAD_IMAGE: '/pet/{petId}/uploadImage',

    // Store endpoints
    STORE_INVENTORY: '/store/inventory',
    STORE_ORDER_CREATE: '/store/order',
    STORE_ORDER_BY_ID: '/store/order/{orderId}',

    // User endpoints
    USER_CREATE: '/user',
    USER_CREATE_WITH_ARRAY: '/user/createWithArray',
    USER_CREATE_WITH_LIST: '/user/createWithList',
    USER_LOGIN: '/user/login',
    USER_LOGOUT: '/user/logout',
    USER_BY_USERNAME: '/user/{username}'
} as const;

// Alias para mantener compatibilidad con código existente
export const PET_POST_URL: string = `${BASE_URL}${Routes.PET_CREATE}`;
export const PET_GET_URL: string = `${BASE_URL}${Routes.PET_GET_BY_ID}`;
export const PET_DELETE_URL: string = `${BASE_URL}${Routes.PET_DELETE}`;
export const STORE_POST_URL: string = `${BASE_URL}${Routes.STORE_ORDER_CREATE}`;
export const STORE_GET_URL: string = `${BASE_URL}${Routes.STORE_ORDER_BY_ID}`;
export const STORE_DELETE_URL: string = `${BASE_URL}${Routes.STORE_ORDER_BY_ID}`;

// Type for route parameters
export type RouteParams = {
    petId?: number | string;
    orderId?: number | string;
    username?: string;
};