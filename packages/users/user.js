
export const detailedUser = {
    // Informations de base
    id: '12356',
    username: 'johndoe89',
    email: 'john.doe@example.com',
    password: 'P@ssw0rd!2023', // En production, ce serait un hash
    
    addresses :{
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      },
    phoneNumbers: [
      { type: 'mobile', number: '+1234567890', balance: '10000' },
      { type: 'home', number: '+1234567891', balance: '20000' }
    ],
    preferences: {
    theme: 'dark',
    language: 'en-US'
    },
    socialMedia: {
        facebook: 'johndoe89',
        twitter: '@johndoe89',
        linkedin: 'in/johndoe89',
        instagram: '@johndoe89'
    },
    createdAt: '2022-03-15',
    updatedAt: '2023-10-20'
}

