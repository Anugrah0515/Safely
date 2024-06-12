export type signupDetails = {
    name?: string,
    email?: string,
    phoneNumber?: string,
    password?: string
} | null

export type loginDetails = {
    email?: string,
    password?: string
} | null

export type profileData = {
    email: string,
    name: string,
    phoneNumber: string,
    connectionRequests: [string],
    connections: [string]
}

export type message = {
    text: string;
    sentBy: string;
  }