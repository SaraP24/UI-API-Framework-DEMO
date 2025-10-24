import { IPet, PetStatus } from '../../interfaces/api/IPetStatus';

export const PET_STATUSES = {
    AVAILABLE: 'available',
    PENDING: 'pending',
    SOLD: 'sold'
} as const;

export const TEST_PETS: { [key: string]: IPet } = {
    AVAILABLE_PET: {
        id: 0,
        name: 'TestPetAvailable',
        status: PET_STATUSES.AVAILABLE,
        photoUrls: ['https://example.com/pet1.jpg'],
        category: { id: 1, name: 'Dogs' },
        tags: [{ id: 1, name: 'friendly' }]
    },
    SOLD_PET: {
        id: 0,
        name: 'TestPetSold',
        status: PET_STATUSES.SOLD,
        photoUrls: ['https://example.com/pet2.jpg'],
        category: { id: 2, name: 'Cats' },
        tags: [{ id: 2, name: 'indoor' }]
    }
};

export const getPetPayload = (status: string): IPet => ({
    ...TEST_PETS.AVAILABLE_PET,
    id: Math.floor(Math.random() * 10000) + 1,
    status: status as PetStatus

});