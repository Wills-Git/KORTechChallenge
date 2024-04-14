import UsersDataService from '../services/usersDataService';

export async function initializeDB() {
  const service = new UsersDataService();
  await service.generateDummyTable();
  console.log('Initialization Complete');
}
