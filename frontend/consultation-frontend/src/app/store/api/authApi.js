import { api } from '../api'

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        refreshToken: builder.mutation({
            query: (refresh) => ({
                url: '/auth/refresh/',
                method: 'POST',
                body: { refresh },
            }),
        }),
    }),
})

export const { useLoginMutation, useRefreshTokenMutation } = authApi