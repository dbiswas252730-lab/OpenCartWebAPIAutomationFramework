import { ApiHelper } from './ApiHelper';

export class BookerApiHelper {

  private readonly apiHelper: ApiHelper;

  constructor(apiHelper: ApiHelper) {
    this.apiHelper = apiHelper;
  }

  async createToken(): Promise<string> {

    const authData = {
      username: process.env.BOOKER_USERNAME!,
      password: process.env.BOOKER_PASSWORD!
    };

    const response = await this.apiHelper.post(
      'auth',
      authData
    );

    return response.body.token;
  }

  async createBooking(bookingData: object) {

    return await this.apiHelper.post(
      'booking',
      bookingData
    );
  }

  async getBooking(bookingId: number) {

    return await this.apiHelper.get(
      `booking/${bookingId}`
    );
  }

  async updateBooking(
    bookingId: number,
    bookingData: object,
    token: string
  ) {

    const headers = {
      Cookie: `token=${token}`
    };

    return await this.apiHelper.put(
      `booking/${bookingId}`,
      bookingData,
      headers
    );
  }

  async deleteBooking(
    bookingId: number,
    token: string
  ) {

    const headers = {
      Cookie: `token=${token}`
    };

    return await this.apiHelper.delete(
      `booking/${bookingId}`,
      headers
    );
  }
}