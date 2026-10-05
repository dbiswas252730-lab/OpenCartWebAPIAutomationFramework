import { test, expect } from '../../src/fixtures/apifixtures';
import { ApiHelper } from '../../src/api/ApiHelper';

let bookingId: number;


// --------------------
// Helper: Create Token
// --------------------
async function createToken(bookerApiHelper: ApiHelper): Promise<string> {

  const authData = {
    username: process.env.BOOKER_USERNAME!,
    password: process.env.BOOKER_PASSWORD!
  };

  const response = await bookerApiHelper.post(
    'auth',
    authData
  );


  expect(response.status).toBe(200);
  expect(response.body.token).toBeTruthy();

  return response.body.token;
}


// --------------------
// Helper: Create Booking
// --------------------
async function createBooking(bookerApiHelper: ApiHelper) {

  const bookingData = {
    firstname: 'Praveen',
    lastname: 'Sequeira',
    totalprice: 500,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-10-10',
      checkout: '2026-10-15'
    },
    additionalneeds: 'Breakfast'
  };

  const response = await bookerApiHelper.post(
    'booking',
    bookingData
  );

  expect(response.status).toBe(200);

  return response.body;
}


// --------------------
// TEST 1 - Create Token
// --------------------
test('@regression create token', async ({ bookerApiHelper }) => {

  const token = await createToken(bookerApiHelper);

  expect(token).toBeTruthy();

});


// --------------------
// TEST 2 - Create Booking
// --------------------
test('@regression create booking', async ({ bookerApiHelper }) => {

  const response = await createBooking(bookerApiHelper);

  expect(response.bookingid).toBeTruthy();
  expect(response.booking.firstname).toBe('Praveen');
  expect(response.booking.lastname).toBe('Sequeira');

});


// --------------------
// TEST 3 - Get Booking
// --------------------
test('@regression get booking', async ({ bookerApiHelper }) => {

  // Arrange
  const createdBooking = await createBooking(bookerApiHelper);
  bookingId = createdBooking.bookingid;

  // Act
  const response = await bookerApiHelper.get(
    `booking/${bookingId}`
  );

  // Assert
  expect(response.status).toBe(200);
  expect(response.body.firstname).toBe('Praveen');
  expect(response.body.lastname).toBe('Sequeira');

});


// --------------------
// TEST 4 - Update Booking
// --------------------
test('@regression update booking', async ({ bookerApiHelper }) => {

  // Arrange - create booking
  const createdBooking = await createBooking(bookerApiHelper);
  bookingId = createdBooking.bookingid;

  // Arrange - create token
  const token = await createToken(bookerApiHelper);

  const updatedBookingData = {
    firstname: 'Praveen Updated',
    lastname: 'Sequeira',
    totalprice: 750,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-10-20',
      checkout: '2026-10-25'
    },
    additionalneeds: 'Dinner'
  };

  const headers = {
    Cookie: `token=${token}`
  };

  // Act
  const response = await bookerApiHelper.put(
    `booking/${bookingId}`,
    updatedBookingData,
    headers
  );

  // Assert
  expect(response.status).toBe(200);
  expect(response.body.firstname).toBe('Praveen Updated');
  expect(response.body.totalprice).toBe(750);
  expect(response.body.depositpaid).toBe(false);

});


// --------------------
// TEST 5 - Delete Booking
// --------------------
test('@regression delete booking', async ({ bookerApiHelper }) => {

  // Arrange - create booking
  const createdBooking = await createBooking(bookerApiHelper);
  bookingId = createdBooking.bookingid;

  // Arrange - create token
  const token = await createToken(bookerApiHelper);

  const headers = {
    Cookie: `token=${token}`
  };

  // Act - delete
  const deleteResponse = await bookerApiHelper.delete(
    `booking/${bookingId}`,
    headers
  );

  // Assert delete
  expect(deleteResponse.status).toBe(201);

  // Verify booking no longer exists
  const getResponse = await bookerApiHelper.get(
    `booking/${bookingId}`
  );

  expect(getResponse.status).toBe(404);

});