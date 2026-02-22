import { api } from '../api'

const patientsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: ({ page = 1, page_size = 10, search = '' }) =>
                `/patient/?page=${page}&page_size=${page_size}&search=${search}`,
            providesTags: ['Patient'],
            transformResponse: (response) => response.data,
        }),
        getAllPatients: builder.query({
            query: () => '/patient/all/',
            providesTags: ['Patient'],
            transformResponse: (response) => response.data,
        }),
        createPatient: builder.mutation({
            query: (data) => ({
                url: '/patient/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Patient'],
        }),
    }),
})

export const { useGetPatientsQuery, useCreatePatientMutation, useGetAllPatientsQuery } = patientsApi