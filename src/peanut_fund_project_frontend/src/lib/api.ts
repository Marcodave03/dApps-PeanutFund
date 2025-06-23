import { RegistrationPayload, ErrorResponse, UsernameUpdateResponse, Bot } from './types';

const API_BASE_URL = 'http://localhost:5555/api';

export const registerUser = async (userData: RegistrationPayload): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portofolio/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const createBot = async (botData: Partial<Bot>): Promise<Bot> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bot/createbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botData),
    });
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || 'Failed to create bot');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error creating bot:', error);
    throw error;
  }
};

export const updateUsername = async (userId: string, username: string): Promise<UsernameUpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portofolio/updatename/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username }),
    });
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || 'Failed to update username');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error updating username:', error);
    throw error;
  }
};
